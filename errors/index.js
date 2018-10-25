exports.handle400s = (err, req, res, next) => {
  if (
    err.name === 'CastError' ||
    err.name === 'ValidationError' ||
    err.status === 400
  )
    res.status(400).send({ msg: err.msg || 'bad request' });
  else next(err);
};

exports.handle404s = (err, req, res, next) => {
  if (err.status === 404)
    res.status(404).send({ msg: err.msg || 'Page not found' });
};

exports.handle500s = (err, req, res, next) => {
  console.log('Unhandled Error:', err);
  res.status(500).send({ msg: 'Internal Server Error' });
};
