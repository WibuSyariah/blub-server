const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const authentication = require("../middlewares/authentication");

router.post("/login", userController.login);
router.post("/register", authentication, userController.register);

module.exports = router;
