let express = require('express');
let router = new express.Router();
let catalogController = require('../presentation-layer/controllers/catalogController');

// Get Dashboard
router.get('/dashboard', catalogController.adminDashboard);

// Get product views
router.get('/desktops', catalogController.desktopView);
router.get('/laptops', catalogController.laptopView);
router.get('/monitors', catalogController.monitorView);
router.get('/tablets', catalogController.tabletView);
router.get('/items', catalogController.itemView);

// Item routes
router.post('/deleteItem', catalogController.deleteItem);
router.post('/addItem', catalogController.addItem);

// Product Spec routes
router.post('/addProdSpec', catalogController.addProdSpec);
router.post('/deleteProdSpec', catalogController.deleteProdSpec);
router.post('/updateProdSpec', catalogController.updateProdSpec);

module.exports = router;
