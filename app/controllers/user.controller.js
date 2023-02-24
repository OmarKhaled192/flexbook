// require models
const User = require("../models/User");
const bcrypt = require("bcrypt");

// create user
let createUser = async (req, res) => {
  try {
    // hashed password before creating user
    let salt = await bcrypt.genSalt(10);
    let hashedPass = await bcrypt.hash(req.body.pass, salt);
    let hashedPassConf = await bcrypt.hash(req.body.passConf, salt);
    const user = new User({
      fn: req.body.fn,
      ln: req.body.ln,
      emailOrPhone: req.body.emailOrPhone,
      pass: hashedPass,
      passConf: hashedPassConf,
      day: req.body.day,
      month: req.body.month,
      year: req.body.year,
      gender: req.body.gender,
      customGender: req.body.customGender,
    });
    // create new user
    await user.save();
    console.log("user is saved successfully ! ");
    try {
      // gen auth token
      const token = user.genAuthToken(user);
      console.log(token);
      res.header("x-auth-token", token);

    } catch (err) {
      console.log(err.message);
      console.log(`token:${token}`)
    }
    req.flash("resultInfo", "You are registered successfully!");
    req.flash("tagInfo", "success");
    res.redirect("back");
  } catch (err) {
    req.flash("resultInfo", "server error");
    req.flash("tagInfo", "danger");
    try {
      const existUser = await User.find({emailOrPhone: req.body.emailOrPhone});
      console.log(existUser)
      if (existUser) {
        req.flash("emailIsExist", "email is exist");
      }
    } catch (err) {
      console.error(err.message);
      req.flash("errMessage", err.message);
    }
    res.redirect("/", 500, { result: "server error!!", tag: "warning" });
  }
};

// update user
let updateUser = async (req, res) => {
  if (req.params.id === req.body.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(403).json(err);
      }

      try {
        await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json("Account has been updated");
      } catch (err) {
        return res.status(403).json(err);
      }
    } else {
      return res.status(403).json("you can update only your account");
    }
  }
};

// delete user
let deleteUser = async (req, res) => {
  if (req.params.id === req.body._id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted Successfully");
      } catch (err) {
        return res.status(403).json(err);
      }
    } else {
      return res.status(403).json("you can delete only your account");
    }
  }
};

// get user
let getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("user not found");
    const { password, updatedAt, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};

// follow user
let followUser = async (req, res) => {
  if (req.body.userId !== req.body._id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed..!");
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can't follow your self..!");
  }
};

let unfollowUser = async (req, res) => {
  if (req.body.userId !== req.body._id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed..!");
      } else {
        res.status(403).json("you already unfollow this user..!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can't unfollow your self..!");
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unfollowUser,
};
