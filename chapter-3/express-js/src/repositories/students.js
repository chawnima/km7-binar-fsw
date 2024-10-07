const students = require("../../data.json");

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

  return searchedStudent;
};
