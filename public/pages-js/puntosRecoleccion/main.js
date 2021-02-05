var muestraTabla = false;
var muestraTablaMonitoreo = false;

var autocomplete = new google.maps.places.Autocomplete((document.getElementById('direccionPR')), 
{
});
autocomplete.setFields(['address_component', 'geometry']);

google.maps.event.addListener(autocomplete, 'place_changed', function() 
{

});

$('#monitoreoBtn').click(function()
{
	if(muestraTablaMonitoreo)
	{
		$(this).attr('data-original-title', 'Ver tabla');
		$(this).addClass('bg-indigo');
		$('#mapTable').addClass('hidden');
	}
	else
	{
		$(this).attr('data-original-title', 'Ocultar tabla');
		$(this).removeClass('bg-indigo');
		$('#mapTable').removeClass('hidden');
	}
	muestraTablaMonitoreo = !muestraTablaMonitoreo;
});

$('#tablaPuntosRecoleccion').click(function()
{
	if(muestraTabla)
	{
		$(this).attr('data-original-title', 'Ver tabla');
		$(this).addClass('bg-indigo');
		$('#mapTablePuntosRecoleccion').addClass('hidden');
	}
	else
	{
		$(this).attr('data-original-title', 'Ocultar tabla');
		$(this).removeClass('bg-indigo');
		$('#mapTablePuntosRecoleccion').removeClass('hidden');
	}
	muestraTabla = !muestraTabla;
});