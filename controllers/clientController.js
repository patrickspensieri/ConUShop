let UserMapper = require('../domain-layer/mappers/UserMapper');

module.exports = {
    addToShoppingCart: function(req, res) {
        let modelNumber = req.body.model;
        let type = req.body.type;
        if (req.clientUser.shoppingcart.cart.length == 7) {
            req.flash('error_msg', 'Shpping cart is full.');
            res.send({redirect: req.get('referer')});
        }

        req.clientUser.shoppingcart.addToCart(modelNumber, type, function(err, result) {
            if (err) {
                req.flash('error_msg', 'Item is out of stock.');
            } else {
                req.flash('success_msg', 'Item successfully added to cart.');
            }
            res.send({redirect: req.get('referer')});
        });
    },

    deleteFromShoppingCart: function(req, res) {
        let serialNumber = req.params.id;
        req.clientUser.shoppingcart.removeFromCart(serialNumber, function(err, data) {
            res.redirect(req.get('referer'));
        });
    },

    viewShoppingCart: function(req, res) {
        let data = req.clientUser.shoppingcart.cart;
        let total = req.clientUser.shoppingcart.getTotal();
        res.render('client/shoppingCart', {
            data: data,
            total: total,
        });
    },
    
    checkout: function(req, res) {
        let data = req.clientUser.shoppingcart.cart;
        let total = req.clientUser.shoppingcart.getTotal();
        req.clientUser.shoppingcart.startPurchaseSession();
        console.log(req.user.shoppingcart.timeouts);
        res.render('client/confirmation', {
            data: data,
            total: total,
        });
    },

    makePurchase: function(req, res) {
        req.clientUser.makePurchase(function(err, result) {
            req.clientUser.shoppingcart.endPurchaseSession();
            res.redirect('shoppingCart');
        });
    },

    cancelPurchase: function(req, res) {
        req.clientUser.shoppingcart.removeAllFromCart(function(err, data) {
            res.redirect('shoppingCart');
        });
    },

    confirmPurchase: function(req, res) {

    },

    viewAccount: function(req, res) {
        res.render('client/account', {
        });
    },

    viewOrders: function(req, res) {
        req.clientUser.orderCatalog.getOrders(req.clientUser.id, function(err, result) {
            res.render('client/orders', {
                data: result,
            });
        });
    },

    viewOrderDetails: function(req, res) {
        let orderId = req.params.id;
        req.clientUser.orderCatalog.getOrderDetails(orderId, function(err, result) {
            res.render('client/orderDetails', {
                data: result,
            });
        });
    },

    returnItem: function(req, res) {
        let orderItemId = req.params.id;
        req.clientUser.returnItem(orderItemId, function(err, result) {
            res.redirect(req.get('referer'));
        });
    },

    deleteAccount: function(req, res) {
        UserMapper.makeDeletion(req.clientUser);
        req.flash('success_msg', 'Your account has been successfully deleted');
        req.logout();
        res.redirect('/');
    },
};
