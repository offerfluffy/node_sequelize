const { User } = require("../models");
const { Op } = require("sequelize");
const createHttpError = require("http-errors");

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;

    const user = await User.create(body);

    res.status(201).send({ data: user });
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;

    const user = await User.findOne({
      attributes: ["first_name", "lastName", "email", "isMale"],
      where: {
        id: userId,
      },
      returning: true,
    });

    res.status(200).send({ data: user });
  } catch (err) {
    next(err);
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    // const user = await User.findAll({
    //   attributes: [["first_name", "name"], "lastName", "email", "isMale"],
    // });

    const user = await User.findAll({
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });

    // const user = await User.findAll({
    //   attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    //   where: {
    //     firstName: 'User'
    //   }
    // });

    // const user = await User.findAll({
    //   attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    //   where: {
    //     [Op.or]: [{ firstName: "User2" }, { id: 2 }],
    //   },
    // });

    res.send({ data: user });
  } catch (err) {
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const {
      body,
      params: { userId },
    } = req;

    const [usersUpdted, [updatedUser]] = await User.update(body, {
      where: { id: userId },
      returning: true,
    });

    if (usersUpdted !== 1) {
      return next(createHttpError(404, "User not found"));
    }

    const userWithoutPassword = updatedUser.get();

    delete userWithoutPassword.password;

    res.send({ data: userWithoutPassword });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;

    const deletedUser = await User.destroy({
      where: {
        id: userId,
      },
    });

    if (deletedUser === 0) {
      return next(createHttpError(404, "User not found"));
    }

    res.send({ data: deletedUser });
  } catch (err) {
    next(err);
  }
};
