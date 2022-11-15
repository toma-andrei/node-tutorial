require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../src/models/user");
const Task = require("../src/models/task");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Mike",
  email: "mike@example.com",
  password: "parola123",
  tokens: [{ token: jwt.sign({ _id: userOneId }, process.env.JWTSecret) }],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "Mikelangelo",
  email: "mikelo@example.com",
  password: "parola123",
  tokens: [{ token: jwt.sign({ _id: userTwoId }, process.env.JWTSecret) }],
};

const taskOneId = new mongoose.Types.ObjectId();
const taskOne = {
  _id: taskOneId,
  description: "some dummy description",
  completed: false,
  owner: userOneId,
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "some dummy description v2",
  completed: true,
  owner: userOneId,
};

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "some dummy description v3",
  completed: true,
  owner: userTwoId,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

module.exports = {
  userOneId,
  userOne,
  setupDatabase,
  taskOne,
  userTwo,
  userTwoId,
};
