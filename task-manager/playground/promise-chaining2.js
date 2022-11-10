require("../src/db/mongoose");
const Task = require("../src/models/task");

// Task.deleteOne({ id: "636bb94d6ba1f2f9c8bb747c" })
//   .then(() => {
//     console.log("deleted");
//     return Task.countDocuments({ completed: false });
//   })
//   .then((number) => {
//     console.log(number);
//   })
//   .catch((error) => console.log(error));

const deleteTaskAndCount = async (id) => {
  let result = await Task.deleteOne({ _id: id });
  const count = await Task.countDocuments({ completed: false });

  return count;
};

deleteTaskAndCount("636bb9a8457c79f9f37ea6ed").then((count) => {
  console.log(count);
});
