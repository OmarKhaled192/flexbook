const express = require("express");
const router = express.Router();
const controller = require('../app/controllers/user.controller')
const authRegisterMW = require('../middlewares/userRegisterValidatorMW');


// update user
router.put("/:id", controller.updateUser);

// delete user
router.delete("/:id", controller.deleteUser);

// get a user
router.get("/:id", controller.getUser)

// follow a user
router.put("/:id/follow", controller.followUser);

// unfollow a user
router.put("/:id/unfollow", controller.unfollowUser);

//create user
router.post("/createUser", authRegisterMW , controller.createUser);


module.exports = router;