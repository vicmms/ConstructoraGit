
$('#codigo').keypress(function (e) {
 var key = e.which;
 if(key == 13)  // the enter key code
  {
    $.ajax({
        type: 'POST',
        url: '../catalogos/puntoRecoleccion/paquetes/nuevo',
        dataType: 'json',
        data: {
        	codigo: $('#codigo').val()
        },
        success: function (response) 
        {
        	$('#codigo').val('');
        }
    }); 
  }
}); 

$('#modalLector').on('hidden.bs.modal', function () {
  location.reload();
})