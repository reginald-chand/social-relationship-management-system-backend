import Joi from "joi";

export const connectionControllerValidator = Joi.object({
  csrfToken: Joi.string().required(),

  userName: Joi.string().pattern(new RegExp("^[a-z]+$")).required(),

  userData: Joi.object().required(),
});
