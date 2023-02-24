const express = require("express");
const router = express.Router();
const validator = require("../middlewares/authValidatorMW");
const User = require("../app/models/User");
const bcrypt = require("bcrypt");
// register
router.post("/register", async (req, res) => {
  try {
    // generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // save user and return response
    const user = await newUser.save();
    res.status(200).send(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// login
router.post("/login", validator, async (req, res) => {
  try {
    // check email
    const user = await User.findOne({
      emailOrPhone: req.body.userName,
    }).exec();
    if (!user) {
      req.flash("PageTitle", "Not found");
      return res
        .status(404)
        .render("pages/error", { PageTitle: req.flash("PageTitle") });
    }

    // check password
    const validPassword = await bcrypt.compare(req.body.password, user.pass);
    if (!validPassword) {
      console.log("Invalid Email Or Password");
      req.flash("invalidLoginData", "Invalid Email Or Password");
      req.flash("PageTitle", "Invalid Data");
      return res.status(400).redirect("back");
    }
    if(!process.env.SECVAR) {return res.status(500).send("Request can't be fulfilled, token is not defined.")}
    const token = user.genAuthToken(user);
    res.header("x-auth-token", token);
    console.log(token);

    // res.status(200).json("Login Successfully");
    console.log("user is logged in  successfully ! ");
    setTimeout(() => {
      req.flash("PageTitle", "Home Page");
      res.render("pages/homePage", { PageTitle: req.flash("PageTitle") });
    }, 2000);
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[e].message);
      res.status(400).send("bad request");
    }
  }
});



module.exports = router;
