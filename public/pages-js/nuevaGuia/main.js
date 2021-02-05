L.mapbox.accessToken = 'pk.eyJ1IjoiZ29tZXo5NSIsImEiOiJjazA0NXhxZ2swMjE3M2NvN3h6ZHBhcnh5In0.b-R7QxkiI4gwcE5-0RDjOQ';
var banderaMapa = false;
var router = '';
var marcadorOrigen = '';
var marcadorDestino = '';

map = L.mapbox.map('map', null, { zoomControl: false });

$( document ).ready(function() {
    $('.dropify').dropify({
        messages: {
            'default': 'Click Para Seleccionar Fotos del Paquete',
            'replace': 'Click Para Reemplazar Fotos',
            'remove':  'Remover',
            'error':   'Ooops, ocurrio un error'
        }
    });
});

$.ajax({
    type: 'POST',
    url: '../getTelefonosRemitente',
    dataType: 'json',
    data: 
    {
        "_token": $("meta[name='csrf-token']").attr("content")
    },
    success: function (data) 
    {
        var contenido = '';
        data.forEach(function(element)
        {
            if(element.telefono != null)
                contenido += '<option value="'+element.telefono+'">';
        });
        $('#telefonosRemitente').html(contenido);
    },
    error: function (e) 
    {
        console.log(e);
    }
});

$.ajax({
    type: 'POST',
    url: '../getTelefonosDestinatario',
    dataType: 'json',
    data: 
    {
        "_token": $("meta[name='csrf-token']").attr("content")
    },
    success: function (data) 
    {
        var contenido = '';
        data.forEach(function(element)
        {
            if(element.telefono != null)
                contenido += '<option value="'+element.telefono+'">';
        });
        $('#telefonosDestinatario').html(contenido);
    },
    error: function (data) 
    {
        
    }
});


$('#mdModal').on('shown.bs.modal', function () 
{
    $('.page-loader-wrapper').fadeIn();
    if(banderaMapa)
    {
        ruta();
    }
    else
    {
        banderaMapa = true;

        map.on('load', function(e) 
        {
            ruta();
        });

        map.setView([20.527893, -100.816160], 14);
        map.addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));

        map.scrollWheelZoom.disable();
    }
});


$('#calculadoraModal').on('shown.bs.modal', function () 
{
    $('#calculadoraCosto').text($('#costo').val());
    $('#pagoCalculadora').val(0);
    $('#calculadoraCambio').text('');
    $('#pagoCalculadora').focus();
});


function ruta()
{
    var markerArray = new Array();
    var direccionOrigen = $('#calleRemitente').val() + ' ' + $('#numeroRemitente').val() + ', ' +  $('#coloniaRemitente').val() + ', ' + $('#cpRemitente').val() + ', ' + $('#ciudadRemitente').val() + ', ' + $('#estadoRemitente').val();
    direccionOrigen = encodeURI(direccionOrigen);
    var direccionDestino = $('#calleDestinatario').val() + ' ' + $('#numeroDestinatario').val() + ', ' +  $('#coloniaDestinatario').val() + ', ' + $('#cpDestinatario').val() + ', ' + $('#ciudadDestinatario').val() + ', ' + $('#estadoDestinatario').val();
    direccionDestino = encodeURI(direccionDestino);

    if(router != '')
    {
        map.removeLayer(router);
        router = '';
    }
    if(marcadorOrigen != '')
    {
        map.removeLayer(marcadorOrigen);
        marcadorOrigen = '';
    }
    if(marcadorDestino != '')
    {
        map.removeLayer(marcadorDestino);
        marcadorDestino = '';
    }


    $.ajax(
    {
        type: 'POST',
        url: 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyA63S1VZBEEm7yug_HcfiV3KWqEzsmnjCk&address='+direccionOrigen,
        dataType: 'json',
        data: 
        {
        },
        success: function (data) 
        {
            if(data.status == 'OK')
            {
                var lat = data.results[0].geometry.location.lat;
                var lng = data.results[0].geometry.location.lng;
                marcadorOrigen = L.marker(new L.LatLng(lat, lng), 
                {
                    icon: L.mapbox.marker.icon({
                        'marker-color': 'E91E63',
                        'marker-symbol': '1',
                        'marker-size' : 'large'
                    })
                }).addTo(map);
                markerArray.push(marcadorOrigen);
                $.ajax(
                {
                    type: 'POST',
                    url: 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyA63S1VZBEEm7yug_HcfiV3KWqEzsmnjCk&address='+direccionDestino,
                    dataType: 'json',
                    data: 
                    {
                    },
                    success: function (dataD) 
                    {
                        if(data.status == 'OK')
                        {
                            var latD = dataD.results[0].geometry.location.lat;
                            var lngD = dataD.results[0].geometry.location.lng;
                            marcadorDestino = L.marker(new L.LatLng(latD, lngD), 
                            {
                                icon: L.mapbox.marker.icon({
                                    'marker-color': '8BC34A',
                                    'marker-symbol': '2',
                                    'marker-size' : 'large'
                                })
                            }).addTo(map);
                            markerArray.push(marcadorDestino);
                            var group = new L.featureGroup(markerArray);
                            map.fitBounds(group.getBounds(),{padding: [50,50]});
                            router = L.Routing.control({
                                router: L.Routing.mapbox('pk.eyJ1IjoiZ29tZXo5NSIsImEiOiJjazA0NXhxZ2swMjE3M2NvN3h6ZHBhcnh5In0.b-R7QxkiI4gwcE5-0RDjOQ'),
                                waypoints: 
                                [
                                    L.latLng(lat, lng),
                                    L.latLng(latD, lngD)
                                ],
                                createMarker: function() { return null; },
                                addWaypoints: false,
                                lineOptions: 
                                {
                                    styles: [{color: '#00BCD4', opacity: 1, weight: 5, className: 'animate'}]
                                }
                            }).addTo(map);
                            router.hide();

                            $('.page-loader-wrapper').fadeOut();
                        }
                        else
                        {
                            $('.page-loader-wrapper').fadeOut();
                        }
                    }
                });
            }
            else
            {
                $('.page-loader-wrapper').fadeOut();
            }
        }
    });
    
    /*var marcadorOrigen = L.marker(new L.LatLng(element.latitud, element.longitud), 
    {
        icon: L.mapbox.marker.icon({
            'marker-color': 'E91E63',
            'marker-symbol': '1',
            'marker-size' : 'large'
        })
    });*/
}