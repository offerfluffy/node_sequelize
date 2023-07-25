const express = require("express");
const UserController = require("../controllers/userController");
const TaskController = require("../controllers/taskController");

const userRouter = express.Router();

userRouter
  .route("/users")
  .get(UserController.getUsers)
  .post(UserController.createUser);

userRouter
  .route("/users/:userId")
  .get(UserController.getUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

userRouter.post("/users/:userId/tasks", TaskController.createTask);

module.exports = userRouter;
