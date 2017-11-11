let UserMapper = require('../../domain-layer/mappers/UserMapper');
let Register = require('../../domain-layer/classes/Register');

// QUESTION why do we have a Register object?

module.exports = {
    /**
     * Register a new user.
     * @param  {[type]} req request
     * @param  {[type]} res response
     */
    register: function(req, res) {
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let phone = req.body.phone;
        let address = req.body.address;
        let email = req.body.email;
        let password = req.body.password;
        let isadmin = false;

        // Validation
        req.checkBody('firstname', 'First Name is required').notEmpty();
        req.checkBody('lastname', 'Last Name is required').notEmpty();
        req.checkBody('phone', 'Phone Number is required').notEmpty();
        req.checkBody('address', 'Address is required').notEmpty();
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('password', 'Password is required').notEmpty();
        req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

        let errors = req.validationErrors();

        if (errors) {
            res.redirect('/');
        } else {
            Register.createNewUser(firstname, lastname, address, email, phone, password, isadmin, function(err, user) {
                if (err) throw err;
            });
            res.redirect('/');
        }
    },

    /**
     * Logout given user from the session.
     * Clears the given user's sessionid, allowing user to login.
     * @param  {[type]} user User sent from request
     */
    logoutSession: function(user) {
        UserMapper.find(user.email, function(err, user) {
            if (err) {
                throw err;
            }
            if (user.sessionid) {
                user.sessionid = null;
                UserMapper.updateLoginSession(user);
            }
        });
    },

    /**
     * Ensure user is an Adminstrator.
     * @param  {path} req request
     * @param  {path} res response
     * @param  {path} next callback function
     */
    ensureAdministrator: function(req, res, next) {
        if (req.isAuthenticated()) {
            UserMapper.find(req.user.email, function(err, user) {
                if (err) throw err;
                if (user.isadmin) {
                    return next();
                } else {
                    res.redirect('/');
                }
            });
        } else {
            res.redirect('/');
        }
    },

    /**
     * Ensure no user is currently authenticated.
     * @param  {[type]}   req  request
     * @param  {[type]}   res  response
     * @param  {Function} next callback
     * @return {[type]}
     */
    ensureLoggedOut: function(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/');
        }
    },

    /**
     * Ensures a user is logged in
     * @param  {[type]}   req  request
     * @param  {[type]}   res  response
     * @param  {Function} next callback
     * @return {[type]}
     */
    ensureLoggedIn: function(req, res, next) {
        res.locals.isAuthenticated = req.isAuthenticated();
        if (req.isAuthenticated()) {
            UserMapper.find(req.user.email, function(err, user) {
                if (err) throw err;
                if (user.isadmin) {
                    res.locals.isadmin = true;
                } else {
                    res.locals.isadmin = false;
                }
                res.locals.name = user.firstname + ' ' + user.lastname;
            });
        }
        return next();
    },
};
