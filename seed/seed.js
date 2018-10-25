const mongoose = require('mongoose');
const { Article, Topic, Comment, User } = require('../models');
const { formatArticles, formatComments } = require('../utils');

// start with not returning the data

// const seedDB = ({ articleData, topicData, commentData, userData }) => {
//   return mongoose.connection.dropDatabase().then(() => {});
// };
const seedDB = ({ articleData, topicData, commentData, userData }) => {
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      return Promise.all([
        Topic.insertMany(topicData),
        User.insertMany(userData)
      ]);
    })
    .then(([topicDocs, userDocs]) => {
      const formattedArticles = formatArticles(articleData, userDocs);
      return Promise.all([
        Article.insertMany(formattedArticles),
        topicDocs,
        userDocs
      ]);
    })
    .then(([articleDocs, topicDocs, userDocs]) => {
      const formattedComments = formatComments(
        commentData,
        articleDocs,
        userDocs
      );
      return Comment.insertMany(formattedComments);
    });
};

module.exports = seedDB;
