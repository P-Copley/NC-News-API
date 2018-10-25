const { Article } = require('../models');

exports.sendAllArticles = (req, res, next) => {
  Article.find()
    .lean()
    .then(articles => res.send({ articles }))
    .catch(next);
};

exports.sendArticleById = (req, res, next) => {
  const { articleId } = req.params;
  return Article.findById(articleId)
    .then(article => res.send({ article }))
    .catch(next);
};
