let inventory = require('../models/viewInventory');

let express = require('express');
let router = express.Router();

let desktop = require('../domain-layer/classes/desktop');

let desktopMapper = require('../domain-layer/mappers/desktopMapper');


router.get('/desktopView', function(req, res) {
    inventory.getDesktopList(function(err, data) {
        /*
        for (let row of data.rows) {
        // Access To all the rows
        }
        */
    res.render('../views/catalogPages/desktopView');
    });
});

router.post('/desktopView', function(req, res) {
    let modelNumber = req.body.modelNumber;
    let brand = req.body.brand;
    let processor = req.body.processor;
    let ram = req.body.ram;
    let hardDrive = req.body.hardDrive;
    let cpuCores = req.body.cpuCores;
    let dimensions = req.body.dimensions;
    let weight = req.body.weight;
    let price = req.body.price;

    // Validation
    req.checkBody('modelNumber', 'Can not be empty').notEmpty();
    req.checkBody('brand', 'Can not be empty').notEmpty();
    req.checkBody('processor', 'Can not be empty').notEmpty();
    req.checkBody('ram', 'Can not be empty').notEmpty();
    req.checkBody('hardDrive', 'Can not be empty').notEmpty();
    req.checkBody('cpuCores', 'Can not be empty').notEmpty();
    req.checkBody('dimensions', 'Can not be empty').notEmpty();
    req.checkBody('weight', 'Can not be empty').notEmpty();
    req.checkBody('price', 'Can not be empty').notEmpty();


    let errors = req.validationErrors();

    if (errors) {
        res.render('desktopView', {
            errors: errors,
        });
    } else {
        let newDesktop = new desktop(modelNumber, brand, processor, ram,
            hardDrive, cpuCores, dimensions, weight, price);

        desktopMapper.insert(newDesktop);

        res.redirect('/inventory/desktopView');
    }
});

module.exports = router;
