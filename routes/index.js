// routes/index.js
// REGISTER ALL ROUTES

// require route files
const products = require('./products');

// map path to route files
module.exports = (app) => {
    // map /products to products.js
    app.use('/products', products);
    // render home page
    app.get('/', function(req, res) {
        res.render('pages/index');
    });
};
