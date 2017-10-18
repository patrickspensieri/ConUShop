let User = require('../../domain-layer/classes/User');
let UserTDG = require('../../data-source-layer/TDG/UserTDG');

/**
 * User object mapper
 * @class UserMapper
 * @export
 */
class UserMapper {
  /**
   * Creates a new user
   * @static
   * @param {string} firstName first name of user
   * @param {string} lastName last name of user
   * @param {string} address home address of user
   * @param {string} email email of user
   * @param {number} phone phone number of user
   * @param {string} id the id of user
   * @param {string} password user password, hashed
   * @param {string} sessionid sessionID for login
   * @return {user} user object.
   */
    static makeNew(firstName, lastName, address, email, phone, id, password, sessionid) {
        let user = new User(firstName, lastName, address, email, phone, id, password, sessionid);
        return user;
    }

  /**
   * Maps the returned value to an object of type user.
   * @static
   * @param {string} email of user to be found.
   * @param {function} callback function that holds User object.
   */
    static find(email, callback) {
        UserTDG.find(email, function(err, result) {
            if (err) {
                console.log('Error during user find query', null);
            } else {
                let value = result[0];

                if (result.length==0) {
                    return callback(err, null);
                } else {
                    return callback(null, new User(value.isAdmin, value.firstName,
                        value.lastName, value.address, value.email, value.phoneNumber, value.password, value.sessionid, value.id));
                }
            }
        });
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
                    users.push(new User(value.isAdmin, value.firstName,
                        value.lastName, value.address, value.email, value.phoneNumber, value.sessionid));
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
            userObject.lastName, userObject.address, userObject.email, userObject.phone, userObject.password);
    }

  /**
   * Maps an objects attributes to seperate values for TDG update method.
   * @static
   * @param {Object} userObject an object of type user.
   */
    static update(userObject) {
        UserTDG.update(userObject.id, userObject.isAdmin, userObject.firstName,
            userObject.lastName, userObject.address, userObject.email, userObject.phone);
    }

    /**
     * Maps object attributes responsible for login session to separate values for the TDG updateLoginSession method.
     * @param {Object} userObject an object of type user.
     */
    static updateLoginSession(userObject) {
        UserTDG.updateLoginSession(userObject.id, userObject.sessionID);
    }

  /**
   * Extracts an objects id to use with TDG delete method.
   * @static
   * @param {Object} userObject an object of type user.
   */
    static delete(userObject) {
        UserTDG.delete(userObject.id);
    }
}

module.exports = UserMapper;
