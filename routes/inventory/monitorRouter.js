let express = require('express');
let router = express.Router();

let Monitor = require('../../domain-layer/classes/products/Monitor');
let MonitorMapper = require('../../domain-layer/mappers/MonitorMapper');


router.get('/', function(req, res) {
    MonitorMapper.findAll(function(err, data) {
        res.render('catalogPages/monitorView', {
            data: data,
        });
    });
});

router.post('/delete', function(req, res) {
    //When ID map is created this will find the desktop in the ID map and delete
    //from the ID map and the UoW will handle the database
    MonitorMapper.delete(new Monitor(req.body.id));

    res.send({redirect: "/inventory/monitorView"});
});

router.post('/', function(req, res) {
    let model = req.body.model;
    let brand = req.body.brand;
    let size = req.body.size;
    let weight = req.body.weight;
    let price = req.body.price;

    // Validation
    req.checkBody('model', 'Can not be empty').notEmpty();
    req.checkBody('brand', 'Can not be empty').notEmpty();
    req.checkBody('size', 'Can not be empty').notEmpty();
    req.checkBody('weight', 'Can not be empty').notEmpty();
    req.checkBody('price', 'Can not be empty').notEmpty();


    let errors = req.validationErrors();

    if (errors) {
        res.render('catalogPages/monitorView', {
            errors: errors,
        });
    } else {
        let newmonitor = new Monitor(model, brand, size, weight, price);

        MonitorMapper.insert(newmonitor);

        res.redirect('/inventory/monitorView');
    }
});

module.exports = router;
