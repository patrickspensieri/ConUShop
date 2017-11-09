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
            res.redirect('/');
        } else {
            Register.createNewUser(isAdmin, firstName, lastName, address, email, phone, password, function(err, user) {
                if (err) throw err;
            });
            res.redirect('/');
        }
    },

    /**
     * Logout given user from the session.
     * Clears the given user's session_id, allowing user to login.
     * @param  {[type]} user User sent from request
     */
    logoutSession: function(user) {
        UserMapper.find(user.email, function(err, user) {
            if (err) {
                throw err;
            }
            if (user.session_id) {
                user.session_id = null;
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
                if (user.isAdmin) {
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

    ensureLoggedIn: function(req, res, next) {
        res.locals.isAuthenticated = req.isAuthenticated();
        if (req.isAuthenticated()){
            UserMapper.find(req.user.email, function(err, user) {
                if (err) throw err;
                if (user.isAdmin) {
                    res.locals.isAdmin = true;
                } else {
                    res.locals.isAdmin = false;
                }
                res.locals.name = user.firstName + " " + user.lastName;
            });
        }
        return next();
    }
};
