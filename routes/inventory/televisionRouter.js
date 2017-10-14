let express = require('express');
let router = express.Router();

let Television = require('../../core/products/Television');
let TelevisionMapper = require('../../mapping/TelevisionMapper');


router.get('/', function(req, res) {
    TelevisionMapper.findAll(function(err, data) {
        res.render('catalogPages/televisionView', {
            data: data,
        });
    });
});

router.post('/delete', function(req, res) {
    //When ID map is created this will find the desktop in the ID map and delete
    //from the ID map and the UoW will handle the database
    TelevisionMapper.delete(new Television(req.body.id));

    res.send({redirect: "/inventory/televisionView"});
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

module.exports = router;
