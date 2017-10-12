let express = require('express');
let router = express.Router();

let Television = require('../../domain-layer/classes/Television');
let TelevisionMapper = require('../../domain-layer/mappers/TelevisionMapper');


router.get('/', function(req, res) {
    TelevisionMapper.findAll(function(err, data) {
        res.render('catalogPages/televisionView', {
            data: data,
        });
    });
});

router.post('/', function(req, res) {
    let model = req.body.model;
    let brand = req.body.brand;
    let dimensions = req.body.dimensions;
    let weight = req.body.weight;
    let price = req.body.price;

    // Validation
    req.checkBody('model', 'Can not be empty').notEmpty();
    req.checkBody('brand', 'Can not be empty').notEmpty();
    req.checkBody('dimensions', 'Can not be empty').notEmpty();
    req.checkBody('weight', 'Can not be empty').notEmpty();
    req.checkBody('price', 'Can not be empty').notEmpty();


    let errors = req.validationErrors();

    if (errors) {
        res.render('catalogPages/televisionView', {
            errors: errors,
        });
    } else {
        let newtelevision = new Television(model, brand, dimensions, weight, price);

        TelevisionMapper.insert(newtelevision);

        res.redirect('/inventory/televisionView');
    }
});

router.get('/:id/delete', function(req, res) {
    TelevisionMapper.find(req.params.id, function(err, data) {
        let newtelevision = new Television(data.model, data.brand, data.dimensions, data.weight, data.price);

        TelevisionMapper.delete(newtelevision);

        res.redirect('/inventory/televisionView');
    });
});

module.exports = router;
