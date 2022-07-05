const { Post } = require("../models");

class PostController {
  static async add(req, res, next) {
    try {
      const { content, imgUrl } = req.body;
      const { id } = req.user;

      const post = await Post.create({
        content,
        imgUrl,
        userId: id,
      });

      res.status(201).json({
        message: "Post added succesfully",
      });
    } catch (error) {}
  }
}

module.exports = PostController;
