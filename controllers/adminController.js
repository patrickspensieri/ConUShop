let UserMapper = require('../domain-layer/mappers/UserMapper');
let DesktopMapper = require('../domain-layer/mappers/DesktopMapper');
let LaptopMapper = require('../domain-layer/mappers/LaptopMapper');
let MonitorMapper = require('../domain-layer/mappers/MonitorMapper');
let TabletMapper = require('../domain-layer/mappers/TabletMapper');
let ItemMapper = require('../domain-layer/mappers/ItemMapper');
let {validationResult} = require('express-validator/check');

module.exports = {
    dashboard: function(req, res) {
        res.render('admin/dashboard');
    },

    desktop: function(req, res) {
        req.adminUser.getProductCatalog().getAllProductSpecification('Desktop', function(err, data) {
            res.render('admin/desktop', {
                data: data,
            });
        });
    },

    laptop: function(req, res) {
        req.adminUser.getProductCatalog().getAllProductSpecification('Laptop', function(err, data) {
            res.render('admin/laptop', {
                data: data,
            });
        });
    },

    monitor: function(req, res) {
        req.adminUser.getProductCatalog().getAllProductSpecification('Monitor', function(err, data) {
            res.render('admin/monitor', {
                data: data,
            });
        });
    },

    tablet: function(req, res) {
        req.adminUser.getProductCatalog().getAllProductSpecification('Tablet', function(err, data) {
            res.render('admin/tablet', {
                data: data,
            });
        });
    },

    inventory: function(req, res) {
        req.adminUser.getProductCatalog().getItems(function(err, data) {
            res.render('admin/inventory', {
                data: data,
            });
        });
    },

    clients: function(req, res) {
        UserMapper.findAllClients(function(err, data) {
            res.render('admin/clients', {
                data: data,
            });
        });
     },

    deleteItem: function(req, res) {
        let otherMsg = req.adminUser.getProductCatalog().deleteItem(req.body.serialNumber);
        req.flash('otherSess_msg', otherMsg);
        res.redirect(req.get('referer'));
    },

    addItem: function(req, res) {
        let modelError = false;
        ItemMapper.find(req.body.serialNumber, function(err, result) {
            if (result != null) {
                req.flash('validationErrors', {msg: 'Serial Number ' + req.body.serialNumber + ' already exists!'});
                modelError = true;
            }
        });
        
        if (!modelError) {
            req.checkBody('modelNumber', 'Model Number should not be empty').notEmpty();
            req.checkBody('serialNumber', 'Serial Number should not be empty').notEmpty();
            req.checkBody('serialNumber', 'Serial Number must be alphanumeric (8 to 16 characters)').matches(/^(\w{8,16})$/);
    
            req.validationErrors();
            let errors = validationResult(req).array({onlyFirstError: true});
    
            if (errors.length > 0) {
                req.flash('validationErrors', errors);
            } else {
                req.adminUser.getProductCatalog().addItem(req.body.serialNumber, req.body.modelNumber);
            }
        }
        res.redirect(req.get('referer'));
    },

    addProdSpec: function(req, res) {
        let prodType = req.body.prodType;
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

        let modelError = false;
        switch (prodType) {
            case 'Desktop':
                DesktopMapper.find(model, function(err, result) {
                    if (result != null) {
                        req.flash('validationErrors', {msg: 'Desktop model ' + model + ' already exists!'});
                        modelError = true;
                    }
                });
                break;
            case 'Laptop':
                LaptopMapper.find(model, function(err, result) {
                    if (result != null) {
                        req.flash('validationErrors', {msg: 'Laptop model ' + model + ' already exists!'});
                        modelError = true;
                    }
                });
                break;
            case 'Monitor':
                MonitorMapper.find(model, function(err, result) {
                    if (result != null) {
                        req.flash('validationErrors', {msg: 'Monitor model ' + model + ' already exists!'});
                        modelError = true;
                    }
                });
                break;
            case 'Tablet':
                TabletMapper.find(model, function(err, result) {
                    if (result != null) {
                        req.flash('validationErrors', {msg: 'Tablet model ' + model + ' already exists!'});
                        modelError = true;
                    }
                });
                break;
        }

        if (!modelError) {
            let errors = validateForm(req);

            if (errors.length > 0) {
                req.flash('validationErrors', errors);
            } else {
                req.adminUser.getProductCatalog().addProductSpecification(prodType, model, brand, processor, ram, storage, cores, dimensions,
                    weight, price, display, os, battery, camera, touch, size);
            }
        }

        res.redirect(req.get('referer'));
    },

    deleteProdSpec: function(req, res) {
        let admin = req.adminUser;
        let otherMsg = admin.getProductCatalog().deleteProductSpecification(req.body.prodType, req.body.model);
        req.flash('otherSess_msg', otherMsg);
        res.send({redirect: req.body.redi});
    },

    updateProdSpec: function(req, res) {
        let errors = validateForm(req);

        if (errors.length > 0) {
            req.flash('validationErrors', errors);
        } else {
            switch (req.body.prodType) {
                case 'Desktop':
                    otherMsg=req.adminUser.getProductCatalog().updateProductSpecification(req.body.prodType, req.body.model, req.body.brand,
                        req.body.processor, req.body.ram, req.body.storage, req.body.cores,
                        req.body.dimensions, req.body.weight, req.body.price, null, null, null, null, null, null);
                    break;
                case 'Laptop':
                    otherMsg=req.adminUser.getProductCatalog().updateProductSpecification(req.body.prodType, req.body.model, req.body.brand, req.body.processor, req.body.ram, req.body.storage,
                        req.body.cores, req.body.dimensions, req.body.weight, req.body.price, req.body.display, req.body.os, req.body.battery, req.body.camera, req.body.touch, null);
                    break;
                case 'Monitor':
                    otherMsg=req.adminUser.getProductCatalog().updateProductSpecification(req.body.prodType, req.body.model, req.body.brand, null, null, null, null,
                        null, req.body.weight, req.body.price, null, null, null, null, null, req.body.size);
                    break;
                case 'Tablet':
                    otherMsg=req.adminUser.getProductCatalog().updateProductSpecification(req.body.prodType, req.body.model, req.body.brand, req.body.processor, req.body.ram, req.body.storage,
                        req.body.cores, req.body.dimensions, req.body.weight, req.body.price, req.body.display, req.body.os, req.body.battery, req.body.camera, null, null);
                    break;
            }
            req.flash('otherSess_msg', otherMsg);
        }
        res.send({redirect: req.body.redi});
    },
    startProductCatalogSession: function(req, res) {
        req.adminUser.getProductCatalog().startProductCatalogSession();
        req.flash('sessStart_msg', 'Started Product Catalog Session. You can now make changes to Product Catalog');
        res.send({redirect: req.body.redi});
    },
    endProductCatalogSession: function(req, res) {
        req.adminUser.getProductCatalog().endProductCatalogSession();
        req.flash('sessEnd_msg', 'Ended Product Catalog Session. You can no longer make changes to Product Catalog');
        res.send({redirect: req.body.redi});
    },
};

function validateForm(req) {
    let prodType = req.body.prodType;

    // Model
    req.checkBody('model', 'Model can not be empty').notEmpty();
    req.checkBody('model', 'Model must be alphanumeric').isAlphanumeric().not().isInt();

    // Brand
    req.checkBody('brand', 'Brand can not be empty').notEmpty();
    req.checkBody('brand', 'Brand must only contain letters').matches(/^(\D+)$/);

    // Weight
    req.checkBody('weight', 'Weight can not be empty').notEmpty();
    req.checkBody('weight', 'Weight value must be a positive number (2 decimal points)').matches(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/);

    // Price
    req.checkBody('price', 'Price can not be empty').notEmpty();
    req.checkBody('price', 'Price value must be a positive number (2 decimal points)').matches(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/);

    if (prodType == 'Desktop' || prodType == 'Laptop' || prodType == 'Tablet') {
        // Processor
        req.checkBody('processor', 'Processor can not be empty').notEmpty();
        req.checkBody('processor', 'Processor must be alphanumeric').matches(/^(\D+(\w*\s*\-*)+)$/);

        // Ram
        req.checkBody('ram', 'Ram can not be empty').notEmpty();
        req.checkBody('ram', 'Ram value is impossible').isInt({min: 0}).isDivisibleBy(2).isIn([2, 4, 8, 12, 16, 20, 24, 32, 64]);

        // Storage
        req.checkBody('storage', 'Storage can not be empty').notEmpty();
        req.checkBody('storage', 'Storage value is impossible').isInt({min: 8}).isDivisibleBy(2);

        // Cores
        req.checkBody('cores', 'Cores can not be empty').notEmpty();
        req.checkBody('cores', 'Cores value is impossible').isInt({min: 0}).isDivisibleBy(2).isIn([2, 4, 6, 8, 10, 12, 16]);

        // Dimensions
        req.checkBody('dimensions', 'Dimensions can not be empty').notEmpty();
        req.checkBody('dimensions', 'Dimensions must be of the form "# x # x #"').matches(/^(\d{1,2}(\.\d{1,2})?\sx\s\d{1,2}(\.\d{1,2})?\sx\s\d{1,2}(\.\d{1,2})?)$/);
    }

    if (prodType == 'Tablet' || prodType == 'Laptop') {
        // Display size
        req.checkBody('display', 'Display can not be empty').notEmpty();
        req.checkBody('display', 'Display Size is impossible').isFloat({min: 0}).isIn([7, 7.9, 8, 9, 9.6, 9.7, 10, 10.1, 10.4, 10.5, 10.8, 11, 11.6, 12, 12.1, 12.3, 12.5, 13,
                                                                    13.1, 13.3, 13.5, 14, 14.1, 15, 15.4, 15.5, 15.6, 17, 17.3, 18.4]);


        // Operating system
        req.checkBody('os', 'OS can not be empty').notEmpty();
        req.checkBody('os', 'OS must be alphanumeric').matches(/^(\D+(\w*\s*)+)$/);

        // Battery
        req.checkBody('battery', 'Battery can not be empty').notEmpty();
        req.checkBody('battery', 'Battery value must be positive').isFloat({min: 0});

        req.checkBody('camera', 'Camera can not be empty').notEmpty();
    }

    switch (prodType) {
        case 'Desktop':
            // Model Number
            req.checkBody('model', 'Provided model number format is not supported. Format must be : DES##').matches(/^DES\d{1,7}$/);
            break;
        case 'Laptop':
            // Model Number
            req.checkBody('model', 'Provided model number format is not supported. Format must be : LAP##').matches(/^LAP\d{1,7}$/);

            // Touch
            req.checkBody('touch', 'Touch can not be empty').notEmpty();
            req.checkBody('touch', 'Touch must be true or false').isBoolean();

            // Camera
            req.checkBody('camera', 'Camera must be true or false').isBoolean();
            break;
        case 'Monitor':
            // Model Number
            req.checkBody('model', 'Provided model number format is not supported. Format must be : MON##').matches(/^MON\d{1,7}$/);

            // Size
            req.checkBody('size', 'Size can not be empty').notEmpty();
            req.checkBody('size', 'Size is impossible').isFloat({min: 0}).isIn([5, 7, 10, 10.1, 10.4, 13.3, 14, 14.4, 15, 15.6, 16, 17, 17.3, 18.5, 18.9, 19,
                                                                    19.1, 19.5, 20, 20.7, 21, 21.3, 21.5, 22, 23, 23.6, 23.8, 24, 24.1, 25, 24.5,
                                                                    27, 28, 28.8, 29, 29.5, 30, 31, 31.5, 32]);
            break;
        case 'Tablet':
            // Model Number
            req.checkBody('model', 'Provided model number format is not supported. Format must be : TAB##').matches(/^TAB\d{1,7}$/);
            req.checkBody('camera', 'Camera value is impossible').isInt({min: 0});
            break;
    }
    req.validationErrors();
    let errors = validationResult(req).array({onlyFirstError: true});
    return errors;
};
