const express = require("express");
require("express-async-errors");
require("dotenv").config();
const router = require("./src/routes");
const {
  notFoundURLHandler,
  errorHandler,
} = require("./src/middlewares/errors");
const fileUpload = require("express-fileupload");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

app.use("/", router);

app.use("*", notFoundURLHandler);

app.use(errorHandler);

app.listen(port, "192.168.100.5", () => {
  console.log(`The express.js app is running on port ${port}`);
});
