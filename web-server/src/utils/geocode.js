const request = require("postman-request");

const geocode = (address, callback) => {
  const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYW5kcmVpdG9tYSIsImEiOiJjbGEwdXVuaTQwMWJoM3ZvampwdXRjNzA3In0.q-T629-XVUB5SAMU22XBsQ`;

  request(geocodeURL, { json: true }, (error, response) => {
    // if a request error is meet
    if (error) {
      callback(error, undefined);
      return;
    }
    // if a API/URL error is meet
    if (response.body.features.length === 0) {
      callback(`Unable to find location '${address}'`, undefined);
      return;
    }
    //else all good, continue to callback
    callback(undefined, {
      latitude: response.body.features[0].center[0],
      longitude: response.body.features[0].center[1],
      location: response.body.features[0].place_name,
    });
  });
};

module.exports = { geocode: geocode };
