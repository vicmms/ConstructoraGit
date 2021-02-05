var manoObra; 
$(document).ready(function () {



    table = $('#tablaProyectos').DataTable({
        "columnDefs": [ {
            "targets": [6],
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
        console.log(data[6]);
        eliminarMO(data[6]);
    });



    $('body').on('click', '.btn-ver', function () {
        $("#modalProyecto").modal("show");
        $('#modal-btn').text('Aceptar');
        let mano = $(this).data('idmo');
        let mo;
        manoObra.forEach(element => {
            if(element.idMO == mano){
                mo = element; 
            }
        });
        console.log(mo)
        verManoObra(mo);
    });

    $('body').on('click', '.btn-editar', function () {
        $("#modalProyecto").modal("show");
        $('#modal-btn').text('Editar');
        let mano = $(this).data('idmo');
        let mo;
        manoObra.forEach(element => {
            if(element.idMO == mano){
                mo = element; 
            }
        });
        console.log(mo)
        editarManoObra(mo);
    });


    $('body').on('change', '#costoUnitario', function () {
        if($('#costoUnitario').val()!= null  && $('#cantidad').val()!= null){
            $('#total').val($('#costoUnitario').val() * $('#cantidad').val());
        }
    });

    $('body').on('change', '#iva', function () {
        if($('#costoUnitario').val()!= null  && $('#cantidad').val()!= null){
            $('#total').val($('#costoUnitario').val() * $('#cantidad').val());
        }
        
    });

    $('body').on('change', '#cantidad', function () {
        if($('#costoUnitario').val()!= null  && $('#cantidad').val()!= null){
            $('#total').val($('#costoUnitario').val() * $('#cantidad').val());
        }
        
    });

    $('#modal-btn').click(function () {
        if($(this).text() == 'Registrar'){
            registrarManoObra();
        }else if($(this).text() == 'Editar'){
            editManoObra();
        }else{
            $('#modalProyecto').modal('hide');
        }
    });


    $("#modalProyecto").on('hidden.bs.modal', function () {
        $('#frm-registrar')[0].reset();
        $("#unidad option").removeAttr("selected");
        $('#descripcion').removeAttr('disabled')
        $('#unidad').removeAttr('disabled')
        $('#cantidad').removeAttr('disabled')
        $('#costoUnitario').removeAttr('disabled')
        $('#modal-btn').text('Registrar');
    });


    getManoObra();
    getUnidades();



});


function getManoObra() {
    var tableData = new Array();
    $.ajax({
        type: 'POST',
        url: '../getMO',
        dataType: 'json',
        data: {
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (response) {
           console.log(response);
           manoObra = response; 
            var data = response;
            var x = 0;
            var numCoor = 0;
            for (var i = 0; i < data.length; i++) {
                tableData[x] = new Array()
                numCoor++;
                tableData[x][0] = data[i]['descripcion'];
                tableData[x][1] = data[i]['unidad'];
                tableData[x][2] = data[i]['cantidad'];
                tableData[x][3] = '$'+data[i]['costoUnitario'];
                tableData[x][4] = '$'+data[i]['total'];   
                tableData[x][5] = '<div class="row" style="max-width: 160px; min-width: 140px"><div class="col-md-4" ><a href="#" class="btn btn-simple btn-ver btn-icon edit" data-idMO="'+data[i]['idMO']+'" data-toggle="tooltip" data-placement="top" title="Ver">' +
                '<i class="material-icons" data-idMO="'+data[i]['idMO']+'">remove_red_eye</i>' +
                '</a></div>'+
                '<div class="col-md-4"><a href="#" class="btn btn-simple btn-editar btn-icon edit" data-toggle="tooltip" data-idMO="'+data[i]['idMO']+'" data-placement="top" title="Editar">' +
                '<i class="material-icons" data-idMO="'+data[i]['idMO']+'">create</i>' +
                '</a></div>'+
                '<div class="col-md-4"><a href="#" class="btn btn-simple bg-red eliminar btn-icon" data-toggle="tooltip"  data-placement="top" title="Eliminar">' +
                '<i class="material-icons">delete</i>' +
                '</a></div></div>';    
                tableData[x][6] = data[i]['idMO']; 
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
           response.forEach(element => {
               $('#unidad').append('<option value="'+element.idUnidad+'">'+element.unidad+'</option>')
           });
        },
        error: function (responsetext) {
            console.log(responsetext);
        }

    });

}

function registrarManoObra(){
    let descripcion = $('#descripcion').val();
    let unidad = $('#unidad').val();
    let cantidad = $('#cantidad').val();
    let costoUnitario = $('#costoUnitario').val();
    let total = $('#total').val();

    $.ajax({
        type: 'POST',
        url: '../insertManoObra',
        dataType: 'json',
        data: {
            "descripcion" : descripcion,
            "unidad" : unidad,
            "cantidad" : cantidad,
            "costoUnitario" : costoUnitario,
            "total" : total,
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (response) {
            Swal.fire({
                title: 'Registrado',
                text: "Mano de Obra Registrada Correctamente",
                icon: 'success',
                confirmButtonText: 'Aceptar'
              }).then((result) => {
                $('#modalProyecto').modal('hide');
                $('#frm-registrar')[0].reset();
                getManoObra();
              })
            console.log(response);
        },
        error: function (texterror) {
            console.log(texterror); 
            Swal.fire({
                title: 'Error',
                text: "Error al Registrar la Mano de Obra",
                icon: 'error',
                confirmButtonText: 'Aceptar'
              }) 
        }
    });
}


function editManoObra(){
    let idMO = $('#idMO').val();
    let descripcion = $('#descripcion').val();
    let unidad = $('#unidad').val();
    let cantidad = $('#cantidad').val();
    let costoUnitario = $('#costoUnitario').val();
    let total = $('#total').val();
    if(unidad != 0){
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
                    url: '../editManoObra',
                    dataType: 'json',
                    data: {
                        "idMO" : idMO,
                        "descripcion" : descripcion,
                        "unidad" : unidad,
                        "cantidad" : cantidad,
                        "costoUnitario" : costoUnitario,
                        "total" : total,
                        "_token": $("meta[name='csrf-token']").attr("content")
                    },
                    success: function (response) {
                        Swal.fire({
                            title: 'Editado',
                            text: "Mano de Obra Editado Correctamente",
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                          }).then((result) => {
                            $('#modalProyecto').modal('hide');
                            $('#frm-registrar')[0].reset();
                            getManoObra();
                          })
                        console.log(response);
                    },
                    error: function (texterror) {
                        console.log(texterror); 
                        Swal.fire({
                            title: 'Error',
                            text: "Error al Editar la Mano de Obra",
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                          }) 
                    }
                });
            }
          })
    }else{
        Swal.fire({
            title: 'Error',
            text: "Selecciona una unidad valida",
            icon: 'error',
            confirmButtonText: 'Aceptar'
          }) 
    }

   
}

function verManoObra(material){

    $('#idMO').val(material.idMO);
    $('#descripcion').val(material.descripcion);
    $('#unidad option[value="'+material.idUnidad+'"]').attr("selected", true);
    $('#cantidad').val(material.cantidad);
    $('#costoUnitario').val(material.costoUnitario);
    $('#total').val(material.total);

    $('#descripcion').attr('disabled','disabled')
    $('#unidad').attr('disabled','disabled')
    $('#cantidad').attr('disabled','disabled')
    $('#costoUnitario').attr('disabled','disabled')
    $('#total').attr('disabled','disabled')
}

function editarManoObra(material){
    $('#idMO').val(material.idMO);
    $('#descripcion').val(material.descripcion);
    $('#unidad option[value="'+material.idUnidad+'"]').attr("selected", true);
    $('#cantidad').val(material.cantidad);
    $('#costoUnitario').val(material.costoUnitario);
    $('#total').val(material.total);
}

function eliminarMO(idMO) {
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
            url: '../eliminarMO',
            dataType: 'json',
            data: {
                idMO: idMO,
                "_token": $("meta[name='csrf-token']").attr("content")
            },
            success: function (response) {
                Swal.fire({
                    title: 'Realizado',
                    text: "Recurso eliminado correctamente",
                    icon: 'success',
                  });
                  getManoObra();
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