// SORT DESKTOP
let desktopOptions = {
    valueNames: ['model', 'brand', 'processor', 'ram', 'storage', 'cores', 'weight', 'price'],
};
let desktopList = new List('desktops', desktopOptions);

// SORT LAPTOP
let laptopOptions = {
    valueNames: ['model', 'brand', 'display', 'os', 'processor', 'ram', 'storage', 'cores', 'battery', 'camera', 'touch', 'weight', 'price'],
};
let laptopList = new List('laptops', laptopOptions);

// SORT MONITOR
let monitorOptions = {
    valueNames: ['model', 'brand', 'size', 'weight', 'price'],
};
let monitorList = new List('monitors', monitorOptions);

// SORT TABLET
let tabletOptions = {
    valueNames: ['model', 'brand', 'display', 'processor', 'ram', 'os', 'storage', 'cores', 'battery', 'camera', 'weight', 'price'],
};
let tabletList = new List('tablets', tabletOptions);

/**
 * Update each table once filter parameters have been changed.
 */
let updateList = function() {
    let brand = $('.brandSelect').val();
    let os = $('.osSelect').val();
    let processor = $('.processorSelect').val();
    let ram = $('.ramSelect').val();
    let storage = $('.storageSelect').val();
    let displayLower = $('.displayLower').val();
    let displayUpper = $('.displayUpper').val();
    let priceUpper = $('.priceUpper').val();
    let priceLower = $('.priceLower').val();
    // let other = $('.otherSelect').val();
    // filter the appropriate list
    getList().filter(function(item) {
        return (_(brand).contains(item.values().brand) || !brand)
        && (_(os).contains(item.values().os) || !os)
        && (_(processor).contains(item.values().processor) || !processor)
        && (_(ram).contains(item.values().ram) || !ram)
        && (_(storage).contains(item.values().storage) || !storage)
        && ((Number(priceLower) < Number(item.values().price)) || !priceLower)
        && ((Number(priceUpper) > Number(item.values().price)) || !priceUpper)
        && ((Number(displayLower) < Number(item.values().display || item.values().size)) || !displayLower)
        && ((Number(displayUpper) > Number(item.values().display || item.values().size)) || !displayUpper);
        // && (_(other).contains('Touch') && (item.values().touch == 'true') || !other)
        // && (_(other).contains('Camera') && (item.values().camera == 'true') || !other);
    });
};

/**
 * Populates the select menus with appropriate items and sets up filters.
 */
$(function() {
    updateList();
    $('.displayLower').change(updateList);
    $('.displayUpper').change(updateList);
    $('.priceLower').change(updateList);
    $('.priceUpper').change(updateList);

    let allBrands = [];
    let allOS = [];
    let allProcessors = [];
    let allRam = [];
    let allStorage = [];
    // let allOther = ['Touch', 'Camera'];

    // uses the underscore library
    _(getList().items).each(function(item) {
        allOS.push(item.values().os);
        allBrands.push(item.values().brand);
        allProcessors.push(item.values().processor);
        allRam.push(item.values().ram);
        allStorage.push(item.values().storage);
    });
    // remove any duplicates from all select properties
    allOS = _(allOS).uniq();
    allBrands = _(allBrands).uniq();
    allProcessors = _(allProcessors).uniq();
    allRam = _(allRam).uniq();
    allStorage = _(allStorage).uniq();
    // populate each select with properties
    _(allBrands).each(function(item) {
        $('.brandSelect').append('<option value="'+item+'">'+ item +'</option>');
    });
    _(allOS).each(function(item) {
        $('.osSelect').append('<option value="'+item+'">'+ item +'</option>');
    });
    _(allProcessors).each(function(item) {
        $('.processorSelect').append('<option value="'+item+'">'+ item +'</option>');
    });
    _(allRam).each(function(item) {
        $('.ramSelect').append('<option value="'+item+'">'+ item +'</option>');
    });
    _(allStorage).each(function(item) {
        $('.storageSelect').append('<option value="'+item+'">'+ item +'</option>');
    });
    // _(allOther).each(function(item) {
    //     $('.otherSelect').append('<option value="'+item+'">'+ item +'</option>');
    // });

    $('select').each(function() {
        $(this).multipleSelect({
            selectAll: false,
            onClick: updateList,
            placeholder: $(this).attr('placeholder'),
        });
    });
});

/**
 * Get the appropriate list.
 * Uses the type attribute added to each product table.
 * @return {Array} appropriate list object
 */
let getList = function() {
    let type = $('#prodTable').attr('type');
    switch (type) {
        case 'desktop':
            return desktopList;
        case 'laptop':
            return laptopList;
        case 'tablet':
            return tabletList;
        case 'monitor':
            return monitorList;
    }
};
