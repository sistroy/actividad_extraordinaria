$(document).ready(function() {
    $.ajax({
        url: 'https://cdn.datatables.net/plug-ins/1.11.1/i18n/es_es.json',
        type: 'GET',
        success: function(res) {
            console.log(res)
            $('#example').DataTable({
                language: res   
            });
        }
    });

} );