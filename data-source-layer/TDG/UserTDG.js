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
        db.query('SELECT * FROM users WHERE email=$1', [email], (err, result) => {
            if (err) {
                console.log(err.message);
            } else {
                return callback(null, result.rows);
            }
        });
    }

  /**
   * Finds all objects from the user table.
   * @static
   * @param {function} callback function that holds array of user object.
   */
    static findAll(callback) {
        db.query('SELECT * FROM users', (err, result) => {
            if (err) {
                console.log(err.message);
            } else {
                return callback(null, result.rows);
            }
        });
    }

// TODO removed ID since it is not known until entered into database
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
   */
    static insert(isAdmin, firstName, lastName, address, email, phone, password) {
        let queryString = 'INSERT INTO users (isadmin, firstname, lastname, address, email, phone, password) VALUES($1, $2, $3, $4, $5, $6, $7)';
        let queryValues = [isAdmin, firstName, lastName, address, email, phone, password];

        // TODO update userObject ID once query completed
        // OR
        // query to get next available primary key
        db.query(queryString, queryValues, (err, result) => {
            if (err) {
                console.log(err.message);
            }
            console.log('New user '+ firstName +' has been created');
        });
    }

  /**
   * Updates an object in the user table.
   * @static
   * @param {boolean} isAdmin is user client or admin
   * @param {string} firstName first name of user
   * @param {string} lastName last name of user
   * @param {string} address home address of user
   * @param {string} email email of user
   * @param {number} phone phone number of user
   */
    static update(isAdmin, firstName, lastName, address, email, phone) {
        let queryString = 'UPDATE users SET isadmin=$1, firstname=$2, lastname=$3, address=$4, phone=$6 WHERE email=$5';
        let queryValues = [isAdmin, firstName, lastName, address, email, phone];

        db.query(queryString, queryValues, (err, result) => {
            if (err) {
                console.log(err.message);
            }
        });
    }

  /**
   * Deletes an objects in the user table.
   * @static
   * @param {string} email email of user to be deleted.
   */
    static delete(email) {
      db.query('DELETE FROM users WHERE email=$1', [email], (err, result) =>{
          if (err) {
              console.log(err.message);
          }
          console.log('This user has been deleted from the database');
      });
    }
}

module.exports = UserTDG;
