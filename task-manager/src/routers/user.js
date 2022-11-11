const express = require("express");
const jwt = require("jsonwebtoken");
const router = new express.Router();
const auth = require("../middleware/auth");
const User = require("../models/user");

router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    const token = await user.generateAuthToken();
    await user.save();
    res.send({
      status: "success",
      message: `Welcome ${req.body.name}`,
      token: token,
    });
  } catch (err) {
    res.status(500).send({ status: "error", message: err });
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.send({
      status: "success",
      message: user,
      token: token,
    });
    console.log(token);
  } catch (err) {
    res.status(400).send({ status: "error", message: err.toString() });
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (err) {
    res.send({ status: "error", message: err.toString() });
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send({ status: "success", message: "Logout from all devices" });
  } catch (err) {
    res.send(500).send({ status: "error", message: err.toString() });
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(400).send({ error: "Invalid fields" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));

    await req.user.save();

    res.status(200).send({ status: "success", message: req.user });
  } catch (err) {
    res.status(400).send({ status: "error", message: err.toString() });
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    if (!user) {
      return res
        .status(404)
        .send({ status: "error", message: "No user with this id" });
    }

    await req.user.remove();

    res.send({ status: "success", message: "User deleted" });
  } catch (err) {
    res.status(500).send({ status: "error", message: err });
  }
});

module.exports = router;
