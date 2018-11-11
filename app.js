const app = require('express')();
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api.js');
const mongoose = require('mongoose');
const { DB_URL } =
  process.env.NODE_ENV === 'production' ? process.env : require('./config');
const { handle400s, handle404s, handle500s } = require('./errors');

mongoose
  .connect(
    DB_URL,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log(`connected to ${DB_URL}`);
  });

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.sendfile(`${__dirname}/views/index.html`);
});

app.use('/api', apiRouter);

app.all('/*', (req, res, next) => {
  next({ status: 404, msg: 'Resource not found' });
});

app.use(handle400s);
app.use(handle404s);
app.use(handle500s);

module.exports = app;
