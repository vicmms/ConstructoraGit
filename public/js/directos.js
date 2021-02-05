var semana=0;
var cont = 1;
var mes, anio;
$(document).ready(function () {
    $(".flatpickr").flatpickr(
        {
            mode:"",
            dateFormat: "Y-m-d",
            defaultDate: "today",
            onClose: function(selectedDates, dateStr, instance) {            
                let m = dateStr.split('.');
                let a = selectedDates[0]+'';
                let a2 = a.split(" ");
                 mes = m[0];
                 anio = a2[3];   
                 getGastos();
            },
            onReady: function(selectedDates, dateStr, instance) {            
                let m = dateStr.split('.');
                let a = selectedDates[0]+'';
                let a2 = a.split(" ");
                 mes = m[0];
                 anio = a2[3];   
                 getGastos();
            },
            plugins: [
                new monthSelectPlugin({
                  shorthand: true, //defaults to false
                  dateFormat: "m.y", //defaults to "F Y"
                  altFormat: "F Y", //defaults to "F Y"
                  theme: "dark" // defaults to "light"
                })
            ]
        });
     
        getProyectos();
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

function getGastos() {
    $.ajax({
        
        type: 'POST',
        url: '../getGastosDirectos',
        dataType: 'json',
        data: {
            idProyecto: $( "#cbProyectos" ).val(),
            mes: mes,
            anio: anio,
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (response) {
            $("#tb").empty();
            console.log($( "#cbProyectos" ).val());
            cont = 1;
            if (response.length == 0) {
                let table = document.getElementById('tb');
                let row = table.insertRow(-1);
                let cell = row.insertCell(0);
                cell.innerHTML= 'Sin registros';
                cell.colSpan = 3;
                // cell.className = 'tdheader';
                cont++;
            }
            for (let i = 0; i < response.length ; i++) {
                fechaAux = response[i]['fecha'].split('-');
                fecha = fechaAux[2]+'-'+fechaAux[1]+'-'+fechaAux[0];
                semanaAux = getSemana(fecha);
                if (semanaAux != semana) {
                    let table = document.getElementById('tb');
                    // table.deleteRow(0);
                    let row = table.insertRow(-1);
                    let cell = row.insertCell(0);
                    cell.innerHTML= 'Semana '+cont;
                    cell.colSpan = 3;
                    cell.className = 'tdheader';
                    cont++;
                }


                var table = document.getElementById('tablaIngresos');
                // table.deleteRow(0);
                var row = table.insertRow(-1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                cell1.innerHTML= response[i]['fecha'];
                cell2.innerHTML= response[i]['concepto'];
                cell3.innerHTML= response[i]['monto'];
                
                semana = semanaAux;
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
    $.ajax({
        type: 'POST',
        url: '../getIngresos',
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


    // A esta funcion se le pasa el parametro en formato fecha
// dd/mm/yyyy o dd-mm-yyyy ambos son aceptados

function getSemana($fecha){
   
    if($fecha.match(/\//)){
       $fecha   =   $fecha.replace(/\//g,"-",$fecha); //Permite que se puedan ingresar formatos de fecha ustilizando el "/" o "-" como separador
    };
    
    $fecha   =   $fecha.split("-"); //Dividimos el string de fecha en trozos (dia,mes,año)
    $dia   =   eval($fecha[0]);
    $mes   =   eval($fecha[1]);
    $ano   =   eval($fecha[2]);
    
    if ($mes==1 || $mes==2){
       //Cálculos si el mes es Enero o Febrero
       $a   =   $ano-1;
       $b   =   Math.floor($a/4)-Math.floor($a/100)+Math.floor($a/400);
       $c   =   Math.floor(($a-1)/4)-Math.floor(($a-1)/100)+Math.floor(($a-1)/400);
       $s   =   $b-$c;
       $e   =   0;
       $f   =   $dia+(31*($mes-1));
    } else {
       //Calculos para los meses entre marzo y Diciembre
       $a   =   $ano;
       $b   =   Math.floor($a/4)-Math.floor($a/100)+Math.floor($a/400);
       $c   =   Math.floor(($a-1)/4)-Math.floor(($a-1)/100)+Math.floor(($a-1)/400);
       $s   =   $b-$c;
       $e   =   $s+1;
       $f   =   $dia+1+Math.floor(((153*($mes-3))+2)/5)+58+$s;
    };
 
    //Adicionalmente sumándole 1 a la variable $f se obtiene numero ordinal del dia de la fecha ingresada con referencia al año actual.
 
    //Estos cálculos se aplican a cualquier mes
    $g   =   ($a+$b)%7;
    $d   =   ($f+$g-$e)%7; //Adicionalmente esta variable nos indica el dia de la semana 0=Lunes, ... , 6=Domingo.
    $n   =   $f+3-$d;
    
    if ($n<0){
       //Si la variable n es menor a 0 se trata de una semana perteneciente al año anterior
       $semana   =   53-Math.floor(($g-$s)/5);
       $ano      =   $ano-1; 
    } else if ($n>(364+$s)) {
       //Si n es mayor a 364 + $s entonces la fecha corresponde a la primera semana del año siguiente.
       $semana   = 1;
       $ano   =   $ano+1;
    } else {
       //En cualquier otro caso es una semana del año actual.
       $semana   =   Math.floor($n/7)+1;
    };
    
    return $semana;//La función retorna una cadena de texto indicando la semana y el año correspondiente a la fecha ingresada   
 };


function clearModal(){
    
    $( "#cbFP" ).val('Efectivo');
    $('#cantidad').val('');
    $('#concepto').val('');
}