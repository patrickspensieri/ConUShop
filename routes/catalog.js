let express = require('express');
let router = new express.Router();
let catalogController = require('../presentation-layer/controllers/catalogController');

// Client routes
router.get('/', catalogController.clientPage);
router.get('/desktops', catalogController.clientDesktopView);
router.get('/laptops', catalogController.clientLaptopView);
router.get('/monitors', catalogController.clientMonitorView);
router.get('/tablets', catalogController.clientTabletView);
router.post('/addToShoppingCart', catalogController.addToShoppingCart);

module.exports = router;
