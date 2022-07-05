const { Comment, User } = require("../models");

class CommentController {
  static async add(req, res, next) {
    try {
      const { postId, comment } = req.body;
      const { id } = req.user;

      const addComment = await Comment.create({
        comment,
        postId,
        userId: id,
      });

      res.status(201).json({
        message: "Comment added succesfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async findAll(req, res, next) {
    try {
      const { id } = req.params;

      const comments = await Comment.findAll({
        where: { id },
        include: [{ model: User, attributes: ["email"] }],
      });

      res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CommentController;
