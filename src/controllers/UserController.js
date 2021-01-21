const { LoggerThrow } = require('../helpers/Logger');
const UserService = require('../services/UserService');

class UserController {
  static async createUser(req, res) {
    const { body } = req.joi;

    const create = {
      name: body.name,
      username: body.username,
      email: body.email
    };

    try {
      let id = await UserService.create({ create });
      res.json({
        id: id,
        success: true,
      });
    } catch (err) {
        LoggerThrow(res, err);
    }
  }

  static async getAll(req, res) {
    try {
      let allUser = await UserService.getAll();

      return res.status(200).send(allUser);

    } catch (err) {
        LoggerThrow(res, err);
    }
  }

  static async update(req, res) {
    const { body } = req.joi;

    const update = {
      name: body.name || null,
      username: body.username || null,
      email: body.email || null
    };

    const referenceId = req.params.id;

    try {
      let updated = await UserService.update({ update, referenceId });

      return res.status(200).send({
        id: updated
      });
    } catch (err) {
        LoggerThrow(res, err);
    }
  }

  static async delete(req, res) {
    const { params } = req.joi;

    const delet = {
      id: params.id
    };

    try {
      let deleted = await UserService.delete({ delet });

      return res.status(200).send({
        id: deleted,
        success: true,
      });
    } catch (err) {
        LoggerThrow(res, err);
    }
  }
}

module.exports = UserController;
