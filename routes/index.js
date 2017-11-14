let express = require('express');
let router = new express.Router();
let accountController = require('../controllers/accountController');

router.use(function(req, res, next) {
    res.locals.error_message = req.flash('error_msg');
    res.locals.success_message = req.flash('success_msg');
    return next();
});

// Registering all routes
router.use('/', accountController.getUser);
router.use('/account', require('./account'));
router.use('/catalog', require('./catalog'));
router.use('/admin', accountController.ensureAdministrator, require('./admin'));
router.use('/client', accountController.ensureClient, require('./client'));

router.get('/',
    function(req, res) {
        res.render('pages/index');
});

module.exports = router;
