const createHttpError = require("http-errors");
const { Group, User, Task } = require("../models");

module.exports.createGroup = async (req, res, next) => {
  try {
    const {
      body: { userId, ...groupData },
    } = req;

    const author = await User.findByPk(userId);

    if (!author) {
      return next(createHttpError(404, "User not found"));
    }

    const newGroup = await Group.create(groupData);

    await newGroup.addUser(author);

    res.status(201).send({ data: newGroup });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserGroups = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;

    const userWithGroups = await User.findByPk(userId, {
      include: [
        {
          model: Group,
          through: {
            attributes: [],
          },
          attributes: ["id", "name", "description", "imagePath"],
        },
        // {
        //   model: Task,
        // },
      ],
    });

    if (!userWithGroups) {
      return next(createHttpError(404, "User not found"));
    }

    // const groups = await user.getGroups();

    res.status(200).send({ data: userWithGroups });
  } catch (error) {
    next(error);
  }
};

module.exports.addImageToGroup = async (req, res, next) => {
  try {
    const {
      file: { filename },
      params: { groupId },
    } = req;

    const [rows, [updatedGroup]] = await Group.update(
      { imagePath: filename },
      {
        where: { id: groupId },
        returning: true,
      }
    );

    if (rows !== 1) {
      return next(createHttpError(404, "Group not found"));
    }

    res.status(201).send({ data: updatedGroup });
  } catch (error) {
    next(error);
  }
};
