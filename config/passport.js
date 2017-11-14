let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let UserMapper = require('../domain-layer/mappers/UserMapper');
let bcrypt = require('bcryptjs');
let MemoryStore = require('./memoryStore');

/**
 * Configure local strategy used by Passport.
 * Ensures that a user can only be logged in at most once.
 */
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    // passport parses credentials contained in the login request
    // THEN invokes the verify callback to find user whos credentials are given
    // IF credentials are valid, 'done' is invoked and user is passed to passport
    // ELSE false credentials lead to failure, invoke 'done' with false
    function(req, email, password, done, clearExistingSession) {
        UserMapper.find(email, function(err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, req.flash('error_msg', 'Unknown user, we cannot find via email'));
            }
            comparePassword(password, user.password, function(err, isMatch) {
                if (err) throw err;
                if (!isMatch) {
                    return done(null, false, req.flash('error_msg', 'Invalid password. try again'));
                } else {
                    // IF user requested to clear all existing sessions, if any
                    if (req.body.clearExistingSession && user.session_id) {
                        // destroy session from memory-store
                        destroyExistingSession(user);
                    }
                    // IF user.session_id != null THEN user logged in elsewhere, failure
                    if (user.session_id) {
                        return done(null, false, req.flash('error_msg', 'User already has an active session.'));
                    } else {
                        return done(null, user, req.flash('success_msg', 'Welcome back, young ' + user.firstname));
                    }
                }
            });
        });
    }));

/**
 * Store user into session.
 * Session maintained in memory-store, while cookie contains session_id.
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
        // update the user's session_id and store changes
        user.session_id = req.sessionID;
        UserMapper.updateLoginSession(user);
        done(err, user);
    });
});

/**
 * Password validation
 * @param  {String}   candidatePassword
 * @param  {String}   hash
 * @param  {Function} done
 */
comparePassword = function(candidatePassword, hash, done) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) throw err;
        return done(null, isMatch);
    });
};

/**
 * Clear existing user session from memory-store and from database
 * @param  {User} user
 */
destroyExistingSession = function(user) {
    // destroy session from memory-store
    MemoryStore.store.destroy(user.session_id, function(err) {
        if (err) throw err;
    });
    // clear user's session_id
    user.session_id = null;
    UserMapper.updateLoginSession(user.id, user.session_id);
};
