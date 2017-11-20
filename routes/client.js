let express = require('express');
let router = new express.Router();
let clientController = require('../controllers/clientController');

// Client routes
router.get('/shoppingCart', clientController.viewShoppingCart);
router.post('/addToShoppingCart', clientController.addToShoppingCart);
router.get('/deleteFromShoppingCart/:id', clientController.deleteFromShoppingCart);
router.get('/makePurchase', clientController.makePurchase);
router.get('/cancelPurchase', clientController.deleteAllFromShoppingCart);
router.get('/orders', clientController.viewOrders);
router.get('/order/details/:id', clientController.viewOrderDetails);
router.get('/item/return/:id', clientController.returnItem);
router.get('/account', clientController.viewAccount);
router.get('/deleteAccount', clientController.deleteAccount);


module.exports = router;
