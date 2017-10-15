let express = require('express');
let router = express.Router();

let Desktop = require('../../domain-layer/classes/desktop');
let DesktopMapper = require('../../domain-layer/mappers/desktopMapper');


router.get('/', function(req, res) {
    DesktopMapper.findAll(function(err, data) {
        res.render('catalogPages/desktopView', {
            data: data,
        });
    });
});

router.post('/delete', function(req, res) {
    // When ID map is created this will find the desktop in the ID map and delete
    // from the ID map and the UoW will handle the database
    DesktopMapper.delete(new Desktop(req.body.id));

    res.send({redirect: '/inventory/desktopView'});
});

router.post('/', function(req, res) {
    let model = req.body.model;
    let brand = req.body.brand;
    let processor = req.body.processor;
    let ram = req.body.ram;
    let storage = req.body.storage;
    let cores = req.body.cores;
    let dimensions = req.body.dimensions;
    let weight = req.body.weight;
    let price = req.body.price;

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


    let errors = req.validationErrors();

    if (errors) {
        res.render('catalogPages/desktopView', {
            errors: errors,
        });
    } else {
        let newDesktop = new Desktop(model, brand, processor, ram,
            storage, cores, dimensions, weight, price);

        DesktopMapper.insert(newDesktop);

        res.redirect('/inventory/desktopView');
    }
});

module.exports = router;
