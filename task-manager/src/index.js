const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send({ status: "success", message: `Welcome ${req.body.name}` });
  } catch (err) {
    res.status(400).send({ status: "error", message: err });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send({ status: "error", message: error });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findById(_id);

    if (!user) return res.status(404);

    res.send(user);
  } catch (err) {
    res.status(500).send({ status: "error", message: err });
  }
});

app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send({ status: "success", message: "Task saved!" });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});

    if (!tasks) return res.status(404);

    res.send(tasks);
  } catch (err) {
    res.status(500).send({ status: "error", message: error });
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const tasks = await Task.findById(_id);

    if (!tasks) return res.status(404);

    res.send(tasks);
  } catch (err) {
    res.status(500).send({ status: "error", message: err });
  }
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
