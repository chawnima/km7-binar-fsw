const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

exports.createUser = async (data) => {
  const saltRounds=10
  data.password=await bcrypt.hash(data.password,saltRounds);

  const newUser=await prisma.users.create({
    data,
  })
  const serializedUser=JSONBigInt.stringify(newUser);
  return JSONBigInt.parse(serializedUser);
}

exports.getUserByEmail=async(data)=>{
  const getUser=await prisma.users.findFirst({
    where:{
      email:data.email
    }
  })
  const serializedUser=JSONBigInt.stringify(getUser);
  return JSONBigInt.parse(serializedUser);
}

exports.getUserById=async(data)=>{
  const getUser=await prisma.users.findFirst({
    where:{
      id:data,
    }
  })
  const serializedUser=JSONBigInt.stringify(getUser);
  return JSONBigInt.parse(serializedUser);
}