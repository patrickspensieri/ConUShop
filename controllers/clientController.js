module.exports = {
    addToShoppingCart: function(req, res) {
        let modelNumber = req.body.model;
        let type = req.body.type;
        let client = req.client;
        client.shoppingcart.addToCart(modelNumber, type, function(err, data) {
        });
    },

    deleteFromShoppingCart: function(req, res) {
        let serialNumber = req.params.id;
        let client = req.client;
        client.shoppingcart.removeFromCart(serialNumber, function(err, data) {
            res.redirect(req.get('referer'));
        });
    },

    viewShoppingCart: function(req, res) {
        let client = req.client;
        let data = client.shoppingcart.cart;
        res.render('client/shoppingCart', {
            data: data,
        });
    },

    makePurchase: function(req, res) {
        let client = req.client;
        client.makePurchase(function(err, result) {
            res.redirect(req.get('referer'));
        });
    },

    confirmPurchase: function(req, res) {

    },

    viewOrders: function(req, res) {
        let client = req.client;
        client.getOrders(function(err, result) {
            res.render('client/orders', {
                data: result,
            });
        });
    },

    getOrderDetails: function(req, res) {
        let client = req.client;
        let orderId = req.body.orderId;
        client.getOrderDetails(orderId, function(err, result) {
            res.send({redirect: '/client/orders/details/' + orderId});
        });
    },

    viewOrderDetails: function(req, res) {
        let client = req.client;
        let orderId = req.params.id;
        client.getOrderDetails(orderId, function(err, result) {
            console.log(result);
            res.render('client/orderDetails', {
                data: result,
            });
        });
    },

    returnItem: function(req, res) {
        let client = req.client;
        let orderItemId = req.params.id;
        client.returnItem(orderItemId, function(err, result) {
            console.log(result);
            res.redirect(req.get('referer'));
        });
    },
};
