let express = require('express');
let router = new express.Router();
let catalogController = require('../presentation-layer/controllers/catalogController');
let accountController = require('../presentation-layer/controllers/accountController');

// Get Dashboard
router.get('/adminDashboard', accountController.ensureAdministrator, catalogController.adminDashboard);

// Get product views
router.get('/desktopView', accountController.ensureAdministrator, catalogController.desktopView);
router.get('/laptopView', accountController.ensureAdministrator, catalogController.laptopView);
router.get('/monitorView', accountController.ensureAdministrator, catalogController.monitorView);
router.get('/tabletView', accountController.ensureAdministrator, catalogController.tabletView);
router.get('/itemsView', accountController.ensureAdministrator, catalogController.itemView);

// Item routes
router.post('/deleteItem', accountController.ensureAdministrator, catalogController.deleteItem);
router.post('/addItem', accountController.ensureAdministrator, catalogController.addItem);

// Product Spec routes
router.post('/addProdSpec', accountController.ensureAdministrator, catalogController.addProdSpec);
router.post('/deleteProdSpec', accountController.ensureAdministrator, catalogController.deleteProdSpec);
router.post('/updateProdSpec', accountController.ensureAdministrator, catalogController.updateProdSpec);

// Client routes
router.get('/ClientPage', catalogController.clientPage);
router.get('/ClientPage/Desktop', catalogController.clientDesktopView);
router.get('/ClientPage/Laptop', catalogController.clientLaptopView);
router.get('/ClientPage/Monitor', catalogController.clientMonitorView);
router.get('/ClientPage/Tablet', catalogController.clientTabletView);

module.exports = router;
