let Client = require('../../domain-layer/classes/Client');

module.exports = {
    dashboard: function(req, res) {
        res.render('catalog/ClientPage');
    },

    desktop: function(req, res) {
        let currentUser = req.user;
        this.client = new Client(currentUser.firstName, currentUser.lastName, currentUser.address, currentUser.email,
             currentUser.phone, currentUser.password, currentUser.isAdmin, currentUser.sessionId, currentUser.id);
        this.client.getProductInventory('Desktop', function(err, data) {
            data.table = 'desktop';
            res.render('catalog/ClientPage', {
                data: data,
            });
        });
    },

    laptop: function(req, res) {
        this.client = new Client();
        this.client.getProductInventory('Laptop', function(err, data) {
            data.table = 'laptop';
            res.render('catalog/ClientPage', {
                data: data,
            });
        });
    },

    monitor: function(req, res) {
        this.client = new Client();
        this.client.getProductInventory('Monitor', function(err, data) {
            data.table = 'monitor';
            res.render('catalog/ClientPage', {
                data: data,
            });
        });
    },

    tablet: function(req, res) {
        this.client = new Client();
        this.client.getProductInventory('Tablet', function(err, data) {
            data.table = 'tablet';
            res.render('catalog/ClientPage', {
                data: data,
            });
        });
    },

    addToShoppingCart: function(req, res) {
        let currentUser = req.user;
        this.client = new Client(currentUser.firstName, currentUser.lastName, currentUser.address, currentUser.email,
             currentUser.phone, currentUser.password, currentUser.isAdmin, currentUser.sessionId, currentUser.id);
        let modelNumber = req.body.model;
        this.client.shoppingcart.addToCart(modelNumber, function(err, data) {
            console.log(data);
            res.send({redirect: req.body.redi});
        });
    },
};
