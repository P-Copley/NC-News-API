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

// exports.sendArticleById = (req, res, next) => {
//   const { articleId } = req.params;
//   return Promise.all([
//     Article.findById(articleId).populate('created_by'),
//     Comment.find({ belongs_to: articleId })
//   ])
//     .then(([article, comments]) => {
//       if (!article) next({ status: 404, msg: 'article not found' });
//       else res.send({ article, commentCount: comments.length });
//     })
//     .catch(next);
// };
