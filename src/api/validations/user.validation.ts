import Joi from '@hapi/joi';

export default class UserValidation {
  static createUser = {
    body: Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6).max(100),
      username: Joi.string().required().min(3).max(20),
    }),
  };

  static listUser = {
    query: Joi.object({
      page: Joi.number().min(1),
      limit: Joi.number().min(1),
    }),
  };
}
