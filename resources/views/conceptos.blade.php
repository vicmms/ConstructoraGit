@extends('main.main')



@section('titulo', 'Proyectos - ')



@section('content')

<div class="block-header">

    <div class="col-xs-12 sm-2" style="padding-bottom: 20px">

        <div class="col-md-6" align="left">

            <button type="button" id="btn-nueva-categoria" class="btn-agregar btn waves-effect waves-light btn-outline-danger float-right btn-rounded" data-toggle="modal" data-target="#modalCategoria">Agregar categoria</button>

        </div>
        <div class="col-md-6" align="right">

            <button type="button" id="btn-nuevo-concepto" class="btn-agregar btn waves-effect waves-light btn-outline-danger float-right btn-rounded" data-toggle="modal" data-target="#modalConcepto">Nuevo concepto</button>

        </div>

        <br>

    </div>

        <div class="col-sm-12 col-xs-12">

            <div class="card">

                <div class="header">

                    <h2>

                        Conceptos

                    </h2>

                </div>
                {{-- <div>
                    <input type="file" name="" id="file"> solo para cargar los archivos nuevos
                </div> --}}
                <div class="body">

                    <div class="table-responsive">

                        <table class="table table-bordered table-striped table-hover" id="tablaConceptos">

                            <thead>

                                <tr>
                                    <th>idConcepto</th>
                                    <th>Concepto</th>
                                    <th>Categoria</th>
                                    <th>idcategoria</th>
                                    <th>idunidad</th>
                                    <th>unidad</th>
                                    <th style="max-width: 100px;">Acciones</th>
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



<!-- MODAL PARA NUEVO concepto -->

<div class="modal fade" id="modalConcepto" role="dialog">

    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">

        <div class="modal-content">

            <div class="modal-header" style="color: white; background: #255070; padding-bottom: 15px;">

                <button type="button" class="close text-white" data-dismiss="modal">&times;</button>

                <h4 class="modal-title text-white" id="modal-title">Nuevo concepto</h4>

            </div>

            <div class="modal-body">

                <div class="row">

                    <div class="col-sm-8">

                        <form id="frm-registrar" method="POST" enctype="multipart/form-data" class="form-horizontal">

                            <div class="card-content">

                                <div class="form-group" style="padding-top: 20px; padding-buttom: 20px;">

                                    <div class="row">

                                        <label class="col-sm-3 control-label">

                                            Concepto

                                        </label>

                                        <div class="col-sm-9">

                                            {{-- <input class="form-control" type="text" required="required" id="descripcion" name="nombreProyecto" style="border:1px solid #c9c8c7; padding: 5px; " /> --}}
                                            <textarea rows="5" cols="40" class="form-control" type="text" required="required" id="descripcion" name="descripcion" style="border:1px solid #c9c8c7; padding: 5px; "></textarea>

                                        </div>

                                    </div>

                                </div>

                                <div class="form-group" style="padding-top: 20px; padding-buttom: 20px;">

                                    <div class="row">

                                        <label class="col-sm-3 control-label">

                                            Categoria

                                        </label>

                                        <div class="col-sm-9">

                                            <select class="form-control" name="cbCategorias" id="cbCategorias" style="border:1px solid #c9c8c7; padding: 5px; ">
                                                <option value="0">-Selecciona-</option>
                                            </select>

                                        </div>

                                    </div>

                                </div>
                                <div class="form-group" style="padding-top: 20px; padding-buttom: 20px;">

                                    <div class="row">

                                        <label class="col-sm-3 control-label">

                                            Unidad

                                        </label>

                                        <div class="col-sm-9">

                                            <select class="form-control" name="cbUnidad" id="cbUnidades" style="border:1px solid #c9c8c7; padding: 5px; ">
                                                <option value="0">-Selecciona-</option>
                                            </select>

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

<div class="modal fade" id="modalCategoria" role="dialog">

    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">

        <div class="modal-content">

            <div class="modal-header" style="color: white; background: #255070; padding-bottom: 15px;">

                <button type="button" class="close text-white" data-dismiss="modal">&times;</button>

                <h4 class="modal-title text-white" id="modal-title">Nueva categoria de conceptos</h4>

            </div>

            <div class="modal-body">

                <div class="row">

                    <div class="col-sm-8">

                        <form id="frm-registrar2" method="POST" enctype="multipart/form-data" class="form-horizontal">

                            <div class="card-content">

                                <div class="form-group" style="padding-top: 20px; padding-buttom: 20px;">

                                    <div class="row">

                                        <label class="col-sm-3 control-label">

                                            Categoria

                                        </label>

                                        <div class="col-sm-9">

                                            {{-- <input class="form-control" type="text" required="required" id="descripcion" name="nombreProyecto" style="border:1px solid #c9c8c7; padding: 5px; " /> --}}
                                            <textarea rows="3" cols="40" class="form-control" type="text" required="required" id="categoria" name="categoria" style="border:1px solid #c9c8c7; padding: 5px; "></textarea>

                                        </div>

                                    </div>

                                </div>

                                <div class="form-group" style="padding-top: 20px; padding-buttom: 20px;">

                                    <div class="row">

                                        <label class="col-sm-3 control-label">

                                            Nombre corto

                                        </label>

                                        <div class="col-sm-9">

                                            <input class="form-control" type="text" required="required" id="nombreCorto" name="nombreCorto" style="border:1px solid #c9c8c7; padding: 5px; "  />


                                        </div>

                                    </div>

                                </div>

                                <div class="modal-footer">

                                    <button type="button" name="modal-btn-save" class="btn btn-success" id="modal-btn-save2">Aceptar</button>

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
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/jszip.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/xlsx.js"></script>
<script src="{{asset('js/conceptos.js')}}"></script>





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

