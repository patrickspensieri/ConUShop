var db = require('../db');

/**
* @class desktop
*/
class desktopTDG{

    static find(id){

    }
/**
* @param findsAll
*/
    static findAll(){
        db.connect();

        db.query('SELECT * FROM desktop', (err, result) => {
            if (err){
                console.log(err.message);
            }
            db.end();
            console.log(result.rows);
            return result.rows;
        });
    }

/**
* @param insert
*/
    static insert(){

    }

    static update(){

    }

    static delete(id){
      db.connect();

      db.query('DELETE FROM desktop WHERE id=' + id, (err,result) =>{
          if (err){
              console.log(err.message);
          }
          db.end();
          console.log('This Desktop has been deleted from the database');
      });
    }

}

module.exports = desktopTDG;
