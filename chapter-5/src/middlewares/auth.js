const { z } = require("zod");
const {
  BadRequestError,
  Forbidden,
  UnauthorizedError,
} = require("../utils/request");
const usersRepositories = require("../repositories/users");
const jwt = require("jsonwebtoken");

exports.validateRegister = (req, res, next) => {
  const validateBody = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  });
  const validateFile = z
    .object({
      profile_picture: z
        .object({
          name: z.string(),
          data: z.any(),
        })
        .optional()
        .nullable(),
    })
    .optional()
    .nullable();

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }
  const resultValidateFile = validateFile.safeParse(req.file);
  if (!resultValidateFile.success) {
    throw new BadRequestError(resultValidateFile.error.errors);
  }
  next();
};

exports.validateLogin = (req, res, next) => {
  const validateBody = z.object({
    email: z.string(),
    password: z.string(),
  });
  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }
  next();
};

exports.authorization =
  (...roles) =>
  async (req, res, next) => {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
      throw new UnauthorizedError("Token is not found");
    }
    const splitToken = authorizationHeader.split(" ");
    const token = splitToken[1];
    if (authorizationHeader.length <= 1) {
      throw new UnauthorizedError("You need to login first");
    }
    const extractedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = await usersRepositories.getUserById(
      extractedToken.user_id
    );
    const validateAuthorization = roles.includes(req.userData.role_id);
    if (!validateAuthorization) {
      throw new Forbidden("You don't have permission to access this data");
    }
    next();
  };
