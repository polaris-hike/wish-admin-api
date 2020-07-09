var express = require('express');
var router = express.Router();

const WishController = require('../controller/wish');
router.get('/', WishController.list);
router.get('/:id', WishController.info);
router.post('/', WishController.add);
router.put('/', WishController.update);
router.delete('/', WishController.remove);

module.exports = router;
