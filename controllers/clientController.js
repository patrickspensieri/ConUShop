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
        let timeout = 0;
        let total = 0;
        if (data.length > 0) {
            req.clientUser.shoppingcart.startPurchaseSession();
            timeout = req.clientUser.shoppingcart.timeouts[0].timeout;
            total = req.clientUser.shoppingcart.getTotal();
        }
        let locked = req.clientUser.shoppingcart.isLocked;
        res.render('client/confirmPurchase', {
            data: data,
            total: total,
            timeout: timeout,
            locked: locked,
        });
    },

    makePurchase: function(req, res) {
        req.clientUser.makePurchase(function(err, result) {
            req.clientUser.shoppingcart.endPurchaseSession();
            req.flash('success_msg', 'Purchase successful.');
            res.redirect('orders');
        });
    },

    cancelPurchase: function(req, res) {
        if (req.clientUser.shoppingcart.isLocked) {
            req.clientUser.cancelPurchase(function(err, result) {
                req.clientUser.shoppingcart.endPurchaseSession();
                req.flash('success_msg', 'Purchase cancelled.');
                res.redirect('shoppingCart');
            });
        }
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
        let orderId = req.params.orderId;
        req.clientUser.returnItem(orderItemId, function(err, result) {
            res.redirect('/client/order/details/'+orderId);
        });
    },

    startReturn: function(req, res) {
        let orderItemId = req.params.id;
        let orderId = req.params.orderId;
        let catalog = req.clientUser.orderCatalog.orders;
        let result = null;
        for (let i = 0; i < catalog.length; i++) {
            if (orderId == catalog[i].orderId) {
                catalog[i].startReturnSession();
                result = catalog[i].getOrderItem(orderItemId);
                break;
            }
        }
        res.render('client/confirmReturn', {
            data: result,
        });
    },

    cancelReturn: function(req, res) {
        let orderId = req.params.orderId;
        let catalog = req.clientUser.orderCatalog.orders;
        for (let i = 0; i < catalog.length; i++) {
            if (orderId == catalog[i].orderId) {
                catalog[i].endReturnSession();
                break;
            }
        }
        res.redirect('/client/order/details/'+orderId);
    },

    deleteAccount: function(req, res) {
        UserMapper.makeDeletion(req.clientUser);
        req.flash('success_msg', 'Your account has been successfully deleted');
        req.logout();
        res.redirect('/');
    },
};
