    var unidad; 
$(document).ready(function () {



    table = $('#tablaProyectos').DataTable({
        "columnDefs": [ {
            "targets": [0],
            "searchable": false,
            "visible": false
          } ]
    });

    table.on('click', '.eliminar', function () {
        $tr = $(this).parents('tr');
           //Si la tabla esta collapsada (se creo un nuevo tr con clase child)tomamos el tr previo
        if ($tr.hasClass('child')) {
            $tr = $tr.prev();
        }
        var data = table.row($tr).data();
        console.log(data[0]);
        eliminarUM(data[0]);
    });


    $('#btn-addManoObra').on('click', function(){
        $('#modal-btn').text('Registrar');
    });
    $('body').on('click', '.btn-editar', function () {
        $("#modalProyecto").modal("show");
        $('#modal-btn').text('Editar');
        let un = $(this).data('idunidad');
        let uni;
        unidad.forEach(element => {
            if(element.idUnidad == un){
                uni = element; 
            }
        });
        console.log(uni)
        editarUnidad(uni);
    });


    $('#modal-btn').click(function () {
        if($(this).text() == 'Registrar'){
            registrarManoObra();
        }else if($(this).text() == 'Editar'){
            editUnidad();
        }else{
            $('#modalProyecto').modal('hide');
        }
    });


    $("#modalProyecto").on('hidden.bs.modal', function () {
        $('#frm-registrar')[0].reset();
    });


    getUnidades();



});


function getUnidades() {
    var tableData = new Array();
    $.ajax({
        type: 'POST',
        url: '../getUnidades',
        dataType: 'json',
        data: {
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (response) {
           console.log(response);
           unidad = response; 
            var data = response;
            var x = 0;
            var numCoor = 0;
            for (var i = 0; i < data.length; i++) {
                tableData[x] = new Array()
                numCoor++;
                tableData[x][0] = data[i]['idUnidad'];
                tableData[x][1] = data[i]['unidad'];
                tableData[x][2] = '<div class="row" style="max-width: 160px; min-width: 140px"><div class="col-md-6" ><a href="#" class="btn btn-simple btn-editar btn-icon edit" data-toggle="tooltip" data-idUnidad="'+data[i]['idUnidad']+'" data-placement="top" title="Editar">' +
                '<i class="material-icons" data-idUnidad="'+data[i]['idUnidad']+'">create</i>' +
                '</a></div>'+
                '<div class="col-md-6"><a href="#" class="btn btn-simple bg-red eliminar btn-icon" data-toggle="tooltip"  data-placement="top" title="Eliminar">' +
                '<i class="material-icons">delete</i>' +
                '</a></div></div>';        
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


function registrarManoObra(){
    let unidad = $('#unidad').val();
    let nombreCorto = $('#nombreCorto').val();

    $.ajax({
        type: 'POST',
        url: '../insertUnidad',
        dataType: 'json',
        data: {
            "unidad" : unidad,
            "nombreCorto" : nombreCorto,
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (response) {
            Swal.fire({
                title: 'Registrado',
                text: "Unidad de Medida Registrada Correctamente",
                icon: 'success',
                confirmButtonText: 'Aceptar'
              }).then((result) => {
                $('#modalProyecto').modal('hide');
                $('#frm-registrar')[0].reset();
                getUnidades();
              })
            console.log(response);
        },
        error: function (texterror) {
            console.log(texterror); 
            Swal.fire({
                title: 'Error',
                text: "Error al Registrar la Unidad de Medida",
                icon: 'error',
                confirmButtonText: 'Aceptar'
              }) 
        }
    });
}


function editUnidad(){
    let idUnidad = $('#idUnidad').val();
    let unidad = $('#unidad').val();
    let nombreCorto = $('#nombreCorto').val();
        Swal.fire({
            title: 'Estas Seguro de Editar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Editar!'
          }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    type: 'POST',
                    url: '../editUnidad',
                    dataType: 'json',
                    data: {
                        "idUnidad" : idUnidad,
                        "unidad" : unidad,
                        "nombreCorto" : nombreCorto,
                        "_token": $("meta[name='csrf-token']").attr("content")
                    },
                    success: function (response) {
                        Swal.fire({
                            title: 'Editado',
                            text: "Unidad de Medida Editado Correctamente",
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                          }).then((result) => {
                            $('#modalProyecto').modal('hide');
                            $('#frm-registrar')[0].reset();
                            getUnidades();
                          })
                        console.log(response);
                    },
                    error: function (texterror) {
                        console.log(texterror); 
                        Swal.fire({
                            title: 'Error',
                            text: "Error al Editar la Unidad de Medida",
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                          }) 
                    }
                });
            }
          })

   
}

function editarUnidad(unidad){
    $('#idUnidad').val(unidad.idUnidad);
    $('#unidad').val(unidad.nombreUnidad);
    $('#nombreCorto').val(unidad.unidad);
    
}

function eliminarUM(idUM) {
    Swal.fire({
        title: '¿Eliminar recurso?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
        $.ajax({
            type: 'POST',
            url: '../eliminarUM',
            dataType: 'json',
            data: {
                idUM: idUM,
                "_token": $("meta[name='csrf-token']").attr("content")
            },
            success: function (response) {
                Swal.fire({
                    title: 'Realizado',
                    text: "Recurso eliminado correctamente",
                    icon: 'success',
                  });
                  getUnidades();
            },
            error: function (responsetext) {
                console.log(responsetext);
                Swal.fire({
                    title: 'Error',
                    text: "No se ha podido realizar la operación",
                    icon: 'warning',
                  })
            }

        });
    }
    })

}