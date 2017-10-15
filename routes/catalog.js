let express = require('express');
let router = new express.Router();
let productCatalog = require('../domain-layer/classes/ProductCatalog');

router.get('/desktopView', function(req, res) {
    productCatalog.getProductCatalog("Desktop", function(err, data) {
        res.render('catalogPages/desktopView', {
            data: data,
        });
    });
});

router.post('/addProdSpec', function(req, res) {
        let model = req.body.model;
        let brand = req.body.brand;
        let processor = req.body.processor;
        let ram = req.body.ram;
        let storage = req.body.storage;
        let cores = req.body.cores;
        let dimensions = req.body.dimensions;
        let weight = req.body.weight;
        let price = req.body.price;
        let display = req.body.display;
        let os = req.body.os;
        let battery = req.body.battery;
        let camera = req.body.camera;
        let touch = req.body.touch;
        let size = req.body.size;

    switch(this.productType) {
        case "Desktop":
            // Validation
            req.checkBody('model', 'Can not be empty').notEmpty();
            req.checkBody('brand', 'Can not be empty').notEmpty();
            req.checkBody('processor', 'Can not be empty').notEmpty();
            req.checkBody('ram', 'Can not be empty').notEmpty();
            req.checkBody('storage', 'Can not be empty').notEmpty();
            req.checkBody('cores', 'Can not be empty').notEmpty();
            req.checkBody('dimensions', 'Can not be empty').notEmpty();
            req.checkBody('weight', 'Can not be empty').notEmpty();
            req.checkBody('price', 'Can not be empty').notEmpty();
            break;
        case "Laptop":
            // Validation
            req.checkBody('model', 'Can not be empty').notEmpty();
            req.checkBody('brand', 'Can not be empty').notEmpty();
            req.checkBody('processor', 'Can not be empty').notEmpty();
            req.checkBody('ram', 'Can not be empty').notEmpty();
            req.checkBody('storage', 'Can not be empty').notEmpty();
            req.checkBody('cores', 'Can not be empty').notEmpty();
            req.checkBody('dimensions', 'Can not be empty').notEmpty();
            req.checkBody('weight', 'Can not be empty').notEmpty();
            req.checkBody('price', 'Can not be empty').notEmpty();
            req.checkBody('display', 'Can not be empty').notEmpty();
            req.checkBody('os', 'Can not be empty').notEmpty();
            req.checkBody('battery', 'Can not be empty').notEmpty();
            req.checkBody('camera', 'Can not be empty').notEmpty();
            req.checkBody('touch', 'Can not be empty').notEmpty();
            break;
        case "Monitor":
            // Validation
            req.checkBody('model', 'Can not be empty').notEmpty();
            req.checkBody('brand', 'Can not be empty').notEmpty();
            req.checkBody('weight', 'Can not be empty').notEmpty();
            req.checkBody('price', 'Can not be empty').notEmpty();
            req.checkBody('size', 'Can not be empty').notEmpty();
            break;
        case "Tablet":
            // Validation
            req.checkBody('model', 'Can not be empty').notEmpty();
            req.checkBody('brand', 'Can not be empty').notEmpty();
            req.checkBody('processor', 'Can not be empty').notEmpty();
            req.checkBody('ram', 'Can not be empty').notEmpty();
            req.checkBody('storage', 'Can not be empty').notEmpty();
            req.checkBody('cores', 'Can not be empty').notEmpty();
            req.checkBody('dimensions', 'Can not be empty').notEmpty();
            req.checkBody('weight', 'Can not be empty').notEmpty();
            req.checkBody('price', 'Can not be empty').notEmpty();
            req.checkBody('display', 'Can not be empty').notEmpty();
            req.checkBody('os', 'Can not be empty').notEmpty();
            req.checkBody('battery', 'Can not be empty').notEmpty();
            req.checkBody('camera', 'Can not be empty').notEmpty();
            break;
        case "Television":
            // Validation
            req.checkBody('model', 'Can not be empty').notEmpty();
            req.checkBody('brand', 'Can not be empty').notEmpty();
            req.checkBody('dimensions', 'Can not be empty').notEmpty();
            req.checkBody('weight', 'Can not be empty').notEmpty();
            req.checkBody('price', 'Can not be empty').notEmpty();
            break;
    }

    let errors = req.validationErrors();

    if (errors) {
        res.redirect(req.get('referer'), {
            errors: errors,
        });
    } else {
        productCatalog.newTransaction(this.productType);
        productCatalog.createProductSpecification(model, brand, processor, ram, storage, cores, dimensions, weight, price, display, os, battery, camera, touch, size);
        productCatalog.transactionComplete();
        res.redirect(req.get('referer'));
    }
});

function deleteProdSpec(productType, model)
{
    productCatalog.newTransaction(productType);
    productCatalog.deleteProductSpecification(model);
    productCatalog.transactionComplete();
    location.reload(true);
}


function updateProdSpec(productType, test)
{
    switch(this.productType) {
        case "Desktop":
    productCatalog.newTransaction(productType);
    productCatalog.updateProductSpecification(model, brand, processor, ram, storage, cores, dimensions, weight, price, null, null, null, null, null, null);
    productCatalog.transactionComplete();
    location.reload(true);
            break;
    }

}

router.get('/laptopView', function(req, res) {
    productCatalog.getProductCatalog("Laptop", function(err, data) {
        res.render('catalogPages/laptopView', {
            data: data,
        });
    });
});

router.get('/monitorView', function(req, res) {
    productCatalog.getProductCatalog("Monitor", function(err, data) {
        res.render('catalogPages/monitorView', {
            data: data,
        });
    });
});

router.get('/tabletView', function(req, res) {
    productCatalog.getProductCatalog("Tablet", function(err, data) {
        res.render('catalogPages/tabletView', {
            data: data,
        });
    });
});

router.get('/televisionView', function(req, res) {
    productCatalog.getProductCatalog("Television", function(err, data) {
        res.render('catalogPages/televisionView', {
            data: data,
        });
    });
});

module.exports = router;
