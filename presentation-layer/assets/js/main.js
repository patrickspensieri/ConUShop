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
$( document ).ready(function() {
    $('#productCatalog').modal({
        keyboard: true,
        backdrop: 'static',
        show: false,
    }).on('show.bs.modal', function() {
        let prodType = $(event.target).closest('tr').data('value');
        let row = $(event.target).closest('tr');
        detailsView(row, prodType);

        $(this).find('.prod-next').click(function() {
            if (row.next().length>0) {
                row = row.next('tr');
                detailsView(row, prodType);
            }
        });

        $(this).find('.prod-prev').click(function() {
            if (row.prev().length>0) {
                row = row.prev('tr');
                detailsView(row, prodType);
            }
        });
    });

    function detailsView(row, prodType) {
        let model = row.find('td.model').text();
        let brand = row.find('td.brand').text();
        let processor = row.find('td.processor').text();
        let ram = row.find('td.ram').text();
        let storage = row.find('td.storage').text();
        let cores = row.find('td.cores').text();
        let dimensions = row.find('td.dimensions').text();
        let weight = row.find('td.weight').text();
        let price = row.find('td.price').text();
        let display = row.find('td.display').text();
        let os = row.find('td.os').text();
        let battery = row.find('td.battery').text();
        let camera = row.find('td.camera').text();
        let touch = row.find('td.touch').text();
        let size = row.find('td.size').text();

        switch (prodType) {
            case 'Desktop':
                $('#productCatalog').find('#productDetails').html($(
                    '<b> Model: </b>'+ model +'</br>'+
                    '<b> Brand: </b>'+ brand +'</br>' +
                    '<b> Processor: </b>'+ processor +'<br>' +
                    '<b> Ram: </b>'+ ram +'</br>' +
                    '<b> Storage: </b>'+ storage +'<br>' +
                    '<b> Cores: </b>' + cores + '<br/>' +
                    '<b> Dimensions: </b>'+ dimensions +'</br>' +
                    '<b> Weight: </b>' + weight + '</br>' +
                    '<b> Price: </b>'+ price +'</br>'));
                break;
            case 'Laptop':
                $('#productCatalog').find('#productDetails').html($(
                    '<b> Model: </b>' + model +'</br>' +
                    '<b> Brand: </b>' + brand +'</br>' +
                    '<b> Display: </b>' + display +'</br>' +
                    '<b> Processor: </b>' + processor +'</br>' +
                    '<b> Ram: </b>' + ram +'</br>' +
                    '<b> Storage: </b>' + storage +'</br>' +
                    '<b> Cores: </b>' + cores +'</br>' +
                    '<b> OS: </b>' + os +'</br>' +
                    '<b> Battery: </b>' + battery +'</br>' +
                    '<b> Camera: </b>' + camera +'</br>' +
                    '<b> Touch: </b>' + touch +'</br>' +
                    '<b> Dimensions: </b>' + dimensions +'</br>' +
                    '<b> Weight: </b>' + weight +'</br>' +
                    '<b> Price: </b>' + price +'</br>'));
                break;
            case 'Monitor':
                $('#productCatalog').find('#productDetails').html($(
                    '<b> Model: </b>' + model +'</br>' +
                    '<b> Brand: </b>' + brand +'</br>' +
                    '<b> Size: </b>' + size +'</br>' +
                    '<b> Weight:  </b>' + weight +'</br>' +
                    '<b> Price:  </b>'+ price +'</br>'));
                break;
            case 'Tablet':
                $('#productCatalog').find('#productDetails').html($(
                    '<b> Model: </b>'+ model +'</br>' +
                    '<b> Brand: </b>'+ brand +'</br>' +
                    '<b> Display: </b>'+ display +'</br>' +
                    '<b> Processor: </b>'+ processor +'</br>' +
                    '<b> Ram: </b>'+ ram +'</br>' +
                    '<b> Storage:  </b>'+ storage +'</br>' +
                    '<b> Cores:  </b>'+ cores +'</br>' +
                    '<b> OS: </b>'+ os +'</br>' +
                    '<b> Battery: </b>'+ battery +'</br>' +
                    '<b> Camera: </b>'+ camera +'</br>' +
                    '<b> Dimensions: </b>'+ dimensions +'</br>' +
                    '<b> Weight: </b>'+ weight +'</br>' +
                    '<b> Price: </b>'+ price));
                break;
        }
    }

});

