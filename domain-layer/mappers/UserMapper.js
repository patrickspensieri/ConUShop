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
   * Creates a new user
   * @static
   * @param {boolean} isAdmin is user client or admin
   * @param {string} firstName first name of user
   * @param {string} lastName last name of user
   * @param {string} address home address of user
   * @param {string} email email of user
   * @param {number} phone phone number of user
   * @param {string} password user password, hashed
   * @param {string} sessionID sessionID for login
   * @param {string} id userID
   * @return {User} user object.
   */
    static create(firstName, lastName, address, email, phone, password, isAdmin, sessionID, id) {
        if (isAdmin) {
            let user = new Admin(firstName, lastName, address, email, phone, password, isAdmin, sessionID, id);
            return user;
        } else {
            let user = new Client(firstName, lastName, address, email, phone, password, isAdmin, sessionID, id);
            return user;
        }
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
        UserTDG.insert(userObject.isAdmin, userObject.firstName,
            userObject.lastName, userObject.address, userObject.email, userObject.phone, userObject.password, function(err, result) {
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
        UserTDG.update(userObject.isAdmin, userObject.firstName,
            userObject.lastName, userObject.address, userObject.email, userObject.phone, function(err, result) {
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
        UserTDG.updateLoginSession(userObject.id, userObject.sessionID);
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
