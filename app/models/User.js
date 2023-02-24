const mongoose = require("mongoose");
const valid = require("validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema(
  {
    fn: {
      type: String,
      required: true,
      min: 2,
      max: 20,
    },
    ln: {
      type: String,
      required: true,
      min: 2,
      max: 20,
    },
    emailOrPhone: {
      type: String,
      required: true,
      max: 50,
      unique: true,
      validate: {
        validator: (val) => {
          return valid.isEmail(val) || /^[0-9]{11}$/.test(val);
        },
        message: "{VALUE} is not valid email or phone",
      },
    },
    pass: {
      type: String,
      required: true,
      min: 8,
    },
    passConf: {
      type: String,
      required: true,
      min: 8,
    },
    day: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    customGender: {
      type: String,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 60,
    },
    city: {
      type: String,
      max: 50,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
  },
  { timestamps: true }
);

userSchema.methods.genAuthToken = (currentUser) => {
  const token = jwt.sign({ userId: currentUser._id }, process.env.SECVAR);
  console.log(`token: ` + token);
  return token;
};

module.exports = mongoose.model("users", userSchema);
