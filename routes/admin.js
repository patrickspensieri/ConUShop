let express = require('express');
let router = new express.Router();
let adminController = require('../presentation-layer/controllers/adminController');
let accountController = require('../presentation-layer/controllers/accountController');


router.get('/dashboard', accountController.ensureAdministrator, adminController.dashboard);
router.get('/desktop', accountController.ensureAdministrator, adminController.desktop);
router.get('/laptop', accountController.ensureAdministrator, adminController.laptop);
router.get('/monitor', accountController.ensureAdministrator, adminController.monitor);
router.get('/tablet', accountController.ensureAdministrator, adminController.tablet);
router.get('/inventory', accountController.ensureAdministrator, adminController.inventory);

router.post('/deleteItem', accountController.ensureAdministrator, adminController.deleteItem);
router.post('/addItem', accountController.ensureAdministrator, adminController.addItem);

router.post('/addProdSpec', accountController.ensureAdministrator, adminController.addProdSpec);
router.post('/deleteProdSpec', accountController.ensureAdministrator, adminController.deleteProdSpec);
router.post('/updateProdSpec', accountController.ensureAdministrator, adminController.updateProdSpec);

module.exports = router;
