let express = require('express');
let router = new express.Router();
let adminController = require('../presentation-layer/controllers/adminController');

router.get('/dashboard', adminController.dashboard);

router.get('/edit_view', adminController.edit_view);
router.get('/desktops', adminController.desktop);
router.get('/laptops', adminController.laptop);
router.get('/monitors', adminController.monitor);
router.get('/tablets', adminController.tablet);
router.get('/items', adminController.inventory);

router.post('/deleteItem', adminController.deleteItem);
router.post('/addItem', adminController.addItem);

router.post('/addProdSpec', adminController.addProdSpec);
router.post('/deleteProdSpec', adminController.deleteProdSpec);
router.post('/updateProdSpec', adminController.updateProdSpec);

module.exports = router;
