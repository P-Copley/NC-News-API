const express = require('express');
const router = express.Router();
const { sendUserByName } = require('../controllers/users');

router.route('/:username').get(sendUserByName);

module.exports = router;
