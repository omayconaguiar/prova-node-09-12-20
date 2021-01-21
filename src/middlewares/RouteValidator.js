const Joi = require('joi');
const { ValidationError } = require('../errors');

class RouteValidator {
  static validate(schema) {
    return this._validate.bind(schema); // eslint-disable-line
  }

  /* eslint no-underscore-dangle: 0 */
  static _validate(req, res, next) {
    const data = {};
    const schema = this;

    Object.keys(schema).map((k) => {
      data[k] = req[k];
      return k;
    });

    const options = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    const validation = Joi.validate(data, schema, options);

    if (validation.error) {
      return next(new ValidationError(validation.error.details));
    }

    req.joi = {
      body: validation.value.body || {},
      query: validation.value.query || {},
      params: validation.value.params || {},
      headers: validation.value.headers || {},
    };

    return next();
  }
}

module.exports = RouteValidator;
