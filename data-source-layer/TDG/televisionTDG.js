var db = require('../db');

/**
* @class television
*/
class televisionTDG{

    static find(id){
        db.connect();
        
        db.query('SELECT * FROM television WHERE "modelId"=$1', [id], (err, result) => {
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

        db.query('SELECT * FROM television', (err, result) => {
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
    static insert(modelNumber, brand, dimensions, weight, price){
        db.connect();
        
        let query_string = 'INSERT INTO television VALUES($1, $2, $3, $4, $5)'
        let query_values = [modelNumber, brand, dimensions, weight, price]

        db.query(query_string, query_values, (err, result) => {
            if (err){
                console.log(err.message);
            }
            db.end();
        });
    }

    static update(modelNumber, brand, dimensions, weight, price){
        db.connect();
        
        let query_string = 'UPDATE television SET brand=$2, dimensions=$3, weight=$4, price=$5 WHERE "modelId"=$1'
        let query_values = [modelNumber, brand, dimensions, weight, price]

        db.query(query_string, query_values, (err, result) => {
            if (err){
                console.log(err.message);
            }
            db.end();
        });
    }

    static delete(id){
      db.connect();
      
      db.query('DELETE FROM television WHERE "modelId"=$1', [id], (err,result) =>{
          if (err){
              console.log(err.message);
          }
          db.end();
          console.log('This television has been deleted from the database');
      });
    }

}

module.exports = televisionTDG;
