"use strict";
const { Model } = require("sequelize");
const { isAfter } = require("date-fns");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Task, Group }) {
      User.hasMany(Task, {
        foreignKey: "userId",
        onDelete: "cascade",
        onUpdate: "cascade",
      });
      User.belongsToMany(Group, {
        through: "users_to_groups",
        foreignKey: "userId",
        onDelete: "cascade",
        onUpdate: "cascade",
      });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        field: "first_name",
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        field: "last_name",
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notNull: true,
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      isMale: { type: DataTypes.BOOLEAN, field: "is_male" },
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          isDate: true,
          isAfter: "1900-01-01",
          isValidDate: (value) => {
            if (isAfter(new Date(value), new Date())) {
              throw new Error("Invalid birthday");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      underscored: true,
    }
  );
  return User;
};
