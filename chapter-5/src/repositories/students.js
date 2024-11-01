const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getAllStudents = async ()=>{
  const searchedStudent = await prisma.students.findMany({include:{classes:true,universities:true}})
  const serializedStudent = JSONBigInt.stringify(searchedStudent);
  return JSONBigInt.parse(serializedStudent);
}
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
    include: {
      classes: true,
      universities: true,
    },
  });
  if (!searchedStudent.length) {
    return null;
  }
  const serializedStudent = JSONBigInt.stringify(searchedStudent);
  return JSONBigInt.parse(serializedStudent);
};

exports.getStudentsById = async (id) => {
  const studentsById = await prisma.students.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      classes: true,
      universities: true,
    },
  });
  if (!studentsById) {
    return null;
  }

  const serializedStudent = JSONBigInt.stringify(studentsById)
  return JSONBigInt.parse(serializedStudent);
};

exports.postStudents = async (data) => {
  const newStudent = await prisma.students.createManyAndReturn({
    data: [{ ...data }],
    include: {
      classes: true,
      universities: true,
    },
  });
  const serializedStudent = JSONBigInt.stringify(newStudent);
  return JSONBigInt.parse(serializedStudent);
};

exports.putStudents = async (id, data) => {
  const updateStudent = await prisma.students.update({
    where: {
      id: Number(id),
    },
    data,
    include: {
      classes: true,
      universities: true,
    },
  });
  const serializedStudent = JSONBigInt.stringify(updateStudent);
  return JSONBigInt.parse(serializedStudent);
};

exports.deleteStudents = async (id) => {
  const deleteStudents = await prisma.students.delete({
    where: {
      id: Number(id),
    },
    include: {
      classes: true,
      universities: true,
    },
  });
  const serializedStudent = JSONBigInt.stringify(deleteStudents);
  return JSONBigInt.parse(serializedStudent);
};
