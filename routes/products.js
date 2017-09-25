// routes/products.js
// ROUTER FOR PRODUCTS

let express = require('express');
let router = express.Router();
// require database adapter
let db = require('../db');

// serves as an example /products/monitors
router.get('/monitors', (req, res, next) => {
    db.query('SELECT * FROM monitors', [], (err, res) => {
        if (err) {
            return next(err);
        }
        return next(JSON.stringify(res.rows));
    });
});
module.exports = router;
