let UserMapper = require('../domain-layer/mappers/UserMapper');

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
        req.checkBody('modelNumber', 'Model Number should not be empty').notEmpty();
        req.checkBody('serialNumber', 'Serial Number should not be empty').notEmpty();

        req.adminUser.getProductCatalog().addItem(req.body.serialNumber, req.body.modelNumber);

        let errors = req.validationErrors();
        if (errors) {
            req.flash('validationErrors', errors);
        }

        res.redirect(req.get('referer'));
    },

    addProdSpec: function(req, res) {
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

        req.checkBody('model', 'Model can not be empty').notEmpty();
        req.checkBody('brand', 'Brand can not be empty').notEmpty();
        req.checkBody('weight', 'Weight can not be empty').notEmpty();
        req.checkBody('price', 'Price can not be empty').notEmpty();

        if (prodType == 'Desktop' || prodType == 'Laptop' || prodType == 'Tablet') {
            req.checkBody('processor', 'Processor can not be empty').notEmpty();
            req.checkBody('ram', 'Ram can not be empty').notEmpty();
            req.checkBody('storage', 'Storage can not be empty').notEmpty();
            req.checkBody('cores', 'Cores can not be empty').notEmpty();
            req.checkBody('dimensions', 'Dimensions can not be empty').notEmpty();
        }

        if (prodType == 'Tablet' || prodType == 'Laptop') {
            req.checkBody('display', 'Display can not be empty').notEmpty();
            req.checkBody('os', 'OS can not be empty').notEmpty();
            req.checkBody('battery', 'Battery can not be empty').notEmpty();
            req.checkBody('camera', 'Camera can not be empty').notEmpty();
        }

        if (prodType == 'Laptop') {
            req.checkBody('touch', 'Touch can not be empty').notEmpty();
        }

        if (prodType == 'Monitor') {
            req.checkBody('size', 'Size can not be empty').notEmpty();
        }

        let errors = req.validationErrors();
        if (errors) {
            req.flash('validationErrors', errors);
        } else {
            req.adminUser.getProductCatalog().addProductSpecification(prodType, model, brand, processor, ram, storage, cores, dimensions,
                weight, price, display, os, battery, camera, touch, size);
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
        let otherMsg;
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
