const fs = require("fs");
const book = { title: "Holy Bible", authors: ["A", "B", "C"] };

let bookString = JSON.stringify(book);
console.log(bookString);
fs.writeFileSync("book.json", bookString);

let data = fs.readFileSync("./book.json");

console.log("data from file:", JSON.parse(data));
