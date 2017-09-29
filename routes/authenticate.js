let express = require('express');
let router = new express.Router();

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res) {
    res.render('authenticate');
});

/**
 * Ensure that a user is authenticated.
 * @param  {[type]}   req
 * @param  {[type]}   res
 * @param  {Function} next
 * @return {[type]} 
 */
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/users/login');
    }
}

module.exports = router;
