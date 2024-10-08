const express = require("express");
require("express-async-errors");
const router=require("./src/routes");
const { notFoundURLHandler, errorHandler } = require("./src/middlewares/errors");

const app = express();
const port = 3000;
app.use(express.json());

app.use("/",router);

app.use("*",notFoundURLHandler);

app.use(errorHandler);


app.listen(port, () => {
  console.log(`The express.js app is running on port ${port}`);
});
