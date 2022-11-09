const request = require("postman-request");

const getAllBreeds = (breed, callback) => {
  if (!breed || breed === "random") {
    let url = "https://dog.ceo/api/breeds/list/all";

    request(url, { json: true }, (error, response) => {
      if (error) {
        callback(error, undefined);
        return;
      }

      if (response.body.status === "error") {
        callback("Something went wrong with dog.ceo API!", undefined);
        return;
      }
      // second parameter gives a random breed from the list
      callback(
        undefined,
        Object.keys(response.body.message)[
          Math.floor(Math.random() * Object.keys(response.body.message).length)
        ]
      );
    });
  }
};

module.exports = { breeds: getAllBreeds };
