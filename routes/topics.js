const express = require('express');
const router = express.Router();
const { sendArticlesByTopic } = require('../controllers/articles');
const { sendAllTopics } = require('../controllers/topics');

router.route('/').get(sendAllTopics);
router.route('/:belongs_to/articles').get(sendArticlesByTopic);

module.exports = router;
