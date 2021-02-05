var claveRemitente = 0;
var claveDestinatario = 0;
var guia = 0;
var valor = 0;
var tipoPaquete = 0;

$('#telefonoRemitente').focus();

$(document).keypress(function(event) 
{
    if (event.key === "Enter") 
    {
    	var focused = $(':focus');
    	if(focused[0].id == 'telefonoRemitente')
    	{
    		$('.page-loader-wrapper').fadeIn();
    		buscar('Remitente');
    		$('#nombreRemitente').focus();
    	}
        else if(focused[0].id == 'telefonoDestinatario')
        {
            $('.page-loader-wrapper').fadeIn();
            buscar('Destinatario');
            $('#nombreDestinatario').focus();
        }
    }
});

$(document).on('change',"#telefonoRemitente", function() 
{
    $('.page-loader-wrapper').fadeIn();
    buscar('Remitente');
    $('#nombreRemitente').focus();
});

$(document).on('change',"#telefonoDestinatario", function() 
{
    $('.page-loader-wrapper').fadeIn();
    buscar('Destinatario');
    $('#nombreDestinatario').focus();
});

$(document).on('blur',"#cpRemitente", function() 
{
    $('.page-loader-wrapper').fadeIn();
    if(checkZip($('#cpRemitente').val()))
    	llenaCamposDeZip('Remitente');
    else
    {
    	showNotification('alert-warning', 'No es un código postal válido', 'bottom', 'center', 'animated fadeIn', 'animated fadeOut');
    	$('#cpRemitente').focus();
    	$('.page-loader-wrapper').fadeOut();
    }
});

$(document).on('blur',"#cpDestinatario", function() 
{
    $('.page-loader-wrapper').fadeIn();
    if(checkZip($('#cpDestinatario').val()))
        llenaCamposDeZip('Destinatario');
    else
    {
        showNotification('alert-warning', 'No es un código postal válido', 'bottom', 'center', 'animated fadeIn', 'animated fadeOut');
        $('#cpDestinatario').focus();
        $('.page-loader-wrapper').fadeOut();
    }
});

$(document).on('click',"a[href*='#finish']", function(e) 
{
    e.stopPropagation();
    if($('#costo').val() != '' && $('#peso').val() != '')
    {
        $('#revisionRemitente').text($('#nombreRemitente').val());
        $('#revisionDireccionRemitente').text($('#calleRemitente').val() + ' '+ $('#numeroRemitente').val() + ' ' + $('#coloniaRemitente').val());
        $('#revisionDestinatario').text($('#nombreDestinatario').val());
        $('#revisionDireccionDestinatario').text($('#calleDestinatario').val() + ' '+ $('#numeroDestinatario').val() + ' ' + $('#coloniaDestinatario').val());
        $('#mdModal').modal('show');
    }
});

$(document).on('change',"#tipoPaquete", function() 
{
    tipoPaquete = $(this).val();
    if ($(this).val() != 1) {
        $('#detallePaquete').hide();
        $('#pesoPaquete').show();
        
    }else{
        $('#largoPaquete').val('');
        $('#anchoPaquete').val('');
        $('#altoPaquete').val('');
        $('#detallePaquete').show();
        $('#pesoPaquete').hide();
    }
    if($(this).val() == 2){
        $('#unidadPeso').text('g');
    }else{
        $('#unidadPeso').text('lb');
    }
});

$(document).on('click',"#cotizarPaquete", function() 
{
    if(tipoPaquete==1){
        valor = $('#largoPaquete').val()*$('#anchoPaquete').val()*$('#altoPaquete').val();
    }else{
        valor = $('#peso').val();
    }
    cotizarPaquete(tipoPaquete, valor);
});


$('#aceptarEnvio').click(function(e)
{
    insertarPaquete();
});

function buscar(tipo)
{
	$.ajax({
        type: 'POST',
        url: '../api/clientes/'+tipo+'/get/'+$('#telefono'+tipo).val(),
        dataType: 'json',
        data: 
        {
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (data) 
        {
        	if (data[0] != null) 
        	{
                if(tipo == 'Remitente')
                    claveRemitente = data[0].claveRemitente;
                else
                    claveDestinatario = data[0].claveDestinatario;

			    $('#nombre'+tipo).val(data[0].nombre);
			    $('#calle'+tipo).val(data[0].calle);
			    $('#calle'+tipo).focus();
			    $('#numero'+tipo).val(data[0].noexterno);
			    $('#numero'+tipo).focus();
			    if(data[0].nointerno != null)
			    {
			    	$('#numeroInterno'+tipo).val(data[0].nointerno);
			    	$('#numeroInterno'+tipo).focus();
			    }
			    $('#cp'+tipo).val(data[0].CP);
			    $('#cp'+tipo).focus();
			    $('#ciudad'+tipo).val(data[0].ciudad);
			    $('#ciudad'+tipo).focus();
			    $('#estado'+tipo).val(data[0].estado);
			    $('#estado'+tipo).focus();
			    $('#email'+tipo).val(data[0].correo);
			    $('#email'+tipo).focus();
			    $.ajax({
			        type: 'POST',
			        url: '../api/zip/country/mx/zipCode/'+data[0].CP,
			        dataType: 'json',
			        data: 
			        {
			            "_token": $("meta[name='csrf-token']").attr("content")
			        },
			        success: function (dataZip) 
			        {
			        	var contenido = '';
			        	dataZip.colonias.forEach(function(element)
			        	{	
			        		contenido += '<option val="'+element+'">'+element+'</option>';
			        	});
			        	//$('#colonia'+tipo).selectpicker('destroy');
			        	$('#colonia'+tipo).html(contenido);
                        $('#colonia'+tipo).val(data[0].colonia);
			        	//$('#colonia'+tipo).selectpicker('render');
			        	//$('#coloniaRemitente').selectpicker('refresh');
			        	$('.page-loader-wrapper').fadeOut();
	        		}
	        	});
			}
			else
			{
				claveRemitente = 0;
                claveDestinatario = 0;
			}
        }
    });
    $('.page-loader-wrapper').fadeOut();
}

function llenaCamposDeZip(tipo)
{
	$.ajax({
        type: 'POST',
        url: '../api/zip/country/mx/zipCode/'+$('#cp'+tipo).val(),
        dataType: 'json',
        data: 
        {
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (data) 
        {
        	var content = '';
        	data.colonias.forEach(function(element)
        	{
        		content += '<option val="'+element+'">'+element+'</option>';
        	});
            $('#colonia'+tipo).html(content);
        	$('.page-loader-wrapper').fadeOut();
        },
        error: function (e)
        {
        	showNotification('alert-warning', 'No es un código postal válido', 'bottom', 'center', 'animated fadeIn', 'animated fadeOut');
        	$('#cp'+tipo).focus();
        	$('.page-loader-wrapper').fadeOut();
        }
    });
}

function cotizarPaquete(tipoPaquete, valor)
{
    $.ajax({
        type: 'POST',
        url: '../api/nuevaGuia/cotizarPaquete',
        dataType: 'json',
        data: 
        {
            "_token": $("meta[name='csrf-token']").attr("content"),
            claveTipoPaquete: tipoPaquete,
            valor: valor
        },
        success: function (data) 
        {
             $('#costo').val(data[0].costo);     
        },
        error: function (e)
        {
        }
    });
}

function checkZip(zipCode)
{
	var number = parseInt(zipCode);
	var respNumber = Number.isInteger(number);

	var respLength = false;
	if(zipCode.toString().length == 5)
		respLength = true;
	if(respNumber && respLength)
		return true;
	else
		return false;
}

function insertarPaquete()
{
    if(claveRemitente == 0)
    {
        $.ajax({
            type: 'POST',
            url: '../api/nuevaGuia/insertRemitente',
            dataType: 'json',
            async: false,
            data: 
            {
                nombre: $('#nombreRemitente').val(),
                calle : $('#calleRemitente').val(),
                noexterno: $('#numeroRemitente').val(),
                nointerno: $('#numeroInternoRemitente').val(),
                colonia: $('#coloniaRemitente').val(),
                ciudad: $('#ciudadRemitente').val(),
                estado: $('#estadoRemitente').val(),
                telefono: $('#telefonoRemitente').val(),
                correo: $('#emailRemitente').val(),
                cp: $('#cpRemitente').val(),
                pais: $('#paisRemitente').val(),
                latitud: 0,
                longitud: 0
            },
            success: function (data) 
            {
                console.log(data);
                claveRemitente = data[0].claveRemitente;
            }
        });
    }


    if(claveDestinatario == 0)
    {
        $.ajax({
            type: 'POST',
            url: '../api/nuevaGuia/insertDestinatario',
            dataType: 'json',
            async: false,
            data: 
            {
                nombre: $('#nombreDestinatario').val(),
                calle : $('#calleDestinatario').val(),
                noexterno: $('#numeroDestinatario').val(),
                nointerno: $('#numeroInternoDestinatario').val(),
                colonia: $('#coloniaDestinatario').val(),
                ciudad: $('#ciudadDestinatario').val(),
                estado: $('#estadoDestinatario').val(),
                telefono: $('#telefonoDestinatario').val(),
                correo: $('#emailDestinatario').val(),
                cp: $('#cpDestinatario').val(),
                pais: $('#paisDestinatario').val(),
                latitud: 0,
                longitud: 0,
                referenciaDomicilio: $('#referenciasDestinatario').val(),
                telefono2: $('#telefonoDestinatario2').val(),
            },
            success: function (data) 
            {
                console.log(data);
                claveDestinatario = data[0].claveDestinatario;
            }
        });

    }

    var formData = new FormData($("#wizard_with_validation")[0]);
    formData.append("claveRemitente", claveRemitente);
    formData.append("claveDestinatario", claveDestinatario);
    formData.append("cobroSN", (!$('#md_checkbox_30').is(':checked')? 0 : 1));

    $.ajax({
        type: 'POST',
        url: '../api/nuevaGuia/insert',
        dataType: 'json',
        data: formData
            // alto: $('#largoPaquete').val(),
            // largo: $('#anchoPaquete').val(),
            // ancho: $('#altoPaquete').val(),
            // peso: $('#peso').val(),
            // costo: $('#costo').val(),
            // claveRemitente: claveRemitente,
            // claveDestinatario: claveDestinatario,
            // claveTipoPaquete: $('#tipoPaquete').val()
        ,
        contentType: false,
        processData: false,
        headers: {'X-CSRF-TOKEN': $("meta[name='csrf-token']").attr("content")},
        success: function (data) 
        {
            swal({
                title: "Se agregó correctamente!",
                text: "",
                type: "success"
            }, 
            function()  
            {
                $('#calculadoraModal').modal(
                {
                    backdrop: 'static',
                    keyboard: false
                });
                $('#calculadoraModal').modal('show');
                guia = data[0].guia;
            });
        },
        error: function (data) 
        {
            swal("Ocurrió un error", "", "error");
        }
    });
}

$('#btnImprimirTicket').click(function(e)
{
    //e.preventDefault();
    window.open("../registro/imprimir/"+guia);
    $('#btnImprimirTicket').attr('href',"../imprimir/"+guia);
    window.location.reload();
});


$("#pagoCalculadora").on("keyup keydown change",function(event)
{
    $('#calculadoraCambio').text($('#pagoCalculadora').val() - $('#calculadoraCosto').text())
});