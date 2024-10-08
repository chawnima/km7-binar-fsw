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
  deleteStudents
} = require("../controllers/students");

const router = express.Router();

router.get("/", validateGetStudents, getStudents);
router.get("/:id", validateGetParams, getStudentsById);
router.post("/", validatePostStudents, postStudents);
router.put("/:id",validatePutStudents, putStudents);
router.delete("/:id",validateGetParamsId, deleteStudents);

module.exports = router;
