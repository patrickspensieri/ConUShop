let express = require('express');
let router = express.Router();

// Registering all routes
router.use('/inventory/desktopView', require('./inventory/desktopRouter'));
router.use('/inventory/laptopView', require('./inventory/laptopRouter'));
router.use('/inventory/monitorView', require('./inventory/monitorRouter'));
router.use('/inventory/tabletView', require('./inventory/tabletRouter'));
router.use('/inventory/televisionView', require('./inventory/televisionRouter'));
router.use('/account', require('./account'));
router.use('/catalog', require('./catalog'));

router.get('/', function(req, res) {
    res.render('pages/index');
});

module.exports = router;
