const knex = require('../config/db');

class UserModel {
  static create(data) {
    return knex.insert(data).into('user');
  }

  static getAll() {
    return knex
      .select('name', 'email', 'username')
      .table('user');
  }

  static update(data) {
    return knex
      .from('user')
      .update(data)
      .where('id', data.id);
  }

  static delete(data) {
    return knex
      .from('user')
      .where('id', data.id)
      .del();
  }
}

module.exports = UserModel;
