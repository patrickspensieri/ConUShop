module.exports = {
    dashboard: function(req, res) {
        res.render('catalog/ClientPage');
    },

    desktop: function(req, res) {
        req.guestUser.getProductInventory('Desktop', function(err, data) {
            data.table = 'desktop';
            res.render('catalog/ClientPage', {
                data: data,
            });
        });
    },

    laptop: function(req, res) {
        req.guestUser.getProductInventory('Laptop', function(err, data) {
            data.table = 'laptop';
            res.render('catalog/ClientPage', {
                data: data,
            });
        });
    },

    monitor: function(req, res) {
        req.guestUser.getProductInventory('Monitor', function(err, data) {
            data.table = 'monitor';
            res.render('catalog/ClientPage', {
                data: data,
            });
        });
    },

    tablet: function(req, res) {
        req.guestUser.getProductInventory('Tablet', function(err, data) {
            data.table = 'tablet';
            res.render('catalog/ClientPage', {
                data: data,
            });
        });
    },
};
