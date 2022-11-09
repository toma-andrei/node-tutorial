// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectId

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "dog-app";
const { MongoClient, ObjectId } = require("mongodb");

const id = new ObjectId();

// console.log(id);

MongoClient.connect(connectionURL).then((client, error) => {
  if (error) {
    // return console.log(error);
  }
  console.log("connection successful");

  const db = client.db(databaseName);
  // CREATE ================

  // db.collection("tasks")
  //   .insertMany([
  //     { description: "do this", completed: false },
  //     { description: "do that", completed: false },
  //   ])
  //   .then((result, error) => {
  //     if (error) {
  //       return console.log(error);
  //     }

  //     // console.log(result);
  //   });

  // READ ================

  // db.collection("users")
  //   .findOne({ name: "Ionel" })
  //   .then((result, error) => {
  //     if (error) {
  //       return console.log(error);
  //     }
  //     console.log(result);
  //   });

  // db.collection("users")
  //   .find({ age: 22 })
  //   .toArray()
  //   .then((result, error) => {
  //     if (error) return console.log(error);
  //     console.log(result);
  //   });

  // db.collection("tasks")
  //   .findOne({
  //     _id: new ObjectId("636b6458bb2e519f7cbefaeb"),
  //   })
  //   .then((result, error) => {
  //     if (error) return console.log(error);

  //     console.log(result);
  //   });

  // db.collection("tasks")
  //   .find({ completed: false })
  //   .toArray()
  //   .then((result, error) => {
  //     if (error) return console.log(error);
  //     console.log(result);
  //   });

  // UPDATE ================

  // db.collection("users")
  //   .updateOne(
  //     {
  //       _id: new ObjectId("636b6384ffbc4362d2994511"),
  //     },
  //     // {
  //     //   $set: {
  //     //     name: "Mike",
  //     //   },
  //     // }
  //     {
  //       $inc: {
  //         age: 1,
  //       },
  //     }
  //   )
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // db.collection("tasks")
  //   .updateMany({ completed: false }, { $set: { completed: true } })
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log(error));

  // DELETE ================

  db.collection("tasks")
    .deleteMany({ completed: true })
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
});
