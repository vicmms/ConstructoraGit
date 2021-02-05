$(document).ready(function () {



    table = $('#tablaMarcas').DataTable();

    table.column([0]).visible(false);

    $('#modal-btn').on('click', function(){
        setMarca();
    })
    table.on('click', '.eliminar', function () {
       

        $tr = $(this).parents('tr');
           //Si la tabla esta collapsada (se creo un nuevo tr con clase child)tomamos el tr previo
        if ($tr.hasClass('child')) {
            $tr = $tr.prev();
        }
        var data = table.row($tr).data();
        eliminarMarca(data[0]);
       
        
    });
    getMarcas();    

})

function getMarcas() {
    var tableData = new Array();
    $.ajax({
        type: 'POST',
        url: '../getMarcas',
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
                tableData[x][0] = data[i]['idMarca'];
                tableData[x][1] = data[i]['marca'];
                tableData[x][2] = data[i]['provee'];
                tableData[x][3] = '<div class="row" style="max-width: 160px; min-width: 140px"><div class="col-md-4" ><a href="#" class="btn btn-simple btn-ver btn-icon edit" data-idMaterial="'+data[i]['idMaterial']+'" data-toggle="tooltip" data-placement="top" title="Ver">' +
                '<i class="material-icons">remove_red_eye</i>' +
                '</a></div>'+
                '<div class="col-md-4"><a href="#" class="btn btn-simple btn-editar btn-icon edit" data-toggle="tooltip" data-idMaterial="'+data[i]['idMaterial']+'" data-placement="top" title="Editar">' +
                '<i class="material-icons" >create</i>' +
                '</a></div>'+
                '<div class="col-md-4"><a href="#" class="btn btn-simple bg-red eliminar btn-icon" data-toggle="tooltip"  data-placement="top" title="Eliminar">' +
                '<i class="material-icons">delete</i>' +
                '</a></div></div>';    
                x++;
            }
            $('#tablaMarcas').dataTable().fnClearTable();
            if (numCoor > 0) {
                $('#tablaMarcas').dataTable().fnAddData(tableData);
            }
        },
        error: function (responsetext) {
            console.log(responsetext);
        }

    });

}

function setMarca(){
    console.log($('#provee').text());
    console.log($('#marca').val())
    $.ajax({
        type: 'POST',
        url: '../setMarca',
        dataType: 'json',
        data: {
            marca: $('#marca').val(),
            provee: $('#provee option:selected').text(),
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (response) {
           console.log(response);
           Swal.fire({
            title: 'Realizado!',
            text: "Marca registrada correctamente",
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
           $('#modalMarcas').modal('hide');
           getMarcas();
        },
        error: function (responsetext) {
            console.log(responsetext);
        }

    });
}
function eliminarMarca(idMarca) {
    Swal.fire({
        title: '¿Eliminar marca?',
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
            url: '../eliminarMarca',
            dataType: 'json',
            data: {
                idMarca: idMarca,
                "_token": $("meta[name='csrf-token']").attr("content")
            },
            success: function (response) {
                Swal.fire({
                    title: 'Realizado',
                    text: "Marca eliminada correctamente",
                    icon: 'success',
                  });
                  getMarcas();
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