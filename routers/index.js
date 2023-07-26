const rootRouter = require("express").Router();
const userRouter = require("./userRouter");

rootRouter.use("/users", userRouter);

module.exports = rootRouter;
