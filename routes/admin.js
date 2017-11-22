let express = require('express');
let router = new express.Router();
let adminController = require('../controllers/adminController');

router.get('/dashboard', adminController.dashboard);

router.get('/desktops', adminController.desktop);
router.get('/laptops', adminController.laptop);
router.get('/monitors', adminController.monitor);
router.get('/tablets', adminController.tablet);
router.get('/items', adminController.inventory);
router.get('/clients', adminController.clients);

router.post('/deleteItemFromCatalog', adminController.deleteItemFromCatalog);
router.post('/addItemToCatalog', adminController.addItemToCatalog);

router.post('/addProdSpec', adminController.addProdSpec);
router.post('/deleteProdSpec', adminController.deleteProdSpec);
router.post('/updateProdSpec', adminController.updateProdSpec);
router.post('/startProductCatalogSession', adminController.startProductCatalogSession);
router.post('/endProductCatalogSession', adminController.endProductCatalogSession);
module.exports = router;
