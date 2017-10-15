let express = require('express');
let router = new express.Router();
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let UserMapper = require('../domain-layer/mappers/UserMapper');
let register = require('../domain-layer/classes/Register');
let bcrypt = require('bcryptjs');

// configure local strategy
passport.use(new LocalStrategy(
    // login form contains email, not  username
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    // passport parses credentials contained in the login request
    // THEN invokes the verify callback to find user whos credentials are given
    // IF credentials are valid, 'done' is invoked and user is passed to passport
    // ELSE false credentials lead to failure, invoke 'done' with false
    function(email, password, done) {
        UserMapper.find(email, function(err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, {message: 'Unknown User, cannot find via email'});
            }
            comparePassword(password, user.password, function(err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid password'});
                }
            });
        });
    }));

// session maintained via cookie browser
// save user object into session, uses id by default
passport.serializeUser(function(user, done) {
    done(null, user.email);
});
// retrieve user object from cookie
passport.deserializeUser(function(email, done) {
    UserMapper.find(email, function(err, user) {
        done(err, user);
    });
});

// TODO move logic to controllers
// TODO protect routes


router.get('/TempClientPage', function(req, res) {
    req.logout();
    res.render('pages/TempClientPage');
});

router.get('/', function(req, res) {
    res.render('pages/index');
});

router.post('/login',
    passport.authenticate('local', {successRedirect: 'adminDashboard',
        failureRedirect: '/'}),
    function(req, res) {
        res.redirect('/');
    });

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.post('/logout',
    function(req, res) {
        res.redirect('/');
    });

// Get Dashboard
router.get('/adminDashboard', ensureAuthenticated, function(req, res) {
    res.render('pages/adminDashboard');
});


// Register User
router.post('/register', function(req, res) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let phone = req.body.phone;
    let address = req.body.address;
    let email = req.body.email;
    let password = req.body.password;
    let isAdmin = false;

    // Validation
    req.checkBody('firstName', 'First Name is required').notEmpty();
    req.checkBody('lastName', 'Last Name is required').notEmpty();
    req.checkBody('phone', 'Phone Number is required').notEmpty();
    req.checkBody('address', 'Address is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();

    if (errors) {
        /*res.redirect('/', {
            errors: errors
        })*/
        res.redirect('/');

        ;
    } else {
        register.createNewUser(isAdmin, firstName, lastName, address, email, phone, password, function(err, user) {
            if (err) throw err;
        });

        res.redirect('/');
    }
});

// TODO move function to more appropriate place
comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) {
            throw err;
        }
        console.log(isMatch);
        callback(null, isMatch);
    });
};

/**
 * Ensure the user is logged in and prevent him from accessing pages
 * @param  {path} req
 * @param  {path} res
 * @param  {path} next
 */
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        UserMapper.find(req.user.email, function(err, user) {
            if (err) {
                throw err;
            }

            if (user.isAdmin) {
                return next();
            } else {
                res.redirect('/account/TempClientPage');
            }
        });
    } else {
        res.redirect('/');
    }
}

module.exports = router;
