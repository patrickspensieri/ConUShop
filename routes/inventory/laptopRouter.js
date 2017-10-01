let express = require('express');
let router = express.Router();

let Laptop = require('../../domain-layer/classes/Laptop');
let LaptopMapper = require('../../domain-layer/mappers/LaptopMapper');


router.get('/', function(req, res) {
    LaptopMapper.findAll(function(err, data) {
        res.render('catalogPages/laptopView', {
            data: data
        });
    });
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
    let touch = req.body.touch;
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
    req.checkBody('touch', 'Can not be empty').notEmpty();
    req.checkBody('dimensions', 'Can not be empty').notEmpty();
    req.checkBody('weight', 'Can not be empty').notEmpty();
    req.checkBody('price', 'Can not be empty').notEmpty();


    let errors = req.validationErrors();

    if (errors) {
        res.render('catalogPages/laptopView', {
            errors: errors,
        });
    } else {
        let newlaptop = new Laptop(model, brand, display, processor, ram, storage, cores, os,
            battery, camera, touch, dimensions, weight, price);

        LaptopMapper.insert(newlaptop);

        res.redirect('/inventory/laptopView');
    }
});

module.exports = router;
