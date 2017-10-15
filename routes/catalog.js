let express = require('express');
let router = new express.Router();
let productCatalog = require('../domain-layer/classes/ProductCatalog');

router.get('/desktopView', function(req, res) {
    productCatalog.getAllProductSpecification('Desktop', function(err, data) {
        res.render('catalogPages/desktopView', {
            data: data,
        });
    });
});

router.get('/itemsView', function(req, res) {
    productCatalog.getItems(function(err, data) {
        console.log(data);
        res.render('catalogPages/itemsView', {
            data: data,
        });
    });
});

router.post('/deleteItem', function(req, res) {
    productCatalog.deleteItem(req.body.serialNumberToRemove);
    res.redirect(req.get('referer'));
});

router.post('/addItem', function(req, res) {
    productCatalog.addItem(req.body.serialNumber, req.body.modelNumber);
    res.redirect(req.get('referer'));
});

router.post('/addProdSpec', function(req, res) {
        let prodType = req.body.formProductType;
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

    switch (this.prodType) {
        case 'Desktop':
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
        case 'Laptop':
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
        case 'Monitor':
            // Validation
            req.checkBody('model', 'Can not be empty').notEmpty();
            req.checkBody('brand', 'Can not be empty').notEmpty();
            req.checkBody('weight', 'Can not be empty').notEmpty();
            req.checkBody('price', 'Can not be empty').notEmpty();
            req.checkBody('size', 'Can not be empty').notEmpty();
            break;
        case 'Tablet':
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
        case 'Television':
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
        productCatalog.addProductSpecification(prodType, model, brand, processor, ram, storage, cores, dimensions,
            weight, price, display, os, battery, camera, touch, size);
        res.redirect(req.get('referer'));
    }
});

router.post('/deleteProdSpec', function(req, res) {
    productCatalog.deleteProductSpecification(req.body.prodType, req.body.modelNumber);
    res.send({redirect: req.body.redi});
});

router.post('/updateProdSpec', function(req, res) {
/*
    switch (req.body.prodType) {
        case 'Desktop':
            productCatalog.updateProductSpecification(req.body.prodType, req.body.data.model, req.body.data.brand,
                req.body.data.processor, req.body.data.ram, req.body.data.storage, req.body.data.cores,
                req.body.data.dimensions, req.body.data.weight, req.body.data.price, null, null, null, null, null, null);
            break;
        case 'Laptop':
            productCatalog.updateProductSpecification(req.body.prodType, req.body.data, brand, processor, ram, storage,
                cores, dimensions, weight, price, display, os, battery, camera, touch, null);
            break;
        case 'Monitor':
            productCatalog.updateProductSpecification(req.body.prodType, req.body.data, brand, null, null, null, null,
                null, weight, price, null, null, null, null, null, size);
            break;
        case 'Tablet':
            productCatalog.updateProductSpecification(req.body.prodType, req.body.data, brand, processor, ram, storage,
                cores, dimensions, weight, price, display, os, battery, camera, null);
            break;
        case 'Television':
            productCatalog.updateProductSpecification(req.body.prodType, req.body.data, brand, null, null, null, null,
                dimensions, weight, price, null, null, null, null, null, null);
            break;
    }
    res.send({redirect: req.body.redi});
    */
});

router.get('/laptopView', function(req, res) {
    productCatalog.getAllProductSpecification('Laptop', function(err, data) {
        res.render('catalogPages/laptopView', {
            data: data,
        });
    });
});

router.get('/monitorView', function(req, res) {
    productCatalog.getAllProductSpecification('Monitor', function(err, data) {
        res.render('catalogPages/monitorView', {
            data: data,
        });
    });
});

router.get('/tabletView', function(req, res) {
    productCatalog.getAllProductSpecification('Tablet', function(err, data) {
        res.render('catalogPages/tabletView', {
            data: data,
        });
    });
});

router.get('/televisionView', function(req, res) {
    productCatalog.getAllProductSpecification('Television', function(err, data) {
        res.render('catalogPages/televisionView', {
            data: data,
        });
    });
});

module.exports = router;
