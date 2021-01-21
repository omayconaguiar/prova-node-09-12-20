const { LoggerThrow } = require('../helpers/Logger');
const UserService = require('../services/UserService');

class UserController {
  static async createUser(req, res) {
    const { body } = req.joi;

    const create = {
      name: body.name,
      username: body.username,
      email: body.email,
    };

    try {
      const id = await UserService.create({ create });
      res.json({
        id,
        success: true,
      });
    } catch (err) {
      LoggerThrow(res, err);
    }
  }

  static async getAll(req, res) {
    try {
      const allUser = await UserService.getAll();

      res.status(200).send(allUser);
    } catch (err) {
      LoggerThrow(res, err);
    }
  }

  static async update(req, res) {
    const { body } = req.joi;

    const update = {
      name: body.name || null,
      username: body.username || null,
      email: body.email || null,
    };

    const referenceId = req.params.id;

    try {
      const updated = await UserService.update({ update, referenceId });

      res.status(200).send({
        id: updated,
      });
    } catch (err) {
      LoggerThrow(res, err);
    }
  }

  static async delete(req, res) {
    const { params } = req.joi;

    const delet = {
      id: params.id,
    };

    try {
      const deleted = await UserService.delete({ delet });

      res.status(200).send({
        id: deleted,
        success: true,
      });
    } catch (err) {
      LoggerThrow(res, err);
    }
  }
}

module.exports = UserController;
