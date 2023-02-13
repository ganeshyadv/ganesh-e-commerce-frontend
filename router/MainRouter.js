const express = require("express");
const app = express();
const userRouter = require("./user/UserRouter");
const adminRouter = require("./admin/adminRouter");

app.use("/", userRouter);

app.use("/admin", adminRouter);


module.exports = app;