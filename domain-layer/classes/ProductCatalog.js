let Desktop = require('../../domain-layer/classes/products/Desktop');
let Laptop = require('../../domain-layer/classes/products/Laptop');
let Monitor = require('../../domain-layer/classes/products/Monitor');
let Tablet = require('../../domain-layer/classes/products/Tablet');
let Television = require('../../domain-layer/classes/products/Television');
let Item = require('../../domain-layer/classes/Item');

let desktopMapper = require('../../domain-layer/mappers/DesktopMapper');
let laptopMapper = require('../../domain-layer/mappers/LaptopMapper');
let monitorMapper = require('../../domain-layer/mappers/MonitorMapper');
let tabletMapper = require('../../domain-layer/mappers/TabletMapper');
let televisionMapper = require('../../domain-layer/mappers/TelevisionMapper');
let itemMapper = require('../../domain-layer/mappers/ItemMapper');

/**
 * Class describes a ProductCatalog.
 * @class ProductCatalog
 * @export
 */
class ProductCatalog {

    static createProductSpecification(productType, model, brand, processor, ram, storage, cores, dimensions, weight, price, display, os, battery, camera, touch, size) {

        switch(productType) {
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
                this.television = new Television(model, brand, dimensions, weight, price);
                televisionMapper.insert(this.television);
                break;
        }

    }

    static updateProductSpecification(productType, model, brand, processor, ram, storage, cores, dimensions, weight, price, display, os, battery, camera, touch, size) {

        switch(productType) {
            case "Desktop":
                this.desktop = new Desktop(model, brand, processor, ram, storage, cores, dimensions, weight, price);
                desktopMapper.update(this.desktop);
                break;
            case "Laptop":
                this.laptop = new Laptop(model, brand, display, processor, ram, storage, cores, os, battery, camera, touch, dimensions, weight, price);
                laptopMapper.update(this.laptop);
                break;
            case "Monitor":
                this.monitor = new Monitor(model, brand, size, weight, price);
                monitorMapper.update(this.monitor);
                break;
            case "Tablet":
                this.tablet = new Tablet(model, brand, display, processor, ram, storage, cores, os, battery, camera, dimensions, weight, price);
                tabletMapper.update(this.tablet);
                break;
            case "Television":
                this.television = Television(model, brand, dimensions, weight, price);
                televisionMapper.update(this.television);
                break;
        }
    }

    static deleteProductSpecification(productType, model) {

        this.findProductSpecification(productType, model, function callback(err, result){

            switch(productType) {
                case "Desktop":
                    desktopMapper.delete(result);
                    break;
                case "Laptop":
                    laptopMapper.delete(result);
                    break;
                case "Monitor":
                    monitorMapper.delete(result);
                    break;
                case "Tablet":
                    tabletMapper.delete(result);
                    break;
                case "Television":
                    televisionMapper.delete(result);
                    break;
            }
        });

    }

    static findProductSpecification(productType, modelNumber, callback) {

    switch (productType) {
        case "Desktop":
            desktopMapper.find(modelNumber, function (err, result) {
                if (err) {
                    console.log('Error during desktop find query', null);
                }
                else {
                    return callback(null, result);
                }
            })
            break;

        case "Laptop":
            laptopMapper.find(modelNumber, function (err, result) {
                if (err) {
                    console.log('Error during laptop find query', null);
                }
                else {
                    return callback(null, result);
                }
            })
            break;

        case "Monitor":
            monitorMapper.find(modelNumber, function (err, result) {
                if (err) {
                    console.log('Error during monitor find query', null);
                }
                else {
                    return callback(null, result);
                }
            })
            break;
        case "Tablet":
            tabletMapper.find(modelNumber, function (err, result) {
                if (err) {
                    console.log('Error during tablet find query', null);
                }
                else {
                    return callback(null, result);
                }
            })
            break;
        case "Television":
            televisionMapper.find(modelNumber, function (err, result) {
                if (err) {
                    console.log('Error during television find query', null);
                }
                else {
                    return callback(null, result);
                }
            })
            break;
        }
    }

    static getProductCatalog(prodType, callback)
    {
        switch(prodType) {
            case "Desktop":
                desktopMapper.findAll(function(err, data) {
                    if(err){
                        throw err;
                    }
                    return callback(null, data)
                });
                break;
            case "Laptop":
                laptopMapper.findAll(function(err, data) {
                    if(err){
                        throw err;
                    }
                    return callback(null, data)
                });
                break;
            case "Monitor":
                monitorMapper.findAll(function(err, data) {
                    if(err){
                        throw err;
                    }
                    return callback(null, data)
                });
                break;
            case "Tablet":
                tabletMapper.findAll(function(err, data) {
                    if(err){
                        throw err;
                    }
                    return callback(null, data)
                });
                break;
            case "Television":
                televisionMapper.findAll(function(err, data) {
                    if(err){
                        throw err;
                    }
                    return callback(null, data)
                });
                break;
        }
    }


    static addItem(serialNumber, modelNumber) {
        this.item = new Item(serialNumber, modelNumber);
        console.log(this.item);
        itemMapper.insert(this.item);
    }

    static deleteItem(serialNumber) {
        itemMapper.delete(serialNumber);
    }

    static getItems(callback)
    {
        itemMapper.findAll(function(err, data) {
            if(err){
                throw err;
            }
            return callback(null, data)
        });
    }

}

module.exports = ProductCatalog;
