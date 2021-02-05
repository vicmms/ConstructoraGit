@extends('main.main')



@section('titulo', 'Ingresos ')

@section('content')
<?php
$month = date('m');
$day = date('d');
$year = date('Y');

$today = $year . '-' . $month . '-' . $day;
?>

<div class="block-header">
    <div class="row card" style="padding: 2%;">
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <h2 style="padding-bottom: 1%;">Seleccione un proyecto</h2>
                <select class="form-control" name="proyectos" id="cbProyectos" onchange="">
                    <option selected value="0">--Todos los proyectos--</option>
                </select>
            </div>
            <div class="col-md-6 mb-2">
                <div class="col-md" align="right">
                    <button type="button" id="btn-nuevo-ingreso" class="btn waves-effect waves-light btn-outline-danger btn-agregar float-right btn-rounded" data-toggle="modal" data-target="#modalIngresos">Nuevo ingreso</button>
                </div>
                <br>
            </div>
    </div>
    

    <!-- Exportable Table -->
    <div class="row">

        <div class="">
            <div class="card">
                <div class="row header">
                    <div class="col-md-3" style="padding-left: 2%">
                        <h2>
                          Ingresos bimestrales
                        </h2>
                    </div>
                        <div class="col-md-4" style="text-align: right">
                            <label>Selecciona fecha</label>
                        </div>
                        <div class="col-md-5">
                            <input class="form-control flatpickr flatpickr-input" type="text" name="fechaDia" id="fechaDia" placeholder="seleccione fecha" readonly="readonly">
                        </div>
                </div>
                <div class="body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-striped table-hover" id="tablaIngresos" >
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Codigo de procedencia</th>
                                    <th>Concepto</th>
                                    <th>Forma de pago</th>
                                    <th>Cantidad</th>
                                </tr>
                            </thead>
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

<div class="modal fade" id="modalIngresos" role="dialog">

    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">

        <div class="modal-content">

            <div class="modal-header" style="color: white; background: #255070; padding-bottom: 15px;">

                <button type="button" class="close text-white" data-dismiss="modal">&times;</button>

                <h4 class="modal-title text-white" id="modal-title">Registrar nuevo ingreso</h4>

            </div>

            <div class="modal-body">

                <div class="row">

                    <div class="col-sm-8">

                        <form id="frm-registrar" method="POST" enctype="multipart/form-data" class="form-horizontal">

                            <div class="card-content">

                                <fieldset hidden>

                                    <div class="form-group edit-hidden">

                                        <div class="row">

                                            <label class="col-sm-3 control-label">

                                                Clave proyecto

                                            </label>

                                            <div class="col-sm-9">

                                                <input class="form-control" type="text" required="required" id="claveProyecto" name="claveProyecto" style="border:1px solid #c9c8c7; padding: 5px; " value="0" />

                                            </div>

                                        </div>

                                    </div>

                                </fieldset>

                                <div class="form-group" style="padding-top: 20px; padding-buttom: 20px;">

                                  <div class="row">

                                    <label class="col-sm-3 control-label">

                                      Fecha de ingreso

                                    </label>

                                    <div class="col-sm-9">

                                      <input class="form-control" value="<?php echo $today; ?>"  type="date" required="required" id="fecha" name="fi" style="border:1px solid #c9c8c7; padding: 5px; " />

                                    </div>
                                  </div>
                                </div>
                                <div class="form-group" style="padding-top: 20px; padding-buttom: 20px;">

                                    <div class="row">

                                        <label class="col-sm-3 control-label">

                                            Concepto

                                        </label>

                                        <div class="col-sm-9">

                                            <input class="form-control" type="text" required="required" id="concepto" name="concepto" style="border:1px solid #c9c8c7; padding: 5px; " />

                                        </div>

                                    </div>

                                </div>

                                <div class="form-group" style="padding-top: 20px; padding-buttom: 20px;">

                                    <div class="row">

                                        <label class="col-sm-3 control-label">

                                            Forma de pago

                                        </label>

                                        <div class="col-sm-9">

                                            <select name="fp" id="cbFP" onchange=""></select>
                                        </div>

                                    </div>

                                </div>

                                <div class="form-group" style="padding-top: 20px; padding-buttom: 20px;">

                                    <div class="row">

                                        <label class="col-sm-3 control-label">

                                            Monto $

                                        </label>

                                        <div class="col-sm-9">

                                          <input class="form-control" type="number" required="required" id="monto" name="cantidad" style="border:1px solid #c9c8c7; padding: 5px; " />

                                        </div>

                                    </div>

                                </div>

                                <div class="modal-footer">

                                    <button type="button" name="modal-btn-save" class="btn btn-success" id="modal-btn-save">Aceptar</button>

                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>

                                </div>



                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>

@endsection



@section('custom-js')

<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>

<script src="{{asset('plugins/jquery-datatable/jquery.dataTables.js')}}"></script>

<script src="{{asset('plugins/jquery-datatable/skin/bootstrap/js/dataTables.bootstrap.js')}}"></script>

<script src="{{asset('plugins/jquery-datatable/extensions/export/dataTables.buttons.min.js')}}"></script>

<script src="{{asset('plugins/jquery-datatable/extensions/export/buttons.flash.min.js')}}"></script>

<script src="{{asset('plugins/jquery-datatable/extensions/export/jszip.min.js')}}"></script>

<script src="{{asset('plugins/jquery-datatable/extensions/export/pdfmake.min.js')}}"></script>

<script src="{{asset('plugins/jquery-datatable/extensions/export/vfs_fonts.js')}}"></script>

<script src="{{asset('plugins/jquery-datatable/extensions/export/buttons.html5.min.js')}}"></script>

<script src="{{asset('plugins/jquery-datatable/extensions/export/buttons.print.min.js')}}"></script>

<script src="{{asset('js/ingresos.js')}}"></script>





@endsection





@section('custom-css')

<meta name="csrf-token" content="{{ csrf_token() }}">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">

<style type="text/css">

    .tdPorcentaje,

    .tdMonto {

        text-align: end;

    }



    .modal-m{

        width: 40%;

    }

    .modal-lg{

        width: 75%;

    }

    .carousel .item img {

        height: 350px;



    }







</style>

@endsection





</body>



</html>

