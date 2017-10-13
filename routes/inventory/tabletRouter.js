let express = require('express');
let router = express.Router();

let Tablet = require('../../domain-layer/classes/Tablet');
let TabletMapper = require('../../domain-layer/mappers/TabletMapper');


router.get('/', function(req, res) {
    TabletMapper.findAll(function(err, data) {
        res.render('catalogPages/tabletView', {
            data: data,
        });
    });
});

router.post('/delete', function(req, res) {
    //When ID map is created this will find the desktop in the ID map and delete
    //from the ID map and the UoW will handle the database
    TabletMapper.delete(new Tablet(req.body.id));

    res.send({redirect: "/inventory/tabletView"});
});

router.post('/', function(req, res) {
    let model = req.body.model;
    let brand = req.body.brand;
    let display = req.body.display;
    let processor = req.body.processor;
    let ram = req.body.ram;
    let storage = req.body.storage;
    let cores = req.body.cores;
    let os = req.body.os;
    let battery = req.body.battery;
    let camera = req.body.camera;
    let dimensions = req.body.dimensions;
    let weight = req.body.weight;
    let price = req.body.price;

    // Validation
    req.checkBody('model', 'Can not be empty').notEmpty();
    req.checkBody('brand', 'Can not be empty').notEmpty();
    req.checkBody('display', 'Can not be empty').notEmpty();
    req.checkBody('processor', 'Can not be empty').notEmpty();
    req.checkBody('ram', 'Can not be empty').notEmpty();
    req.checkBody('storage', 'Can not be empty').notEmpty();
    req.checkBody('cores', 'Can not be empty').notEmpty();
    req.checkBody('os', 'Can not be empty').notEmpty();
    req.checkBody('battery', 'Can not be empty').notEmpty();
    req.checkBody('camera', 'Can not be empty').notEmpty();
    req.checkBody('dimensions', 'Can not be empty').notEmpty();
    req.checkBody('weight', 'Can not be empty').notEmpty();
    req.checkBody('price', 'Can not be empty').notEmpty();


    let errors = req.validationErrors();

    if (errors) {
        res.render('catalogPages/tabletView', {
            errors: errors,
        });
    } else {
        let newtablet = new Tablet(model, brand, display, processor, ram, storage, cores, os,
            battery, camera, dimensions, weight, price);

        TabletMapper.insert(newtablet);

        res.redirect('/inventory/tabletView');
    }
});

router.get('/:id/delete', function(req, res) {
    TabletMapper.find(req.params.id, function(err, data) {
        let newtablet = new Tablet(data.model, data.brand, data.display, data.processor, data.ram, data.storage,
            data.cores, data.os, data.battery, data.camera, data.dimensions, data.weight, data.price);

        TabletMapper.delete(newtablet);

        res.redirect('/inventory/tabletView');
    });
});

module.exports = router;
