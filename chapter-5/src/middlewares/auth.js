const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

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
