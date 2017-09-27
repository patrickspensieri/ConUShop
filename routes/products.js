// routes/products.js
// ROUTER FOR PRODUCTS

let express = require('express');
let router = new express.Router();
// require database adapter
let db = require('../db');

// retrieves all television database entries
router.get('/television', (req, res, next) => {
    db.query('SELECT * FROM television', [], (err, data) => {
        if (err) {
            return next(err);
        }
        res.json(data.rows);
    });
});

// retrieves one television by id
router.get('/television/:id', (req, res, next) =>{
    let id = parseInt(req.params.id);
    db.query(`SELECT * FROM television WHERE model=${id}`, [], (err, data) =>{
        if (err) {
            return next(err);
        }
        res.json(data.rows);
    });
});


//Create row in television table
/*
router.post('/television', (req, res, next) => {
    let brand;
    let dimensions;
    let weight;
    let price;
    db.query(`insert into television(brand,dimensions,weight,price) values(${brand}, ${dimensions}, ${weight}, ${price})`, [], (err) =>{
        if (err) {
            return next(err);
        }
        console.log('insert worked')
    });
});
*/

module.exports = router;
