const mongoose = require("mongoose");
const User = require("../models/user");
const Task = require("../models/task");

mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
});

// const me = new User({
//   name: "  Andrei   ",
//   email: "andrei@GMAIL.com   ",
//   password: "parola123",
// });

// const task = new Task({ description: "   Go to work  ", completed: false });

// task
//   .save()
//   .then(console.log(task))
//   .catch((error) => console.log(error));
