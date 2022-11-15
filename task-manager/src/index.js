require("dotenv").config();
const app = require("./app");

app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});

// const multer = require("multer");
// const upload = multer({
//   dest: "images",
//   limits: {
//     fileSize: 1000000,
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(doc|docx)$/)) {
//       return cb(new Error("File must be a Word document!"));
//     }
//     cb(undefined, true);
//     // cb(new Error("File must be a PDF"));
//   },
// });

// app.post(
//   "/upload",
//   upload.single("upload"),
//   (req, res) => {
//     res.send();
//   },
//   (error, req, res, next) => {
//     res.status(400).send({ status: "error", message: error.toString() });
//   }
// );
