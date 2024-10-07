const studentRepository = require("../repositories/students");

exports.getStudents = (name, nickName, Bachelor) => {
  return studentRepository.getStudents(name, nickName, Bachelor);
}