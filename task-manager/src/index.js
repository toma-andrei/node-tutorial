const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() =>
      res.send({ status: "success", message: `Welcome ${req.body.name}` })
    )
    .catch((error) => {
      res.status(400).send({ status: "error", message: error });
    });
});

app.get("/users", (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      res.status(500).send({ status: "error", message: error });
    });
});

app.get("/users/:id", (req, res) => {
  const _id = req.params.id;

  User.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(404);
      }

      res.send(user);
    })
    .catch((error) => {
      res.send();
    });
});

app.post("/tasks", (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => {
      res.status(201).send({ status: "success", message: "Task saved!" });
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

app.get("/tasks", (req, res) => {
  Task.find({})
    .then((tasks) => {
      if (!tasks) return res.status(404);

      res.send(tasks);
    })
    .catch((error) => {
      res.status(500).send({ status: "error", message: error });
    });
});

app.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;

  Task.findById(_id)
    .then((tasks) => {
      if (!tasks) return res.status(404);

      res.send(tasks);
    })

    .catch((error) => {
      res.status(500).send({ status: "error", message: error });
    });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
