let User = require('../../domain-layer/classes/User');
let UserMapper = require('../../domain-layer/mappers/UserMapper');

module.exports = {
    dashboard: function(req, res) {
        res.render('catalog/ClientPage');
    },

    desktop: function(req, res) {
        this.user = new User();
        this.user.getProductInventory('Desktop', function(err, data) {
            data.table = 'desktop';
            res.render('catalog/ClientPage', {
                data: data,
            });
        });
    },

    laptop: function(req, res) {
        this.user = new User();
        this.user.getProductInventory('Laptop', function(err, data) {
            data.table = 'laptop';
            res.render('catalog/ClientPage', {
                data: data,
            });
        });
    },

    monitor: function(req, res) {
        this.user = new User();
        this.user.getProductInventory('Monitor', function(err, data) {
            data.table = 'monitor';
            res.render('catalog/ClientPage', {
                data: data,
            });
        });
    },

    tablet: function(req, res) {
        this.user = new User();
        this.user.getProductInventory('Tablet', function(err, data) {
            data.table = 'tablet';
            res.render('catalog/ClientPage', {
                data: data,
            });
        });
    },

    addToShoppingCart: function(req, res) {
        if (req.isAuthenticated()) {
            let currentUser = req.user;
            UserMapper.find(currentUser.email, function(err, result) {
                let modelNumber = req.body.model;
                let client = result;
                client.shoppingcart.addToCart(modelNumber, function(err, data) {
                });
            });
        } else {
            console.log('Not a client');
        }
    },

    deleteFromShoppingCart: function(req, res) {
        if (req.isAuthenticated()) {
            let currentUser = req.user;
            UserMapper.find(currentUser.email, function(err, result) {
                let serialNumber = req.body.serialNumber;
                let client = result;
                client.shoppingcart.removeFromCart(serialNumber, function(err, data) {
                });
            });
        } else {
            console.log('Not a client');
        }
    },

    viewShoppingCart: function(req, res) {
        if (req.isAuthenticated()) {
            let currentUser = req.user;
            UserMapper.find(currentUser.email, function(err, result) {
                let client = result;
                let data = client.shoppingcart.cart;
                console.log(data);
                res.render('catalog/shoppingCart', {
                    data: data,
                });
            });
        } else {
            console.log('Not a user');
        }
    },
};
