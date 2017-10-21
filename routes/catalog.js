let express = require('express');
let router = new express.Router();
let Admin = require('../domain-layer/classes/Admin');
let User = require('../domain-layer/classes/User');
let Client = require('../domain-layer/classes/Client');
let UserMapper = require('../domain-layer/mappers/UserMapper');

// Get Dashboard
router.get('/adminDashboard', ensureAuthenticated, function(req, res) {
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
    this.admin.getProductCatalogInstance().deleteProductSpecification(req.body.prodType, req.body.modelNumber);
    res.send({redirect: req.body.redi});
});

router.post('/updateProdSpec', function(req, res) {
    /*
    let rows = document.getElementById("prodTable").rows[req.body.data].innerHTML;
    console.log(rows[0]);
    console.log(rows[1]);
    console.log(rows[2]);
    console.log(rows[3]);

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
    }
    res.send({redirect: req.body.redi});
    */
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

/**
 * Ensure the user is logged in and prevent him from accessing pages
 * @param  {path} req
 * @param  {path} res
 * @param  {path} next
 */
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        UserMapper.find(req.user.email, function(err, user) {
            if (err) {
                throw err;
            }

            if (user.isAdmin) {
                return next();
            } else {
                res.redirect('/account/TempClientPage');
            }
        });
    } else {
        res.redirect('/');
    }
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~testing~~~~~~~~~~~~~~~~~~~~~~~~~
router.get('/TempClientPage', function(req, res) {
    this.client = new Client();
    console.log("test");
    this.client.getDesktop(function (err, data) {
        res.render('pages/TempClientPage', {
            data: data,
        });
    });
});
// router.get('/TempClientPage', function(req, res) {
//     res.render('pages/TempClientPage');
// });
module.exports = router;
