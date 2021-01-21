const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const env = require('./env');
const errorHandler = require('./middlewares/errorHandler');
const { ExpressLogger } = require('./helpers/Logger');

/* Routes */
const userRoutes = require('./routes/user');

const app = express();
app.use(helmet());
app.use(
  bodyParser.json({
    limit: env.BODY_LIMIT,
  }),
);

/* Request/Response Logger */
app.use(ExpressLogger.onSuccess.bind(ExpressLogger));
app.use(ExpressLogger.onError.bind(ExpressLogger));

const router = express.Router();

app.get('/status', (req, res) => {
  res.send('ok');
});

router.get('/', (req, res) => {
  res.send('ok');
});

router.use('/user', userRoutes); // Extráto Bancário

app.use(env.ROUTE, router);

/* Log errors */
app.all('*', (req, res) => {
  res.status(404).send({ success: false, code: '404' });
});

app.use(errorHandler);

module.exports = app;
