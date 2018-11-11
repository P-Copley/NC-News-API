const { Article } = require('../models');
const { addCommentCount } = require('../utils');

exports.sendAllArticles = (req, res, next) => {
  Article.find()
    .lean()
    .then(articles => {
      const articlesWithComments = articles.map(addCommentCount);
      return Promise.all(articlesWithComments);
    })
    .then(articles => res.send({ articles }))
    .catch(next);
};

// do this one together
exports.sendArticleById = (req, res, next) => {
  const { articleId } = req.params;
  return Article.findById(articleId)
    .populate('created_by')
    .lean()
    .then(article => {
      if (!article)
        return Promise.reject({ status: 404, msg: 'article not found' });
      else {
        return addCommentCount(article);
      }
    })
    .then(article => res.send({ article }))
    .catch(next);
};

exports.sendArticlesByTopic = (req, res, next) => {
  const { belongs_to } = req.params;
  return Article.find({ belongs_to })
    .populate('created_by')
    .lean()
    .then(articles => {
      const articlesWithComments = articles.map(addCommentCount);
      return Promise.all(articlesWithComments);
    })
    .then(articles => res.send({ articles }))
    .catch(next);
};
