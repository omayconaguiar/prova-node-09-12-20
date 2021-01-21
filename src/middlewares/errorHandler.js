const {
  CodedError,
  NotFoundError,
  ResourceNotFoundError,
  ValidationError,
} = require('../errors');

/**
 * @typedef ErrorConfig
 * @type {Object}
 * @property {typeof CodedError} class
 * @property {String} i18n
 */

/**
 * @type {ErrorConfig[]}
 */
const errorsConfigs = [
  { class: NotFoundError, i18n: 'Page not found' },
  { class: ResourceNotFoundError, i18n: 'Recurso não encontrado' },
  { class: ValidationError, i18n: 'Dados inválidos' },
];

/**
 * @param {Error} error
 */
const getErrorConfig = (error) => errorsConfigs
  .find((errorConfig) => error instanceof errorConfig.class);

/**
 * @param {import('express').Request} req
 * @param {CodedError} error
 */
const loadErrorMessage = (req, error) => {
  const errorConfig = getErrorConfig(error);
  if (errorConfig) {
    error.setMessage(errorConfig.i18n);
  }
};

/**
 * @param {*} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const errorHandler = (err, req, res, next) => {
  if (err instanceof CodedError) {
    loadErrorMessage(req, err);
  }

  if (err instanceof ValidationError) {
    res.status(400).send(err);
    return next();
  }

  if (err instanceof NotFoundError || err instanceof ResourceNotFoundError) {
    res.status(404).send(err);
    return next();
  }

  if (err.code && err.code === 'ER_DUP_ENTRY') {
    res.status(409).send({
      code: 'DUPLICATED_RESOURCE',
      message: 'Já existe um recurso cadastrado com as chaves únicas fornecidas',
    });
    return next();
  }

  res.status(500).send({
    code: 'UNEXPECTED_ERROR',
    message: 'Falha interna do servidor',
  });

  return next();
};

module.exports = errorHandler;
