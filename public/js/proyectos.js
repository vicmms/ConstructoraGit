
$(document).ready(function () {



    table = $('#tablaProyectos').DataTable({
        "columnDefs": [ {
            "targets": [1,7],
            "searchable": false,
            "visible": false
          } ]
    });

    
    $('#modal-btn-save').on('click', function () {

        $('#frm-registrar').submit();

    });

    $('#btn-nuevo-proy').on('click', function () {
        clearModal();
    });

    validator = $('#frm-registrar').validate({

        submitHandler: function (form) {

            guardarProyecto();

        }

    });

    getProyectos()

});

function guardarProyecto() {
    var nombreProy = $('#nombreProy').val();
    var nombreCP = $('#nombreClienteProy').val();
    var fi = $('#fi').val();
    var descripcion = $('#descripcion').val();
        $.ajax({
            type: 'POST',
            url: '../insertarProyecto',
            dataType: 'json',
            data: {
                "nombreProy": nombreProy,
                "nombreCP": nombreCP,
                "fi": fi,
                "descripcion": descripcion,
                "_token": $("meta[name='csrf-token']").attr("content")
            },
            success: function (response) {
                console.log(response);
                $('#modalProyecto').modal('hide');
                Swal.fire({
                    title: 'Proyecto agregado!',
                    text: "Proyecto agregado correctamente",
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                  }).then((result) => {
                    getProyectos();
                  })
                
            },
            error: function (texterror) {
                console.log(texterror);  
            }
        });
}
function getProyectos() {
    var tableData = new Array();
    $.ajax({
        type: 'POST',
        url: '../getProyectos',
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
                tableData[x][0] = '<a href="../cotizacion/'+data[i]['nombreProyecto']+'/'+data[i]['idProyecto']+'" class="btn btn-simple btn-editar btn-icon cotizar" data-toggle="tooltip" data-placement="top" title="Hacer cotizacion">' +
                    '<i class="material-icons">create</i>' +
                    '</a>';
                tableData[x][1] = data[i]['idProyecto'];
                tableData[x][2] = data[i]['nombreProyecto'];
                tableData[x][3] = data[i]['nombreClienteProyecto'];
                tableData[x][4] = data[i]['fechaInicio'];
                (data[i]['fechaFin']) != null ? tableData[x][5] = data[i]['fechaFin'] : tableData[x][5] = 'Sin terminar' ;
                tableData[x][6] = data[i]['descripcionProyecto'];                
                tableData[x][7] = '<a href="#" class="btn btn-simple btn-editar btn-icon edit" data-toggle="tooltip" data-placement="top" title="Editar">' +
                    '<i class="material-icons">create</i>' +
                    '</a>';
                tableData[x][7] += '    <a href="#" class="btn btn-simple btn-icon btn-eliminar deleted" data-toggle="tooltip" data-placement="top" title="Activo">' +
                    '<i class="material-icons">delete_sweep</i>' +
                    '</a>';
                x++;
            }
            $('#tablaProyectos').dataTable().fnClearTable();
            if (numCoor > 0) {
                $('#tablaProyectos').dataTable().fnAddData(tableData);
            }
        },
        error: function (responsetext) {
            console.log(responsetext);
        }

    });

}

function clearModal(){
    
    $( "#nombreProy" ).val('');
    $('#nombreClienteProy').val('');
    $('#descripcion').val('');
}