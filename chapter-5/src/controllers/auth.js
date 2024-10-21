const authService = require("../services/auth");
const { successResponse } = require("../utils/response");
const { BadRequestError } = require("../utils/request");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  const data = await authService.createUser(req.body, req.files);
  successResponse(res, data);
};

exports.login = async (req, res, next) => {
  const data = await authService.loginUser(req.body);
  const match = await bcrypt.compare(req.body.password, data.password);
  if (match) {
    const payload = {
      user_id: data.id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "72h",
    });
    successResponse(res, token);
    return;
  }
  throw new BadRequestError("Email or password wrong");
};
