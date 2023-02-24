const mongoose = require("mongoose");

// create schema
const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String
    },
    likes: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

// create model 
const userModel = mongoose.model("posts", postSchema)

// export modal
module.exports = userModel;