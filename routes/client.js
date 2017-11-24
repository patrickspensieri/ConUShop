let express = require('express');
let router = new express.Router();
let clientController = require('../controllers/clientController');

// Client routes
router.get('/shoppingCart', clientController.viewShoppingCart);
router.post('/addToShoppingCart', clientController.addToShoppingCart);
router.get('/deleteFromShoppingCart/:id', clientController.deleteFromShoppingCart);
router.get('/makePurchase', clientController.makePurchase);
router.get('/cancelPurchase', clientController.cancelPurchase);
router.get('/checkout', clientController.checkout);
router.get('/orders', clientController.viewOrders);
router.get('/order/details/:id', clientController.viewOrderDetails);
router.get('/item/return/:id/:orderId', clientController.returnItem);
router.get('/item/startReturn/:id/:orderId', clientController.startReturn);
router.get('/item/cancelReturn/:orderId', clientController.cancelReturn);
router.get('/account', clientController.viewAccount);
router.get('/deleteAccount', clientController.deleteAccount);


module.exports = router;
