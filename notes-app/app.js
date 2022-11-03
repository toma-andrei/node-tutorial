require("validator");
const yargs = require("yargs");
const fs = require("fs");
const { default: isEmail } = require("validator/lib/isEmail");
const add = require("./utils");

console.log(add(1, 3));
console.log(isEmail("andrei.toma@bearingpoint.c"));

console.log(process.argv);
console.log(yargs.argv);
