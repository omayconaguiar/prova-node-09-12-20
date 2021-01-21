/**
 * @param {import('knex')} knex
 */
const up = (knex) => {
  return knex.schema.createTable('api_key', (table) => {
    table.increments('id');
    table.string('token').unique();
    table.string('label');
    table.string('status');
    table.string('type');
    table.string('trusted');
    table.timestamp('create_at').defaultTo(knex.fn.now());
    table.timestamp('update_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param {import('knex')} knex
 */
const down = (knex) => {
  return knex.schema.dropTable('api_key', (table) => {
  });
};

module.exports = { up, down };
