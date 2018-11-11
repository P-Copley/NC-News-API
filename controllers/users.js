const { User } = require('../models');

exports.sendUserByName = (req, res, next) => {
  const { username } = req.params;
  User.findOne({ username })
    .then(user => res.send({ user }))
    .catch(next);
};
