
rutaModal = '';
idConceptoAct = 0;//id concepto actalizar
$(document).ready(function () {



    table = $('#tablaConceptos').DataTable({
        "columnDefs": [ {
            "targets": [0,3,4],
            "searchable": false,
            "visible": false
          }],
          "order":[]
    });
    table.on('click', '.edit', function () {
        $('#modal-title').text('Editar concepto');
        rutaModal = '../actualizarConcepto';
        $tr = $(this).parents('tr');
           //Si la tabla esta collapsada (se creo un nuevo tr con clase child)tomamos el tr previo
        if ($tr.hasClass('child')) {
            $tr = $tr.prev();
        }
        var data = table.row($tr).data();
        $('#descripcion').val(data[1]);
        $('#cbCategorias').val(data[3]);
        $('#cbUnidades').val(data[4]);
        $('#modalConcepto').modal('show');
        idConceptoAct = data[0];
        
    });
    table.on('click', '.eliminar', function () {
       

        $tr = $(this).parents('tr');
           //Si la tabla esta collapsada (se creo un nuevo tr con clase child)tomamos el tr previo
        if ($tr.hasClass('child')) {
            $tr = $tr.prev();
        }
        var data = table.row($tr).data();
        console.log(data[0])
        eliminarConcepto(data[0]);
       
        
    });

    // Add your id of "File Input" 
$('#file').change(function(ev) {
    // Do something 
    fileReader(ev);
});
    
    $('#modal-btn-save').on('click', function () {

        $('#frm-registrar').submit();

    });

    $('#modal-btn-save2').on('click', function () {

        $('#frm-registrar2').submit();

    });

    $('#btn-nuevo-concepto').on('click', function () {
        rutaModal = '../setConcepto';
        $('#modal-title').text('Nuevo concepto');
        clearModal();
    });

    validator = $('#frm-registrar').validate({

        submitHandler: function (form) {

            guardarConcepto();

        }

    });

    validator = $('#frm-registrar2').validate({

        submitHandler: function (form) {
            
            insertarCategoria();

        }

    });
    getUnidades();
    getCategoriasConceptos();
    getConceptos();

});

function guardarConcepto() {
    var descripcion = $('#descripcion').val();
    var idUnidad = $('#cbUnidades').val();
    var idCategoria = $('#cbCategorias').val();
    console.log(idCategoria);
        $.ajax({
            type: 'POST',
            url: rutaModal,
            dataType: 'json',
            data: {
                "descripcion": descripcion,
                "idUnidad": idUnidad,
                "idCategoria": idCategoria,
                "idConcepto": idConceptoAct,
                "_token": $("meta[name='csrf-token']").attr("content")
            },
            success: function (response) {
                Swal.fire({
                    title: 'Realizado!',
                    text: "Concepto agregado correctamente",
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                  }).then((result) => {
                    console.log(response);
                    $('#modalConcepto').modal('hide');
                    getConceptos();
                  })
                
            },
            error: function (texterror) {
                console.log(texterror);  
            }
        });
}
function insertarCategoria() {
    var categoria = $('#categoria').val();
    var nombreCorto = $('#nombreCorto').val();
    
        $.ajax({
            type: 'POST',
            url: '../insertarCategoria',
            dataType: 'json',
            data: {
                "categoria": categoria,
                "nombreCorto": nombreCorto,
                "_token": $("meta[name='csrf-token']").attr("content")
            },
            success: function (response) {
                Swal.fire({
                    title: 'Realizado!',
                    text: "Categoria agregada correctamente",
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                  }).then((result) => {
                    console.log(response);
                    getCategoriasConceptos();
                    $('#modalCategoria').modal('hide');
                  })
                
            },
            error: function (texterror) {
                console.log(texterror);  
                Swal.fire({
                    title: 'Error!',
                    text: "Todos los campos son requeridos",
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                  });
            }
        });
}
function getConceptos() {
    var tableData = new Array();
    $.ajax({
        type: 'POST',
        url: '../getConceptos',
        dataType: 'json',
        data: {
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (response) {
            var data = response;
            var x = 0;
            var numCoor = 0;
            for (var i = 0; i < data[0].length; i++) {
                tableData[x] = new Array()
                numCoor++;
                tableData[x][0] = data[0][i]['idConcepto'];
                tableData[x][1] = data[0][i]['descripcion'];
                tableData[x][2] = data[0][i]['descripcionCategoria'];
                tableData[x][3] = data[0][i]['categoria'];
                tableData[x][4] = data[0][i]['idUnidad'];
                tableData[x][5] = data[0][i]['unidad'];
                tableData[x][6] = `<div class="row" style="max-width: 160px; min-width: 140px">
                                    <div class="col-md-6" >
                                        <a href="#" class="btn btn-simple btn-editar btn-icon edit"  data-toggle="tooltip" data-placement="top" title="Editar">
                                        <i class="material-icons" data-idMaterial="'+data[i]['idMaterial']+'">create</i>
                                        </a>
                                    </div>
                                    <div class="col-md-6">
                                        <a href="#" class="btn btn-simple bg-red eliminar btn-icon" data-toggle="tooltip"  data-placement="top" title="Eliminar">
                                            <i class="material-icons">delete</i>
                                        </a>
                                    </div>
                                   </div>`;

                x++;
            }
            console.log(data)
            $('#tablaConceptos').dataTable().fnClearTable();
            if (numCoor > 0) {
                $('#tablaConceptos').dataTable().fnAddData(tableData);
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
           for (let i = 0; i < response.length; i++) {
            $("#cbUnidades").append(new Option(response[i]['unidad'], response[i]['idUnidad']));
           }
            
        },
        error: function (responsetext) {
            console.log(responsetext);
        }

    });

}

function getCategoriasConceptos() {
    var tableData = new Array();
    $.ajax({
        type: 'POST',
        url: '../getCategoriasConceptos',
        dataType: 'json',
        data: {
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (response) {
           console.log(response);
           $("#cbCategorias").empty();
           $("#cbCategorias").append(new Option('-Selecciona-', 0));
           for (let i = 0; i < response.length; i++) {
            $("#cbCategorias").append(new Option(response[i]['descripcionCategoria'], response[i]['idCategoria']));
           }
        },
        error: function (responsetext) {
            console.log(responsetext);
        }

    });

}

function clearModal(){
    
    $( "#cbUnidades" ).val(0);
    $('#cbCategorias').val(0);
    $('#descripcion').val('');
}


//funcion para leer datos de excel y llenar base de datos con conceptos y categorias
function fileReader(oEvent) {
    var oFile = oEvent.target.files[0];
    var sFilename = oFile.name;

    var reader = new FileReader();
    var result = {};

    reader.onload = function (e) {
        var data = e.target.result;
        data = new Uint8Array(data);
        var workbook = XLSX.read(data, {type: 'array'});
        //console.log(workbook);
        var result = {};
        workbook.SheetNames.forEach(function (sheetName) {
            var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header: 1});
            if (roa.length) result[sheetName] = roa;
        });
        // see the result, caution: it works after reader event is done.
        let categorias = [];
        let conceptos = [];
        let costos = [];
        let idCategoria = [];
        let cont = 0;
        for(let i = 0; i < result['Sheet1'].length; i++){
            if(result['Sheet1'][i].length == 2){
                categorias.push(result['Sheet1'][i][1])
                cont ++;
            }else{
                if(result['Sheet1'][i][0] =! null){
                    conceptos.push(result['Sheet1'][i][1]);
                    costos.push(result['Sheet1'][i][4]);
                    idCategoria.push(cont);
                }
            }
        }
        console.log(costos);
        console.log(idCategoria);
        console.log(conceptos);
        $.ajax({
            type: 'POST',
            url: '../setTarjetas',
            dataType: 'json',
            data: {
                conceptos: conceptos,
                costos: costos,
                idCategoria: idCategoria,
                "_token": $("meta[name='csrf-token']").attr("content")
            },
            success: function (response) {
               console.log(response);
               
            },
            error: function (responsetext) {
                console.log(responsetext);
            }
    
        });
    };
    reader.readAsArrayBuffer(oFile);
}

function eliminarConcepto(idConcepto) {
    Swal.fire({
        title: '¿Eliminar concepto?',
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
            url: '../eliminarConcepto',
            dataType: 'json',
            data: {
                idConcepto: idConcepto,
                "_token": $("meta[name='csrf-token']").attr("content")
            },
            success: function (response) {
                Swal.fire({
                    title: 'Realizado',
                    text: "Concepto eliminado correctamente",
                    icon: 'success',
                  });
                  getConceptos();
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
