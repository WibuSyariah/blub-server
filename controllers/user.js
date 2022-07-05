const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { payloadToToken } = require("../helpers/jwt");

class userController {
  static async register(req, res, next) {
    try {
      const { email, password, phoneNumber, address } = req.body;

      const user = await User.create({
        email,
        password,
        phoneNumber,
        address,
      });

      const payload = { id: user.id, email: user.email, role: user.role };

      const token = payloadToToken(payload);

      res.status(201).json({
        message: "Admin registered successfully",
        statusCode: 201,
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

      const payload = { id: user.id, email: user.email, role: user.role };

      const token = payloadToToken(payload);

      res.status(200).json({
        statusCode: 200,
        access_token: token,
        UserId: user.id,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = userController;
