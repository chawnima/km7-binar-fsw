const students = require("../../data.json");
const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require('json-bigint');

const prisma = new PrismaClient();

exports.getStudents = async (name, nickName) => {
  const searchedStudent = await prisma.students.findMany({
    where: {
      OR: [
        {
          name: { contains: name, mode: "insensitive" },
        },
        { nick_name: { contains: nickName, mode: "insensitive" } },
      ],
    },
    include:{
      classes:true,
      universities:true,
    }
  });
  if (!searchedStudent.length) {
    return null;
  }
  const serializedStudent= JSONBigInt.stringify(searchedStudent);
  return JSONBigInt.parse(serializedStudent);
};

exports.getStudentsById = (id) => {
  const studentsById = students.find((student) => student.id == id);
  if (!studentsById) {
    return null;
  }
  return studentsById;
};

exports.postStudents = async (data) => {
  const newStudent = await prisma.students.createManyAndReturn({
    data: [
      {...data}
    ],
  })
  const serializedStudent= JSONBigInt.stringify(newStudent);
  return JSONBigInt.parse(serializedStudent);

  students.push(newStudent);
  fs.writeFileSync("./data.json", JSON.stringify(students, null, 2), "utf-8");
  return newStudent;
};

exports.putStudents = (id, data) => {
  const studentIndex = students.findIndex((student) => student.id == id);
  if (studentIndex == -1) {
    return null;
  }
  const newStudent = { id: Number(id), ...data };
  students[studentIndex] = newStudent;
  fs.writeFileSync("./data.json", JSON.stringify(students, null, 2), "utf-8");
  return newStudent;
};

exports.deleteStudents = (id) => {
  const studentIndex = students.findIndex(
    (student) => student.id == Number(id)
  );
  const deleteStudents = students[studentIndex];
  if (studentIndex == -1) {
    return null;
  }
  students.splice(studentIndex, 1);
  fs.writeFileSync("./data.json", JSON.stringify(students, null, 2), "utf-8");
  return deleteStudents;
};
