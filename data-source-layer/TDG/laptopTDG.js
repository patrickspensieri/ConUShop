var db = require('../db');

/**
@class laptopTDG
*/
class laptopTDG{

    static find(id){
        db.connect();
        db.query('SELECT * FROM laptop WHERE "modelId"=$1', [id], (err,result) => {
            if (err){
                console.log(err.message);
            }
            db.end();
            console.log(result.rows);
            return result.rows;
        });
    }

    static findAll(){
        db.connect();

        db.query('SELECT * FROM laptop', (err,result) => {
            if(err) {
                console.log(err.message);
            }
            db.end();
            console.log(result.rows);
            return result.rows;
        });
    }

    static insert(modelNumber, brand, displaySize, processor, ram, hardDrive, cpuCores, os, battery, camera, touchScreen, dimensions, weight, price){
        db.connect();

        let query_string = 'INSERT INTO laptop VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)';
        let query_values = [modelNumber, brand, displaySize, processor, ram, hardDrive, cpuCores, os, battery, camera, touchScreen, dimensions, weight, price];

        db.query(query_string, query_values, (err,result) =>{
            if (err){
                console.log(err.message);
            }
            db.end();
        });
    }

    static update(modelNumber, brand, displaySize, processor, ram, hardDrive, cpuCores, os, battery, camera, touchScreen, dimensions, weight, price){
        db.connect();
        let query_string = 'UPDATE laptop SET brand=$2, displaySize=$3, processor=$4, ram=$5, hardDrive=$6, cpuCores=$7, os=$8, battery=$9, camera=$10, touchScreen=$11, dimensions=$12, weight=$13, price=$14, WHERE "modelId"=$1';
        let query_values = [modelNumber, brand, displaySize, processor, ram, hardDrive, cpuCores, os, battery, camera, touchScreen, dimensions, weight, price];

        db.query(query_string, query_values, (err, result) => {
            if (err){
                console.log(err.message);
            }
            db.end();
        });
    }

    static delete(id){
        db.connect();

        db.query('DELETE FROM laptop WHERE "modelId"=$1', [id], (err,result){
            if(err){
                console.log(err.message);
            }
            db.end();
            console.log('This Laptop has been deleted from the database');
        });
    }

}

module.exports = laptopTDG;
