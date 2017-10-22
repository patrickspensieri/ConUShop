let express = require('express');
let router = new express.Router();
let passport = require('passport');
let accountController = require('../presentation-layer/controllers/accountController');
require('../config/passport');

router.get('/TempClientPage',
    function(req, res) {
        res.render('pages/TempClientPage');
});

router.post('/login',
    accountController.ensureLoggedOut,
    passport.authenticate('local'),
    function(req, res) {
        // NOTE will auto redirect to '/' if user not admin
        res.redirect('/account/adminDashboard');
    });

router.get('/logout',
    function(req, res) {
        if (req.user) {
            accountController.logoutSession(req.user);
            req.logout();
        }
        res.redirect('/');
});

router.get('/adminDashboard',
    accountController.ensureAdministrator, function(req, res) {
        res.render('pages/adminDashboard');
});


router.post('/register',
    function(req, res) {
        accountController.register(req, res);
});

module.exports = router;
