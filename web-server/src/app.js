const express = require("express");
const dogApp = require("../../dog-app/app");
const path = require("path");
const fs = require("fs");
const app = express();

app.get("/", (req, res) => {
  res.download("../public/index.html");
  dogApp();
  res.send("?");
});

app.listen(3000, () => {
  console.log("Listening on port 3000.");
});
