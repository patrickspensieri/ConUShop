let db = require('../../data-source-layer/db/index');

/**
 * User table data gateway
 * @class UserTDG
 * @export
 */
class UserTDG {
  /**
   * Finds one object from the user table.
   * @static
   * @param {string} email email of the user to be found.
   * @param {function} callback function that holds user object.
   */
    static find(email, callback) {
        db.query('SELECT * FROM users LEFT JOIN activeusers ON users.id = activeusers.user_id WHERE users.email=$1', [email], (err, result) => {
            if (err) {
                console.log(err.message);
            } else {
                return callback(null, result.rows);
            }
        });
    }

// TODO update query to select from activeusers as well
  /**
   * Finds all objects from the user table.
   * @static
   * @param {function} callback function that holds array of user object.
   */
    static findAll(callback) {
        db.query('SELECT * FROM user', (err, result) => {
            if (err) {
                console.log(err.message);
            } else {
                return callback(null, result.rows);
            }
        });
    }

  /**
   * Inserts an object into the user table.
   * @static
   * @param {boolean} isAdmin is user client or admin
   * @param {string} firstName first name of user
   * @param {string} lastName last name of user
   * @param {string} address home address of user
   * @param {string} email email of user
   * @param {number} phone phone number of user
   * @param {string} password password of user
   * @param {string} sessionID sessionID for login
   */
    static insert(isAdmin, firstName, lastName, address, email, phone, password) {
        let queryString = 'INSERT INTO users ("isAdmin", "firstName", "lastName", address, email, "phoneNumber", password) VALUES($1, $2, $3, $4, $5, $6, $7)';
        let queryValues = [isAdmin, firstName, lastName, address, email, phone, password];

        // TODO update userObject ID once query completed
        // OR
        // query to get next available primary key
        db.query(queryString, queryValues, (err, result) => {
            if (err) {
                console.log(err.message);
            }
        });
    }

  /**
   * Updates an object in the user table.
   * @static
   * @param {string} id the id of user
   * @param {boolean} isAdmin is user client or admin
   * @param {string} firstName first name of user
   * @param {string} lastName last name of user
   * @param {string} address home address of user
   * @param {string} email email of user
   * @param {number} phone phone number of user
   * @param {string} sessionID sessionID for login
   */
    static update(id, isAdmin, firstName, lastName, address, email, phone) {
        let queryString = 'UPDATE user SET isAdmin=$2, firstName=$3, lastName=$4, address=$5, email=$6, phone=$7 WHERE id=$1';
        let queryValues = [id, isAdmin, firstName, lastName, address, email, phone];

        db.query(queryString, queryValues, (err, result) => {
            if (err) {
                console.log(err.message);
            }
        });
    }

    /**
     * Updates user's login session in the activeusers table
     * @param {string} id the id of user
     * @param {string} sessionid the sessionID for login
     */
    static updateLoginSession(id, sessionid) {
        let queryString = 'INSERT INTO activeusers (user_id, sessionid) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET sessionid=$2;';
        let queryValues = [id, sessionid];

        db.query(queryString, queryValues, (err, result) => {
            if (err) {
                console.log(err.message);
            }
        });
    }

  /**
   * Deletes an objects in the user table.
   * @static
   * @param {string} id id of user to be deleted.
   */
    static delete(id) {
      db.query('DELETE FROM user WHERE id=$1', [id], (err, result) =>{
          if (err) {
              console.log(err.message);
          }
          console.log('This user has been deleted from the database');
      });
    }
}

module.exports = UserTDG;
