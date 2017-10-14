let express = require('express');
let router = express.Router();

// Registering all routes
router.use('/inventory/desktopView', require('./inventory/desktopRouter'));
router.use('/inventory/laptopView', require('./inventory/laptopRouter'));
router.use('/inventory/monitorView', require('./inventory/monitorRouter'));
router.use('/inventory/tabletView', require('./inventory/tabletRouter'));
router.use('/users', require('./users'));

router.get('/', function(req, res) {
    res.render('pages/index');
});

module.exports = router;
