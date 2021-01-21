const UserModel = require('../models/UserModel');
const knex = require('../config/db');
const {notNullObjects} = require('../helpers/User');

class UserService {
  static create({ create }) {
    const insert = {
      ...create,
    };

    const id = UserModel.create(insert)

    return id;
  }

  static getAll() {
      return UserModel.getAll();
  }

  static update({ update, referenceId }) {
      const updating = {
        name: update.name,
        email: update.email,
        username: update.username,
        id: referenceId
      };

      const id = UserModel.update(notNullObjects(updating));

      return id;
  }

  static delete({ delet }) {
    const deleting = {
      id: delet.id
    };

    const id = UserModel.delete(deleting);

    return id;
  }

}

module.exports = UserService;
