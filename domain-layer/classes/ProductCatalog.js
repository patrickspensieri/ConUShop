let desktopMapper = require('../../domain-layer/mappers/DesktopMapper');
let laptopMapper = require('../../domain-layer/mappers/LaptopMapper');
let monitorMapper = require('../../domain-layer/mappers/MonitorMapper');
let tabletMapper = require('../../domain-layer/mappers/TabletMapper');
let itemMapper = require('../../domain-layer/mappers/ItemMapper');

/**
 * Class describes a ProductCatalog.
 * @class ProductCatalog
 * @export
 */
class ProductCatalog {
    /**
     * @constructor
     * @param {string} productType product Type
     * @param {string} model model number of product.
     * @param {string} brand brand of product.
     * @param {string} processor processor in product.
     * @param {number} ram ram amount in product.
     * @param {number} storage storage size of product.
     * @param {number} cores amount of cores in processor in product.
     * @param {string} dimensions dimensions of product.
     * @param {number} weight weight of product.
     * @param {number} price price of product
     * @param {number} display  size of product screen.
     * @param {string} os operating system of product.
     * @param {string} battery battery information of product.
     * @param {string} camera camera information of product.
     * @param {boolean} touch is display touch or not.
     * @param {string} size is size of product
     */
    addProductSpecification(productType, model, brand, processor, ram, storage, cores, dimensions, weight, price, display, os, battery, camera, touch, size) {
        switch (productType) {
            case 'Desktop':
                this.desktop = desktopMapper.makeNew(model, brand, processor, ram, storage, cores, dimensions, weight, price);
                desktopMapper.insert(this.desktop);
                break;
            case 'Laptop':
                this.laptop = laptopMapper.makeNew(model, brand, display, processor, ram, storage, cores, os, battery, camera, touch, dimensions, weight, price);
                laptopMapper.insert(this.laptop);
                break;
            case 'Monitor':
                this.monitor = monitorMapper.makeNew(model, brand, size, weight, price);
                monitorMapper.insert(this.monitor);
                break;
            case 'Tablet':
                this.tablet = tabletMapper.makeNew(model, brand, display, processor, ram, storage, cores, os, battery, camera, dimensions, weight, price);
                tabletMapper.insert(this.tablet);
                break;
        }
    }
    /**
     * @constructor
     * @param {string} productType product Type
     * @param {string} model model number of product.
     * @param {string} brand brand of product.
     * @param {string} processor processor in product.
     * @param {number} ram ram amount in product.
     * @param {number} storage storage size of product.
     * @param {number} cores amount of cores in processor in product.
     * @param {string} dimensions dimensions of product.
     * @param {number} weight weight of product.
     * @param {number} price price of product
     * @param {number} display  size of product screen.
     * @param {string} os operating system of product.
     * @param {string} battery battery information of product.
     * @param {string} camera camera information of product.
     * @param {boolean} touch is display touch or not.
     * @param {string} size is size of product
     */
    updateProductSpecification(productType, model, brand, processor, ram, storage, cores, dimensions, weight, price, display, os, battery, camera, touch, size) {
        switch (productType) {
            case 'Desktop':
                this.desktop = desktopMapper.makeNew(model, brand, processor, ram, storage, cores, dimensions, weight, price);
                desktopMapper.update(this.desktop);
                break;
            case 'Laptop':
                this.laptop = laptopMapper.makeNew(model, brand, display, processor, ram, storage, cores, os, battery, camera,
                    touch, dimensions, weight, price);
                laptopMapper.update(this.laptop);
                break;
            case 'Monitor':
                this.monitor = monitorMapper.makeNew(model, brand, size, weight, price);
                monitorMapper.update(this.monitor);
                break;
            case 'Tablet':
                this.tablet = tabletMapper.makeNew(model, brand, display, processor, ram, storage, cores, os, battery, camera,
                    dimensions, weight, price);
                tabletMapper.update(this.tablet);
                break;
        }
    }
    /**
     * @constructor
     * @param {string} productType product Type
     * @param {string} modelNumber model number of product.
     */
    deleteProductSpecification(productType, modelNumber) {
        this.getProductSpecification(productType, modelNumber, function callback(err, result) {
            switch (productType) {
                case 'Desktop':
                    desktopMapper.delete(result);
                    break;
                case 'Laptop':
                    laptopMapper.delete(result);
                    break;
                case 'Monitor':
                    monitorMapper.delete(result);
                    break;
                case 'Tablet':
                    tabletMapper.delete(result);
                    break;
            }
        });
    }

    /**
     * @constructor
     * @param {string} productType product Type
     * @param {string} modelNumber model number of product.
     * @param {function} callback function
     */
    getProductSpecification(productType, modelNumber, callback) {
    switch (productType) {
        case 'Desktop':
            desktopMapper.find(modelNumber, function(err, result) {
                if (err) {
                    console.log('Error during desktop find query', null);
                } else {
                    return callback(null, result);
                }
            });
            break;

        case 'Laptop':
            laptopMapper.find(modelNumber, function(err, result) {
                if (err) {
                    console.log('Error during laptop find query', null);
                } else {
                    return callback(null, result);
                }
            });
            break;

        case 'Monitor':
            monitorMapper.find(modelNumber, function(err, result) {
                if (err) {
                    console.log('Error during monitor find query', null);
                } else {
                    return callback(null, result);
                }
            });
            break;
        case 'Tablet':
            tabletMapper.find(modelNumber, function(err, result) {
                if (err) {
                    console.log('Error during tablet find query', null);
                } else {
                    return callback(null, result);
                }
            });
            break;
        }
    }

    /**
     * @constructor
     * @param {string} productType product Type
     * @param {function} callback function
     */
    getAllProductSpecification(productType, callback) {
        switch (productType) {
            case 'Desktop':
                desktopMapper.findAll(function(err, data) {
                    if (err) {
                        throw err;
                    }
                    return callback(null, data);
                });
                break;
            case 'Laptop':
                laptopMapper.findAll(function(err, data) {
                    if (err) {
                        throw err;
                    }
                    return callback(null, data);
                });
                break;
            case 'Monitor':
                monitorMapper.findAll(function(err, data) {
                    if (err) {
                        throw err;
                    }
                    return callback(null, data);
                });
                break;
            case 'Tablet':
                tabletMapper.findAll(function(err, data) {
                    if (err) {
                        throw err;
                    }
                    return callback(null, data);
                });
                break;
        }
    }

    /**
     * @constructor
     * @param {string} serialNumber of product
     * @param {string} modelNumber model number of product specification
     */
    addItem(serialNumber, modelNumber) {
        this.item = itemMapper.makeNew(serialNumber, modelNumber);
        console.log(this.item);
        itemMapper.insert(this.item);
    }

    /**
     * @constructor
     * @param {string} serialNumber of product
     */
    deleteItem(serialNumber) {
        itemMapper.delete(serialNumber);
    }

    /**
     * @constructor
     * @param {function} callback function
     */
    getItems(callback) {
        itemMapper.findAll(function(err, data) {
            if (err) {
                throw err;
            }
            return callback(null, data);
        });
    }
    getAllProductInventory(productType, callback) {
        switch (productType) {
            case 'Desktop':
                desktopMapper.getDesktop(function(err, data) {
                return callback(null, data);
            })
                break;
            case 'Laptop':
                laptopMapper.getLaptop(function(err, data) {
                    return callback(null, data);
                })
                break;
            case 'Monitor':
                monitorMapper.getMonitor(function(err, data) {
                    return callback(null, data);
                })
                break;
            case 'Tablet':
                tabletMapper.getTablet(function(err, data) {
                    return callback(null, data);
                })
                break;
        }
    }
//     getDesktop(callback) {
//         desktopMapper.getDesktop(function(err, data) {
//             return callback(null, data);
//         });
//     }
//     getLaptop(callback) {
//         laptopMapper.getLaptop(function(err, data) {
//             return callback(null, data);
//         });
//     }
//     getMonitor(callback) {
//         monitorMapper.getMonitor(function(err, data) {
//             return callback(null, data);
//         });
//     }
//     getTablet(callback) {
//         tabletMapper.getTablet(function(err, data) {
//             return callback(null, data);
//         });
//     }
}

module.exports = ProductCatalog;
