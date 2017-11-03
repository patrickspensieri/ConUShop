// SORT DESKTOP
let desktopOptions = {
    valueNames: ['model', 'brand', 'ram', 'storage', 'cores', 'weight', 'price'],
};
let desktopList = new List('desktops', desktopOptions);

// SORT LAPTOP
let laptopOptions = {
    valueNames: ['model', 'brand', 'ram', 'storage', 'cores', 'battery', 'camera', 'touch', 'weight', 'price'],
};
let laptopList = new List('laptops', laptopOptions);

// SORT MONITOR
let monitorOptions = {
    valueNames: ['model', 'brand', 'size', 'weight', 'price'],
};
let monitorList = new List('monitors', monitorOptions);

// SORT TABLET
let tabletOptions = {
    valueNames: ['model', 'brand', 'display', 'ram', 'storage', 'cores', 'battery', 'camera', 'weight', 'price'],
};
let tabletList = new List('tablets', tabletOptions);
