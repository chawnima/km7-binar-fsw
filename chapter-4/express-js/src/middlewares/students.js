const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetStudents = (req, res, next) => {
  const validateQuery = z.object({
    name: z.string().optional(),
    nickName: z.string().optional(),
  });
  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    throw new BadRequestError(resultValidateQuery.error.errors);
  }

  next();
};

exports.validateGetParams = (req, res, next) => {
  const validateParams = z.object({
    name: z.string().optional(),
    nickName: z.string().optional(),
  });
  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }
  next();
};

exports.validatePostStudents = (req, res, next) => {
  const validateBody = z.object({
    name: z.string(),
    nick_name: z.string(),
    class_id:z.string(),
    university_id:z.string(),
  });
  const validatePicture = z
    .object({
      profile_picture: z
        .object({
          data: z.any(),
          name: z.string(),
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

  const resultValidatePicture = validatePicture.safeParse(req.file);
  if (!resultValidatePicture.success) {
    throw new BadRequestError(resultValidatePicture.error.errors);
  }
  next();
};

exports.validatePutStudents = (req, res, next) => {
  const id = Number(req.params.id);
  const validateParams = z.number();
  const validateBody = z.object({
    name: z.string().optional().nullable(),
    nick_name: z.string().optional().nullable(),
    class_id:z.string().optional().nullable(),
    university_id:z.string().optional().nullable(),
  });
  const validatePicture = z
    .object({
      profile_picture: z
        .object({
          data: z.any(),
          name: z.string(),
        })
        .optional()
        .nullable(),
    })
    .optional()
    .nullable();

  const resultValidateParams = validateParams.safeParse(id);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }
  const resultValidatePicture = validatePicture.safeParse(req.file);
  if (!resultValidatePicture.success) {
    throw new BadRequestError(resultValidatePicture.error.errors);
  }
  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }
  next();
};

exports.validateGetParamsId = (req, res, next) => {
  const id = Number(req.params.id);
  const validateParams = z.number();
  const resultValidateParams = validateParams.safeParse(id);
  if (!resultValidateParams) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }
  next();
};
