const mongoose = require('mongoose');
const { DB_URL } = require('../config');
const seedDB = require('./seed');
const { articleData, topicData, commentData, userData } = require('./devData');

mongoose
  .connect(
    DB_URL,
    { useNewUrlParser: true }
  )
  .then(() => {
    return seedDB({ articleData, topicData, commentData, userData });
  })
  .then(() => {
    return mongoose.disconnect();
  });
