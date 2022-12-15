import * as Joi from 'joi';

export const validationSchema = Joi.object({
  DB_URI: Joi.string().required(),
  KAVENEGAR_API_KEY: Joi.string().required(),
  KAVENEGAR_TEMPLATE: Joi.string().required(),
});
