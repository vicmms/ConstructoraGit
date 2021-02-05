L.mapbox.accessToken = 'pk.eyJ1IjoiZ29tZXo5NSIsImEiOiJjazA0NXhxZ2swMjE3M2NvN3h6ZHBhcnh5In0.b-R7QxkiI4gwcE5-0RDjOQ';

var mapaModal = false;
var mapM;
var marcadorEdit = '';
var claveEdit = 0;
var funcion = 'nuevo';
var direccion,calle,no,cd,edo,col;

var table = null;
var validator = null;

$(document).ready(function () {

    table = $('#tablePuntos').DataTable({
        "pagingType": "full_numbers",
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        responsive: true,
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Busqueda...",
            decimal: "",
            emptyTable: "No hay información",
            info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
            infoFiltered: "(Filtro de _MAX_ total)",
            infoPostFix: "",
            thousands: ",",
            lengthMenu: "Mostrar _MENU_ Entradas",
            loadingRecords: "Cargando...",
            processing: "Procesando...",
            search: "Buscar:",
            zeroRecords: "Sin resultados encontrados",
            paginate: {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Sig",
                "previous": "Ant"
            }
        },
        "columnDefs": [
            {
                "targets": [ 0, 9 ],
                "visible": false,   
                "searchable": false
            }
        ]
    });

    $('#guardarPunto').click(function()
    {
        if(funcion == 'nuevo')
        {
            $.ajax({
                type: 'POST',
                url: '../insertarPuntosRecoleccion',
                dataType: 'text',
                data: {
                    nombre: $('#nombrePR').val(),
                    direccion: $('#direccionPR').val(),
                    latitud: marcadorEdit.getLatLng().lat,
                    longitud: marcadorEdit.getLatLng().lng,
                    telefono: $('#telefonoPR').val(),
                    responsable: $('#responsablePR').val(),
                    user: $('#userPR').val(),
                    pass: $('#passPR').val()
                },
                success: function (response) 
                {
                    getPuntos();
                    swal("Se agregó correctamente!", "", "success");
                }
            });
        }
        else
        {
            $.ajax({
                type: 'POST',
                url: '../actualizarPuntosRecoleccion',
                dataType: 'text',
                data: {
                    clavepunto: claveEdit,
                    nombre: $('#nombrePR').val(),
                    direccion: $('#direccionPR').val(),
                    latitud: marcadorEdit.getLatLng().lat,
                    longitud: marcadorEdit.getLatLng().lng,
                    telefono: $('#telefonoPR').val(),
                    responsable: $('#responsablePR').val()
                },
                success: function (response) 
                {

                    getPuntos();
                    swal("Se actualizó correctamente!", "", "success");
                },
                error: function(e)
                {
                    console.log(e);
                }
            });
            claveEdit = 0;
        }
    });

    $('#mapModal').mouseup(function(){
        lat = marcadorEdit.getLatLng().lat;
        long = marcadorEdit.getLatLng().lng;
        url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}
        &key=AIzaSyA63S1VZBEEm7yug_HcfiV3KWqEzsmnjCk`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                 calle = data.results[0].address_components[1]['short_name'];
                 col = data.results[0].address_components[2].short_name;
                 no = data.results[0].address_components[0].short_name;
                 cd = data.results[0].address_components[3].short_name;
                 edo = data.results[0].address_components[4].short_name;

                 $('#direccionPR').val(calle+' '+no+', '+col+', '+cd+', '+edo);
            })
    });
        
    $('#nuevoPunto').click(function()
    {
        funcion = 'nuevo';

        $('#nombrePR').val('');
        $('#direccionPR').val('');
        $('#userPR').val('');
        $('#passPR').val('');
        $('#telefonoPR').val('');
        $('#responsablePR').val('');

        $("#userPR").prop( "disabled", false );
        $("#passPR").prop( "disabled", false );


        if(marcadorEdit != '')
        {
            mapM.removeLayer(marcadorEdit);
        }

        var puntoIconImage = L.divIcon(
        {
            className: 'puntoIconImage',
            html: "<div class='divIcon'>"+
                    "<img src='../assets/map/icons/puntoRecoleccion.png'>"+
                    "</div>",
            iconSize: [70, 70],
            iconAnchor: [35, 35]
        });

        marcadorEdit = L.marker(
            [
                20.527893, 
                -100.816160
            ], 
            {icon: puntoIconImage, draggable: true}
        );

        $('#modalNuevo').modal('show');
    });



    $('#modalNuevo').on('shown.bs.modal', function (e) 
    {
        if(!mapaModal)
        {
            mapaModal = true;

            mapM = L.mapbox.map('mapModal',);

            mapM.on('load', function(e) 
            {
                marcadorEdit.addTo(mapM);
            });

            mapM.setView([marcadorEdit.getLatLng().lat, marcadorEdit.getLatLng().lng], 14);
            mapM.addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));

            mapM.zoomControl.setPosition('topright');

        }
        else
        {
            marcadorEdit.addTo(mapM);
            mapM.setView([marcadorEdit.getLatLng().lat, marcadorEdit.getLatLng().lng], 14);
        }
    });
        getPuntos();

    // Edit record
    table.on('click', '.edit', function () {
        data = null;
        funcion = '';
        $tr = $(this).parents('tr');
        //Si la tabla esta collapsada (se creo un nuevo tr con clase child)tomamos el tr previo
        if ($tr.hasClass('child')) {
            $tr = $tr.prev();
        }
        data = table.row($tr).data();
        trT = $tr;
        //ocultos
        var puntoIconImage = L.divIcon(
            {
                className: 'puntoIconImage',
                html: "<div class='divIcon'>"+
                        "<img src='../assets/map/icons/puntoRecoleccion.png'>"+
                        "</div>",
                iconSize: [70, 70],
                iconAnchor: [35, 35]
            });
        //visibles
        claveEdit = data[0];
        $('#nombrePR').val(data[1]);
        $('#direccionPR').val(data[2]);
        //$("#foto").attr("data-default-file", "../images/unidades/"+data[4]);
        $('#telefonoPR').val(data[5]);
        $('#responsablePR').val(data[3]);
        $('#userPR').val(data[4]);     

        if(marcadorEdit != '')
        {
            mapM.removeLayer(marcadorEdit);
        }
        marcadorEdit = L.marker(
            [
                data[6], 
                data[7]
            ], 
            {icon: puntoIconImage, draggable: true}
        );
        $('#modalNuevo').modal('show');
       
    });
    // activoSN
    table.on('click', '.activo', function () {
        data = null;
        $tr = $(this).parents('tr');
        //Si la tabla esta collapsada (se creo un nuevo tr con clase child)tomamos el tr previo
        if ($tr.hasClass('child')) {
            $tr = $tr.prev();
        }
        data = table.row($tr).data();
        trT = $tr;
        let estado;
        if(data[9] == 1){
            estado = 0;
        }else{
            estado = 1;
        }
        actualizarActivoSN(data[0], estado);
    });
   



});
function getPuntos() {
    var tableData = new Array();
    $.ajax({
        type: 'POST',
        url: '../getPuntosRecoleccion',
        dataType: 'json',
        data: {
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (response) {
            console.log(response);
            var data = response;
            var x = 0;
            let icon, clase;
            var numCoor = 0;
            for (var i = 0; i < data.length; i++) {
                if(data[i]['activoSN'] == 1){
                    icon = 'lock_open';
                    clase = 'btn-success';
                }else{
                    icon = 'lock_outline';
                    clase = 'btn-eliminar';
                }
                tableData[x] = new Array()
                numCoor++;
                tableData[x][0] = data[i]['clavePuntoRecoleccion'];
                tableData[x][1] = data[i]['nombrePunto'];       
                tableData[x][2] = data[i]['direccion'];
                tableData[x][3] = data[i]['nombreResponsable'];       
                tableData[x][4] = data[i]['usuario'];       
                tableData[x][5] = data[i]['telefono'];       
                tableData[x][6] = data[i]['latitud'];
                tableData[x][7] = data[i]['longitud'];
                tableData[x][8] = '<a href="#" class="btn btn-simple btn-editar btn-icon edit" data-toggle="tooltip" data-placement="top" title="Editar">' +
                    '<i class="material-icons">create</i>' +
                    '</a>  <a href="#" class="btn '+clase+' btn-simple btn-icon activo" data-toggle="tooltip" data-placement="top" title="estado">' +
                    '<i class="material-icons">'+icon+'</i>' +
                    '</a>';
                tableData[x][9] = data[i]['activoSN'];
                x++;

            }

            $('#tablePuntos').dataTable().fnClearTable();
            if (numCoor > 0) {
                $('#tablePuntos').dataTable().fnAddData(tableData);
            }

            


        },
        error: function (responsetext) {
            console.log(responsetext);

        }

    });
}
    
function actualizarActivoSN(clavepunto, activoSN) {
    let mensaje = 'Bloqueado';
    $.ajax({
        type: 'POST',
        url: '../actualizarActivoSN',
        dataType: 'json',
        data: {
            clavepunto: clavepunto,
            activoSN: activoSN,
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (response) {
                getPuntos();
                if(activoSN == 1){
                    mensaje = 'Desbloqueado';
                }
                swal(mensaje+" correctamente!", "", "success");
            },
        error: function (responsetext) {
            console.log(responsetext);

        }

    });
}
    



