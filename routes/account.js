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

router.post('/register', accountController.register);

module.exports = router;
