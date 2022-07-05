const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/comment");
const authentication = require("../middlewares/authentication");

router.post("/", authentication, CommentController.add);
router.get("/:id", authentication, CommentController.findAll);

module.exports = router;
