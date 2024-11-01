const studentRepository = require("../repositories/students");
const { imageUpload } = require("../utils/image-kit");

exports.getStudents = async (name, nickName) => {
  return await name || nickName ? studentRepository.getStudents(name, nickName) : studentRepository.getAllStudents();
}

exports.getStudentsById = async (id) => {
  return await studentRepository.getStudentsById(id);
}

exports.postStudents= async (data,file)=>{
  if(file){
    data.profile_picture = await imageUpload(file);
  }
  return await studentRepository.postStudents(data);
}

exports.putStudents=async (id,data)=>{
  return await studentRepository.putStudents(id,data);
}

exports.deleteStudents= async (id)=>{
  return await studentRepository.deleteStudents(id);
}