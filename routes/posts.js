const express = require("express");
const router = express.Router();

const controller = require('../app/controllers/post.controller')

// create a post
router.post("/", controller.createPost);

// update a post
router.put("/:id", controller.updatePost);

// delete a post
router.delete("/:id", controller.deletePost);

// like a post
router.put("/:id/like", controller.likePost);

// get a post
router.get("/:id", controller.getPost);

// get timeline posts
router.get("/timeline/all", controller.allTimeLines);

module.exports = router;