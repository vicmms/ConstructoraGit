bandera = false;
$(document).ready(function () {
    table = $('#tablaUnitarios');///.DataTable({
    //     "bAutoWidth": false
    // });
    getTarjetasConcepto();
    table.on('click', '.eliminar', function () {
        renglon = $(this).parents("tr");
        idTarjeta = parseInt(renglon.find(".idTarjeta").text(),10);
        console.log(idTarjeta)
        Swal.fire({
            title: 'Eliminar tarjeta?',
            text: "Una vez eliminada no se podrá recuperar.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
              if (result.isConfirmed) {
                eliminarTarjeta(idTarjeta);
            }
          })
        
    });
    table.on('click', '.material', function () {
        clearModal();
        $('#iva').text('16');
        $('#modalMaterial').modal('show');
    });
    table.on('click', '.mo', function () {
        clearModal();
        $('#modalMO').modal('show');
    });
    table.on('click', '.herramienta', function () {
        clearModal();
        $('#modalHerramienta').modal('show');
    });
    $('#btn-material').on('click', function(){
        setTarjetaPU(1,$('#cbMaterial').val(), $('#cantidadMaterial').val(), $('#puMaterial').val(), $('#iva').val());
    });
    $('#btn-mo').on('click', function(){
        setTarjetaPU(2,$('#cbMO').val(), $('#cantidadMO').val(), $('#cuMO').val());
    });
    $('#btn-herramienta').on('click', function(){
        setTarjetaPU(3,$('#cbHerramienta').val(), $('#cantidadHerramienta').val(), $('#cuHerramienta').val());
    });
    $('#btn-actualizarPU').on('click', function(){
        bandera = true;
        getTarjetasConcepto();
        
    });
    getMateriales();
    getMO();
    getHerramientas();
});
function getTarjetasConcepto() {

    $.ajax({
        type: 'POST',
        url: '/getTarjetas',
        dataType: 'json',
        data: {
            idConcepto: $('#idConcepto').text(),
            idProy: $('#idProyecto').text(),
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (response) {
            console.log(response);
            var m = mo = h = 0;
            var data = response;
            var x = 0;
            var numCoor = 0;
            trs = `<tr><td class="bg-azul" colspan="3">Material</td>
                        <td class="bg-azul">Costo</td>
                        <td class="bg-azul">Iva</td>
                        <td class="bg-dorado" style="text-align: center;"><i style="cursor: pointer;" class="material-icons material">add_circle</i></td>
                        <td class="bg-azul"></td>
                    </tr>`;
            for (let i = 0; i < response[0].length; i++) {
                trs += `<tr>
                            <td>`+response[0][i]['descripcion']+`</td>
                            <td>`+response[0][i]['idUnidad']+`</td>
                            <td>`+response[0][i]['cantidadTarjeta']+`</td>
                            <td>`+response[0][i]['costoUnitarioTarjeta']+`</td>
                            <td>`+response[0][i]['ivaTarjeta']+`</td>
                            <td>`+response[0][i]['totalTarjeta']+`</td>
                            <td class="ocultar"><label class="idTarjeta">`+response[0][i]['idTarjeta']+`</label></td>
                            <td class="bg-red" style="text-align: center;"><i style="cursor: pointer;" class="material-icons eliminar">delete</i></td>
                        </tr>`;
                        m += response[0][i]['totalTarjeta'];
            }
            trs += `<tr><td class="bg-azul" colspan="5">Mano de obra</td><td class="bg-dorado" style="text-align: center;"><i style="cursor: pointer;" class="material-icons mo">add_circle</i></td><td class="bg-azul"></td></tr>`;
            for (let i = 0; i < response[1].length; i++) {
                trs += `<tr>
                            <td>`+response[1][i]['descripcion']+`</td>
                            <td>`+response[1][i]['idUnidad']+`</td>
                            <td>`+response[1][i]['cantidadTarjeta']+`</td>
                            <td colspan="2">`+response[1][i]['costoUnitarioTarjeta']+`</td>
                            <td>`+response[1][i]['totalTarjeta']+`</td>
                            <td class="ocultar"><label class="idTarjeta">`+response[1][i]['idTarjeta']+`</label></td>
                            <td class="bg-red" style="text-align: center;"><i style="cursor: pointer;" class="material-icons eliminar">delete</i></td>
                        </tr>`;
                        mo += response[1][i]['totalTarjeta'];
            }
            trs += `<tr><td class="bg-azul" colspan="5">Herramienta</td><td class="bg-dorado" style="text-align: center;"><i style="cursor: pointer;" class="material-icons herramienta">add_circle</i></td><td class="bg-azul"></td></tr>`;
            for (let i = 0; i < response[2].length; i++) {
                trs += `<tr>
                            <td>`+response[2][i]['descripcion']+`</td>
                            <td>`+response[2][i]['idUnidad']+`</td>
                            <td>`+response[2][i]['cantidadTarjeta']+`</td>
                            <td colspan="2">`+response[2][i]['costoUnitarioTarjeta']+`</td>
                            <td>`+response[2][i]['totalTarjeta']+`</td>
                            <td class="ocultar"><label class="idTarjeta">`+response[2][i]['idTarjeta']+`</label></td>
                            <td class="bg-red" style="text-align: center;"><i style="cursor: pointer;" class="material-icons eliminar">delete</i></td>
                        </tr>`;
                        h += response[2][i]['totalTarjeta'];
            }
            document.getElementById("tbUnitarios").innerHTML =trs;
            cd = m+mo+h;
            pjeInd = $('#indirectos').val() / 100;
            pjeFin = $('#financiamiento').val() / 100;
            pjeUtil = $('#utilidad').val() / 100;
            indirectos = (m+mo+h) * pjeInd;
            sb1 = cd + indirectos;
            financiamiento = sb1 * pjeFin;
            sb2  = sb1 + financiamiento;
            utilidad = sb2 * pjeUtil;
            total = utilidad + sb2;
            bandera ? actualizarPU(total.toFixed(2), pjeInd, pjeFin, pjeUtil) : false;
            

        },

        error: function (responsetext) {
            console.log(responsetext);

        }



    });

}

function getValoresPU(){
    $.ajax({
        type: 'POST',
        url: '/getTarjetas',
        dataType: 'json',
        data: {
            idConcepto: $('#idConcepto').text(),
            idProy: $('#idProyecto').text(),
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (response) {
            console.log(response)
            var m = mo = h = 0;
            trs = `<tr class="bg-dorado"><td colspan="7">Material</td></tr>`;
            for (let i = 0; i < response[0].length; i++) {
                m += response[0][i]['cantidadTarjeta'] * response[0][i]['precioUnitario'];
            }
            for (let i = 0; i < response[1].length; i++) {
                mo += response[1][i]['cantidadTarjeta'] * response[1][i]['costoUnitario']
            }
            for (let i = 0; i < response[2].length; i++) {
                h += response[2][i]['cantidadTarjeta'] * response[2][i]['costoUnitario']
            }
            cd = m+mo+h;
            indirectos = (m+mo+h) * .15;
            sb1 = cd + indirectos;
            financiamiento = sb1 * .01;
            sb2  = sb1 + financiamiento;
            utilidad = sb2 * .11;
            total = utilidad + sb2;
            console.log(m+' '+mo+' '+h+' '+indirectos+' '+financiamiento+' '+sb2+' '+utilidad+' '+total);
           // updatePU(total.toFixed(2));
        },
        error: function (responsetext) {
            console.log(responsetext);
        }
    });
}

function updatePU(val){
    $.ajax({
        type: 'POST',
        url: '/updatePU',
        dataType: 'json',
        data: {
            idConcepto: $('#idConcepto').text(),
            pu: val,
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (response) {
            console.log(response)
        },
        error: function (responsetext) {
            console.log(responsetext);
        }
    });
}
function getMateriales(){
    $.ajax({
        type: 'POST',
        url: '/getMateriales',
        dataType: 'json',
        data: {
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function(response){
            for(let i = 0; i < response.length; i++){
                $("#cbMaterial").append(new Option(response[i]['descripcion'], response[i]['idMaterial']));
            }
        },
        error: function(responsetext){
            console.log(responsetext);
        }
    });
}
function getMO(){
    $.ajax({
        type: 'POST',
        url: '/getMO',
        dataType: 'json',
        data: {
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function(response){
            for(let i = 0; i < response.length; i++){
                $("#cbMO").append(new Option(response[i]['descripcion'], response[i]['idMO']));
            }
        },
        error: function(responsetext){
            console.log(responsetext);
        }
    });
}
function getHerramientas(){
    $.ajax({
        type: 'POST',
        url: '/getHerramientas',
        dataType: 'json',
        data: {
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function(response){
            for(let i = 0; i < response.length; i++){
                $("#cbHerramienta").append(new Option(response[i]['descripcion'], response[i]['idHerramienta']));
            }
        },
        error: function(responsetext){
            console.log(responsetext);
        }
    });
}
function setTarjetaPU(tipo, id, cantidad, cu, iva = 0){
    let idProyecto = $('#idProyecto').text();
    $.ajax({
        type: 'POST',
        url: '/setTarjetaPU',
        dataType: 'json',
        data: {
            idConcepto: $('#idConcepto').text(),
            idProyecto: idProyecto,
            idCategoria: tipo,
            idRecurso: id,
            cantidad: cantidad,
            cu: cu,
            total: ((parseFloat(cu) + parseFloat(iva)) * cantidad).toFixed(2),
            iva: iva,
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function(response){
            for(let i = 0; i < response.length; i++){
                $("#cbHerramienta").append(new Option(response[i]['descripcion'], response[i]['idHerramienta']));
            }console.log(idProyecto)
            clearModal();
            getValoresPU();
            getTarjetasConcepto();
        },
        error: function(responsetext){
            console.log(responsetext);
        }
    });
}
function actualizarPU(costo, indirectos, financiamiento, utilidad){ //actualizar el costo unitario por concepto a un solo proyecto
    $.ajax({
        type: 'POST',
        url: '/actualizarPU',
        dataType: 'json',
        data: {
            idProyecto: $('#idProyecto').text(),
            idConcepto: $('#idConcepto').text(),
            costo: costo,
            indirectos: indirectos,
            financiamiento: financiamiento,
            utilidad: utilidad,
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function(response){
            console.log(indirectos+' '+financiamiento+' '+utilidad);
            Swal.fire({
                title: 'Actualizdo!',
                text: "Tarjeta actualizada correctamente",
                icon: 'success',
                confirmButtonText: 'Aceptar'
              }).then((result) => {
                  bandera = false;
                  document.getElementById("btn-back").click();
                  //setTimeout(function(){ console.log('ok'); }, 500);
              })
              
              
        },
        error: function(responsetext){
            console.log(responsetext);
        }
    });

}

function eliminarTarjeta(id){
    $.ajax({
        type: 'POST',
        url: '/eliminarTarjetaUnitarios',
        dataType: 'json',
        data: {
            idTarjeta: id,
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function(response){
            Swal.fire({
                title: 'Realizado!',
                text: "Tarjeta eliminada correctamente",
                icon: 'success',
                confirmButtonText: 'Aceptar'
              }).then((result) => {
                getTarjetasConcepto();
              })
            
        },
        error: function(responsetext){
            console.log(responsetext);
        }
    });
}

function clearModal(){
    $("#cbMaterial").val(0);
    $("#cbMO").val(0);
    $("#cbHerramienta").val(0);
    $("#cantidadMaterial").val('');
    $("#cantidadMO").val('');
    $("#cantidadHerramienta").val('');
}