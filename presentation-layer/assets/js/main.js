function deleteProdSpec(prodType, modelNumber, redi) {
            $.post({
                url: '/admin/deleteProdSpec',
                data: {
                    prodType: prodType,
                    model: modelNumber,
                    redi: redi
                },
                success: function(response) {
                    window.location.href = response.redirect;
                }
            });
}

function updateProdSpec(prodType, data, redi) {

    let model = data.find('.model').text();
    let brand = data.find('.brand').text();
    let processor = data.find('.processor').text();
    let ram = data.find('.ram').text();
    let storage = data.find('.storage').text();
    let cores = data.find('.cores').text();
    let dimensions = data.find('.dimensions').text();
    let weight = data.find('.weight').text();
    let price = data.find('.price').text();
    let display = data.find('.display').text();
    let os = data.find('.os').text();
    let battery = data.find('.battery').text();
    let camera = data.find('.camera').text();
    let touch = data.find('.touch').text();
    let size = data.find('.size').text();

    switch (prodType) {
        case 'Desktop':
            $.post({
                url: '/admin/updateProdSpec',
                data: {
                    prodType: prodType,
                    model: model,
                    brand: brand,
                    processor: processor,
                    ram: ram,
                    storage: storage,
                    cores: cores,
                    dimensions: dimensions,
                    weight: weight,
                    price: price,
                    redi: redi
                },
                success: function(response) {
                    window.location.href = response.redirect;
                }
            });
            break;
        case 'Laptop':
            $.post({
                url: '/admin/updateProdSpec',
                data: {
                    prodType: prodType,
                    model: model,
                    brand: brand,
                    display: display,
                    processor: processor,
                    ram: ram,
                    storage: storage,
                    cores: cores,
                    os: os,
                    battery: battery,
                    camera: camera,
                    touch: touch,
                    dimensions: dimensions,
                    weight: weight,
                    price: price,
                    redi: redi
                },
                success: function(response) {
                    window.location.href = response.redirect;
                }
            });
            break;
        case 'Monitor':
            $.post({
                url: '/admin/updateProdSpec',
                data: {
                    prodType: prodType,
                    model: model,
                    brand: brand,
                    size: size,
                    weight: weight,
                    price: price,
                    redi: redi
                },
                success: function(response) {
                    window.location.href = response.redirect;
                }
            });
            break;
        case 'Tablet':
            $.post({
                url: '/admin/updateProdSpec',
                data: {
                    prodType: prodType,
                    model: model,
                    brand: brand,
                    display: display,
                    processor: processor,
                    ram: ram,
                    storage: storage,
                    cores: cores,
                    os: os,
                    battery: battery,
                    camera: camera,
                    dimensions: dimensions,
                    weight: weight,
                    price: price,
                    redi: redi
                },
                success: function(response) {
                    window.location.href = response.redirect;
                }
            });
            break;
    }
}
