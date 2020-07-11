var express = require('express');
var router = express.Router();

const IndexController = require('../controllers/index');
router.post('/login', IndexController.login);

module.exports = router;
