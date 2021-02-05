@extends('main.main')



@section('titulo', 'Cotizaciones ')

@section('content')
<?php
$month = date('m');
$day = date('d');
$year = date('Y');
 
$today = $year . '-' . $month . '-' . $day;
?>

<div class="block-header">
    <!-- Exportable Table -->
    <div class="row">

        <div class="">
            <div class="card">
                <div class="row header">
                    <div class="col-md-1">
                        <a href="/proyectos"><i style="cursor: pointer;"
                                class="material-icons material">arrow_back</i></a>
                    </div>
                    <div class="col-md-8" style="padding-left: 2%;">
                        <h2 style="padding-top: 4px;">
                            {{ $titulo }}
                        </h2>
                    </div>

                    <div class="col-md-3" style="text-align: right">
                        <button type="button" id="imprimirCotizacion"
                            class="btn waves-effect waves-light btn-outline-danger btn-agregar float-right btn-rounded">Generar
                            Cotizacion</button>
                    </div>
                </div>
                <fieldset hidden>
                    <label id="idProy">{{ $id }}</label>
                    <label for="" id="titulo">{{ $titulo }}</label>
                </fieldset>
                <div class="body">
                    <div class="table-responsive" style="height:700px;overflow:auto;">
                        <table class=" table-bordered table-striped table-hover" id="tablaCotizaciones">
                            <thead>
                                <tr>
                                    <th>clave</th>
                                    <th>Concepto</th>
                                    <th>Unidad</th>
                                    <th>Cantidad</th>
                                    <th>P.U</th>
                                    <th>IVA</th>
                                    <th>Costo</th>
                                    <th>Tarjeta</th>
                                    <th class="ocultar">Indirectos</th>
                                    <th class="ocultar">Financiamiento</th>
                                    <th class="ocultar">Utilidad</th>
                                    <th class="ocultar">idUnidad</th>
                                    <!-- <th style="text-align: center; width: 75px;">Eliminar</th> -->
                                </tr>
                            </thead>
                            <tbody id="tbCotizaciones"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
<!-- #END# Exportable Table -->

<!-- MODAL PARA INGRESOS -->
<!-- MODAL Ingresos -->

<div class="modal fade" id="modalTarjeta" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header" style="color: white; background: #255070; padding-bottom: 15px;">
                <button type="button" class="close text-white" data-dismiss="modal">&times;</button>
                <h4 class="modal-title text-white" id="modal-title">Editar tarjeta</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12">
                        <table class="table">
                            <tr>
                                <th class="bg-azul" colspan="6">Descripción</th>
                            </tr>
                            <tr>
                                <td colspan="4" rowspan="4" id="tConcepto">concepto</td>
                                <td>Unidad</td>
                                <td id="tUnidad">idunidad</td>
                            </tr>
                            <tr>
                                <td>Indirectos</td>
                                <td id="tIndirectos">15%</td>
                            </tr>
                            <tr>
                                <td>Cantidad</td>
                                <td id="tCantidad">1,00</td>
                            </tr>
                            <tr style="font-weight: bolder; font-size: large;">
                                <td>Precio unitario</td>
                                <td id="tPU">0</td>
                            </tr>
                            <tr class="bg-azul">
                                <td colspan="2">Descripcion</td>
                                <td>Unidad</td>
                                <td>Cantidad</td>
                                <td>Costo unitario</td>
                                <td>Total</td>
                            </tr>
                            <tbody id="tb"></tbody>
                        </table>
                        <div class="modal-footer" id="btns-modal">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- alertas -->
</div>
<div class="modal fade" id="modalOrden" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header" style="color: white; background: #255070; padding-bottom: 15px;">
                <button type="button" class="close text-white" data-dismiss="modal">&times;</button>
                <h4 class="modal-title text-white" id="modal-title">Ordenar conceptos</h4>
            </div>
            <div class="modal-body">
                <table class="table-bordered table-striped table-hover">
                    <tr style="font-weight: bold; color: black; ">
                        <td>Concepto</td>
                        <td>Orden</td>
                    </tr>
                    <tbody id="tbOrden"></tbody>
                </table>
                <div class="modal-footer" id="btns-modal2">
                    <button type="button" class="btn btn-info" id="btn-aceptar-orden">Aceptar</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="modalClausulas" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header" style="color: white; background: #255070; padding-bottom: 15px;">
                <button type="button" class="close text-white" data-dismiss="modal">&times;</button>
                <h4 class="modal-title text-white" id="modal-title">Revisar cláusulas</h4>
            </div>
            <div class="modal-body">
                <div>
                    <textarea class="form-control" style="border-radius: 10px !important;" name="clausulas" id="clausulas" cols="30" rows="15"></textarea>
                </div>
                <div class="modal-footer" id="btns-modal3">
                    <button type="button" class="btn btn-info" id="btn-aceptar-clausulas">Aceptar</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
<!-- alertas -->
</div>
@endsection



@section('custom-js')

<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>

<script src="{{ asset('plugins/jquery-datatable/jquery.dataTables.js') }}"></script>
<script
    src="{{ asset('plugins/jquery-datatable/skin/bootstrap/js/dataTables.bootstrap.js') }}">
</script>
<script
    src="{{ asset('plugins/jquery-datatable/extensions/export/dataTables.buttons.min.js') }}">
</script>
<script src="{{ asset('plugins/jquery-datatable/extensions/export/buttons.flash.min.js') }}">
</script>
<script src="{{ asset('plugins/jquery-datatable/extensions/export/jszip.min.js') }}"></script>
<script src="{{ asset('plugins/jquery-datatable/extensions/export/pdfmake.min.js') }}">
</script>
<script src="{{ asset('plugins/jquery-datatable/extensions/export/vfs_fonts.js') }}"></script>
<script src="{{ asset('plugins/jquery-datatable/extensions/export/buttons.html5.min.js') }}">
</script>
<script src="{{ asset('plugins/jquery-datatable/extensions/export/buttons.print.min.js') }}">
</script>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="{{ asset('js/cotizaciones.js') }}"></script>





@endsection





@section('custom-css')

<meta name="csrf-token" content="{{ csrf_token() }}">

<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">

<style type="text/css">
    /* table tbody { height:700px; overflow-y:scroll; display:block; }
table thead { display:block; }
 */
    .col-md-1 {
        width: 1.333333%;
    }

    .ocultar {
        display: none;
    }

    .cantidad {
        border: none;
        text-align: center;
        font-size: medium;
        font-weight: bold;
        background-color: burlywood;
        border-radius: 7px;
    }

    .modal-dialog {
        width: 765px !important;
    }

    .tdPorcentaje,

    .tdMonto {

        text-align: end;

    }

    .bg-footer {
        background-color: #e36034;
        color: white;
        font-size: x-large;
        font-weight: bold;
    }

    .bg-secondary {
        background-color: gray;
        color: white;
        font-weight: bold;
    }

    .bg-azul {
        background-color: #255070;
        color: white;
        font-weight: bold;
    }

    .bg-dorado {
        background-color: goldenrod;
        color: white;
        font-weight: bold;
    }

    .txtRed {
        color: crimson;
        font-weight: bold;
    }

    .modal-m {

        width: 40%;

    }

    .modal-lg {

        width: 75%;

    }

    .carousel .item img {

        height: 350px;



    }

    .ui-autocomplete {
        overflow: auto;
        max-width: 500px;
        max-height: 300px;
    }

    .ui-front {
        z-index: 9999999 !important;
    }

    .cb .btn:active,
    .btn.active {
        background-color: steelblue !important;
        color: white !important;
        font-weight: bold !important;
    }

    [type="checkbox"]:not(:checked),
    [type="checkbox"]:checked {
        position: inherit;
        left: auto;
        opacity: 1;
    }
</style>

@endsection





</body>



</html>