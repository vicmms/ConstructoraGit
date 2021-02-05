var proveedores; 
$(document).ready(function () {



    table = $('#tablaProyectos').DataTable({
        "columnDefs": [ {
            "targets": [4],
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
        console.log(data[4]);
        eliminarProveedor(data[4]);
    });

    $('#btn-addMaterial').on('click', function(){
        $('#modal-btn').text('Registrar');
    });
    $('body').on('click', '.btn-ver', function () {
        $("#modalProyecto").modal("show");
        $('#modal-btn').text('Aceptar');
        let proveedor = $(this).data('idproveedor');
        let prov;
        proveedores.forEach(element => {
            if(element.idProveedor == proveedor){
                prov = element; 
            }
        });
        console.log(prov)
        verProveedor(prov);
    });

    $('body').on('click', '.btn-editar', function () {
        $("#modalProyecto").modal("show");
        $('#modal-btn').text('Editar');
        let proveedor = $(this).data('idproveedor');
        let prov;
        console.log(proveedor);
        console.log(proveedores)
        proveedores.forEach(element => {
            if(element.idProveedor == proveedor){
                prov = element; 
            }
        });
        console.log(prov)
        
        editarProveedor(prov);
    });



    $('#modal-btn').click(function () {
        if($(this).text() == 'Registrar'){
            registrarProveedor();
        }else if($(this).text() == 'Editar'){
            editProveedor();
        }else{
            $('#modalProyecto').modal('hide');
        }
    });


    $("#modalProyecto").on('hidden.bs.modal', function () {
        $('#frm-registrar')[0].reset();
        $('#nombre').removeAttr('disabled')
        $('#direccion').removeAttr('disabled')
        $('#telefono').removeAttr('disabled')
    });


    getProveedores();



});


function getProveedores() {
    var tableData = new Array();
    $.ajax({
        type: 'POST',
        url: '../getProveedores',
        dataType: 'json',
        data: {
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (response) {
           console.log(response);
           proveedores = response; 
            var data = response;
            var x = 0;
            var numCoor = 0;
            for (var i = 0; i < data.length; i++) {
                tableData[x] = new Array()
                numCoor++;
                tableData[x][0] = data[i]['nombreProveedor'];
                tableData[x][1] = data[i]['direccionProveedor'];
                tableData[x][2] = data[i]['telefonoProveedor'];  
                tableData[x][3] = '<div class="row" style="max-width: 130px; min-width: 100px"><div class="col-md-6" ><a href="#" class="btn btn-simple btn-editar btn-icon edit" data-toggle="tooltip" data-idProveedor="'+data[i]['idProveedor']+'" data-placement="top" title="Editar">' +
                '<i class="material-icons" data-idProveedor="'+data[i]['idProveedor']+'">create</i>' +
                '</a></div>'+
                '<div class="col-md-6"><a href="#" class="btn btn-simple bg-red eliminar btn-icon" data-toggle="tooltip"  data-placement="top" title="Eliminar">' +
                '<i class="material-icons">delete</i>' +
                '</a></div></div>';
                tableData[x][4] = data[i]['idProveedor'];    
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

function registrarProveedor(){
    let nombre = $('#nombre').val();
    let direccion = $('#direccion').val();
    let telefono = $('#telefono').val();

    $.ajax({
        type: 'POST',
        url: '../insertProveedor',
        dataType: 'json',
        data: {
            "nombre" : nombre,
            "direccion" : direccion,
            "telefono" : telefono,
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (response) {
            Swal.fire({
                title: 'Registrado',
                text: "Proveedor Registrado Correctamente",
                icon: 'success',
                confirmButtonText: 'Aceptar'
              }).then((result) => {
                $('#modalProyecto').modal('hide');
                $('#frm-registrar')[0].reset();
                getProveedores();
              })
            console.log(response);
        },
        error: function (texterror) {
            console.log(texterror); 
            Swal.fire({
                title: 'Error',
                text: "Error al Registrar el Proveedor",
                icon: 'error',
                confirmButtonText: 'Aceptar'
              }) 
        }
    });
}


function editProveedor(){
    let idProveedor = $('#idProveedor').val();
    let nombre = $('#nombre').val();
    let direccion = $('#direccion').val();
    let telefono = $('#telefono').val();
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
                url: '../editProveedor',
                dataType: 'json',
                data: {
                    "idProveedor" : idProveedor,
                    "nombre" : nombre,
                    "direccion" : direccion,
                    "telefono" : telefono,
                    "_token": $("meta[name='csrf-token']").attr("content")
                },
                success: function (response) {
                    Swal.fire({
                        title: 'Editado',
                        text: "Proveedor Editado Correctamente",
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                        }).then((result) => {
                        $('#modalProyecto').modal('hide');
                        $('#frm-registrar')[0].reset();
                        getProveedores();
                        })
                    console.log(response);
                },
                error: function (texterror) {
                    console.log(texterror); 
                    Swal.fire({
                        title: 'Error',
                        text: "Error al Editar el Proveedor",
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                        }) 
                }
            });
        }
        })

   
}

function editarProveedor(material){
    console.log(material)
    $('#idProveedor').val(material.idProveedor);
    $('#nombre').val(material.nombreProveedor);
    $('#direccion').val(material.direccionProveedor);
    $('#telefono').val(material.telefonoProveedor);
}
function eliminarProveedor(idProveedor) {
    Swal.fire({
        title: '¿Eliminar proveedor?',
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
            url: '../eliminarProveedor',
            dataType: 'json',
            data: {
                idProveedor: idProveedor,
                "_token": $("meta[name='csrf-token']").attr("content")
            },
            success: function (response) {
                Swal.fire({
                    title: 'Realizado',
                    text: "Proveedor eliminado correctamente",
                    icon: 'success',
                  });
                  getProveedores();
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