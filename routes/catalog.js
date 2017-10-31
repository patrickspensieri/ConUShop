let express = require('express');
let router = new express.Router();
let Admin = require('../domain-layer/classes/Admin');
let Client = require('../domain-layer/classes/Client');
let accountController = require('../presentation-layer/controllers/accountController');


// Get Dashboard
router.get('/adminDashboard',
    accountController.ensureAdministrator, function(req, res) {
    this.admin = new Admin();
    res.render('pages/adminDashboard');
});

router.get('/desktopView', accountController.ensureAdministrator, function(req, res) {
    this.admin = new Admin();

    this.admin.getProductCatalog().getAllProductSpecification('Desktop', function(err, data) {
        res.render('catalogPages/desktopView', {
            data: data,
        });
    });
});

router.get('/itemsView', accountController.ensureAdministrator, function(req, res) {
    this.admin.getProductCatalog().getItems(function(err, data) {
        res.render('catalogPages/itemsView', {
            data: data,
        });
    });
});


router.post('/deleteItem', accountController.ensureAdministrator, function(req, res) {
    this.admin.getProductCatalog().deleteItem(req.body.serialNumberToRemove);
    res.redirect(req.get('referer'));
});

router.post('/addItem', accountController.ensureAdministrator, function(req, res) {
    this.admin.getProductCatalog().addItem(req.body.serialNumber, req.body.modelNumber);
    res.redirect(req.get('referer'));
});

router.post('/addProdSpec', accountController.ensureAdministrator, function(req, res) {
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
        this.admin.getProductCatalog().addProductSpecification(prodType, model, brand, processor, ram, storage, cores, dimensions,
            weight, price, display, os, battery, camera, touch, size);
        res.redirect(req.get('referer'));
    }
});

router.post('/deleteProdSpec', accountController.ensureAdministrator, function(req, res) {
    console.log(req.body.model);
    this.admin.getProductCatalog().deleteProductSpecification(req.body.prodType, req.body.model);
    res.send({redirect: req.body.redi});
});

router.post('/updateProdSpec', accountController.ensureAdministrator, function(req, res) {
    switch (req.body.prodType) {
        case 'Desktop':
            this.admin.getProductCatalog().updateProductSpecification(req.body.prodType, req.body.model, req.body.brand,
                req.body.processor, req.body.ram, req.body.storage, req.body.cores,
                req.body.dimensions, req.body.weight, req.body.price, null, null, null, null, null, null);
            break;
        case 'Laptop':
            this.admin.getProductCatalog().updateProductSpecification(req.body.prodType, req.body.model, req.body.brand, req.body.processor, req.body.ram, req.body.storage,
                req.body.cores, req.body.dimensions, req.body.weight, req.body.price, req.body.display, req.body.os, req.body.battery, req.body.camera, req.body.touch, null);
            break;
        case 'Monitor':
            this.admin.getProductCataloge().updateProductSpecification(req.body.prodType, req.body.model, req.body.brand, null, null, null, null,
                null, req.body.weight, req.body.price, null, null, null, null, null, req.body.size);
            break;
        case 'Tablet':
            this.admin.getProductCatalog().updateProductSpecification(req.body.prodType, req.body.model, req.body.brand, req.body.processor, req.body.ram, req.body.storage,
                req.body.cores, req.body.dimensions, req.body.weight, req.body.price, req.body.display, req.body.os, req.body.battery, req.body.camera, null, null);
            break;
    }
    res.send({redirect: req.body.redi});
});

router.get('/laptopView', accountController.ensureAdministrator, function(req, res) {
    this.admin.getProductCatalog().getAllProductSpecification('Laptop', function(err, data) {
        res.render('catalogPages/laptopView', {
            data: data,
        });
    });
});

router.get('/monitorView', accountController.ensureAdministrator, function(req, res) {
    this.admin.getProductCatalog().getAllProductSpecification('Monitor', function(err, data) {
        res.render('catalogPages/monitorView', {
            data: data,
        });
    });
});

router.get('/tabletView', accountController.ensureAdministrator, function(req, res) {
    this.admin.getProductCatalog().getAllProductSpecification('Tablet', function(err, data) {
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
    console.log('client desktop');
    this.client.getProductCatalog().getDesktop(function(err, data) {
        data.table = 'desktop';
        res.render('pages/ClientPage', {
            data: data,
        });
    });
});

router.get('/ClientPage/Laptop', function(req, res) {
    this.client = new Client();
    console.log('client laptop');
    this.client.getProductCatalog().getLaptop(function(err, data) {
        data.table = 'laptop';
        res.render('pages/ClientPage', {
            data: data,
        });
    });
});

router.get('/ClientPage/Monitor', function(req, res) {
    this.client = new Client();
    console.log('client monitor');
    this.client.getProductCatalog().getMonitor(function(err, data) {
        data.table = 'monitor';
        res.render('pages/ClientPage', {
            data: data,
        });
    });
});

router.get('/ClientPage/Tablet', function(req, res) {
    this.client = new Client();
    console.log('client tablet');
    this.client.getProductCatalog().getTablet(function(err, data) {
        data.table = 'tablet';
        res.render('pages/ClientPage', {
            data: data,
        });
    });
});

module.exports = router;
