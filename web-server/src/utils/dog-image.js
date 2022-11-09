const request = require("postman-request");

const dogImage = (breed, callback) => {
  const url = `https://dog.ceo/api/breed/${breed}/images/random`;
  // take the image of dog
  request(url, { json: true }, (error, response) => {
    //in case of error
    if (error) {
      callback(error, undefined);
      return;
    }

    // in case of spelling/URL error
    if (response.body.status === "error") {
      callback("There is an issue with the URL or API!", undefined);
      return;
    }

    // else call callback function with the response
    callback(undefined, response.body);
  });
};

module.exports = { getDogImage: dogImage };
