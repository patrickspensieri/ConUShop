let express = require('express');
let router = new express.Router();
let catalogController = require('../presentation-layer/controllers/catalogController');

router.get('/ClientPage', catalogController.dashboard);
router.get('/ClientPage/Desktop', catalogController.desktop);
router.get('/ClientPage/Laptop', catalogController.laptop);
router.get('/ClientPage/Monitor', catalogController.monitor);
router.get('/ClientPage/Tablet', catalogController.tablet);

module.exports = router;
