var db = require('../db');

/**
* @class desktop
*/
class desktopTDG{

    static find(id){
        db.connect();
        
        db.query('SELECT * FROM desktop WHERE "modelId"=$1', [id], (err, result) => {
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

        db.query('SELECT * FROM desktop', (err, result) => {
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
    static insert(modelNumber, brand, processor, ram, hardDrive, cpuCores, dimension, weight, price){
        db.connect();
        
        let query_string = 'INSERT INTO desktop VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)'
        let query_values = [modelNumber, brand, processor, ram, hardDrive, cpuCores, dimension, weight, price]

        db.query(query_string, query_values, (err, result) => {
            if (err){
                console.log(err.message);
            }
            db.end();
        });
    }

    static update(modelNumber, brand, processor, ram, hardDrive, cpuCores, dimension, weight, price){
        db.connect();
        
        let query_string = 'UPDATE desktop SET brand=$2, processor=$3, ram=$4, "hard drive"=$5, "cpu cores"=$6, dimensions=$7, weight=$8, price=$9 WHERE "modelId"=$1'
        let query_values = [modelNumber, brand, processor, ram, hardDrive, cpuCores, dimension, weight, price]

        db.query(query_string, query_values, (err, result) => {
            if (err){
                console.log(err.message);
            }
            db.end();
        });
    }

    static delete(id){
      db.connect();
      
      db.query('DELETE FROM desktop WHERE "modelId"=$1', [id], (err,result) =>{
          if (err){
              console.log(err.message);
          }
          db.end();
          console.log('This Desktop has been deleted from the database');
      });
    }

}

module.exports = desktopTDG;
