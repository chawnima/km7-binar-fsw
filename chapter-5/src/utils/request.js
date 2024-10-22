class BadRequestError extends Error {
  constructor(errors) {
    super("Validation failed!");
    this.errors = errors;
    this.status = 400;
  }
}
class NotFoundError extends Error {
  constructor(message) {
    super(message ? message : "Data Not found!");
    this.status = 404;
  }
}
class UnauthorizedError extends Error {
  constructor(message) {
    super(message ? message : "Access Unauthorized!");
    this.status = 401;
  }
}
class Forbidden extends Error {
  constructor(message) {
    super(message ? message : "Access Unauthorized!");
    this.status = 403;
  }
}
module.exports = { BadRequestError, NotFoundError, UnauthorizedError, Forbidden };
