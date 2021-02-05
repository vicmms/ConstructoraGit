

$(document).ready(function () {

    table = $('#tablaIngresos').DataTable();
    $("#cbProyectos").onchange = function(){

    };

    // validator = $('#frm-registrar').validate({
    //     submitHandler: function (form) {
    //         setIngreso();
    //     },
    //     errorPlacement: function (error, element) {
    //         error.insertAfter(element)
    //     }
    // });

     //Submit form registrar
     $('#modal-btn-save').on('click', function () {
        setIngreso();
    });
    $('#cbProyectos').on('change', function(){
        getIngresos();
    });
    $('#btn-nuevo-ingreso').on('click', function () {
        clearModal();
    });
    getProyectos();
    getFormasPago();
    getIngresos();
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
            }
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
            }

        },

        error: function (responsetext) {
            console.log(responsetext);

        }



    });

}

function getIngresos() {
    var tableData = new Array();
    $('#cbProyectos').val() == 0 ? url = 'getAllIngresos' : url = 'getIngresos';
    $.ajax({
        type: 'POST',
        url: '../'+url,
        dataType: 'json',
        data: {
            idProy: $('#cbProyectos').val(),
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
                tableData[x][3] = data[i]['descripcion'];
                tableData[x][4] = data[i]['monto'];
                x++;
            }
            $('#tablaIngresos').dataTable().fnClearTable();
            if (numCoor > 0) {
                $('#tablaIngresos').dataTable().fnAddData(tableData);
            }
        },
        error: function (responsetext) {
            console.log(responsetext);
        }
    });
}

function setIngreso() {
console.log($( "#cbFP" ).val());
        $.ajax({
            type: 'POST',
            url: '../setIngreso',
            dataType: 'json',
            data: {
                "idProyecto": $( "#cbProyectos" ).val(),
                "fecha": $('#fecha').val(),
                "formaPago": $( "#cbFP" ).val(),
                "monto": $('#monto').val(),
                "concepto": $('#concepto').val(),

                "_token": $("meta[name='csrf-token']").attr("content")
            },
            success: function (response) {
                console.log(response);
                getIngresos();
                clearModal();
                $('#modalIngresos').modal('hide');

            },

            error: function (texterror) {
                console.log(texterror);
              
            }
        });

}

function clearModal(){
    
    $( "#cbFP" ).val('Efectivo');
    $('#cantidad').val('');
    $('#concepto').val('');
}