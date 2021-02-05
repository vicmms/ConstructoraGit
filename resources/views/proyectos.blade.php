@extends('main.main')



@section('titulo', 'Proyectos - ')



@section('content')

<?php
$month = date('m');
$day = date('d');
$year = date('Y');

$today = $year . '-' . $month . '-' . $day;
?>


<div class="block-header">





    <div class="col-xs-12 sm-2">

        <div class="col-md" align="right">

            <button type="button" id="btn-nuevo-proy" class="btn-agregar btn waves-effect waves-light btn-outline-danger float-right btn-rounded" data-toggle="modal" data-target="#modalProyecto">Registrar proyecto</button>

        </div>

        <br>

    </div>



    <!-- Exportable Table -->

        <div class="col-sm-12 col-xs-12">

            <div class="card">

                <div class="header">

                    <h2>

                        Proyectos

                    </h2>

                </div>

                <div class="body">

                    <div class="table-responsive">

                        <table class="table table-bordered table-striped table-hover" id="tablaProyectos">

                            <thead>

                                <tr>
                                    <th>Cotizar</th>
                                    <th>idProyecto</th>
                                    <th>Proyecto</th>
                                    <th>Cliente</th>
                                    <th>Fecha de inicio</th>
                                    <th>Fecha de terminación</th>
                                    <th>Descripción</th>
                                    <th>Acciones</th>
                                </tr>

                            </thead>

                            <tbody>



                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

</div>

<!-- #END# Exportable Table -->



<!-- MODAL PARA NUEVO Proyecto -->

<div class="modal fade" id="modalProyecto" role="dialog">

    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">

        <div class="modal-content">

            <div class="modal-header" style="color: white; background: #255070; padding-bottom: 15px;">

                <button type="button" class="close text-white" data-dismiss="modal">&times;</button>

                <h4 class="modal-title text-white" id="modal-title">Nuevo proyecto</h4>

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

                                            Nombre del proyecto

                                        </label>

                                        <div class="col-sm-9">

                                            <input class="form-control" type="text" required="required" id="nombreProy" name="nombreProyecto" style="border:1px solid #c9c8c7; padding: 5px; " />

                                        </div>

                                    </div>

                                </div>

                                <div class="form-group" style="padding-top: 20px; padding-buttom: 20px;">

                                    <div class="row">

                                        <label class="col-sm-3 control-label">

                                            Nombre del prestatario

                                        </label>

                                        <div class="col-sm-9">

                                            <input class="form-control" type="text" required="required" id="nombreClienteProy" name="nombreClienteProyecto" style="border:1px solid #c9c8c7; padding: 5px; " />

                                        </div>

                                    </div>

                                </div>

                                <div class="form-group" style="padding-top: 20px; padding-buttom: 20px;">

                                    <div class="row">

                                        <label class="col-sm-3 control-label">

                                            Fecha de inicio

                                        </label>

                                        <div class="col-sm-9">

                                            <input class="form-control" value="<?php echo $today; ?>"  type="date" required="required" id="fi" name="fi" style="border:1px solid #c9c8c7; padding: 5px; " />

                                        </div>

                                    </div>

                                </div>

                                <div class="form-group" style="padding-top: 20px; padding-buttom: 20px;">

                                    <div class="row">

                                        <label class="col-sm-3 control-label">

                                            Descripcion

                                        </label>

                                        <div class="col-sm-9">

                                          <textarea cols="40" rows="5" class="form-control" required="required" id="descripcion" name="descripcion" style="border:1px solid #c9c8c7; padding: 5px; " ></textarea>

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

<script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js"></script>

<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

<script src="{{asset('plugins/jquery-datatable/jquery.dataTables.js')}}"></script>

<script src="{{asset('plugins/jquery-datatable/skin/bootstrap/js/dataTables.bootstrap.js')}}"></script>

<script src="{{asset('plugins/jquery-datatable/extensions/export/dataTables.buttons.min.js')}}"></script>

<script src="{{asset('plugins/jquery-datatable/extensions/export/buttons.flash.min.js')}}"></script>

<script src="{{asset('plugins/jquery-datatable/extensions/export/jszip.min.js')}}"></script>

<script src="{{asset('plugins/jquery-datatable/extensions/export/pdfmake.min.js')}}"></script>

<script src="{{asset('plugins/jquery-datatable/extensions/export/vfs_fonts.js')}}"></script>

<script src="{{asset('plugins/jquery-datatable/extensions/export/buttons.html5.min.js')}}"></script>

<script src="{{asset('plugins/jquery-datatable/extensions/export/buttons.print.min.js')}}"></script>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>

<script src="{{asset('js/proyectos.js')}}"></script>





@endsection





@section('custom-css')

<meta name="csrf-token" content="{{ csrf_token() }}">

<style type="text/css">

    .tdPorcentaje,

    .tdMonto {

        text-align: end;

    }

</style>

@endsection

</body>



</html>

