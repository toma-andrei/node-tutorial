const { geocode } = require("./utils/geocode");
const { getDogImage } = require("./utils/dog-image");
const getBreeds = require("./utils/breeds");
const { writeFileCustom } = require("./utils/dataShow");

let generateDogProfile = () => {
  const places = ["Romania", "Philadelphia", "Italy", "Spain", "Bucharest"];

  // if there is any argument from the command line, it must be the country.

  let place = process.argv[2]
    ? process.argv[2]
    : places[Math.floor(Math.random() * places.length)];
  console.log(place);
  // get geocode of the dog's country
  geocode(place, (error, geocodes) => {
    if (error) {
      console.log(error);
      return;
    }

    //get all breads available
    getBreeds((error, data) => {
      if (error) {
        console.log(error);
        return;
      }

      // once breeds are available pick one randomly
      let breed = data[Math.floor(Math.random() * data.length)];

      // get the image of the dog
      getDogImage(breed, (error, image) => {
        if (error) {
          console.log(error);
          return;
        }
        //make it available in HTML
        geocodes["breed"] = breed;

        //generate dog's profile
        writeFileCustom(
          "image",
          __dirname + "/../web-server/public/index.html",
          image.message,
          geocodes
        );
      });
    });
  });
};

module.exports = generateDogProfile;
