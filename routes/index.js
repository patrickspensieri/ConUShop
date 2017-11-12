let express = require('express');
let router = new express.Router();
let accountController = require('../controllers/accountController');

// Registering all routes
router.use('/', accountController.checkLoggedIn);
router.use('/account', require('./account'));
router.use('/catalog', require('./catalog'));
router.use('/admin', accountController.ensureAdministrator, require('./admin'));
router.use('/client', accountController.ensureClient, require('./client'));

router.get('/',
    function(req, res) {
        res.render('pages/index',
            {error_message: req.flash('error_msg'),
            success_message: req.flash('success_msg')});
});

module.exports = router;
