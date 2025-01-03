const express = require("express");
require("express-async-errors");
require("dotenv").config();
const router = require("./src/routes");
const {
  notFoundURLHandler,
  errorHandler,
} = require("./src/middlewares/errors");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(cors());

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

app.use("/", router);

app.use("*", notFoundURLHandler);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`The express.js app is running on port ${port}`);
});
