const { NotFoundError } = require("../utils/request");

exports.notFoundURLHandler = (req, res, next) => {
  throw new NotFoundError("URL Not Found");
}