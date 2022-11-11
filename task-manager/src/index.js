const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const app = express();
const jwt = require("jsonwebtoken");
const Task = require("./models/task");
const User = require("./models/user");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

const myFunc = () => {
  const token = jwt.sign({ _id: "12345qwer" }, "thisismynewcourse", {
    expiresIn: "7 days",
  });
  console.log(token);

  const data = jwt.verify(token, "thisismynewcourse");
  console.log(data);
};

// myFunc();
