"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Post, { foreignKey: "userId" });
      this.hasMany(models.Comment, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Email cannot be empty",
          },
          notNull: {
            msg: "Email cannot be empty",
          },
          isEmail: {
            msg: "Email is not valid",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password cannot be empty",
          },
          notNull: {
            msg: "Password cannot be empty",
          },
          len: {
            args: [5, 15],
            msg: "Password must be atleast between 5 to 15 characters",
          },
        },
      },
    },
    {
      sequelize,
      hooks: {
        beforeCreate(instance, options) {
          instance.password = hashPassword(instance.password);
        },
      },
      modelName: "User",
    }
  );
  return User;
};
