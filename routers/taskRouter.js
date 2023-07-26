const taskRouter = require("express").Router();
const TaskController = require("../controllers/taskController");
const { checkUsersExistanceMW } = require("../middlewares/users.mv");

taskRouter
  .route("/")
  .post(TaskController.createTask)
  .get(TaskController.getTasks);

taskRouter
  .route("/:taskId")
  .get(TaskController.getTask)
  .put(TaskController.updateTask)
  .delete(TaskController.deleteTask);

module.exports = taskRouter;
