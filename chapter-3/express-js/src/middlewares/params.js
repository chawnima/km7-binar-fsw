const {z}=require("zod");
const {BadRequestError}=require("../utils/request");

exports.validateGetParams = (req, res, next) => {
  const validateParams = z.object({
    name: z.string().optional(),
    nickName: z.string().optional(),
  });
  const resultValidateQuery = validateQuery.safeParse(req.query);
  if(!resultValidateQuery.success){
    throw new BadRequestError(resultValidateQuery.error.errors);
  }

  next();
}
