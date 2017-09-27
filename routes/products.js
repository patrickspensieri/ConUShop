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

// retrieves all desktop database entries
router.get('/desktop', (req, res, next) => {
    db.query('SELECT * FROM desktop', [], (err, data) => {
        if (err) {
            return next(err);
        }
        res.json(data.rows);
    });
});

// retrieves one desktop by id
router.get('/desktop/:id', (req, res, next) =>{
    let id = parseInt(req.params.id);
    db.query(`SELECT * FROM desktop WHERE model=${id}`, [], (err, data) =>{
        if (err) {
            return next(err);
        }
        res.json(data.rows);
    });
});

// retrieves all monitor database entries
router.get('/monitor', (req, res, next) => {
    db.query('SELECT * FROM monitor', [], (err, data) => {
        if (err) {
            return next(err);
        }
        res.json(data.rows);
    });
});

// retrieves one monitor by id
router.get('/monitor/:id', (req, res, next) =>{
    let id = parseInt(req.params.id);
    db.query(`SELECT * FROM monitor WHERE model=${id}`, [], (err, data) =>{
        if (err) {
            return next(err);
        }
        res.json(data.rows);
    });
});

// retrieves all television database entries
router.get('/television', (req, res, next) => {
    db.query('SELECT * FROM television', [], (err, data) => {
        if (err) {
            return next(err);
        }
        res.json(data.rows);
    });
});

// retrieves one laptop by id
router.get('/laptop/:id', (req, res, next) =>{
    let id = parseInt(req.params.id);
    db.query(`SELECT * FROM laptop WHERE model=${id}`, [], (err, data) =>{
        if (err) {
            return next(err);
        }
        res.json(data.rows);
    });
});

// retrieves all laptop database entries
router.get('/laptop', (req, res, next) => {
    db.query('SELECT * FROM laptop', [], (err, data) => {
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

// retrieves all tablet database entries
router.get('/tablet', (req, res, next) => {
    db.query('SELECT * FROM tablet', [], (err, data) => {
        if (err) {
            return next(err);
        }
        res.json(data.rows);
    });
});

// retrieves one tablet by id
router.get('/tablet/:id', (req, res, next) =>{
    let id = parseInt(req.params.id);
    db.query(`SELECT * FROM tablet WHERE model=${id}`, [], (err, data) =>{
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
