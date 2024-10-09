const studentRepository = require("../repositories/students");
const { imageUpload } = require("../utils/image-kit");

exports.getStudents = (name, nickName, Bachelor) => {
  return studentRepository.getStudents(name, nickName, Bachelor);
}

exports.getStudentsById = (id) => {
  return studentRepository.getStudentsById(id);
}

exports.postStudents= async (data,file)=>{
  if(file){
    data.profilePicture = await imageUpload(file);
  }
  return studentRepository.postStudents(data);
}

exports.putStudents=(id,data)=>{
  return studentRepository.putStudents(id,data);
}

exports.deleteStudents=(id)=>{
  return studentRepository.deleteStudents(id);
}