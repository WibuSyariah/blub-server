const express = require("express");
const router = express.Router();
const user = require("./user");
const post = require("./post");
const comment = require("./comment");

router.use("/users", user);
router.use("/posts", post);
router.use("/comments", comment);

module.exports = router;
