const express = require("express");
const router = new express.Router();
const User = require("../models/user");

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send({ status: "success", message: `Welcome ${req.body.name}` });
  } catch (err) {
    res.status(400).send({ status: "error", message: err });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send({ status: "error", message: error });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findById(_id);

    if (!user) return res.status(404);

    res.send(user);
  } catch (err) {
    res.status(500).send({ status: "error", message: err });
  }
});

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(400).send({ error: "Invalid fields" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // returns the new user (document with updated elements)
    );

    if (!user) {
      return res.status(404).send();
    }

    res.send({ status: "success", message: user });
  } catch (err) {
    res.status(400).send({ status: "error", message: err });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res
        .status(404)
        .send({ status: "error", message: "No user with this id" });
    }

    res.send({ status: "success", message: "User deleted" });
  } catch (err) {
    res.status(500).send({ status: "error", message: err });
  }
});

module.exports = router;
