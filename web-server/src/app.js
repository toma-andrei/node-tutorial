const express = require("express");
const path = require("path");
const fs = require("fs");
const { geocode } = require("./utils/geocode");
const { breeds } = require("./utils/breeds");
const { getDogImage } = require("./utils/dog-image");

const app = express();
app.use(express.static(path.join(__dirname + "/../public")));

app.get("/dogprofile", (req, res) => {
  if (!req.query.address) {
    res.status = 404;
    return res.send({ message: "Address must be provided." });
  }

  geocode(req.query.address, (error, longAndLat) => {
    if (error) {
      return res.send(error);
    }
    breeds(req.query.breed, (error, breed) => {
      getDogImage(breed, (error, image) => {
        if (error) {
          return res.send(error);
        }
        return res.send({
          breed: breed,
          image: image.message,
          ...longAndLat,
        });
      });
    });
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000.");
});
