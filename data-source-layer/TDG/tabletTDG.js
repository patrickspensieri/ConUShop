var db = require('../db');

class tabletTDG{

    static find(id){
        db.connect();
        db.query('SELECT * FROM tablet WHERE "modelId"=$1', [id], (err,result) => {
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
        db.query('SELECT * FROM tablet', (err,result) => {
            if(err) {
                console.log(err.message);
            }
            db.end();
            console.log(result.rows);
            return result.rows;
        });
    }

    static insert(){
        db.connect();

        let query_string = 'INSERT INTO tablet VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)';
        let query_values = [modelNumber, brand, displaySize, processor, ram, hardDrive, cpuCores, os, battery, camera, dimensions, weight, price];

        db.query(query_string, query_values, (err,result) =>{
            if (err){
                console.log(err.message);
            }
            db.end();
        });
    }

    static update(modelNumber, brand, displaySize, processor, ram, hardDrive, cpuCores, os, battery, camera, dimensions, weight, price){
        db.connect();
        let query_string = 'UPDATE tablet SET brand=$2, displaySize=$3, processor=$4, ram=$5, hardDrive=$6, cpuCores=$7, os=$8, battery=$9, camera=$10, dimensions=$11, weight=$12, price=$13, WHERE "modelId"=$1';
        let query_values = [modelNumber, brand, displaySize, processor, ram, hardDrive, cpuCores, os, battery, camera, dimensions, weight, price];

        db.query(query_string, query_values, (err, result) => {
            if (err){
                console.log(err.message);
            }
            db.end();
        });
    }

    static delete(id){
        db.connect();

        db.query('DELETE FROM tablet WHERE "modelId"=$1', [id], (err,result){
            if(err){
                console.log(err.message);
            }
            db.end()
            console.log('This Tablet has been deleted from the database');
        });
    }

}

module.exports = tabletTDG;
