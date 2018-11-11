const mongoose = require('mongoose');
const { Article, Topic, Comment, User } = require('../models');
const { formatArticles, formatComments } = require('../utils');

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
      return Promise.all([
        articleDocs,
        topicDocs,
        Comment.insertMany(formattedComments),
        userDocs
      ]);
    });
};

module.exports = seedDB;
