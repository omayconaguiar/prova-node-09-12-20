const knex = require('../config/db');
const { LoggerThrow } = require('../helpers/Logger');

class Auth {
  static autenticate(trusted = false, write = false) {
    return async (req, res, next) => {
      const authorization = (req.body && req.body.authorization)
        || (req.query && req.query.authorization)
        || req.headers.authorization;

      /* Deprecated */
      const apikey = (req.body && req.body.apikey) || (req.query && req.query.apiKey) || req.headers['api-key'];
      const token = authorization || apikey;
      if (!token) {
        res.status(403).json({ success: false, message: 'Chave de autenticação não informada.' });
        return;
      }

      try {
        const key = await knex.first('id', 'trusted', 'type')
          .from('api_key')
          .where({
            status: 'YES',
            token,
          });

        if (key) {
          req.apikey = {
            id: key.id,
            trusted: key.trusted === 'YES',
            type: key.type,
          };

          if (trusted && key.trusted === 'NO') {
            res.status(403).json({ success: false, message: 'Chave de autenticação inválida.' });
            return;
          }

          if (write && key.type !== 'WRITE') {
            res.status(403).json({ success: false, message: 'Chave de autenticação inválida.' });
            return;
          }

          next();
        } else {
          res.status(403).json({ success: false, message: 'Chave de autenticação inválida.' });
        }
      } catch (err) {
        LoggerThrow(res, '55151315', err);
      }
    };
  }
}

module.exports = Auth;
