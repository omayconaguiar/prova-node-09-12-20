const debug = require('debug')('app');

const app = require('./app');
const env = require('./env');

const { Logger } = require('./helpers/Logger');

setImmediate(async () => {
  const server = app.listen(env.SERVICEPORT, () => {
    debug(`Server started on port ${env.SERVICEPORT}`);
    Logger.info('Server and Broker started');
  });

  function exit() {
    server.close(async () => {
      process.exit(0);
    });
  }

  /* process handler */
  process.stdin.resume();
  process.on('SIGINT', exit);
  process.on('SIGTERM', exit);
});
