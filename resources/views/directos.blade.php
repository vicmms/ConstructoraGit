@extends('main.main')



@section('titulo', 'Control de gastos ')

@section('content')

<div class="block-header">
    <div class="row card" style="padding: 2%;">
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <h2 style="padding-bottom: 1%;">Seleccione un proyecto</h2>
                <select class="form-control loader" name="proyectos" id="cbProyectos" onchange="getGastos()">
                    <option selected>--Elije un proyecto--</option>
                </select>
            </div>
            <div class="col-md-6">
                <h2 style="padding-bottom: 1%;">Selecciona fecha</h2>
            </div>
            <div class="col-md-5">
                <input class="form-control flatpickr flatpickr-input" type="text" name="fechaDia" id="fechaDia" placeholder="seleccione fecha" readonly="readonly">
            </div>
    </div>
    

    <!-- Exportable Table -->
    <div class="row">
        <div class="">
            <div class="card">
                <div class="row header">
                    <div class="col-md-3" style="padding-left: 2%">
                        <h2>
                          Control de gastos directos
                        </h2>
                    </div>
                </div>
                <div class="body">
                    <div class="table-responsive loader">
                        <table class="table table-bordered table-striped table-hover" id="tablaIngresos" >
                            <thead>
                                <tr>
                                    <th>Dia</th>
                                    <th>Concepto</th>
                                    <th>Monto</th>
                                </tr>
                            </thead>
                            <tbody id="tb">

                            </tbody>
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

                                      <input class="form-control" value=""  type="date" required="required" id="fecha" name="fi" style="border:1px solid #c9c8c7; padding: 5px; " />

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
<script src="https://cdn.jsdelivr.net/npm/flatpickr@latest/dist/plugins/monthSelect/index.js"></script>
<script src="{{asset('plugins/jquery-datatable/jquery.dataTables.js')}}"></script>
<script src="{{asset('plugins/jquery-datatable/skin/bootstrap/js/dataTables.bootstrap.js')}}"></script>
<script src="{{asset('plugins/jquery-datatable/extensions/export/dataTables.buttons.min.js')}}"></script>
<script src="{{asset('plugins/jquery-datatable/extensions/export/buttons.flash.min.js')}}"></script>
<script src="{{asset('plugins/jquery-datatable/extensions/export/jszip.min.js')}}"></script>
<script src="{{asset('plugins/jquery-datatable/extensions/export/pdfmake.min.js')}}"></script>
<script src="{{asset('plugins/jquery-datatable/extensions/export/vfs_fonts.js')}}"></script>
<script src="{{asset('plugins/jquery-datatable/extensions/export/buttons.html5.min.js')}}"></script>
<script src="{{asset('plugins/jquery-datatable/extensions/export/buttons.print.min.js')}}"></script>
<script src="{{asset('js/directos.js')}}"></script>





@endsection





@section('custom-css')

<meta name="csrf-token" content="{{ csrf_token() }}">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr@latest/dist/plugins/monthSelect/style.css">
<style type="text/css">


    .tdheader{
        background: #214c94;
        color: #fff;
        font-weight: bold;
    }

    .modal-m{

        width: 40%;

    }

    .modal-lg{

        width: 75%;

    }


</style>

@endsection





</body>



</html>

