const express = require("express");
const router = express.Router();
const PostController = require("../controllers/post");
const authentication = require("../middlewares/authentication");

router.post("/", authentication, PostController.add);
router.get("/", authentication, PostController.findAll);
router.get("/:id", authentication, PostController.findOne);
router.put("/:id", authentication, PostController.update);
router.delete("/:id", authentication, PostController.delete);

module.exports = router;
