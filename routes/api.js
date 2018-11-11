const express = require('express');
const router = express.Router();
const articlesRouter = require('./articles');
const topicsRouter = require('./topics');
const usersRouter = require('./users');

router.use('/articles', articlesRouter);
router.use('/topics', topicsRouter);
router.use('/users', usersRouter);

module.exports = router;
