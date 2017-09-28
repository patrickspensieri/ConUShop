let express = require('express');
let router = new express.Router();
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let UserMapper = require('../domain-layer/mappers/userMapper');
let User = require('../domain-layer/classes/user');
let bcrypt = require('bcryptjs');

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
    let phoneNumber = req.body.phoneNumber;
    let address = req.body.address;
    let email = req.body.email;
    let password = req.body.password;
    let password2 = req.body.password2;

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
        // let newUser = new User({
        //     name: name,
        //     email: email,
        //     username: username,
        //     password: password,
        // });
        //
        let newUser = new User(firstName, lastName, address, email, phoneNumber);
        // save user into storage
        // User.createUser(newUser, function(err, user) {
        //     if (err) throw err;
        //     console.log(user);
        // });
        createUser(newUser, password, function(err, user) {
            if (err) throw err;
            console.log(user);
        });
        res.redirect('/users/login');
    }
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.getUserByUsername(username, function(err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, {message: 'Unknown User'});
            }

            User.comparePassword(password, user.password, function(err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
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

// TODO move into more appropriate place
/**
 * [createUser description]
 * @param  {[type]}   newUser  [description]
 * @param {string} plainPassword user's pasword in plain text
 * @param  {Function} callback [description]
 */
createUser = function(newUser, plainPassword, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(plainPassword, salt, function(err, hash) {
            newUser.password = hash;
            UserMapper.insert(newUser);
        });
    });
};

module.exports = router;
