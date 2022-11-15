const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Task = require("../models/task");

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res
      .status(201)
      .send({ status: "success", message: "Task saved!", ...task._doc });
  } catch (err) {
    res.status(400).send(err);
  }
});

// GET /tasks?completed=true
// GET /tasks?limit=2&skip=2
// GET /tasks?sortBy=createdAt:desc
// GET /tasks?sortBy=completed:true
router.get("/tasks", auth, async (req, res) => {
  try {
    const complQuery =
      req.query.completed === undefined
        ? {}
        : { completed: req.query.completed };

    const limitValue = req.query.limit ? parseInt(req.query.limit) : undefined;
    const skipValue = req.query.skip ? parseInt(req.query.skip) : undefined;
    let sortBy = req.query.sortBy ? req.query.sortBy.split(":") : undefined;

    if (sortBy) {
      sortBy = { [sortBy[0]]: sortBy[1] === "asc" ? 1 : -1 };
    } else sortBy = undefined;

    const tasks = await Task.find({
      owner: req.user._id,
      ...complQuery,
    })
      .skip(skipValue)
      .limit(limitValue)
      .sort(sortBy);

    if (!tasks) return res.status(404);

    res.send(tasks);
    console.log(tasks);
  } catch (err) {
    res.status(500).send({ status: "error", message: err.toString() });
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  try {
    const tasks = await Task.findOne({
      _id: req.params.id,
    });

    if (!tasks) return res.status(404);

    res.send(tasks);
  } catch (err) {
    res.status(500).send({ status: "error", message: err });
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const allowedUpdates = ["description", "completed"];
  const fields = Object.keys(req.body);
  const isValidOperation = fields.every((field) =>
    allowedUpdates.includes(field)
  );

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!isValidOperation)
      return res
        .status(400)
        .send({ status: "error", message: "Invalid fields" });

    allowedUpdates.forEach((update) => {
      task[update] = req.body[update];
    });

    await task.save();

    if (!task) {
      return res
        .status(404)
        .send({ status: "error", message: "No task with specified id" });
    }

    res.send({ status: "success", message: task });
  } catch (err) {
    res.status(400).send({ status: "error", message: err.toString() });
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res
        .status(404)
        .send({ status: "error", message: "No task with this id" });
    }

    res.send({ status: "success", message: "Task deleted" });
  } catch (err) {
    res.status(500).send({ status: "error", message: err });
  }
});

module.exports = router;
