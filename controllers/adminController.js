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

    deleteItemFromCatalog: function(req, res) {
        let warningMsg = req.adminUser.getProductCatalog().deleteItemFromCatalog(req.body.serialNumber);
        req.flash('warning_msg', warningMsg);
        res.redirect(req.get('referer'));
    },

    addItemToCatalog: function(req, res) {
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
                let warningMsg = req.adminUser.getProductCatalog().addItemToCatalog(req.body.serialNumber, req.body.modelNumber);
                req.flash('warning_msg', warningMsg);
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
                let warningMsg = req.adminUser.getProductCatalog().addProductSpecification(prodType, model, brand, processor, ram, storage, cores, dimensions,
                    weight, price, display, os, battery, camera, touch, size);
                req.flash('warning_msg', warningMsg);

            }
        }

        res.redirect(req.get('referer'));
    },

    deleteProdSpec: function(req, res) {
        let admin = req.adminUser;
        let warningMsg = admin.getProductCatalog().deleteProductSpecification(req.body.prodType, req.body.model);
        req.flash('warning_msg', warningMsg);
        res.send({redirect: req.body.redi});
    },

    updateProdSpec: function(req, res) {
        let errors = validateForm(req);
        let warningMsg=null;
        if (errors.length > 0) {
            req.flash('validationErrors', errors);
        } else {
            if (idMap.get(req.body.prodType, req.body.model) !== null) {
                let idMapVersion = parseInt(idMap.get(req.body.prodType, req.body.model).version);
                let clientVersion = parseInt(req.body.version);
                let isSessionComplete = req.adminUser.getProductCatalog().productCatalogSessionIsComplete();
                let isVersion = idMapVersion === clientVersion;
                switch (req.body.prodType) {
                    case 'Desktop':
                        otherMsg = req.adminUser.getProductCatalog().updateProductSpecification(req.body.prodType, req.body.model, req.body.brand,
                            req.body.processor, req.body.ram, req.body.storage, req.body.cores,
                            req.body.dimensions, req.body.weight, req.body.price, null, null, null, null, null, null, req.body.version);
                        break;
                    case 'Laptop':
                        otherMsg = req.adminUser.getProductCatalog().updateProductSpecification(req.body.prodType, req.body.model, req.body.brand, req.body.processor, req.body.ram, req.body.storage,
                            req.body.cores, req.body.dimensions, req.body.weight, req.body.price, req.body.display, req.body.os, req.body.battery, req.body.camera, req.body.touch, null, req.body.version);
                        break;
                    case 'Monitor':
                        otherMsg = req.adminUser.getProductCatalog().updateProductSpecification(req.body.prodType, req.body.model, req.body.brand, null, null, null, null,
                            null, req.body.weight, req.body.price, null, null, null, null, null, req.body.size, req.body.version);
                        break;
                    case 'Tablet':
                        otherMsg = req.adminUser.getProductCatalog().updateProductSpecification(req.body.prodType, req.body.model, req.body.brand, req.body.processor, req.body.ram, req.body.storage,
                            req.body.cores, req.body.dimensions, req.body.weight, req.body.price, req.body.display, req.body.os, req.body.battery, req.body.camera, null, null, req.body.version);
                        break;
                }
                if (isSessionComplete) {
                    if (isVersion) {
                        req.flash('success_msg', otherMsg);
                    } else {
                        req.flash('error_msg', otherMsg);
                    }
                } else {
                    req.flash('otherSess_msg', otherMsg);
                }
            } else {
                req.flash('error_msg', 'Object no longer exists, Product Specification is not current');
            }
            req.flash('warning_msg', warningMsg);
        }
        res.send({redirect: req.body.redi});
    },
    startProductCatalogSession: function(req, res) {
        let msg = req.adminUser.getProductCatalog().startProductCatalogSession();
        req.flash('sessStart_msg', msg);
        res.send({redirect: req.body.redi});
    },
    endProductCatalogSession: function(req, res) {
        let msg = req.adminUser.getProductCatalog().endProductCatalogSession();
        req.flash('sessEnd_msg', msg);
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
        req.checkBody('ram', 'Ram value should be a positive whole number').isInt({min: 1});

        // Storage
        req.checkBody('storage', 'Storage can not be empty').notEmpty();
        req.checkBody('storage', 'Storage value should be a positive whole number').isInt({min: 1});

        // Cores
        req.checkBody('cores', 'Cores can not be empty').notEmpty();
        req.checkBody('cores', 'Cores value should be a positive whole number').isInt({min: 1});

        // Dimensions
        req.checkBody('dimensions', 'Dimensions can not be empty').notEmpty();
        req.checkBody('dimensions', 'Dimensions must be of the form "# x # x #"').matches(/^(\d{1,2}(\.\d{1,2})?\sx\s\d{1,2}(\.\d{1,2})?\sx\s\d{1,2}(\.\d{1,2})?)$/);
    }

    if (prodType == 'Tablet' || prodType == 'Laptop') {
        // Display size
        req.checkBody('display', 'Display can not be empty').notEmpty();
        req.checkBody('display', 'Display Size should be a positive number').isFloat({min: 0});


        // Operating system
        req.checkBody('os', 'OS can not be empty').notEmpty();
        req.checkBody('os', 'OS must be alphanumeric').matches(/^(\D+(\w*\s*)+)$/);

        // Battery
        req.checkBody('battery', 'Battery can not be empty').notEmpty();
        req.checkBody('battery', 'Battery value should be a positive whole number').isInt({min: 1});

        req.checkBody('camera', 'Camera can not be empty').notEmpty();
    }

    switch (prodType) {
        case 'Desktop':
            // Model Number
            req.checkBody('model', 'Provided model number format is not supported. Format must be : DESX where X is an alphanumeric model number (max length 7)').matches(/^DES[a-zA-Z0-9]{1,7}$/);
            break;
        case 'Laptop':
            // Model Number
            req.checkBody('model', 'Provided model number format is not supported. Format must be : LAPX where X is an alphanumeric model number (max length 7)').matches(/^LAP[a-zA-Z0-9]{1,7}$/);

            // Touch
            req.checkBody('touch', 'Touch can not be empty').notEmpty();
            req.checkBody('touch', 'Touch must be true or false').isBoolean();

            // Camera
            req.checkBody('camera', 'Camera must be true or false').isBoolean();
            break;
        case 'Monitor':
            // Model Number
            req.checkBody('model', 'Provided model number format is not supported. Format must be : MONX where X is an alphanumeric model number (max length 7)').matches(/^MON[a-zA-Z0-9]{1,7}$/);

            // Size
            req.checkBody('size', 'Size can not be empty').notEmpty();
            req.checkBody('size', 'Size value should be a positive number').isFloat({min: 0});
            break;
        case 'Tablet':
            // Model Number
            req.checkBody('model', 'Provided model number format is not supported. Format must be : TABX where X is an alphanumeric model number (max length 7)').matches(/^TAB[a-zA-Z0-9]{1,7}$/);
            req.checkBody('camera', 'Camera value should be a positive whole number').isInt({min: 1});
            break;
    }
    req.validationErrors();
    let errors = validationResult(req).array({onlyFirstError: true});
    return errors;
};
