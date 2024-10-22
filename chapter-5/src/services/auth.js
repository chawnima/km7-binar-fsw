const userRepositories = require("../repositories/users");
const jwt = require("jsonwebtoken");
const { imageUpload } = require("../utils/image-kit");

exports.createUser = async (data,file) => {
  if (file?.profile_picture){
    data.profile_picture = await imageUpload(file.profile_picture);
  }
  const user = await userRepositories.createUser(data);
  const payload = {
    user_id: user.id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET,{
    expiresIn:'72h',
  });
  delete user.password;
  return {
    user,
    token,
  };
};

exports.getUserByEmail = async(data)=>{
  return await userRepositories.getUserByEmail(data);
}