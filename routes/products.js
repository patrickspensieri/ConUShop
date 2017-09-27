// routes/products.js
// ROUTER FOR PRODUCTS

let express = require('express');
let router = new express.Router();
// require database adapter
let db = require('../db');

router.get('/television',db.getAllTelevisions);
router.get('/television/id:', db.getTelevision);
router.get('/monitor',db.getAllMonitors);
router.get('/monitor/id:', db.getMonitor);
router.get('/laptop',db.getAllLaptops);
router.get('/laptop/id:', db.getLaptop);
router.get('/television',db.getAllDesktops);
router.get('/television/id:', db.getDesktop);
router.get('/tablet',db.getAllTablets);
router.get('/tablet/id:', db.getTablet);

module.exports = router;
