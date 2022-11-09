const fs = require("fs");

const add = (a, b) => {
  return a + b;
};

const writeFile = (type, filePath, image, extraInfos) => {
  if (type === "image") {
    let data = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dog</title>
    <style>
      .imagine {
        display: inline;
        float: left;
        width: 300px;
        height: 300px;

      }
      #dogMeta{
        display: inline;
        float: left;
      }

      #title{
        text-align: center;
      }
    </style>
  </head>
  <body>
  <h1 id="title">Callback function experience in NodeJS (using dog.ceo and mapbox APIs)</h1>
    <img src="${image}" />
    <h1 id="dogMeta">This dog (a beautiful ${extraInfos.breed}) was found in ${extraInfos.location} at latitude ${extraInfos.latitude} and longitude ${extraInfos.longitude}</h1>
    </body></html>
    `;

    fs.writeFileSync(filePath, data);
  }
};

module.exports = { add: add, writeFileCustom: writeFile };
