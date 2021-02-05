var materiales; 
$(document).ready(function () {



    table = $('#tablaProyectos').DataTable();

    table.column([8]).visible(false);


    $('body').on('click', '.btn-ver', function () {
        $("#selectProveedorField").hide();
        $("#datosProveedor").show();
        $("#modalProyecto").modal("show");
        $('#modal-btn').text('Aceptar');
        let material = $(this).data('idmaterial');
        let mat;
        materiales.forEach(element => {
            if(element.idMaterial == material){
                mat = element; 
            }
        });
        console.log(mat)
        verMaterial(mat);
    });

    $('body').on('click', '.btn-editar', function () {
        $("#selectProveedorField").show();
        $("#datosProveedor").hide();
        $("#modalProyecto").modal("show");
        $('#modal-btn').text('Editar');
        let material = $(this).data('idmaterial');
        let mat;
        materiales.forEach(element => {
            if(element.idMaterial == material){
                mat = element; 
            }
        });
        console.log(mat)
        editarMaterial(mat);
    });

    $('body').on('click', '#btn-addMaterial', function () {
        $("#selectProveedorField").show();
        $("#datosProveedor").hide();
    });


    $('body').on('change', '#precioUnitario', function () {
        if($('#precioUnitario').val()!= null && $('#iva').val()!= null && $('#cantidad').val()!= null){
            $('#total').val(parseFloat($('#precioUnitario').val()) * $('#cantidad').val());
            let iva = 16 * parseFloat($('#total').val()) / 116;
            $('#iva').val(iva);
        }
    });

    table.on('click', '.eliminar', function () {
       

        $tr = $(this).parents('tr');
           //Si la tabla esta collapsada (se creo un nuevo tr con clase child)tomamos el tr previo
        if ($tr.hasClass('child')) {
            $tr = $tr.prev();
        }
        var data = table.row($tr).data();
        console.log(data[8])
        eliminarMaterial(data[8]);
       
        
    });

    $('body').on('change', '#cantidad', function () {
        if($('#precioUnitario').val()!= null && $('#iva').val()!= null && $('#cantidad').val()!= null){
            let precioIva = ($('#precioUnitario').val() * ($('#iva').val()/100))+(parseFloat($('#precioUnitario').val()));
            $('#total').val(parseFloat($('#precioUnitario').val()) * $('#cantidad').val());
            let iva = 16 * parseFloat($('#total').val()) / 116;
            $('#iva').val(iva);
        }
        
    });

    $('#modal-btn').click(function () {
        if($(this).text() == 'Registrar'){
            registrarMaterial();
        }else if($(this).text() == 'Editar'){
            editMaterial();
        }else{
            $('#modalProyecto').modal('hide');
        }
    });


    $("#modalProyecto").on('hidden.bs.modal', function () {
        $('#frm-registrar')[0].reset();
        $("#unidad option").removeAttr("selected");
        $('#descripcion').removeAttr('disabled')
        $('#marca').removeAttr('disabled')
        $('#unidad').removeAttr('disabled')
        $('#cantidad').removeAttr('disabled')
        $('#precioUnitario').removeAttr('disabled')
        $('#iva').removeAttr('disabled')
        $('#proveedor').removeAttr('disabled')
        $('#direccion').removeAttr('disabled')
        $('#telefono').removeAttr('disabled')
        $('#modal-btn').text('Registrar');
    });


    getMateriales();
    getUnidades();
    getMarcas();
    getProveedores();



});


function getMateriales() {
    var tableData = new Array();
    $.ajax({
        type: 'POST',
        url: '../getMateriales',
        dataType: 'json',
        data: {
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (response) {
           console.log(response);
           materiales = response; 
            var data = response;
            var x = 0;
            var numCoor = 0;
            for (var i = 0; i < data.length; i++) {
                tableData[x] = new Array()
                numCoor++;
                tableData[x][0] = data[i]['descripcion'];
                tableData[x][1] = data[i]['marca'];
                tableData[x][2] = data[i]['unidad'];
                tableData[x][3] = data[i]['cantidad'];
                tableData[x][4] = '$'+data[i]['precioUnitario'];
                // tableData[x][5] = data[i]['iva']+'%';   
                tableData[x][5] = data[i]['nombreProveedor']; 
                tableData[x][6] = '$'+data[i]['total'];   
                tableData[x][7] = '<div class="row" style="max-width: 160px; min-width: 140px"><div class="col-md-4" ><a href="#" class="btn btn-simple btn-ver btn-icon edit" data-idMaterial="'+data[i]['idMaterial']+'" data-toggle="tooltip" data-placement="top" title="Ver">' +
                '<i class="material-icons" data-idMaterial="'+data[i]['idMaterial']+'">remove_red_eye</i>' +
                '</a></div>'+
                '<div class="col-md-4"><a href="#" class="btn btn-simple btn-editar btn-icon edit" data-toggle="tooltip" data-idMaterial="'+data[i]['idMaterial']+'" data-placement="top" title="Editar">' +
                '<i class="material-icons" data-idMaterial="'+data[i]['idMaterial']+'">create</i>' +
                '</a></div>'+
                '<div class="col-md-4"><a href="#" class="btn btn-simple bg-red eliminar btn-icon" data-toggle="tooltip"  data-placement="top" title="Eliminar">' +
                '<i class="material-icons">delete</i>' +
                '</a></div></div>';    
                tableData[x][8] = data[i]['idMaterial']; 
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

function getMarcas() {
    $.ajax({
        type: 'POST',
        url: '../getMarcas',
        dataType: 'json',
        data: {
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (response) {
           console.log(response);
           response.forEach(element => {
               $('#marcas').append('<option value="'+element.idMarca+'">'+element.marca+'</option>')
           });
        },
        error: function (responsetext) {
            console.log(responsetext);
        }

    });

}


function getProveedores() {
    $.ajax({
        type: 'POST',
        url: '../getProveedores',
        dataType: 'json',
        data: {
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (response) {
           console.log(response);
           response.forEach(element => {
               $('#selectProveedor').append('<option value="'+element.idProveedor+'">'+element.nombreProveedor+'</option>')
           });
        },
        error: function (responsetext) {
            console.log(responsetext);
        }

    });

}

function registrarMaterial(){
    let descripcion = $('#descripcion').val();
    let marca = $('#marcas').val();
    let unidad = $('#unidad').val();
    let cantidad = $('#cantidad').val();
    let precioUnitario = $('#precioUnitario').val();
    let iva = $('#iva').val();
    let total = $('#total').val();
    let proveedor = $('#selectProveedor').val();

    $.ajax({
        type: 'POST',
        url: '../insertMaterial',
        dataType: 'json',
        data: {
            "descripcion" : descripcion,
            "idMarca" : marca,
            "unidad" : unidad,
            "cantidad" : cantidad,
            "precioUnitario" : precioUnitario,
            "iva" : iva,
            "total" : total,
            "proveedor" : proveedor,
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (response) {
            Swal.fire({
                title: 'Registrado',
                text: "Material Registrado Correctamente",
                icon: 'success',
                confirmButtonText: 'Aceptar'
              }).then((result) => {
                $('#modalProyecto').modal('hide');
                $('#frm-registrar')[0].reset();
                getMateriales();
              })
            console.log(response);
        },
        error: function (texterror) {
            console.log(texterror); 
            Swal.fire({
                title: 'Error',
                text: "Error al Registrar el Material",
                icon: 'error',
                confirmButtonText: 'Aceptar'
              }) 
        }
    });
}


function editMaterial(){
    let idMaterial = $('#idMaterial').val();
    let descripcion = $('#descripcion').val();
    let marca = $('#marcas').val();
    let unidad = $('#unidad').val();
    let cantidad = $('#cantidad').val();
    let precioUnitario = $('#precioUnitario').val();
    let iva = $('#iva').val();
    let total = $('#total').val();
    let proveedor = $('#selectProveedor').val();
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
                    url: '../editMaterial',
                    dataType: 'json',
                    data: {
                        "idMaterial" : idMaterial,
                        "descripcion" : descripcion,
                        "idMarca" : marca,
                        "unidad" : unidad,
                        "cantidad" : cantidad,
                        "precioUnitario" : precioUnitario,
                        "iva" : iva,
                        "total" : total,
                        "proveedor" : proveedor,
                        "_token": $("meta[name='csrf-token']").attr("content")
                    },
                    success: function (response) {
                        Swal.fire({
                            title: 'Editado',
                            text: "Material Editado Correctamente",
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                          }).then((result) => {
                            $('#modalProyecto').modal('hide');
                            $('#frm-registrar')[0].reset();
                            getMateriales();
                          })
                        console.log(response);
                    },
                    error: function (texterror) {
                        console.log(texterror); 
                        Swal.fire({
                            title: 'Error',
                            text: "Error al Editar el Material",
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

function eliminarMaterial(idMaterial) {
    Swal.fire({
        title: '¿Eliminar material?',
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
            url: '../eliminarMaterial',
            dataType: 'json',
            data: {
                idMaterial: idMaterial,
                "_token": $("meta[name='csrf-token']").attr("content")
            },
            success: function (response) {
                Swal.fire({
                    title: 'Realizado',
                    text: "Material eliminado correctamente",
                    icon: 'success',
                  });
                  getMateriales();
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


function verMaterial(material){

    $('#idMaterial').val(material.idMaterial);
    $('#descripcion').val(material.descripcion);
    $('#marcas').val(material.idMarca);
    $('#unidad option[value="'+material.idUnidad+'"]').attr("selected", true);
    $('#cantidad').val(material.cantidad);
    $('#precioUnitario').val(material.precioUnitario);
    $('#iva').val(material.iva);
    $('#total').val(material.total);
    $('#proveedor').val(material.nombreProveedor);
    $('#direccion').val(material.direccionProveedor);
    $('#telefono').val(material.telefonoProveedor);

    $('#descripcion').attr('disabled','disabled')
    $('#marca').attr('disabled','disabled')
    $('#unidad').attr('disabled','disabled')
    $('#cantidad').attr('disabled','disabled')
    $('#precioUnitario').attr('disabled','disabled')
    $('#iva').attr('disabled','disabled')
    $('#total').attr('disabled','disabled')
    $('#proveedor').attr('disabled','disabled')
    $('#direccion').attr('disabled','disabled')
    $('#telefono').attr('disabled','disabled')
}

function editarMaterial(material){
    $('#idMaterial').val(material.idMaterial);
    $('#descripcion').val(material.descripcion);
    $('#marcas').val(material.idMarca);
    $('#unidad').val(material.idUnidad);
    $('#cantidad').val(material.cantidad);
    $('#precioUnitario').val(material.precioUnitario);
    $('#iva').val(material.iva);
    $('#total').val(material.total);
    $('#selectProveedor option[value="'+material.idProveedor+'"]').attr("selected", true);
}
