var db = require('../db');

/**
* @class monitor
*/
class monitorTDG{

    static find(id){
        db.connect();
        
        db.query('SELECT * FROM monitor WHERE "modelId"=$1', [id], (err, result) => {
            if (err){
                console.log(err.message);
            }
            db.end();
            console.log(result.rows); // for testing purposes
            return result.rows;
        });
    }
/**
* @param findsAll
*/
    static findAll(){
        db.connect();

        db.query('SELECT * FROM monitor', (err, result) => {
            if (err){
                console.log(err.message);
            }
            db.end();
            console.log(result.rows); // for testing purposes
            return result.rows;
        });
    }

/**
* @param insert
*/
    static insert(modelNumber, brand, size, weight, price){
        db.connect();
        
        let query_string = 'INSERT INTO monitor VALUES($1, $2, $3, $4, $5)'
        let query_values = [modelNumber, brand, size, weight, price]

        db.query(query_string, query_values, (err, result) => {
            if (err){
                console.log(err.message);
            }
            db.end();
        });
    }

    static update(modelNumber, brand, size, weight, price){
        db.connect();
        
        let query_string = 'UPDATE monitor SET brand=$2, size=$3, weight=$4, price=$5 WHERE "modelId"=$1'
        let query_values = [modelNumber, brand, size, weight, price]

        db.query(query_string, query_values, (err, result) => {
            if (err){
                console.log(err.message);
            }
            db.end();
        });
    }

    static delete(id){
      db.connect();
      
      db.query('DELETE FROM monitor WHERE "modelId"=$1', [id], (err,result) =>{
          if (err){
              console.log(err.message);
          }
          db.end();
          console.log('This monitor has been deleted from the database');
      });
    }

}

module.exports = monitorTDG;
