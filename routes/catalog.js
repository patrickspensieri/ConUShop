let express = require('express');
let router = new express.Router();
let catalogController = require('../presentation-layer/controllers/catalogController');

// Client routes
router.get('/ClientPage', catalogController.clientPage);
router.get('/ClientPage/Desktop', catalogController.clientDesktopView);
router.get('/ClientPage/Laptop', catalogController.clientLaptopView);
router.get('/ClientPage/Monitor', catalogController.clientMonitorView);
router.get('/ClientPage/Tablet', catalogController.clientTabletView);

module.exports = router;
