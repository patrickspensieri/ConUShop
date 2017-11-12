module.exports = {
    addToShoppingCart: function(req, res) {
        let modelNumber = req.body.model;
        let type = req.body.type;
        req.client.shoppingcart.addToCart(modelNumber, type, function(err, data) {
        });
    },

    deleteFromShoppingCart: function(req, res) {
        let serialNumber = req.params.id;
        req.client.shoppingcart.removeFromCart(serialNumber, function(err, data) {
            res.redirect(req.get('referer'));
        });
    },

    viewShoppingCart: function(req, res) {
        let data = req.client.shoppingcart.cart;
        res.render('client/shoppingCart', {
            data: data,
        });
    },

    makePurchase: function(req, res) {
        req.client.makePurchase(function(err, result) {
            res.redirect(req.get('referer'));
        });
    },

    confirmPurchase: function(req, res) {

    },

    viewOrders: function(req, res) {
        req.client.orderCatalog.getOrders(req.client.id, function(err, result) {
            res.render('client/orders', {
                data: result,
            });
        });
    },

    viewOrderDetails: function(req, res) {
        let orderId = req.params.id;
        req.client.orderCatalog.getOrderDetails(orderId, function(err, result) {
            console.log(result);
            res.render('client/orderDetails', {
                data: result,
            });
        });
    },

    returnItem: function(req, res) {
        let orderItemId = req.params.id;
        req.client.returnItem(orderItemId, function(err, result) {
            console.log(result);
            res.redirect(req.get('referer'));
        });
    },
};
