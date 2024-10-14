const studentRepository = require("../repositories/students");
const { imageUpload } = require("../utils/image-kit");

exports.getStudents = async (name, nickName) => {
  return await studentRepository.getStudents(name, nickName);
}

exports.getStudentsById = (id) => {
  return studentRepository.getStudentsById(id);
}

exports.postStudents= async (data,file)=>{
  if(file){
    data.profile_picture = await imageUpload(file);
  }
  return await studentRepository.postStudents(data);
}

exports.putStudents=(id,data)=>{
  return studentRepository.putStudents(id,data);
}

exports.deleteStudents=(id)=>{
  return studentRepository.deleteStudents(id);
}