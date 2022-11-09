require("../src/db/mongoose");
const { default: mongoose } = require("mongoose");
const User = require("../src/models/user");

// /636b9056bce34ab8ed45774f

User.findByIdAndUpdate("636b9056bce34ab8ed45774f", { age: 1 })
  .then((user) => {
    console.log(user);
    return User.countDocuments({ age: 1 });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => console.log(error));
