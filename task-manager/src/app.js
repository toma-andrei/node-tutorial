const express = require("express");
require("dotenv").config();
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
