const groupRouter = require("express").Router();
const GroupController = require("../controllers/groupController");
const imageUpload = require("../utils/imageUpload");

groupRouter.route("/").post(GroupController.createGroup);
groupRouter.post(
  "/:groupId/images",
  imageUpload.single("image"),
  GroupController.addImageToGroup
);

module.exports = groupRouter;
