var table = null;
var validator = null;

$(document).ready(function () {

    table = $('#tablaRecolectores').DataTable({
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
            guardarRepartidor();
        }
    });
    getRecolectores();

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
        $('#claveRecolector').val(data[0]);
        $('#nombreRecolector').val(data[1]);
        $('#direccion').val(data[3]);
        $('#telefono').val(data[4]);
        $('#correo').val(data[2]);
        $('#noLicencia').val(data[5]);
        $('#fechaVigencia').val(data[6]);

        $('div.edit-hidden').hide();
        $('#modalRecolector').modal('show');
        $('h4#modal-title').text("Editar recolector");       

    });

    // delete record
    table.on( 'click', '.deleted', function (e) {
        $tr = $(this).parents('tr');
       //Si la tabla esta collapsada (se creo un nuevo tr con clase child)tomamos el tr previo
       if ($tr.hasClass('child')) {
           $tr = $tr.prev();
       }
       var data = table.row($tr).data();
       borrarRecolector(data[0]);
       e.preventDefault();
    });




});
function getRecolectores() {
    var tableData = new Array();
    $.ajax({
        type: 'POST',
        url: '../getRecolectores',
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
                tableData[x][0] = data[i]['claveRecolector'];
                tableData[x][1] = data[i]['nombreRecolector'];
                tableData[x][2] = data[i]['correo'];
                tableData[x][3] = data[i]['direccion'];
                tableData[x][4] = data[i]['telefono'];                
                tableData[x][5] = data[i]['noLicencia'];
                tableData[x][6] = data[i]['vigenciaLicencia'];

                tableData[x][7] = '<a href="#" class="btn btn-simple btn-warning btn-icon edit" data-toggle="tooltip" data-placement="top" title="Editar">' +
                    '<i class="material-icons">create</i>' +
                    '</a>';
                tableData[x][7] += '<a href="#" class="btn btn-simple btn-danger btn-icon deleted" data-toggle="tooltip" data-placement="top" title="Activo">' +
                    '<i class="material-icons">delete_sweep</i>' +
                    '</a>';
                x++;

            }

            $('#tablaRecolectores').dataTable().fnClearTable();
            if (numCoor > 0) {
                $('#tablaRecolectores').dataTable().fnAddData(tableData);
            }
        },
        error: function (responsetext) {

        }

    });
}

    

function guardarRepartidor() {

    var claveRecolector = $('#claveRecolector').val();
    var nombreRecolector = $('#nombreRecolector').val();
    var pass = $('#pass').val();
    var direccion = $('#direccion').val();
    var telefono = $('#telefono').val();
    var correo = $('#correo').val();
    var noLicencia = $('#noLicencia').val();
    var fechaVigencia = $('#fechaVigencia').val();

    if (parseInt(claveRecolector) == 0) {
        $.ajax({
            type: 'POST',
            url: '../insertarRecolector',
            dataType: 'json',
            data: {
                "nombreRecolector": nombreRecolector,
                "pass": pass,
                "direccion": direccion,
                "telefono": telefono,
                "correo": correo,
                "noLicencia": noLicencia,
                "fechaVigencia": fechaVigencia,
                "_token": $("meta[name='csrf-token']").attr("content")

            },
            success: function (response) {
                if (response) {
                    $('#modalRecolector').modal('hide');
                    swal({
                        title: "Registro guardado correctamente",
                        icon: 'success'
                    });
                    getRecolectores();
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
    } else {
        $.ajax({
            type: 'POST',
            url: '../actualizarRecolector',
            dataType: 'json',
            data: {
                "claveRecolector": claveRecolector,
                "nombreRecolector": nombreRecolector,
                "direccion": direccion,
                "telefono": telefono,
                "correo": correo,
                "noLicencia": noLicencia,
                "fechaVigencia": fechaVigencia,
                "_token": $("meta[name='csrf-token']").attr("content")

            },
            success: function (response) {
                if (response) {
                    $('#modalRecolector').modal('hide');
                    swal({
                        title: "Registro actualizado correctamente",
                        icon: 'success'
                    });
                    getRecolectores();
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

function borrarRecolector(claveRecolector){
    swal("Confirmar borrar recolector", {
        buttons: {
          cancel: "cancelar",
          Borrar: true,
        },
        icon: 'warning',
      })
      .then((value) => {
        switch (value) {
       
          case "Borrar":

    $.ajax({
        type: 'post',
        url: '../borrarRecolector',
        dataType: 'json',
        data: {
            "claveRecolector": claveRecolector,
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (response) {
            if (response) {
            	swal({
                  title:"Registro desactivado con éxito",
                  icon: 'success'
                }); 
                 getRecolectores();
            }else{
            	swal({
                  title:"Error al desactivar registro",
                  icon: 'error'
                }); 
            }            

        },
        error: function (request, status, error) {
        	swal({
              title:"Error al desactivar registro",
              icon: 'error'
            }); 
        }
    });
            break;
       
          default:
            swal("Operacion cancelada");
        }
      });
    
}

