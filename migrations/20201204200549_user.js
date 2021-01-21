/**
 * @param {import('knex')} knex
 */
const up = (knex) => {
  return knex.schema.createTable('user', (table) => {
    table.increments('id');
    table.string('name');
    table.string('username').unique();
    table.string('email').unique();
    table.timestamp('create_at').defaultTo(knex.fn.now());
    table.timestamp('update_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param {import('knex')} knex
 */
const down = (knex) => {
  return knex.schema.dropTable('user', (table) => {
  });
};

module.exports = { up, down };
