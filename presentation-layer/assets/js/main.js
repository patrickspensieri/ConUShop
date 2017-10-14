function deleteDesktop(id) {
    $.post({
        url: '/inventory/desktopView/delete',
        data: {id: id},
        success: function(response){
            window.location.href = response.redirect;
        }
    });
}

function deleteMonitor(id) {
    $.post({
        url: '/inventory/monitorView/delete',
        data: {id: id},
        success: function(response){
            window.location.href = response.redirect;
        }
    });
}

function deleteTablet(id) {
    $.post({
        url: '/inventory/tabletView/delete',
        data: {id: id},
        success: function(response){
            window.location.href = response.redirect;
        }
    });
}

function deleteLaptop(id) {
    $.post({
        url: '/inventory/laptopView/delete',
        data: {id: id},
        success: function(response){
            window.location.href = response.redirect;
        }
    });
}