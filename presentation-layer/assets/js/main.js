function deleteProdSpec(prodType, modelNumber, redi) {
    $.post({
        url: '/catalog/deleteProdSpec',
        data: {prodType: prodType, modelNumber: modelNumber, redi: redi},
        success: function (response) {
            window.location.href = response.redirect;
        }
    });
}

function updateProdSpec(prodType, data, redi) {
    $.post({
        url: '/catalog/updateProdSpec',
        data: {prodType: prodType, data: data, redi: redi},
        success: function (response) {
            window.location.href = response.redirect;
        }
    });
}

