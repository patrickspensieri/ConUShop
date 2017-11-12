let express = require('express');
let router = new express.Router();
let catalogController = require('../presentation-layer/controllers/catalogController');

// Client routes
router.get('/', catalogController.dashboard);
router.get('/desktops', catalogController.desktop);
router.get('/laptops', catalogController.laptop);
router.get('/monitors', catalogController.monitor);
router.get('/tablets', catalogController.tablet);

router.get('/shoppingCart', catalogController.viewShoppingCart);
router.post('/addToShoppingCart', catalogController.addToShoppingCart);
router.post('/deleteFromShoppingCart', catalogController.deleteFromShoppingCart);
router.get('/makePurchase', catalogController.makePurchase);

module.exports = router;
