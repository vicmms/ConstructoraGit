L.mapbox.accessToken = 'pk.eyJ1IjoiZ29tZXo5NSIsImEiOiJjazA0NXhxZ2swMjE3M2NvN3h6ZHBhcnh5In0.b-R7QxkiI4gwcE5-0RDjOQ';

var mapaModal = false;
var mapM;
var marcadorEdit = '';
var claveEdit = 0;
var funcion = 'nuevo';

map = L.mapbox.map('map',);

var markersArray = new Array();
var markersArrayUnidades = new Array();

map.on('load', function(e) 
{

	$('.collapse').awesomeCursor('mouse-pointer', {
	    color: 'limegreen',
	    size: 24,
	    outline: 'brown'
	  });

	var controlBar = L.control.bar('bar',
	{
        position:'bottom',
        visible:false
    });
    map.addControl(controlBar);

    $.ajax({
        type: 'POST',
        url: '../getPuntosRecoleccion',
        dataType: 'json',
        data: {
        },
        success: function (response) 
        {
        	console.log(response);

        	var contenido = '';
        	markersArray = new Array();
        	response.forEach(function(element)
        	{

				var puntoIconImage = L.divIcon(
				{
				    className: 'puntoIconImage',
				    html: "<div class='divIcon'>"+
				    		"<img src='../assets/map/icons/puntoRecoleccion.png' data-id='"+element.clavePuntoRecoleccion+"' class='marcadorImagen'>"+
				    		"<div class='divCards'>"+
					    		"<div class='info-box-3 bg-red' style='display:block;'>"+
					    			"<h2>"+element.nombrePunto+
					    				"<br><small>Sucursal</small>"+
                            		"</h2>"+
					    			"<h2>"+element.direccion+
					    				"<br><small>Dirección</small>"+
                            		"</h2>"+
			                    "</div>"+
			                	"<div class='puntoNumeroPaquetes'>"+element.totalPaquetes+"</div>"+
			                "</div>"+
				    		"</div>",
				    iconSize: [70, 70],
				    iconAnchor: [35, 35]
				});

				contenido += '<tr class="pR" data-lat="' + element.latitud + '" data-lng="' + element.longitud + '">'
				+'<th>' + element.clavePuntoRecoleccion + '</th><td>' + element.nombrePunto + '</td></tr>';

        		var m = L.marker(
        			[
        				element.latitud, 
        				element.longitud
        			], 
        			{icon: puntoIconImage}
        		).addTo(map);

				markersArray.push({id:element.clavePuntoRecoleccion,marcador:m,nombre:element.nombrePunto,direccion:element.direccion,lat:element.latitud,lng:element.longitud});

        	});
        	$('#bodyPuntosRecoleccion').html(contenido);

        	$('tr.pR').click(function()
        	{
        		map.setView([$(this).data('lat'),$(this).data('lng')], 17);
        	});

        	$('.marcadorImagen').click(function()
        	{
        		var id = $(this).data('id');
        		funcion = 'editar';

        		markersArray.forEach(function(element)
        		{
        			if(element.id == id)
        			{
        				claveEdit = id;
        				$('#nombrePR').val(element.nombre);
        				$('#direccionPR').val(element.direccion);

        				$('#telefonoPR').val('');
						$('#responsablePR').val('');

        				$('#userPR').val('');
						$('#passPR').val('');

						$("#userPR").prop( "disabled", true );
						$("#passPR").prop( "disabled", true );

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
		        				element.lat, 
		        				element.lng
		        			], 
		        			{icon: puntoIconImage, draggable: true}
		        		);
        			}
        		});
        		$('#modalNuevo').modal('show');
        	});
        }
    });

    $.ajax({
        type: 'POST',
        url: '../getTablaMonitoreo',
        dataType: 'json',
        data: {
        },
        success: function (response) 
        {
        	console.log(response);
        	var contenido = '';
        	response.forEach(function(element)
        	{
        		if(element.latitudGPS != null && element.longitudGPS != null)
        		{
        			var puntoIconImage = L.divIcon(
					{
					    className: 'puntoIconImage',
					    html: "<div class='divIcon'>"+
				    		"<img src='../assets/map/icons/camioncito.png' data-id='"+element.clavePuntoRecoleccion+"' class='marcadorImagen'>"+
				    		"<div class='divCards'>"+
					    		"<div class='info-box-3 bg-cyan' style='display:block;'>"+
					    			"<h2>"+element.paquetesParaEntrega+
					    				"<br><small>Para entrega</small>"+
                            		"</h2>"+
					    			"<h2>"+element.paquetesParaOficina+
					    				"<br><small>Paquetes para oficina</small>"+
                            		"</h2>"+
			                    "</div>"+
			                "</div>"+
				    		"</div>",
					    iconSize: [50, 50],
					    iconAnchor: [25, 25]
					});

					//contenido += '<tr class="pR" data-lat="' + element.latitudGPS + '" data-lng="' + element.longitudGPS + '">'
					//+'<th>' + element.clavePuntoRecoleccion + '</th><td>' + element.nombrePunto + '</td></tr>';

	        		var m = L.marker(
	        			[
	        				element.latitudGPS, 
	        				element.longitudGPS
	        			], 
	        			{icon: puntoIconImage}
	        		).addTo(map);
	        		m.on('click',function()
	        		{
				        controlBar.toggle();
				    });
	        		markersArrayUnidades.push({id:element.id,marcador:m});
        		}
        		contenido += '<tr class="pR" data-lat="' + element.latitudGPS + '" data-lng="' + element.longitudGPS + '">'
				+'<th>' + element.id + '</th><td>' + (element.claveRepartidorActual == null ? '-' : element.claveRepartidorActual) + '</td>'+
				'<td>'+element.nombreGeocerca+'</td></tr>';
        	});
        	createKnob();
        	$('#bodyMonitor').html(contenido);
        }
    });
});

map.setView([20.527893, -100.816160], 14);
map.addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));

map.zoomControl.setPosition('topright');
			
//var sidebar = L.control.sidebar('sidebar').addTo(map);
	

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
	}
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
	        	swal("Se actualizó correctamente!", "", "success");
	        },
	        error: function(e)
	        {
	        	console.log(e);
	        }
	    });
	}
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

var monitor = false;

$('#monitoreoBtn').click(function()
{
	if(monitor)
	{
		$('#mapTableMonitor').addClass('hidden');
		markersArray.forEach(function(element)
		{
			element.marcador.addTo(map);
		});
	}
	else
	{
		markersArray.forEach(function(element)
		{
			map.removeLayer(element.marcador);
		});
		$('#mapTableMonitor').removeClass('hidden');
	}
	monitor = !monitor;
});

setInterval(function()
{ 
	$.ajax({
        type: 'POST',
        url: '../getTablaMonitoreo',
        dataType: 'json',
        data: {
        },
        success: function (response) 
        {
        	var contenido = '';
        	response.forEach(function(element)
        	{
        		markersArrayUnidades.forEach(function(elementArray)
        		{
        			if(element.id == elementArray.id)
        			{
        				elementArray.marcador.setLatLng([element.latitudGPS,element.longitudGPS]);
        			}
        		});
        	});
        	$('#bodyUnidadesMonitoreo').html(contenido);
        }
    });
}, 10000);

function createKnob()
{
	$('.knob').knob({
        draw: function () {
            // "tron" case
            if (this.$.data('skin') == 'tron') {

                var a = this.angle(this.cv)  // Angle
                    , sa = this.startAngle          // Previous start angle
                    , sat = this.startAngle         // Start angle
                    , ea                            // Previous end angle
                    , eat = sat + a                 // End angle
                    , r = true;

                this.g.lineWidth = this.lineWidth;

                this.o.cursor
                    && (sat = eat - 0.3)
                    && (eat = eat + 0.3);

                if (this.o.displayPrevious) {
                    ea = this.startAngle + this.angle(this.value);
                    this.o.cursor
                        && (sa = ea - 0.3)
                        && (ea = ea + 0.3);
                    this.g.beginPath();
                    this.g.strokeStyle = this.previousColor;
                    this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sa, ea, false);
                    this.g.stroke();
                }

                this.g.beginPath();
                this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sat, eat, false);
                this.g.stroke();

                this.g.lineWidth = 2;
                this.g.beginPath();
                this.g.strokeStyle = this.o.fgColor;
                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                this.g.stroke();

                return false;
            }
        }
    });
}


$('.leaflet-container').on('mouseover', '.puntoIconImage', function(){
  $('.puntoIconImage').css({
    "z-index": "1"
  });

  $(this).css({
  	"z-index": "10"
  });
});