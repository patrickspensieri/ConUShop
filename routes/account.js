let express = require('express');
let router = new express.Router();
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let UserMapper = require('../domain-layer/mappers/UserMapper');
let register = require('../domain-layer/classes/Register');
let bcrypt = require('bcryptjs');


// TODO move logic to controllers
// TODO protect routes in groups
// TODO send client flash messages


/**
 * Configure local strategy used by Passport.
 * Ensures that a user can only be logged in at most once.
 */
passport.use(new LocalStrategy(
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
                if (!isMatch) {
                    return done(null, false, {message: 'Invalid password'});
                }
            });
            // IF user.sessionID != null THEN user logged in elsewhere, failure
            if (user.sessionID) {
                return done(null, false, {message: 'User already logged in on another device'});
            } else {
                return done(null, user);
            }
        });
    }));

/**
 * Store user into session.
 * Session maintained in memory-store, while cookie contains sessionID.
 */
passport.serializeUser(function(user, done) {
    done(null, user.email);
});

/**
 * Retrieve user object from session.
 * Invoked every time a non-static asset is requested.
 */
passport.deserializeUser(function(req, email, done) {
    UserMapper.find(email, function(err, user) {
        console.log('deserializeUser : ' + user.id + '\n\treq.sessionID : ' + req.sessionID);
        // update the user's sessionID and store changes
        user.sessionID = req.sessionID;
        UserMapper.updateLoginSession(user);
        done(err, user);
    });
});

router.get('/TempClientPage', function(req, res) {
    // QUESTION why req.logout() ?
    req.logout();
    res.render('pages/TempClientPage');
});

router.get('/', function(req, res) {
    res.render('pages/index');
});

// user.sessionID updated in deserializeUser
router.post('/login',
    passport.authenticate('local', {failureRedirect: '/'}),
    function(req, res) {
        console.log('from login : ' + req.sessionID);
        res.render('pages/adminDashboard');
    });

router.get('/logout', function(req, res) {
    UserMapper.find(req.user.email, function(err, user) {
        if (err) {
            throw err;
        }
        if (user.sessionID) {
            user.sessionID = null;
            UserMapper.updateLoginSession(user);
        }
    });
    req.logout();
    res.redirect('/');
});

// QUESTION why a post endpoint for handling logout, and req.logout() also missing?
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
        /* res.redirect('/', {
            errors: errors
        })*/
        res.redirect('/');
        // removed a ; from here
    } else {
        register.createNewUser(isAdmin, firstName, lastName, address, email, phone, password, function(err, user) {
            if (err) throw err;
        });
        res.redirect('/');
    }
});

/**
 * Password validation
 * @param  {String}   candidatePassword
 * @param  {String}   hash
 * @param  {Function} callback
 */
comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) {
            throw err;
        }
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
        console.log('req.user.email from ensureAuthenticated : ' + req.user.email);
        console.log('req.sessionID from ensureAuthenticated : ' + req.session.id);
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
