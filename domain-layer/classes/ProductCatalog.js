let Desktop = require('../domain-layer/classes/products/Desktop');
let Laptop = require('../domain-layer/classes/products/Laptop');
let Monitor = require('../domain-layer/classes/products/Monitor');
let Tablet = require('../domain-layer/classes/products/Tablet');
let Television = require('../domain-layer/classes/products/Television');

let desktopMapper = require('../domain-layer/mappers/DesktopMapper');
let laptopMapper = require('../domain-layer/mappers/LaptopMapper');
let monitorMapper = require('../domain-layer/mappers/MonitorMapper');
let tabletMapper = require('../domain-layer/mappers/TabletMapper');
let televisionMapper = require('../domain-layer/mappers/TelevisionMapper');

/**
 * Class describes a ProductCatalog.
 * @class ProductCatalog
 * @export
 */
class ProductCatalog {

    static transactionComplete() {
        this.transactionEnded = true;
    }
    static newTransaction(productType) {
        this.productType = productType;
        this.transactionEnded = false;
    }

    static createProductSpecification(model, brand, processor, ram, storage, cores, dimensions, weight, price, display, os, battery, camera, touch, size) {

        switch(this.productType) {
            case "Desktop":
                this.desktop = new Desktop(model, brand, processor, ram, storage, cores, dimensions, weight, price);
                desktopMapper.insert(this.desktop);
                break;
            case "Laptop":
                this.laptop = new Laptop(model, brand, display, processor, ram, storage, cores, os, battery, camera, touch, dimensions, weight, price);
                laptopMapper.insert(this.laptop);
                break;
            case "Monitor":
                this.monitor = new Monitor(model, brand, size, weight, price);
                monitorMapper.insert(this.monitor);
                break;
            case "Tablet":
                this.tablet = new Tablet(model, brand, display, processor, ram, storage, cores, os, battery, camera, dimensions, weight, price);
                tabletMapper.insert(this.tablet);
                break;
            case "Television":
                this.television = Television(model, brand, dimensions, weight, price);
                televisionMapper.insert(this.television);
                break;
        }

        transactionComplete();
    }

    static updateProductSpecification(model, brand, processor, ram, storage, cores, dimensions, weight, price, display, os, battery, camera, touch, size) {

        let tempProduct = findProductSpecification(model);

        switch(this.productType) {
            case "Desktop":
                desktopMapper.update(tempProduct);
                break;
            case "Laptop":
                laptopMapper.update(tempProduct);
                break;
            case "Monitor":
                monitorMapper.update(tempProduct);
                break;
            case "Tablet":
                tabletMapper.update(tempProduct);
                break;
            case "Television":
                televisionMapper.update(tempProduct);
                break;
        }

        transactionComplete();
    }

    static updateProductSpecification(model, brand, processor, ram, storage, cores, dimensions, weight, price, display, os, battery, camera, touch, size) {

        let tempProduct = findProductSpecification(model);

        switch(this.productType) {
            case "Desktop":
                desktopMapper.delete(tempProduct);
                break;
            case "Laptop":
                laptopMapper.delete(tempProduct);
                break;
            case "Monitor":
                monitorMapper.delete(tempProduct);
                break;
            case "Tablet":
                tabletMapper.delete(tempProduct);
                break;
            case "Television":
                televisionMapper.delete(tempProduct);
                break;
        }

        transactionComplete();
    }

    static findProductSpecification(modelNumber) {
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
