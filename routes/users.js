let express = require('express');
let router = new express.Router();
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let UserMapper = require('../domain-layer/mappers/userMapper');
let User = require('../domain-layer/classes/user');
let bcrypt = require('bcryptjs');
let db = require('../db/index');

// TODO move logic to controllers
// TODO protect routes

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
    res.render('dashboard', {
        firstName: req.user.firstName,
    });
});

// Register User
router.post('/register', function(req, res) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let phoneNumber = req.body.phoneNumber;
    let address = req.body.address;
    let email = req.body.email;
    let password = req.body.password;

    // Validation
    req.checkBody('firstName', 'First Name is required').notEmpty();
    req.checkBody('lastName', 'Last Name is required').notEmpty();
    req.checkBody('phoneNumber', 'Phone Number is required').notEmpty();
    req.checkBody('address', 'Address is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors,
        });
    } else {
        let newUser = new User(firstName, lastName, address, email, phoneNumber);
        createUser(newUser, password, function(err, user) {
            if (err) throw err;
        });
        res.redirect('/users/login');
    }
});

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
            user = getUserByEmail(email, function(err, user) {
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
    done(null, user.id);
});
// retrieve user object from cookie
passport.deserializeUser(function(id, done) {
    getUserById(id, function(err, user) {
        done(err, user);
    });
});

router.post('/login',
    passport.authenticate('local', {successRedirect: '/users/dashboard', failureRedirect: '/users/login'}),
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

// TODO make use of domain-layer code once find is fixed
createUser = function(newUser, plainPassword, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(plainPassword, salt, function(err, hash) {
            newUser.password = hash;
            UserMapper.insert(newUser);
        });
    });
};

// TODO make use of domain-layer code once find is fixed
// TODO check if database email column is set to unique
getUserByEmail = function(email, callback) {
    db.query('SELECT * FROM users WHERE "email" = $1', [email], (err, res) => {
        if (err) {
            console.log(err.message);
        }
        if (typeof(res.rows[0]) == 'undefined') {
            callback(err, null);
        } else {
            callback(err, new User(res.rows[0].firstName, res.rows[0].lastName, res.rows[0].address,
             res.rows[0].email, res.rows[0].phone, res.rows[0].id, res.rows[0].password));
         }
    });
};

// TODO make use of domain-layer code once find is fixed
getUserById = function(id, callback) {
    db.query('SELECT * FROM users WHERE "id" = $1', [id], (err, res) => {
        if (err) {
            console.log(err.message);
        }
        let row = res.rows[0];
        callback(err, new User(row.firstName, row.lastName, row.address, row.email, row.phone, row.id, row.password));
    });
};

// TODO move function to more appropriate place
comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) {
            throw err;
        }
        callback(null, isMatch);
    });
};
module.exports = router;
