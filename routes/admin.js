let express = require('express');
let router = new express.Router();
let adminController = require('../presentation-layer/controllers/adminController');

// Get Dashboard
router.get('/dashboard', adminController.adminDashboard);

// Get product views
router.get('/desktops', adminController.desktopView);
router.get('/laptops', adminController.laptopView);
router.get('/monitors', adminController.monitorView);
router.get('/tablets', adminController.tabletView);
router.get('/items', adminController.itemView);

// Item routes
router.post('/deleteItem', adminController.deleteItem);
router.post('/addItem', adminController.addItem);

// Product Spec routes
router.post('/addProdSpec', adminController.addProdSpec);
router.post('/deleteProdSpec', adminController.deleteProdSpec);
router.post('/updateProdSpec', adminController.updateProdSpec);

module.exports = router;
