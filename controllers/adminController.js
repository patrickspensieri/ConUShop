module.exports = {
    dashboard: function(req, res) {
        res.render('admin/dashboard');
    },

    desktop: function(req, res) {
        req.admin.getProductCatalog().getAllProductSpecification('Desktop', function(err, data) {
            res.render('admin/desktop', {
                data: data,
            });
        });
    },

    laptop: function(req, res) {
        req.admin.getProductCatalog().getAllProductSpecification('Laptop', function(err, data) {
            res.render('admin/laptop', {
                data: data,
            });
        });
    },

    monitor: function(req, res) {
        req.admin.getProductCatalog().getAllProductSpecification('Monitor', function(err, data) {
            res.render('admin/monitor', {
                data: data,
            });
        });
    },

    tablet: function(req, res) {
        req.admin.getProductCatalog().getAllProductSpecification('Tablet', function(err, data) {
            res.render('admin/tablet', {
                data: data,
            });
        });
    },

    inventory: function(req, res) {
        req.admin.getProductCatalog().getItems(function(err, data) {
            res.render('admin/inventory', {
                data: data,
            });
        });
    },

    deleteItem: function(req, res) {
        req.admin.getProductCatalog().deleteItem(req.body.serialNumberToRemove);
        res.redirect(req.get('referer'));
    },

    addItem: function(req, res) {
        req.admin.getProductCatalog().addItem(req.body.serialNumber, req.body.modelNumber);
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
            req.admin.getProductCatalog().addProductSpecification(prodType, model, brand, processor, ram, storage, cores, dimensions,
                weight, price, display, os, battery, camera, touch, size);
            res.redirect(req.get('referer'));
        }
    },

    deleteProdSpec: function(req, res) {
        let admin = req.admin;
        admin.getProductCatalog().deleteProductSpecification(req.body.prodType, req.body.model);
        res.send({redirect: req.body.redi});
    },

    updateProdSpec: function(req, res) {
        switch (req.body.prodType) {
            case 'Desktop':
                req.admin.getProductCatalog().updateProductSpecification(req.body.prodType, req.body.model, req.body.brand,
                    req.body.processor, req.body.ram, req.body.storage, req.body.cores,
                    req.body.dimensions, req.body.weight, req.body.price, null, null, null, null, null, null);
                break;
            case 'Laptop':
                req.admin.getProductCatalog().updateProductSpecification(req.body.prodType, req.body.model, req.body.brand, req.body.processor, req.body.ram, req.body.storage,
                    req.body.cores, req.body.dimensions, req.body.weight, req.body.price, req.body.display, req.body.os, req.body.battery, req.body.camera, req.body.touch, null);
                break;
            case 'Monitor':
                req.admin.getProductCatalog().updateProductSpecification(req.body.prodType, req.body.model, req.body.brand, null, null, null, null,
                    null, req.body.weight, req.body.price, null, null, null, null, null, req.body.size);
                break;
            case 'Tablet':
                req.admin.getProductCatalog().updateProductSpecification(req.body.prodType, req.body.model, req.body.brand, req.body.processor, req.body.ram, req.body.storage,
                    req.body.cores, req.body.dimensions, req.body.weight, req.body.price, req.body.display, req.body.os, req.body.battery, req.body.camera, null, null);
                break;
        }
        res.send({redirect: req.body.redi});
    },
};
