const express = require("express");
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
  .get(validateGetStudents, getStudents)
  .post(validatePostStudents, postStudents);

router
  .route("/:id")
  .get(validateGetParams, getStudentsById)
  .put(validatePutStudents, putStudents)
  .delete(validateGetParamsId, deleteStudents);

module.exports = router;
