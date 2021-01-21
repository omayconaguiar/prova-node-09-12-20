const env = require('./src/env');

const configDefault = {
  client: 'mysql2',
  connection: {
    host: env.DB_HOST || 'localhost',
    port: env.DB_PORT || '3306',
    user: env.DB_USERNAME || 'root',
    password: env.DB_PASSWORD || '12345',
    database: env.DB_DATABASE || 'helper',
    supportBigNumbers: true,
    bigNumberStrings: true,
    multipleStatements: true,
    dateStrings: true,
  },
  pool: {
    min: env.DB_POOL_MIN,
    max: env.DB_POOL_MAX,
  },
};

const configTest = {
  // debug: true,
  client: 'sqlite',
  connection: {
    filename: './test/database/db.test.sqlite',
  },
  pool: {
    min: 0,
    max: 10,
    idleTimeoutMillis: 500,
  },
  useNullAsDefault: true,
  migrations: {
    directory: './test/database/migrations',
  },
  seeds: {
    directory: './test/database/seeds',
  },
};

const test = configTest;
const development = configDefault;
const production = configDefault;

module.exports = {
  test,
  development,
  production,
};
