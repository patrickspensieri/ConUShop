let db = require('../../db/index');

/**
 * User table data gateway
 * @class userTDG
 * @export
 */
class userTDG {
  /**
   * Finds one object from the user table.
   * @static
   * @param {string} id id of user to be found.
   */
    static find(id) {
        db.query('SELECT * FROM user WHERE "modelId"=$1', [id], (err, result) => {
            if (err) {
                console.log(err.message);
            }
            return result.rows;
        });
    }

  /**
   * Finds all objects from the user table.
   * @static
   */
    static findAll() {
        db.query('SELECT * FROM user', (err, result) => {
            if (err) {
                console.log(err.message);
            }
            return result.rows;
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
        let queryString = 'INSERT INTO users ("isAdmin", "firstName", "lastName", address, email, "phoneNumber", password) VALUES($1, $2, $3, $4, $5, $6, $7)';
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
   * @param {string} id the id of user
   * @param {boolean} isAdmin is user client or admin
   * @param {string} firstName first name of user
   * @param {string} lastName last name of user
   * @param {string} address home address of user
   * @param {string} email email of user
   * @param {number} phone phone number of user
   */
    static update(id, isAdmin, firstName, lastName, address, email, phone) {
        let queryString = 'UPDATE user SET isAdmin=$2, firstName=$3, lastName=$4, address=$5, email=$6, phone=$7 WHERE "modelId"=$1';
        let queryValues = [id, isAdmin, firstName, lastName, address, email, phone];

        db.query(queryString, queryValues, (err, result) => {
            if (err) {
                console.log(err.message);
            }
        });
    }

  /**
   * Deletes an objects in the user table.
   * @static
   * @param {string} id model number of user to be deleted.
   */
    static delete(id) {
      db.query('DELETE FROM user WHERE "modelId"=$1', [id], (err, result) =>{
          if (err) {
              console.log(err.message);
          }
          console.log('This user has been deleted from the database');
      });
    }
}

module.exports = userTDG;
