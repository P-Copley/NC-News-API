const express = require('express');
const router = express.Router();
const articlesRouter = require('./articles');

router.use('/articles', articlesRouter);

module.exports = router;
