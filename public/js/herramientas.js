var herramientas; 
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
        eliminarHerramienta(data[6]);
    });



    $('body').on('click', '.btn-ver', function () {
        $("#modalProyecto").modal("show");
        $('#modal-btn').text('Aceptar');
        let herramienta = $(this).data('idherramienta');
        let herr;
        herramientas.forEach(element => {
            if(element.idHerramienta == herramienta){
                herr = element; 
            }
        });
        console.log(herr)
        verHerramienta(herr);
    });

    $('body').on('click', '.btn-editar', function () {
        $("#modalProyecto").modal("show");
        $('#modal-btn').text('Editar');
        let herramienta = $(this).data('idherramienta');
        let herr;
        herramientas.forEach(element => {
            if(element.idHerramienta == herramienta){
                herr = element; 
            }
        });
        console.log(herr)
        editarHerramienta(herr);
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
            registrarHerramienta();
        }else if($(this).text() == 'Editar'){
            editHerramienta();
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


    getHerramientas();
    getUnidades();



});


function getHerramientas() {
    var tableData = new Array();
    $.ajax({
        type: 'POST',
        url: '../getHerramientas',
        dataType: 'json',
        data: {
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (response) {
           console.log(response);
           herramientas = response; 
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
                tableData[x][5] = '<div class="row" style="max-width: 160px; min-width: 140px"><div class="col-md-4" ><a href="#" class="btn btn-simple btn-ver btn-icon edit" data-idHerramienta="'+data[i]['idHerramienta']+'" data-toggle="tooltip" data-placement="top" title="Ver">' +
                '<i class="material-icons" data-idHerramienta="'+data[i]['idHerramienta']+'">remove_red_eye</i>' +
                '</a></div>'+
                '<div class="col-md-4" ><a href="#" class="btn btn-simple btn-editar btn-icon edit" data-toggle="tooltip" data-idHerramienta="'+data[i]['idHerramienta']+'" data-placement="top" title="Editar">' +
                '<i class="material-icons" data-idHerramienta="'+data[i]['idHerramienta']+'">create</i>' +
                '</a></div>'+
                '<div class="col-md-4"><a href="#" class="btn btn-simple bg-red eliminar btn-icon" data-toggle="tooltip"  data-placement="top" title="Eliminar">' +
                '<i class="material-icons">delete</i>' +
                '</a></div></div>';     
                tableData[x][6] = data[i]['idHerramienta'];   
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

function registrarHerramienta(){
    let descripcion = $('#descripcion').val();
    let unidad = $('#unidad').val();
    let cantidad = $('#cantidad').val();
    let costoUnitario = $('#costoUnitario').val();
    let total = $('#total').val();

    $.ajax({
        type: 'POST',
        url: '../insertHerramientas',
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
                text: "Herramienta Registrada Correctamente",
                icon: 'success',
                confirmButtonText: 'Aceptar'
              }).then((result) => {
                $('#modalProyecto').modal('hide');
                $('#frm-registrar')[0].reset();
                getHerramientas();
              })
            console.log(response);
        },
        error: function (texterror) {
            console.log(texterror); 
            Swal.fire({
                title: 'Error',
                text: "Error al Registrar la Herramienta",
                icon: 'error',
                confirmButtonText: 'Aceptar'
              }) 
        }
    });
}


function editHerramienta(){
    let idHerramienta = $('#idHerramienta').val();
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
                    url: '../editHerramientas',
                    dataType: 'json',
                    data: {
                        "idHerramienta" : idHerramienta,
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
                            text: "Herramienta Editada Correctamente",
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                          }).then((result) => {
                            $('#modalProyecto').modal('hide');
                            $('#frm-registrar')[0].reset();
                            getHerramientas();
                          })
                        console.log(response);
                    },
                    error: function (texterror) {
                        console.log(texterror); 
                        Swal.fire({
                            title: 'Error',
                            text: "Error al Editar la Herramienta",
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

function verHerramienta(material){

    $('#idHerramienta').val(material.idHerramienta);
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

function editarHerramienta(material){
    $('#idHerramienta').val(material.idHerramienta);
    $('#descripcion').val(material.descripcion);
    $('#unidad option[value="'+material.idUnidad+'"]').attr("selected", true);
    $('#cantidad').val(material.cantidad);
    $('#costoUnitario').val(material.costoUnitario);
    $('#total').val(material.total);
}

function eliminarHerramienta(idHerramienta) {
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
            url: '../eliminarHerramienta',
            dataType: 'json',
            data: {
                idHerramienta: idHerramienta,
                "_token": $("meta[name='csrf-token']").attr("content")
            },
            success: function (response) {
                Swal.fire({
                    title: 'Realizado',
                    text: "Recurso eliminado correctamente",
                    icon: 'success',
                  });
                  getHerramientas();
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