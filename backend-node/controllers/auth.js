const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require('../middlewares/async');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

/**
 * @desc   register the user
 * @route  Get /api/v1/auth/register
 * @access Public
 * @param  {req} req
 * @param  {res} res
 * @param  {next} next
 */
exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    // Create a user
    const user = await User.create({ name, email, password, role });

    sendTokenResponse(user, 200, res);
});

/**
 * @desc   login the user
 * @route  Get /api/v1/auth/login
 * @access Public
 * @param  {req} req
 * @param  {res} res
 * @param  {next} next
 */

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!password || !email) {
        return next(new ErrorResponse(`Email or Password is missing`, 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorResponse(`Invalid credentials`, 404));
    }

    // Check if password matches

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse(`Invalid credentials`, 404));
    }

    sendTokenResponse(user, 200, res);
});


/**
 * @desc   Get the current login user
 * @route  GET /api/v1/auth/me
 * @access private
 * @param  {req} req
 * @param  {res} res
 * @param  {next} next
 */
exports.getMe = asyncHandler(async (req, res, next) => {
    // Create a user
    const user = await User.findById(req.user);

    res.status(200).json({ "success": true, data: user });
});

/**
 * @desc   Logout the user
 * @route  GET /api/v1/auth/logout
 * @access private
 * @param  {req} req
 * @param  {res} res
 * @param  {next} next
 */
 exports.logout = asyncHandler(async (req, res, next) => {
    // Create a user
    const user = await User.findById(req.user);

    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 *1000),
        httpOnly: true
    });
    res.status(200).json({ "success": true, msg: 'Logout successfully' });
});

/**
 * @desc   Update user details
 * @route  GET /api/v1/auth/updatedetails
 * @access private
 * @param  {req} req
 * @param  {res} res
 * @param  {next} next
 */
exports.updateDetails = asyncHandler(async (req, res, next) => {
    const fieldsToUpdate = {
        name: req.body.name,
        email: req.body.email
    };
    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
        new: true,
        runValidators: true
    });

    res.status(200).json({ "success": true, data: user });
});

/**
 * @desc   Update user password
 * @route  GET /api/v1/auth/updatepassword
 * @access private
 * @param  {req} req
 * @param  {res} res
 * @param  {next} next
 */
exports.updatePassword = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    // Check current password match the password
    const isMatch = await user.matchPassword(req.body.currentpassword);

    if (!isMatch) {
        return next(new ErrorResponse(`Password is incorrect`, 401));
    }

    user.password = req.body.password;
    await user.save();

    sendTokenResponse(user, 200, res);
});

/**
 * @desc   Forgot password
 * @route  GET /api/v1/auth/forgotpassword
 * @access public
 * @param  {req} req
 * @param  {res} res
 * @param  {next} next
 */
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    // Create a user
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorResponse(`These is no user exist with this email: ${req.body.email}`, 404));
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // Xreate reset url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;

    const message = `You are recieving this email because you (or someone else) has requested the reset a password.
    Please make a Put reqest to : \n\n ${resetUrl}`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password reset token',
            message
        });
        res.status(200).json({ "success": true, msg: 'message sent, check your email' });
    } catch (error) {
        console.log(error);
        user.resetPasswordExpire = undefined;
        User.resetPasswordToken = undefined;

        return next(new ErrorResponse(`Email cannot be sent`, 500));
    }
});

/**
 * @desc   Reset Password
 * @route  GET /api/v1/auth/forgotpassword/:resetToken
 * @access public
 * @param  {req} req
 * @param  {res} res
 * @param  {next} next
 */
exports.resetPassword = asyncHandler(async (req, res, next) => {
    // Get hashed token
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.resettoken)
        .digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
        return next(new ErrorResponse(`Invalid Token, Please generate a new one`, 400));
    }

    //Set new password

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendTokenResponse(user, 200, user);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true, token, user
    });
};