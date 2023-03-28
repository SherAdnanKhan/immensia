const express = require("express");
const router = express.Router({ mergeParams: true });
const UserController = require("../controllers/user");
const { protect, authorize } = require('../middlewares/auth');


router.use(protect);
router.get("/", UserController.getUsers);


module.exports = router;