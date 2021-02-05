var conceptos = [];

$(document).ready(function () {
    $('.cb').trigger('change');
    $('.cantidad').trigger('change');
    table = $('#tablaCotizaciones');
    $('#btn-nuevo-concepto').prop( "disabled", true );
     //Submit form registrar
     $('#modal-btn-editar').on('click', function () {
        recorrerTabla();
        actualizarCantidadConcepto();
    });
    $('#cbProyectos').on('change', function(){
        $('#cbProyectos').val() == 0 ? $('#btn-nuevo-concepto').prop( "disabled", true ) : $('#btn-nuevo-concepto').prop( "disabled", false );
        getProyectoConcepto();
    });
    
        // Edit record
        table.on('change', '.cantidad', function () {
            renglon = $(this).parents("tr");
            cantidad = renglon.find(".cantidad").val();
            id = renglon.find(".id").val();
            idConcepto = parseInt(renglon.find(".idConcepto").text(),10);
            valor = renglon.find('.pu').text() * cantidad;
            console.log(renglon.find('.pu').text());
            renglon.find('.costo').text(valor.toFixed(2));
            renglon.find('.cb').trigger( "click" );
            renglon.find('.cb').trigger( "click" );
            let costoTotal = parseFloat(renglon.find(".pu").text());
            let indirectos = renglon.find(".indirectos").text() != 'undefined' ? parseFloat(renglon.find(".indirectos").text()) : 0;
            let financiamiento = renglon.find(".financiamiento").text() != 'undefined' ? parseInt(renglon.find(".financiamiento").text(),10) : 0;
            let utilidad = renglon.find(".utilidad").text() != 'undefined' ? parseFloat(renglon.find(".utilidad").text()) : 0;
            actualizarCantidadConcepto(idConcepto,cantidad, indirectos, financiamiento, utilidad, costoTotal);
        });
        table.on('click', '.tarjeta', function () {
            pjeInd = pjeUti = pjeFin = 0
            renglon = $(this).parents("tr");
            cantidad = renglon.find(".cantidad").val();
            unidad = renglon.find(".unidad").text();
            concepto = renglon.find(".concepto").text();
            id = renglon.find(".idConcepto").text();
            valor = renglon.find('.pu').text() * cantidad;
            pjeInd = renglon.find('.indirectos').text();
            pjeFin = renglon.find('.financiamiento').text();
            pjeUti = renglon.find('.utilidad').text();
            console.log(renglon.find('.pu').text());
            

            getTarjetas(id);
            $('#tConcepto').html(concepto);
            $('#tUnidad').html(unidad);
            $('#btns-modal').html(`
            <a href="../../tarjetaCostos?cto=`+id+`&pto=`+$('#idProy').text()+`&tlo=`+$('#titulo').text()+`" class="btn btn-simple btn-editar btn-icon cotizar" data-toggle="tooltip" data-placement="top" title="Hacer cotizacion">Editar</a>
            <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
            `);
            $('#modalTarjeta').modal('show');
        });
        table.on('click', '.orden', function () {
            renglon = $(this).parents("tr");
            pos = parseInt(renglon.find(".pos").text(),10);
            getConceptosCategoria(pos);
            $('#modalOrden').modal('show');
        });
        $('#imprimirCotizacion').on('click', function(){
            //recorrerTabla();
            confirmarClausulas();
        })
        
        getConceptos();
        getProyectoConcepto();
        $( document ).on( 'click', '.cb', function(){

            renglon = $(this).parents("tr");
            cantidad = renglon.find(".cantidad").val();
            unidad = renglon.find(".unidad").text();
            concepto = renglon.find(".concepto").text();
            id = renglon.find(".id").text();
            valor = renglon.find('.pu').text() * cantidad;
            console.log(renglon.find('.pu').text());
            renglon.find('.costo').text(valor.toFixed(2));

            if( $( this ).is( ':checked' ) ){
                valor = renglon.find('.pu').text() * cantidad * 1.16;
              }
              
              else{
                valor = renglon.find('.pu').text() * cantidad;
              }  
              renglon.find('.costo').text(valor.toFixed(2));
          });

          $('#btn-aceptar-orden').on('click', function(){
              let valores = [];
            $(".tdOrden").parent("tr").find(".valor").each(function() {
                renglon = $(this).parents("tr");
                let valor = parseInt(renglon.find(".valor").val(),10);
                let id = parseInt(renglon.find(".id").text(),10);
                valores.push([valor, id]);
                });
            actualizarOrdenConceptos(valores);
            console.log(valores)
          });

          $('#btn-aceptar-clausulas').on('click', function(){
            actualizarClausulas();
          });
        
    });
    

function setTarjeta(data){
    // $('#iva').hasClass("active") ? iva = 1 : iva = 0;
    // $('#cbProyectos').val() != 0 ? costo = $('#costo').val() : costo = 'x';//solo es para que truene si no selecciona un proyecto
    if(data.length == 0){
        Swal.fire({
            title: 'No se pudo generar la cotización',
            text: "Asegurate de asignar costo a las tarjetas e indicar la cantidad.",
            icon: 'error',
          })
    }
    banderaCotizacion = true;
    for (let i = 0; i < data.length; i++) {
        $.ajax({
            type: 'POST',
            url: '/setTarjeta',
            dataType: 'json',
            data: {
                idProy: data[i][0],
                idConcepto: data[i][1],
                cantidad: data[i][2],
                pu: data[i][3],
                iva: data[i][4],
                unidad: data[i][5],
                costo: data[i][6],
                "_token": $("meta[name='csrf-token']").attr("content")
            },
            success: function (response) {
                console.log(response);
                clearModal();
            },
    
            error: function (responsetext) {
                banderaCotizacion = false;
    
            }
    
    
    
        });
        
    }
    if(banderaCotizacion){
        window.open("https://sistema.constructoraac.com/cotizaciones/imprimirCotizacion/"+$('#idProy').text() , "_blank" );
                getProyectoConcepto();
    }
}

function getConceptos() {

    $.ajax({
        type: 'POST',
        url: '/getConceptos',
        dataType: 'json',
        data: {
            idProyecto: $('#idProy').text(),
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (response) {
            
            console.log(response);
            trs = `<tr><td class="bg-azul" colspan="8">`+response[0][0]['descripcionCategoria']+`<a href="#" class="btn btn-simple  btn-icon orden" data-toggle="tooltip" data-placement="top" title="Editar" style="background-color: transparent;    box-shadow: none;    color: white;"><i class="material-icons" style="padding-bottom: 7px;">create</i></a><label style="display:none;" class="pos">`+response[0][0]['idCategoria']+`</label></td></tr>`;
            iaux = 0;
            nombreCorto = response[0][0]['nombreCorto']+'-';
            ordenConcepto = response[0][0]['orden'] < 9 ? '0'+response[0][0]['orden'] : response[0][0]['orden'];
            for (let i = 0; i < response[1].length; i++) {
                for (let j = 0; j < response[0].length; j++) {
                    if(response[0][j]['idConcepto'] == response[1][i]['idConcepto']){
                        response[0][j]['precioUnitario'] = response[1][i]['costoTotal'];
                        response[0][j]['cantidadConcepto'] = response[1][i]['cantidadCto'];
                        response[0][j]['indirectos'] = response[1][i]['indirectos'];
                        response[0][j]['financiamiento'] = response[1][i]['financiamiento'];
                        response[0][j]['utilidad'] = response[1][i]['utilidad'];
                        break;
                    }
                    // else{
                    //     response[0][j]['financiamiento'] = 0;
                    //     response[0][j]['utilidad'] = 0;
                    // }
                }
            }
            console.log(response)
            for (let i = 0; i < response[0].length; i++) {
                if(response[0][i]['descripcionCategoria'] != response[0][iaux]['descripcionCategoria']){
                    trs += `<tr><td class="bg-azul" colspan="8">`+response[0][i]['descripcionCategoria']+`<a href="#" class="btn btn-simple  btn-icon orden" data-toggle="tooltip" data-placement="top" title="Editar" style="background-color: transparent;    box-shadow: none;    color: white;"><i class="material-icons" style="padding-bottom: 7px;">create</i></a><label style="display:none;" class="pos">`+response[0][i]['idCategoria']+`</label></td></tr>`;
                    nombreCorto = response[0][i]['nombreCorto']+'-';
                    
                }
                ordenConcepto = response[0][i]['orden'] < 9 ? '0'+response[0][i]['orden'] : response[0][i]['orden'];
                response[0][i]['cantidadConcepto'] == 0 ? costoAux = 0 : costoAux = (response[0][i]['precioUnitario'] * response[0][i]['cantidadConcepto']);
                costoAux == 0 ? costoAux = '0.00' : false;
                trs += `<tr>
                            <td class="idLargo" style="min-width: 100px;">`+(nombreCorto+ordenConcepto)+`</td>
                            <td class="idConcepto" style="display: none;">`+response[0][i]['idConcepto']+`</td>
                            <td class="concepto">`+response[0][i]['descripcion']+`</td>
                            <td class="unidad">pza</td>
                            <td ><input min="0" value="`+response[0][i]['cantidadConcepto']+`" style="width: 70px;" class="cantidad" id="cantidad'`+response[0][i]['idConcepto']+`'" type="number"/></td>
                            <td class="pu">`+response[0][i]['precioUnitario']+`</td>
                            <td><input class="cb" type="checkbox" checked name="cb" id="cb`+response[0][i]['idConcepto']+`"></td>
                            <td ><label class="costo" style="width: 80px;" id="costo`+response[0][i]['idConcepto']+`">`+costoAux+`</label></td>
                            <td><a href="#" class="btn btn-simple btn-editar btn-icon tarjeta" data-toggle="tooltip" data-placement="top" title="Editar"><i class="material-icons">create</i></a></td>
                            <td class=" indirectos ocultar">`+response[0][i]['indirectos']+`</td>
                            <td class=" financiamiento ocultar">`+response[0][i]['financiamiento']+`</td>
                            <td class=" utilidad ocultar">`+response[0][i]['utilidad']+`</td>
                            <td class="ocultar idUnidad">`+response[0][i]['idUnidad']+`</td>
                        </tr>`;
                iaux = i;
            }
            document.getElementById("tbCotizaciones").innerHTML =trs;
            console.log($('#cb1').width())
        },

        error: function (responsetext) {
            console.log(responsetext);

        }



    });

}


function getProyectoConcepto() {
    var tableData = new Array();
    $.ajax({
        type: 'POST',
        url: '/getProyectoConcepto',
        dataType: 'json',
        data: {
            idProy: parseInt($('#idProy').text(),10),
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (response) {
            console.log(response)
            console.log(parseInt($('#idProy').text(),10))
        },
        error: function (responsetext) {
            console.log(responsetext);
        }
    });
}
function getConceptosCategoria(idCategoria) {
    $.ajax({
        type: 'POST',
        url: '/getConceptosCategoria',
        dataType: 'json',
        data: {
            idCategoria: idCategoria,
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (response) {
            console.log(response)
            $('#tbOrden').empty();
            for (let i = 0; i < response.length; i++) {
                $('#tbOrden').append(`
                <tr>
                    <td>`+response[i]['descripcion']+`</td>
                    <td class="tdOrden"><input min="1"  style="width: 70px;" class="cantidad valor" type="number" value="`+response[i]['orden']+`"/></td>
                    <td style="display:none;"><label class="id">`+response[i]['idConcepto']+`</label></td>
                </tr>
            `);
                
            }
        },
        error: function (responsetext) {
            console.log(responsetext);
        }
    });
}
function getTarjetas(id){
    $.ajax({
        type: 'POST',
        url: '/getTarjetas',
        dataType: 'json',
        data: {
            idConcepto: id,
            idProy: $('#idProy').text(),
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (response) {
            console.log(response)
            var m = mo = h = 0;
            trs = `<tr class="bg-dorado"><td colspan="6">Material</td></tr>`;
            for (let i = 0; i < response[0].length; i++) {
                trs += `<tr>
                            <td colspan="2">`+response[0][i]['descripcion']+`</td>
                            <td>`+response[0][i]['idUnidad']+`</td>
                            <td>`+response[0][i]['cantidadTarjeta']+`</td>
                            <td>`+response[0][i]['costoUnitarioTarjeta']+`</td>
                            <td>`+response[0][i]['totalTarjeta']+`</td>
                        </tr>`;
                m += response[0][i]['totalTarjeta'];
            }
            trs += `<tr>
                        <td colspan="4"></td>
                        <td class="txtred">Costo por material</td>
                        <td class="txtred">`+m+`</td>
                    </tr>
                    <tr class="bg-dorado"><td colspan="6">Mano de obra</td></tr>`;
            for (let i = 0; i < response[1].length; i++) {
                trs += `<tr>
                            <td colspan="2">`+response[1][i]['descripcion']+`</td>
                            <td>`+response[1][i]['idUnidad']+`</td>
                            <td>`+response[1][i]['cantidadTarjeta']+`</td>
                            <td>`+response[1][i]['costoUnitarioTarjeta']+`</td>
                            <td>`+response[1][i]['totalTarjeta']+`</td>
                        </tr>`;
                mo += response[1][i]['totalTarjeta'];
            }
            trs += `<tr>
                        <td colspan="4"></td>
                        <td class="txtred">Costo por mano de obra</td>
                        <td class="txtred">`+mo+`</td>
                    </tr>
                    <tr class="bg-dorado"><td colspan="6">Herramienta</td></tr>`;
            for (let i = 0; i < response[2].length; i++) {
                trs += `<tr>
                            <td colspan="2">`+response[2][i]['descripcion']+`</td>
                            <td>`+response[2][i]['idUnidad']+`</td>
                            <td>`+response[2][i]['cantidadTarjeta']+`</td>
                            <td>`+response[2][i]['costoUnitarioTarjeta']+`</td>
                            <td>`+response[2][i]['totalTarjeta']+`</td>
                        </tr>`;
                h += response[2][i]['totalTarjeta']
            }
            $('#tIndirectos').html((pjeInd * 100) + '%');
            cd = m+mo+h;
            indirectos = (m+mo+h) * pjeInd;
            console.log(cd);
            sb1 = cd + indirectos;
            financiamiento = sb1 * pjeFin;
            sb2  = sb1 + financiamiento;
            utilidad = sb2 * pjeUti;
            total = utilidad + sb2;

            trs +=`<tr>
                        <td colspan="4"></td>
                        <td class="txtred">Costo por herramienta</td>
                        <td class="txtred">`+h+`</td>
                    </tr>`;
            trs +=` <tr>
                        <td class="bg-secondary" colspan="6"><span> </span></td>
                    </tr>
                    <tr>
                        <td colspan="5">Costo directo</td>
                        <td class="txtred">`+cd+`</td>
                    </tr>
                    <tr>
                        <td colspan="5">Gastos indirectos(`+(pjeInd*100)+`%)</td>
                        <td class="txtred">`+indirectos.toFixed(2)+`</td>
                    </tr>
                    <tr>
                        <td colspan="5">Subtotal 1</td>
                        <td class="txtred">`+sb1.toFixed(2)+`</td>
                    </tr>
                    <tr>
                        <td colspan="5">Financiamiento(`+(pjeFin*100)+`%)</td>
                        <td class="txtred">`+financiamiento.toFixed(2)+`</td>
                    </tr>
                    <tr>
                        <td colspan="5">Subtotal 2</td>
                        <td class="txtred">`+sb2.toFixed(2)+`</td>
                    </tr>
                    <tr>
                        <td colspan="5">Utilidad(`+(pjeUti*100)+`%)</td>
                        <td class="txtred">`+utilidad.toFixed(2)+`</td>
                    </tr>
                    <tr class="bg-footer">
                        <td colspan="5">Total</td>
                        <td>`+total.toFixed(2)+`</td>
                    </tr>`;

            document.getElementById("tb").innerHTML =trs;
            $('#tPU').html(total.toFixed(2));
            // var data = response;
            // var x = 0;
            // var numCoor = 0;
            // for (var i = 0; i < data.length; i++) {
            //     tableData[x] = new Array()
            //     data[i]['iva'] == 0 ? iva = 'No' : iva = 'Si';
            //     numCoor++;
            //     tableData[x][0] = data[i]['id'];
            //     tableData[x][1] = data[i]['descripcion'];
            //     tableData[x][2] = data[i]['cantidad'];
            //     tableData[x][3] = iva;
            //     tableData[x][4] = data[i]['costo'];
            //     tableData[x][5] = '<a style="display: block;" href="#" class="btn btn-danger btn-icon eliminar" data-toggle="tooltip" data-placement="top" title="Editar" ><i class="material-icons">delete_forever</i></a>';
            //     x++;
            // }
            // $('#tablaCotizaciones').dataTable().fnClearTable();
            // if (numCoor > 0) {
            //     $('#tablaCotizaciones').dataTable().fnAddData(tableData);
            // }
        },
        error: function (responsetext) {
            console.log(responsetext);
        }
    });
}

function recorrerTabla(){

        window.dataTabla = [];

				$(".concepto").parent("tr").find(".cantidad").each(function() {
                    renglon = $(this).parents("tr");
                    let cantidad = parseFloat(renglon.find(".cantidad").val());
                    let costo = parseFloat(renglon.find(".costo").text());
                    let pu = parseFloat(renglon.find(".pu").text());
                    let idConcepto = parseInt(renglon.find(".idConcepto").text(),10);
                    let idUnidad = parseInt(renglon.find(".idUnidad").text(),10);
                    let idProy = parseInt($('#idProy').text(),10);
                    let iva;
                    if( renglon.find(".cb").is( ':checked' ) ){
                        iva = 1;
                      }else{
                          iva = 0;
                      }
        		if(renglon.find(".cantidad").val() != null && renglon.find(".cantidad").val() != '' && renglon.find(".cantidad").val() > 0 && parseFloat(renglon.find(".pu").text()) > 0){
            	 dataTabla.push([idProy, idConcepto,cantidad,pu,iva,idUnidad,costo]);
            }
        });
        
        
        console.log(dataTabla);
        limpiarConceptos();
    
}

function limpiarConceptos(){//borra los conceptos ligados a un proyecto para generar una cotizacion nueva
    $.ajax({
        type: 'POST',
        url: '/limpiarConceptos',
        dataType: 'json',
        data: {
            idProy: parseInt($('#idProy').text(),10),
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (response) {
            console.log(response)
            setTarjeta(dataTabla);
        },
        error: function (responsetext) {
            console.log(responsetext);
        }
    });
}

function actualizarCantidadConcepto(idConcepto,cantidad, indirectos, financiamiento, utilidad, costoTotal){//borra los conceptos ligados a un proyecto para generar una cotizacion nueva
    $.ajax({
        type: 'POST',
        url: '/actualizarCantidadConcepto',
        dataType: 'json',
        data: {
            idProy: parseInt($('#idProy').text(),10),
            idConcepto: idConcepto,
            cantidad: cantidad,
            financiamiento: financiamiento,
            utilidad: utilidad,
            indirectos: indirectos,
            costoTotal: costoTotal,
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

function actualizarOrdenConceptos(values){
    let bandera = true;
    for (let i = 0; i < values.length; i++) {
        for (let j = i + 1; j < values.length; j++) {
            if (values[j][0] == values[i][0] || values[j][0] == null || values[j][0] < 1) {
                bandera = false;
                console.log(values[j][0])
            }
        }
        
    }
    if(bandera){
        $.ajax({
            type: 'POST',
            url: '/actualizarOrdenConceptos',
            dataType: 'json',
            data: {
                'array': JSON.stringify(values),
                "_token": $("meta[name='csrf-token']").attr("content")
            },
            success: function (response) {
                console.log(response)
                Swal.fire({
                    title: 'Actualizado',
                    text: "Conceptos reordenados",
                    icon: 'success',
                  }).then((result) => {
                    $('#modalOrden').modal('hide');
                     getConceptos();
                  })
            },
            error: function (responsetext) {
                console.log(responsetext);
                Swal.fire({
                    title: 'Error al actualizar',
                    text: "Ha ocurrido un error al actualizar el orden de los conceptos",
                    icon: 'error',
                  })
            }
        });
    }else{
        Swal.fire({
            title: 'Error',
            text: "Verifica que todos los conceptos tengan asignado un orden (numero) y que no se repita.",
            icon: 'error',
          })
    }
    
}

function confirmarClausulas(){
    $('#modalClausulas').modal('show');
    $('#clausulas').val(`
    1. NO INCLUYE COSTOS POR CUALQUIER TRÁMITE DERIVADO DE ESTE U OTROS TRABAJOS ANTE CUALQUIER DEPENDENCIA O INSTANCIA DE GOBIERNO. 
    2. EL TIEMPO DE ENTREGA SE DEFINIRÁ EN COMÚN ACUERDO CON EL CLIENTE. 
    3. ESTE PRESUPUESTO ESTA SUJETO A CAMBIO SIN PREVIO AVISO, DEBIDO AL INCREMENTO DEL COSTO DE LOS MATERIALES EN EL SECTOR DE MERCADO
    4. LAS MODIFICACIONES MOTIVADAS POR EL CLIENTE O POR TERCEROS CON AUTORIZACION, ASI COMO LAS DESVIACIONES PROPIAS DE LA OBRA QUE AFECTEN A LA INSTALACION, SERAN CON CARGO AL CLIENTE. 
    5. TODA NOTIFICACIÓN DEBERA SER CANALIZADA A TRAVES DEL SUPEVISOR Y SER ANOTADA EN LA BITACORA DE OBRA O POR MEDIO DE UN ESCRITO. 
    6. FORMA DE PAGO: A NEGOCIAR CON EL CLIENTE. 
    7. CUALQUIER TRABAJO NO CONTEMPLADO EN ESTE PRESUPUESTO SERA COBRADO APARTE EN ACUERDO DE LAS PARTES CON PREVIA AUTORIZACION PARA SU EJECUCION. 
    8. LOS PRECIOS AQUÍ MOSTRADOS YA INCLUYEN IVA. 
    `);
}

function actualizarClausulas(){
    $.ajax({
        type: 'POST',
        url: '/actualizarClausulas',
        dataType: 'json',
        data: {
            idProyecto: parseInt($('#idProy').text(),10),
            clausulas: $('#clausulas').val(),
            "_token": $("meta[name='csrf-token']").attr("content")
        },
        success: function (response) {
            console.log(response)
            recorrerTabla();
        },
        error: function (responsetext) {
            console.log(responsetext);
            Swal.fire({
                title: 'Error',
                text: "Ha ocurrido un error inesperado, favor de contactar a soporte.",
                icon: 'error',
              })
        }
    });
}

function clearModal(){
    
    $( "#tags" ).val('');
    $('#cantidad').val('');
    $('#costo').val('');
    $('#iva').removeClass('active');
}