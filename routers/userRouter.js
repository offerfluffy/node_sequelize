const userRouter = require("express").Router();
const taskRouter = require("./taskRouter");
const UserController = require("../controllers/userController");
const GroupController = require("../controllers/groupController");
const { checkUsersExistanceMW } = require("../middlewares/users.mv");

userRouter
  .route("/")
  .get(UserController.getUsers)
  .post(UserController.createUser);

userRouter
  .route("/:userId")
  .get(UserController.getUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

userRouter.use("/:userId/tasks", checkUsersExistanceMW, taskRouter);

userRouter.use("/:userId/groups", GroupController.getUserGroups);

module.exports = userRouter;
