const { Comment } = require('../models');

exports.formatArticles = (articles, userDocs) => {
  return articles.map(article => {
    const created_by = userDocs.find(
      user => user.username === article.created_by
    )._id;
    return {
      ...article,
      belongs_to: article.topic,
      created_by
    };
  });
};

exports.formatComments = (comments, articleDocs, userDocs) => {
  return comments.map(comment => {
    const belongs_to = articleDocs.find(
      article => article.title === comment.belongs_to
    )._id;
    const created_by = userDocs.find(
      user => user.username === comment.created_by
    );
    return {
      ...comment,
      belongs_to,
      created_by
    };
  });
};

exports.addCommentCount = article => {
  return Comment.find({ belongs_to: article._id })
    .countDocuments()
    .then(commentCount => {
      article.commentCount = commentCount;
      return article;
    });
};
