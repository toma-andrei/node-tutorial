const request = require("postman-request");

const getAllBreeds = (callback) => {
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

    callback(undefined, Object.keys(response.body.message));
  });
};

module.exports = getAllBreeds;
