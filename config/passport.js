let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let UserMapper = require('../domain-layer/mappers/UserMapper');
let bcrypt = require('bcryptjs');

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
    function(req, email, password, done) {
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
                    // IF user.sessionID != null THEN user logged in elsewhere, failure
                    if (user.sessionID) {
                        return done(null, false, req.flash('error_msg', 'User already has an active session'));
                    } else {
                        // TODO temporary flash message to identify user, not shown for admin because may appear on logout
                        if (user.isAdmin) {
                            return done(null, user, req.flash());
                        }
                        return done(null, user, req.flash('success_msg', 'Welcome back, young ' + user.firstName));
                    }
                }
            });
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
