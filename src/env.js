require('dotenv').config();

// @ts-ignore
const { name, version } = require('../package.json');

const env = {
  NODE_ENV: process.env.NODE_ENV || 'localhost',
  SERVICEPORT: parseInt(process.env.SERVICEPORT || '3000', 10),
  ROUTE: process.env.ROUTE || '/',
  NAME: name,
  VERSION: version,
  // Database
  DB_SSL: process.env.DB_SSL,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || 3306,
  DB_POOL_MIN: parseInt(process.env.DB_POOL_MIN || '1', 10),
  DB_POOL_MAX: parseInt(process.env.DB_POOL_MAX || '2', 10),
  DB_DATABASE: process.env.DB_DATABASE || 'helper',
  DB_USERNAME: process.env.DB_USERNAME || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '12345',
};

module.exports = env;
