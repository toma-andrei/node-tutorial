const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send({ status: "success", message: "Task saved!" });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});

    if (!tasks) return res.status(404);

    res.send(tasks);
  } catch (err) {
    res.status(500).send({ status: "error", message: error });
  }
});

router.get("/tasks/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const tasks = await Task.findById(_id);

    if (!tasks) return res.status(404);

    res.send(tasks);
  } catch (err) {
    res.status(500).send({ status: "error", message: err });
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const allowedUpdates = ["description", "completed"];
  const fields = Object.keys(req.body);
  const isValidOperation = fields.every((field) =>
    allowedUpdates.includes(field)
  );

  try {
    if (!isValidOperation)
      return res
        .status(400)
        .send({ status: "error", message: "Invalid fields" });

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!task) {
      return res
        .status(404)
        .send({ status: "error", message: "No task with specified id" });
    }

    res.send({ status: "success", message: task });
  } catch (err) {
    res.status(400).send({ status: "error", message: err });
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
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
