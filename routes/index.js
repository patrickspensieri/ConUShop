let express = require('express');
let router = express.Router();

// Registering all routes
router.use('/account', require('./account'));
router.use('/catalog', require('./catalog'));

router.get('/', function(req, res) {
    res.render('pages/index');
});
// router.get('/TempClientPage', function(req, res) {
//     res.render('pages/TempClientPage');
// });
router.get('/itemsView', function(req, res) {
    res.render('catalogPages/itemsView');
});

// router.get('/dashboard', function(req, res) {
//    res.render('pages/adminDashboard');
// });
module.exports = router;
