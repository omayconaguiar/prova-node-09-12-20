const knex = require('knex');
const env = require('../env');
const { Logger } = require('../helpers/Logger');
const knexfile = require('../../knexfile');

const db = knex(knexfile[env.NODE_ENV]);

db.on('query-error', (error, obj) => {
  const message = JSON.stringify({
    code: error.code,
    message: error.sqlMessage,
    sql: {
      string: obj.sql,
      bindings: obj.bindings,
    },
  });

  Logger.error(`query-error: ${message}`);
});

module.exports = db;
