let User = require('../../domain-layer/classes/User')
let Client = require('../../domain-layer/classes/Client')
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
            UserMapper.find(currentUser.email, function (err, result) {
                let modelNumber = req.body.model;
                console.log(this.client.shoppingcart);
                this.client.shoppingcart.addToCart(modelNumber, function(err, data) {
                    console.log(data);
                    res.send({redirect: req.body.redi});
                });
            });
        } else {
            console.log('Not a user');
            res.send({redirect: req.body.redi});
        }
    },

    viewShoppingCart: function(req, res) {
        if (req.isAuthenticated()) {
            let currentUser = req.user;
            this.client = UserMapper.create(currentUser.firstName, currentUser.lastName, currentUser.address, currentUser.email,
                currentUser.phone, currentUser.password, currentUser.isAdmin, currentUser.sessionId, currentUser.id);
            this.client.shoppingcart.viewCart(function(err, data) {
                res.render('catalog/shoppingCart', {
                    data: data,
                });
            });
        } else {
            console.log('Not a user');
        }
    },
};
