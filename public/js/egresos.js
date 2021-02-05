

$(document).ready(function () {

    table = $('#tablaEgresos').DataTable();
    $("#cbProyectos").onchange = function(){

    };

     //Submit form registrar
     $('#modal-btn-save').on('click', function () {
        setEgreso();
    });

    $('#btn-nuevo-egreso').on('click', function () {
        clearModal();
    });
    getProyectos();
    getFormasPago();
    getTipoGastos();
    getUnidades();
    getEgresos();
});

function getProyectos() {


    $.ajax({

        type: 'POST',
        url: '../getProyectos',
        dataType: 'json',
        data: {
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (response) {
            console.log(response);
            for (let i = 0; i < response.length; i++) {  
                $("#cbProyectos").append(new Option(response[i]['nombreProyecto'], response[i]['idProyecto']));
                console.log(i)
            }
            console.log($( "#cbProyectos" ).val());

        },

        error: function (responsetext) {
            console.log(responsetext);

        }



    });

}

function getFormasPago() {
    $.ajax({
        type: 'POST',
        url: '../getFP',
        dataType: 'json',
        data: {
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (response) {
            console.log(response);
            for (let i = 0; i < response.length; i++) {  
                $("#cbFP").append(new Option(response[i]['descripcion'], response[i]['idFormaPago']));
                console.log(i)
            }
        },
        error: function (responsetext) {
            console.log(responsetext);
        }
    });
}

function getTipoGastos() {
    $.ajax({
        type: 'POST',
        url: '../getTipoGasto',
        dataType: 'json',
        data: {
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (response) {
            console.log(response);
            for (let i = 0; i < response.length; i++) {  
                $("#cbTipoGasto").append(new Option(response[i]['tipoGasto'], response[i]['idTipoGasto']));
            }
        },
        error: function (responsetext) {
            console.log(responsetext);
        }
    });
}

function getUnidades() {
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

function getEgresos() {
    var tableData = new Array();
    $.ajax({
        type: 'POST',
        url: '../getEgresos',
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
                tableData[x][0] = data[i]['fecha'];
                tableData[x][1] = data[i]['nombreProyecto'];
                tableData[x][2] = data[i]['concepto'];
                tableData[x][3] = data[i]['tipoGasto'];
                tableData[x][4] = data[i]['descripcion'];
                tableData[x][5] = 'no aplica';
                tableData[x][6] = data[i]['unidad'];
                tableData[x][7] = data[i]['cantidadUnidad'];
                tableData[x][8] = data[i]['monto'];
                
                x++;
            }
            $('#tablaEgresos').dataTable().fnClearTable();
            if (numCoor > 0) {
                $('#tablaEgresos').dataTable().fnAddData(tableData);
            }
        },
        error: function (responsetext) {
            console.log(responsetext);
        }
    });
}

function setEgreso() {
console.log($( "#cbFP" ).val());

        $.ajax({
            type: 'POST',
            url: '../setEgreso',
            dataType: 'json',
            data: {
                "idProyecto": $( "#cbProyectos" ).val(),
                "fecha": $('#fecha').val(),
                "formaPago": $( "#cbFP" ).val(),
                "monto": $('#monto').val(),
                "tipoGasto": $('#cbTipoGasto').val(),
                "unidad": $('#cbUnidades').val(),
                "cantidadUnidad": $('#cantidad').val(),
                "concepto": $('#concepto').val(),

                "_token": $("meta[name='csrf-token']").attr("content")
            },
            success: function (response) {
                console.log(response);
                getEgresos();
                clearModal();
                $('#modalEgresos').modal('hide');

            },

            error: function (texterror) {
                console.log(texterror);
              
            }
        });

}

function clearModal(){
    
    $( "#cbFP" ).val('Efectivo');
    $('#cantidad').val(0);
    $('#monto').val(0);
    $('#concepto').val('');
}