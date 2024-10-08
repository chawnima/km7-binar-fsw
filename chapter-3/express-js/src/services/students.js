const studentRepository = require("../repositories/students");

exports.getStudents = (name, nickName, Bachelor) => {
  return studentRepository.getStudents(name, nickName, Bachelor);
}

exports.getStudentsById = (id) => {
  return studentRepository.getStudentsById(id);
}

exports.postStudents=(data)=>{
  return studentRepository.postStudents(data);
}

exports.putStudents=(id,data)=>{
  return studentRepository.putStudents(id,data);
}

exports.deleteStudents=(id)=>{
  return studentRepository.deleteStudents(id);
}