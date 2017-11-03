let Client = require('../../domain-layer/classes/Client');

module.exports = {
    clientPage: function(req, res) {
        res.render('pages/ClientPage');
    },

    clientDesktopView: function(req, res) {
        this.client = new Client();
        this.client.getProductInventory('Desktop', function(err, data) {
            data.table = 'desktop';
            res.render('pages/ClientPage', {
                data: data,
            });
        });
    },

    clientLaptopView: function(req, res) {
        this.client = new Client();
        this.client.getProductInventory('Laptop', function(err, data) {
            data.table = 'laptop';
            res.render('pages/ClientPage', {
                data: data,
            });
        });
    },

    clientMonitorView: function(req, res) {
        this.client = new Client();
        this.client.getProductInventory('Monitor', function(err, data) {
            data.table = 'monitor';
            res.render('pages/ClientPage', {
                data: data,
            });
        });
    },

    clientTabletView: function(req, res) {
        this.client = new Client();
        this.client.getProductInventory('Tablet', function(err, data) {
            data.table = 'tablet';
            res.render('pages/ClientPage', {
                data: data,
            });
        });
    },
};
