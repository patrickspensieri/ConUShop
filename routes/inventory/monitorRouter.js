let express = require('express');
let router = express.Router();

let Monitor = require('../../domain-layer/classes/Monitor');
let MonitorMapper = require('../../domain-layer/mappers/MonitorMapper');


router.get('/', function(req, res) {
    MonitorMapper.findAll(function(err, data) {
        res.render('catalogPages/monitorView', {
            data: data,
        });
    });
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

router.get('/:id/delete', function(req, res) {
    MonitorMapper.find(req.params.id, function(err, data) {
        let newmonitor = new Monitor(data.model, data.brand, data.size, data.weight, data.price);

        MonitorMapper.delete(newmonitor);

        res.redirect('/inventory/monitorView');
    });
});

module.exports = router;
