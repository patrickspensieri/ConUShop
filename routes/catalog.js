let express = require('express');
let router = new express.Router();
let Admin = require('../domain-layer/classes/Admin');
let Client = require('../domain-layer/classes/Client');
let UserMapper = require('../domain-layer/mappers/UserMapper');
let accountController = require('../presentation-layer/controllers/accountController');

// TODO Use Mappers to create objects

// Get Dashboard
router.get('/adminDashboard',
    accountController.ensureAdministrator, function(req, res) {
    this.admin = new Admin();
    res.render('pages/adminDashboard');
});

router.get('/desktopView', function(req, res) {
    this.admin = new Admin();

    this.admin.getProductCatalogInstance().getAllProductSpecification('Desktop', function(err, data) {
        res.render('catalogPages/desktopView', {
            data: data,
        });
    });
});

router.get('/itemsView', function(req, res) {
    this.admin.getProductCatalogInstance().getItems(function(err, data) {
        res.render('catalogPages/itemsView', {
            data: data,
        });
    });
});


router.post('/deleteItem', function(req, res) {
    this.admin.getProductCatalogInstance().deleteItem(req.body.serialNumberToRemove);
    res.redirect(req.get('referer'));
});

router.post('/addItem', function(req, res) {
    this.admin.getProductCatalogInstance().addItem(req.body.serialNumber, req.body.modelNumber);
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
    }

    let errors = req.validationErrors();

    if (errors) {
        res.redirect(req.get('referer'), {
            errors: errors,
        });
    } else {
        this.admin.getProductCatalogInstance().addProductSpecification(prodType, model, brand, processor, ram, storage, cores, dimensions,
            weight, price, display, os, battery, camera, touch, size);
        res.redirect(req.get('referer'));
    }
});

router.post('/deleteProdSpec', function(req, res) {
    this.admin.getProductCatalogInstance().deleteProductSpecification(req.body.prodType, req.body.model);
    res.send({redirect: req.body.redi});
});

router.post('/updateProdSpec', function(req, res) {
    switch (req.body.prodType) {
        case 'Desktop':
            this.admin.getProductCatalogInstance().updateProductSpecification(req.body.prodType, req.body.model, req.body.brand,
                req.body.processor, req.body.ram, req.body.storage, req.body.cores,
                req.body.dimensions, req.body.weight, req.body.price, null, null, null, null, null, null);
            break;
        case 'Laptop':
            this.admin.getProductCatalogInstance().updateProductSpecification(req.body.prodType, req.body.model, req.body.brand, req.body.processor, req.body.ram, req.body.storage,
                req.body.cores, req.body.dimensions, req.body.weight, req.body.price, req.body.display, req.body.os, req.body.battery, req.body.camera, req.body.touch, null);
            break;
        case 'Monitor':
            this.admin.getProductCatalogInstance().updateProductSpecification(req.body.prodType, req.body.model, req.body.brand, null, null, null, null,
                null, req.body.weight, req.body.price, null, null, null, null, null, req.body.size);
            break;
        case 'Tablet':
            this.admin.getProductCatalogInstance().updateProductSpecification(req.body.prodType, req.body.model, req.body.brand, req.body.processor, req.body.ram, req.body.storage,
                req.body.cores, req.body.dimensions, req.body.weight, req.body.price, req.body.display, req.body.os, req.body.battery, req.body.camera, null, null);
            break;
    }
    res.send({redirect: req.body.redi});
});

router.get('/laptopView', function(req, res) {
    this.admin.getProductCatalogInstance().getAllProductSpecification('Laptop', function(err, data) {
        res.render('catalogPages/laptopView', {
            data: data,
        });
    });
});

router.get('/monitorView', function(req, res) {
    this.admin.getProductCatalogInstance().getAllProductSpecification('Monitor', function(err, data) {
        res.render('catalogPages/monitorView', {
            data: data,
        });
    });
});

router.get('/tabletView', function(req, res) {
    this.admin.getProductCatalogInstance().getAllProductSpecification('Tablet', function(err, data) {
        res.render('catalogPages/tabletView', {
            data: data,
        });
    });
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~testing~~~~~~~~~~~~~~~~~~~~~~~~~
router.get('/ClientPage', function(req, res) {
    res.render('pages/ClientPage');
});
router.get('/ClientPage/Desktop', function(req, res) {
    this.client = new Client();
    this.client.getProductInventory('Desktop', function(err, data) {
        data.table = 'desktop';
        res.render('pages/ClientPage', {
            data: data,
        });
    });
});
router.get('/ClientPage/Laptop', function(req, res) {
    this.client = new Client();
    this.client.getProductInventory('Laptop', function(err, data) {
        data.table = 'laptop';
        res.render('pages/ClientPage', {
            data: data,
        });
    });
});
router.get('/ClientPage/Monitor', function(req, res) {
    this.client = new Client();
    this.client.getProductInventory('Monitor', function(err, data) {
        data.table = 'monitor';
        res.render('pages/ClientPage', {
            data: data,
        });
    });
});
router.get('/ClientPage/Tablet', function(req, res) {
    this.client = new Client();
    this.client.getProductInventory('Tablet', function(err, data) {
        data.table = 'tablet';
        res.render('pages/ClientPage', {
            data: data,
        });
    });
});

module.exports = router;
