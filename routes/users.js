let express = require('express');
let router = express.Router();
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let db = require('../db');

let user = require('../domain-layer/classes/user');
let User = require('../models/user');

// Get Dashboard
router.get('/dashboard', ensureAuthenticated, function(req, res) {
    res.render('dashboard');
});

// Register
router.get('/failPage', function(req, res) {
    res.render('failPage');
});

// Register
router.get('/register', function(req, res) {
    res.render('register');
});

// Login
router.get('/login', function(req, res) {
    res.render('login');
});

// dashboard
router.get('/dashboard', function(req, res) {
    res.render('dashboard');
});

// Register User
router.post('/register', function(req, res) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    let password2 = req.body.password2;
    let address = req.body.address;
    let phone = req.body.phone;

    // Validation
    req.checkBody('firstName', 'First Name is required').notEmpty();
    req.checkBody('lastName', 'Last Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    req.checkBody('address', 'Address is required').notEmpty();
    req.checkBody('phone', 'Phone is required.').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors,
        });
    } else {
        let tempAdmin = '0';
        let tempId = '0';

        db.query('SELECT * FROM users', [], (err, res) => {
            if (err) {
                return next(err);
            }

            tempId = res.rows.rowCount + 1;
        });

        let newUser = new user(tempId, tempAdmin, firstName, lastName, address, email, phone, password);

        User.createUser(newUser);
        res.redirect('/users/login');
    }
});

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    function(username, password, done) {
        User.getUserByEmail(username, function(err, data) {
            if (err) throw err;
            if (!data) {
                return done(null, false, {message: 'Unknown User'});
            }
            User.comparePassword(password, data.password,
                function(err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, data);
                } else {
                    return done(null, false, {message: 'Invalid password'});
                }
            });
        });
    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

router.post('/login',
    passport.authenticate('local', {successRedirect: 'dashboard',
        failureRedirect: 'failPage'}),
    function(req, res) {
        res.redirect('/');
    });


// FIX Logout goes to login screen
router.post('/logout',
    function(req, res) {
        res.redirect('/');
    });

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/users/login');
});

/**
 * Ensure the user is logged in and prevent him from accessing pages
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/users/login');
    }
}

module.exports = router;