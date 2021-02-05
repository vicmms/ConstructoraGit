var table = null;
var validator = null;

$(document).ready(function () {

    table = $('#tablaDispositivos').DataTable({
        "pagingType": "full_numbers",
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        responsive: true,
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Busqueda...",
            decimal: "",
            emptyTable: "No hay información",
            info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
            infoFiltered: "(Filtro de _MAX_ total)",
            infoPostFix: "",
            thousands: ",",
            lengthMenu: "Mostrar _MENU_ Entradas",
            loadingRecords: "Cargando...",
            processing: "Procesando...",
            search: "Buscar:",
            zeroRecords: "Sin resultados encontrados",
            paginate: {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Sig",
                "previous": "Ant"
            }
        },
        "columnDefs": [
            {
                "targets": [ 0 ],
                "visible": false,   
                "searchable": false
            }
        ]
    });

    $('#btn-nuevo-rep').on('click', function () {
        $('#frm-registrar')[0].reset();
        $('#modal-title').text("Nuevo recolector");
        $("div.edit-hidden").show();
    });

    //Submit form registrar
    $('#modal-btn-save').on('click', function () {
        $('#frm-registrar').submit();
        $('#claveRepartidor').val(0);
    });
    
    validator = $('#frm-registrar').validate({
        submitHandler: function (form) {
            guardarDispositivos();
        }
    });
    getDispositivos();

    // Edit record
    table.on('click', '.edit', function () {
        $('#frm-registrar')[0].reset();
        $tr = $(this).parents('tr');
        //Si la tabla esta collapsada (se creo un nuevo tr con clase child)tomamos el tr previo
        if ($tr.hasClass('child')) {
            $tr = $tr.prev();
        }
        var data = table.row($tr).data();
        trT = $tr;
        //visibles
        $('#claveDispositivo').val(data[0]);
        $('#claveVehiculo').val(data[1]).change();
        $('#imei').val(data[4]);
        $('#telefono').val(data[5]);
       

        $('div.edit-hidden').hide();
        $('#modalDispositivo').modal('show');
        $('h4#modal-title').text("Editar dispositivo");       

    });

    // delete record
    /*table.on( 'click', '.deleted', function (e) {
        $tr = $(this).parents('tr');
       //Si la tabla esta collapsada (se creo un nuevo tr con clase child)tomamos el tr previo
       if ($tr.hasClass('child')) {
           $tr = $tr.prev();
       }
       var data = table.row($tr).data();
       borrarRecolector(data[0]);
       e.preventDefault();
    });*/




});
function getDispositivos() {
    var tableData = new Array();
    $.ajax({
        type: 'POST',
        url: '../getDispositivos',
        dataType: 'json',
        data: {
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (response) {
            console.log(response);
            var data = response;
            var x = 0;
            var numCoor = 0;
            for (var i = 0; i < data.length; i++) {
                tableData[x] = new Array()
                numCoor++;
                tableData[x][0] = data[i]['claveDispositivo'];
                tableData[x][1] = data[i]['claveVehiculo'];
                tableData[x][2] = data[i]['noInterno'];
                tableData[x][3] = data[i]['Placas'];
                tableData[x][4] = data[i]['imei'];
                tableData[x][5] = data[i]['telefono'];
                tableData[x][6] = data[i]['passTelcel'];                
                tableData[x][7] = data[i]['ultimaTrans'];
               

                tableData[x][8] = '<a href="#" class="btn btn-simple btn-warning btn-icon edit" data-toggle="tooltip" data-placement="top" title="Editar">' +
                    '<i class="material-icons">create</i>' +
                    '</a>';
                tableData[x][8] += '<a href="#" class="btn btn-simple btn-danger btn-icon deleted" data-toggle="tooltip" data-placement="top" title="Activo">' +
                    '<i class="material-icons">delete_sweep</i>' +
                    '</a>';
                x++;

            }

            $('#tablaDispositivos').dataTable().fnClearTable();
            if (numCoor > 0) {
                $('#tablaDispositivos').dataTable().fnAddData(tableData);
            }
        },
        error: function (responsetext) {

        }

    });
}

function guardarDispositivos() {
     var claveDispositivo = $('#claveDispositivo').val();
    var claveVehiculo = $('#claveVehiculo').val();
    var imei = $('#imei').val();
    var telefono = $('#telefono').val();
   
     if (parseInt(claveDispositivo) == 0) {
    
        $.ajax({
            type: 'POST',
            url: '../insertarDispositivo',
            dataType: 'json',
            data: {
                "claveVehiculo": claveVehiculo,
                "imei": imei,
                "telefono": telefono,
                "_token": $("meta[name='csrf-token']").attr("content")

            },
            success: function (response) {
                if (response) {
                    $('#modalDispositivo').modal('hide');
                    swal({
                        title: "Registro guardado correctamente",
                        icon: 'success'
                    });
                    getDispositivos();
                } else {
                    swal({
                        title: "Error al guardar",
                        icon: 'error'
                    });
                }
            },
            error: function () {
                swal({
                    title: "Error al guardar registro",
                    icon: 'error'
                });
            }
        });
    }
    
    else {
        $.ajax({
            type: 'POST',
            url: '../actualizarDispositivo',
            dataType: 'json',
            data: {
            "claveDispositivo": claveDispositivo,
               "claveVehiculo": claveVehiculo,
                "imei": imei,
                "telefono": telefono,
                "_token": $("meta[name='csrf-token']").attr("content")

            },
            success: function (response) {
                if (response) {
                    $('#modalDispositivo').modal('hide');
                    swal({
                        title: "Registro actualizado correctamente",
                        icon: 'success'
                    });
                    getDispositivos();
                } else {
                    swal({
                        title: "Error al actualizar",
                        icon: 'error'
                    });
                }
                
            },
            error: function () {
                swal({
                    title: "Error al actualizar registro",
                    icon: 'error'
                });
            }
        });
    }

    


    
}

