const Joi = require('joi');
const RouteValidator = require('../../middlewares/RouteValidator');

class StatementSchema extends RouteValidator {
  static get createUser() {
    const schema = {
      body: Joi.object().keys({
        name: Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string().required(),
      }),
    };

    return this.validate(schema);
  }

  static get update() {
    const schema = {
      params: Joi.object().keys({
        id: Joi.string().required(),
      }),
      body: Joi.object().keys({
        name: Joi.string(),
        username: Joi.string(),
        email: Joi.string(),
      }),
    };

    return this.validate(schema);
  }

  static get delete() {
    const schema = {
      params: Joi.object().keys({
        id: Joi.string().required(),
      }),
    };

    return this.validate(schema);
  }
}

module.exports = StatementSchema;
