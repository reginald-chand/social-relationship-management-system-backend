import Joi from "joi";

export const connectionControllerValidator = Joi.object({
  _csrf: Joi.string().required(),

  userName: Joi.string().pattern(new RegExp("^[a-z]+$")).required(),

  userData: Joi.object().required(),
});
