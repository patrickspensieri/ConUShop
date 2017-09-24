var db = require('../db');

class desktopTDG{

    static find(id){

    }

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

    static insert(){

    }

    static update(){

    }

    static delete(){

    }

}

module.exports = desktopTDG;