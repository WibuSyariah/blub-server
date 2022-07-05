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
    } catch (error) {
      next(error);
    }
  }

  static async findAll(req, res, next) {
    try {
      const posts = await Post.findAll();

      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }

  static async findOne(req, res, next) {
    try {
      const { id } = req.params;

      const post = await Post.findByPk(id);

      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { content } = req.body;

      const updatePost = await Post.update(
        {
          content,
        },
        { where: { id } }
      );

      res.status(200).json({
        message: "Post updated successfully",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const deletePost = await Post.destroy({ where: { id } });

      res.status(200).json({
        message: "Post deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PostController;
