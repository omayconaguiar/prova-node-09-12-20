const LoggerCreator = require('@somosphi/logger');
const env = require('../env');

const {
  Logger,
  AxiosLogger,
  ExpressLogger,
  Redact,
} = LoggerCreator.init({
  PROJECT_NAME: env.NAME,
  OMIT_ROUTES: [
    '/',
    '/status',
    '/info',
    '/favicon.ico',
  ],
});

const LoggerThrow = (res, code, arg) => {
  Logger.error(arg);
  res.status(500).send({ success: false, code, message: 'Falha interna do servidor' });
};

module.exports = {
  Logger,
  AxiosLogger,
  ExpressLogger,
  Redact,
  LoggerThrow,
};
