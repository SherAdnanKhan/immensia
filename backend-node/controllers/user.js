const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const User = require("../models/User");

class UserController {
  async getUsers(req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
}

module.exports = new UserController();
