let User = require('../../domain-layer/classes/User');
let UserTDG = require('../../data-source-layer/TDG/UserTDG');
let AbstractMapper = require('./AbstractMapper');
let Admin = require('../../domain-layer/classes/Admin');
let Client = require('../../domain-layer/classes/Client');

/**
 * User object mapper
 * @class UserMapper
 * @export
 */
class UserMapper extends AbstractMapper {
    /**
     * Map creates an user
     * @param {string} firstname 
     * @param {string} lastname 
     * @param {string} address 
     * @param {string} email 
     * @param {string} phone 
     * @param {string} password 
     * @param {boolean} isadmin 
     * @param {string} sessionid 
     * @param {string} id 
     * @return {Object} new user
     */
    static create(firstname, lastname, address, email, phone, password, isadmin, sessionid, id) {
        let user = null;
        if (isadmin) {
            user = new Admin(firstname, lastname, address, email, phone, password, isadmin, sessionid, id);
        } else {
            if (firstname && lastname && address && email && phone && password) {
                user = new Client(firstname, lastname, address, email, phone, password, isadmin, sessionid, id);
            } else {
                user = new User();
            }
        }
        return user;
    }

  /**
   * Maps the returned value to an object of type user.
   * @static
   * @param {string} email of user to be found.
   * @param {function} callback function that holds User object.
   * @return {function} callback object
   */
    static find(email, callback) {
        let user = idMap.get('User', email);
        if (user != null) {
            return callback(null, user);
        } else {
            UserTDG.find(email, function(err, result) {
                if (err) {
                    console.log('Error during user find query', null);
                } else {
                    let value = result[0];
                    if (result.length==0) {
                        return callback(err, null);
                    } else {
                        if (value.isadmin) {
                            let user = new Admin(value.firstname, value.lastname,
                                value.address, value.email, value.phone, value.password, value.isadmin, value.sessionid, value.id);
                            idMap.add(user, user.email);
                            return callback(null, user);
                        } else {
                            let user = new Client(value.firstname, value.lastname,
                                value.address, value.email, value.phone, value.password, value.isadmin, value.sessionid, value.id);
                            idMap.add(user, user.email);
                            return callback(null, user);
                        }
                    }
                }
            });
        }
    }

  /**
   * Maps all returned values into objects of type user.
   * @static
   * @param {function} callback function that holds array of User object.
   */
    static findAll(callback) {
        UserTDG.findAll(function(err, result) {
            let users = [];
            if (err) {
                console.log('Error during user findAll query', null);
            } else {
                for (let value of result) {
                    let user = new User(value.isadmin, value.firstname,
                        value.lastname, value.address, value.email, value.phone, value.password, value.sessionid, value.id);
                    users.push(user);
                    if (idMap.get('User', user.email) == null) {
                        idMap.add(user, user.email);
                    }
                }
                return callback(null, users);
            }
        });
    }

  /**
   * Maps an objects attributes to seperate values for TDG insert method.
   * @static
   * @param {Object} userObject an object of type user.
   */
    static insert(userObject) {
        UserTDG.insert(userObject.isadmin, userObject.firstname,
            userObject.lastname, userObject.address, userObject.email, userObject.phone, userObject.password, function(err, result) {
                if (!err) {
                    idMap.add(userObject, userObject.email);
                }
            });
    }

  /**
   * Maps an objects attributes to seperate values for TDG update method.
   * @static
   * @param {Object} userObject an object of type user.
   */
    static update(userObject) {
        UserTDG.update(userObject.isadmin, userObject.firstname,
            userObject.lastname, userObject.address, userObject.email, userObject.phone, function(err, result) {
                if (!err) {
                    idMap.update(userObject, userObject.email);
                }
            });
    }

    /**
     * Maps object attributes responsible for login session to separate values for the TDG updateLoginSession method.
     * @param {Object} userObject an object of type user.
     */
    static updateLoginSession(userObject) {
        UserTDG.updateLoginSession(userObject.id, userObject.session_id);
    }

    /**
     * Deletes all the login sessions from the active users table.
     * Intended for use on startup, express memory-store will always be clear on server startup.
     */
    static clearAllLoginSessions() {
        UserTDG.clearAllLoginSessions();
    }

  /**
   * Extracts an objects id to use with TDG delete method.
   * @static
   * @param {Object} userObject an object of type user.
   */
    static delete(userObject) {
        UserTDG.delete(userObject.email, function(err, result) {
            if (!err) {
                idMap.delete(userObject, userObject.email);
            }
        });
    }
}

module.exports = UserMapper;
