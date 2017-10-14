let Desktop = require('../domain-layer/classes/products/desktop');
let Laptop = require('../domain-layer/classes/products/laptop');
let Monitor = require('../domain-layer/classes/products/monitor');
let Tablet = require('../domain-layer/classes/products/tablet');
let Television = require('../domain-layer/classes/products/television');

let desktopMapper = require('../domain-layer/mappers/desktopMapper');
let laptopMapper = require('../domain-layer/mappers/laptopMapper');
let monitorMapper = require('../domain-layer/mappers/monitorMapper');
let tabletMapper = require('../domain-layer/mappers/tabletMapper');
let televisionMapper = require('../domain-layer/mappers/televisionMapper');

/**
 * Class describes a ProductCatalog.
 * @class ProductCatalog
 * @export
 */
class ProductCatalog {


    constructor() {
        this.transactionEnded = false;
    }

    static  transactionComplete() {
        transactionEnded = true;
    }
    static newTransaction(productType) {

        let prodType = modelNumber.substring(0,2);

        switch(prodType) {
            case "Desktop":
                this.desktop = new Desktop(model, brand, processor, ram, storage, cores, dimensions, weight, price);
                break;
            case "Laptop":
                this.laptop = new Laptop(model, brand, display, processor, ram, storage, cores, os, battery, camera, touch, dimensions, weight, price);
                break;
            case "Monitor":
                this.monitor = new Monitor(model, brand, size, weight, price);
                break;
            case "Tablet":
                this.tablet = new Tablet(model, brand, display, processor, ram, storage, cores, os, battery, camera, dimensions, weight, price);
                break;
            case "television":
                this.television = Television(model, brand, dimensions, weight, price);
                break;
        }
        return transactionEnded;
    }

    static createDesktop(model, brand, processor, ram, storage, cores, dimensions, weight, price) {
        desktop = new Desktop(model, brand, processor, ram, storage, cores, dimensions, weight, price);
        desktopMapper.insert(desktop);
    }

    static createLaptop(model, brand, display, processor, ram, storage, cores, os, battery, camera, touch, dimensions, weight, price) {
        laptop = new Laptop(model, brand, display, processor, ram, storage, cores, os, battery, camera, touch, dimensions, weight, price);
        laptopMapper.insert(laptop);
    }

    static createMonitor(model, brand, size, weight, price) {
        monitor = new Monitor(model, brand, size, weight, price);
        monitorMapper.insert(monitor);
    }

    static createTablet(model, brand, display, processor, ram, storage, cores, os, battery, camera, dimensions, weight, price) {
        tablet = new Tablet(model, brand, display, processor, ram, storage, cores, os, battery, camera, dimensions, weight, price);
        tabletMapper.insert(tablet);
    }

    static createTelevision(model, brand, dimensions, weight, price) {
        television = Television(model, brand, dimensions, weight, price);
        televisionMapper.insert(television);
    }

    static findProductSpecification(modelNumber)
{
    let prodType = modelNumber.substring(0, 2);

    switch (prodType) {
        case "DS":
            desktopMapper.find(modelNumber, function (err, result) {
                if (err) {
                    console.log('Error during desktop find query', null);
                }
                else {
                    return result;
                }
            })
            break;

        case "LP":
            laptopMapper.find(modelNumber, function (err, result) {
                if (err) {
                    console.log('Error during laptop find query', null);
                }
                else {
                    return result;
                }
            })
            break;

        case "MN":
            monitorMapper.find(modelNumber, function (err, result) {
                if (err) {
                    console.log('Error during monitor find query', null);
                }
                else {
                    return result;
                }
            })
            break;
        case "TB":
            tabletMapper.find(modelNumber, function (err, result) {
                if (err) {
                    console.log('Error during tablet find query', null);
                }
                else {
                    return result;
                }
            })
            break;
        case "TV":
            televisionMapper.find(modelNumber, function (err, result) {
                if (err) {
                    console.log('Error during television find query', null);
                }
                else {
                    return result;
                }
            })
            break;
        }

    }
}

module.exports = ProductCatalog;
