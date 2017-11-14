let UserMapper = require('../domain-layer/mappers/UserMapper');
require('../config/passport');

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
        let email = req.body.email.toLowerCase();
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
            // secure the password before storing
            securePassword(password, function(err, securePassword) {
                let newUser = UserMapper.create(firstname, lastname, address, email, phone, securePassword, isadmin);
                UserMapper.makeInsertion(newUser);
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
     * Gets user
     * @param  {[type]}   req  request
     * @param  {[type]}   res  response
     * @param  {Function} next callback
     * @return {[type]}
     */
    getUser: function(req, res, next) {
        res.locals.isAuthenticated = req.isAuthenticated();
        if (req.isAuthenticated()) {
            UserMapper.find(req.user.email, function(err, user) {
                if (err) throw err;
                if (user.isadmin) {
                    res.locals.isadmin = true;
                    res.locals.isclient = false;
                    req.adminUser = user;
                } else {
                    res.locals.isadmin = false;
                    res.locals.isclient = true;
                    req.clientUser = user;
                }
                res.locals.name = user.firstname + ' ' + user.lastname;
                req.guestUser = user;
            });
        } else {
            res.locals.isadmin = false;
            res.locals.isclient = false;
            req.guestUser = UserMapper.create();
        }
        return next();
    },

    /**
     * Ensure user is a Client.
     * @param  {path} req request
     * @param  {path} res response
     * @param  {path} next callback function
     * @return {callback}
     */
    ensureClient: function(req, res, next) {
        if (req.clientUser) {
            return next();
        } else {
            req.flash('error_msg', 'Please login with your client account in order to access this feature.');
            res.redirect('/');
        }
    },

    /**
     * Ensure user is an Adminstrator.
     * @param  {path} req request
     * @param  {path} res response
     * @param  {path} next callback function
     * @return {callback}
     */
    ensureAdministrator: function(req, res, next) {
        if (req.adminUser) {
            return next();
        } else {
            res.redirect('/');
        }
    },
};
