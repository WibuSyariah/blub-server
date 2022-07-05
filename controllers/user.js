const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { payloadToToken } = require("../helpers/jwt");

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.create({
        email,
        password,
      });

      const payload = { id: user.id, email: user.email };

      const token = payloadToToken(payload);

      res.status(201).json({
        message: "User registered successfully",
        access_token: token,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw { name: "INVALID_EMAIL" };
      }

      const isMatch = comparePassword(password, user.password);

      if (!isMatch) {
        throw { name: "INVALID_PASSWORD" };
      }

      const payload = { id: user.id, email: user.email };

      const token = payloadToToken(payload);

      res.status(200).json({
        access_token: token,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
