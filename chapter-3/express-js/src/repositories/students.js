const students = require("../../data.json");
const fs = require("fs");

exports.getStudents = (name, nickName) => {
  const nameQuery = name?.toLocaleLowerCase();
  const nickNameQuery = nickName?.toLocaleLowerCase();

  const searchedStudent = students.filter((student) => {
    const nameMatch = nameQuery
      ? student.name.toLocaleLowerCase().includes(nameQuery)
      : true;
    const nickNameMatch = nickNameQuery
      ? student.nickName.toLocaleLowerCase().includes(nickNameQuery)
      : true;

    return nameMatch && nickNameMatch;
  });
  if(!searchedStudent.length){
    return null;
  }
  return searchedStudent;
};

exports.getStudentsById = (id) => {
  const studentsById = students.find((student) => student.id == id);
  if(!studentsById){
    return null;
  }
  return studentsById;
};

exports.postStudents = (data) => {
  const maxId = students.reduce((max, student) => Math.max(max, student.id), 0);
  const newStudent = {
    id: maxId + 1,
    ...data,
  };
  students.push(newStudent);
  fs.writeFileSync("./data.json", JSON.stringify(students, null, 2), "utf-8");
  return newStudent;
};

exports.putStudents = (id, data) => {
  const studentIndex = students.findIndex((student) => student.id == id);
  if(studentIndex==-1){
    return null;
  }
  const newStudent = { id: Number(id), ...data };
  students[studentIndex] = newStudent;
  fs.writeFileSync("./data.json", JSON.stringify(students, null, 2), "utf-8");
  return newStudent;
};

exports.deleteStudents = (id) => {
  const studentIndex = students.findIndex((student) => student.id == Number(id));
  const deleteStudents = students[studentIndex];
  if(studentIndex == -1){
    return null;
  }
  students.splice(studentIndex,1);
  fs.writeFileSync("./data.json",JSON.stringify(students,null,2),"utf-8");
  return deleteStudents;
};
