const studentService = require("../services/students");
const { successResponse } = require("../utils/response");
const { NotFoundError } = require("../utils/request");

exports.getStudents = async (req, res, next) => {
  const data = await studentService.getStudents(
    req.query?.name,
    req.query?.nickName
  );
  successResponse(res, data);
};

exports.getStudentsById = (req, res, next) => {
  const data = studentService.getStudentsById(req.params.id);
  if (!data) {
    throw new NotFoundError(`Students not found`);
  }
  successResponse(res, data);
};

exports.postStudents = async (req, res, next) => {
  const data = await studentService.postStudents(req.body,req.files?.profile_picture);
  successResponse(res, data);
};

exports.putStudents = (req, res, next) => {
  const data = studentService.putStudents(req.params.id, req.body);
  if (!data) {
    throw new NotFoundError(`Students id not found`);
  }
  successResponse(res, data);
};

exports.deleteStudents = (req, res, next) => {
  const data = studentService.deleteStudents(req.params.id);
  if (!data) {
    throw new NotFoundError(`Students id not found`);
  }
  successResponse(res, data);
};
