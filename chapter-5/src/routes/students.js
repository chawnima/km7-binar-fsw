const express = require("express");
const { authorization } = require("../middlewares/auth");
const {
  validateGetStudents,
  validateGetParams,
  validatePostStudents,
  validatePutStudents,
  validateGetParamsId,
} = require("../middlewares/students");
const {
  getStudents,
  getStudentsById,
  postStudents,
  putStudents,
  deleteStudents,
} = require("../controllers/students");

const router = express.Router();

router
  .route("/")
  .get(authorization(1, 2), validateGetStudents, getStudents)
  .post(authorization(1), validatePostStudents, postStudents);

router
  .route("/:id")
  .get(authorization(1, 2), validateGetParams, getStudentsById)
  .put(authorization(1), validatePutStudents, putStudents)
  .delete(authorization(1), validateGetParamsId, deleteStudents);

module.exports = router;
