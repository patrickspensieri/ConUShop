let express = require('express');
let router = new express.Router();
let passport = require('passport');
let accountController = require('../controllers/accountController');
require('../config/passport');

router.post('/login',
    accountController.ensureLoggedOut,
    passport.authenticate('local', {failureRedirect: '/'}),
    function(req, res) {
        // NOTE will auto redirect to '/' if user not admin
        res.redirect('/admin/dashboard');
    });

router.get('/logout',
    function(req, res) {
        if (req.user) {
            accountController.logoutSession(req.user);
            req.logout();
        }
        res.redirect('/');
});

router.get('/deleteAccount',
function(req, res) {
    if (req.user) {
        accountController.deleteAccount(req.user, req);
        req.logout();
    }
    res.redirect('/');
});

router.get('/', function(req, res) {
    res.render('pages/index',
        {error_message: req.flash('error_msg'),
        success_message: req.flash('success_msg')});
});

router.post('/register', accountController.register);

module.exports = router;
