let express = require('express');
let router = express.Router();

// Registering all routes
router.use('/account', require('./account'));
router.use('/catalog', require('./catalog'));

router.get('/', function(req, res) {
    res.render('pages/index');
});

module.exports = router;
