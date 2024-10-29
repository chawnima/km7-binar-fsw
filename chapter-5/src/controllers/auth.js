const authService = require("../services/auth");
const { successResponse } = require("../utils/response");
const { UnauthorizedError } = require("../utils/request");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  const data = await authService.createUser(req.body, req.files);
  successResponse(res, data);
};

exports.login = async (req, res, next) => {
  const data = await authService.getUserByEmail(req.body);
  if(!data){
    throw new UnauthorizedError("No email found");
  }
  const match = await bcrypt.compare(req.body.password, data.password);
  if (match) {
    const payload = {
      user_id: data.id,
    };
    const token = {
      token: jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "72h",
      }),
    };
    successResponse(res, token);
    return;
  }
  throw new UnauthorizedError("password wrong");
};

exports.profile = async (req, res, next) => {
  delete req.userData.password;
  successResponse(res, req.userData);
};
