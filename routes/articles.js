const express = require('express');
const router = express.Router();
const { sendAllArticles, sendArticleById } = require('../controllers/articles');

router.route('/').get(sendAllArticles);

// do this together
router.route('/:articleId').get(sendArticleById);

module.exports = router;
