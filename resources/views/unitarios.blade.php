@extends('main.main')



@section('titulo', 'Tarjeta ')

@section('content')
<div class="block-header">
    <!-- Exportable Table -->
    <div class="row">
        <fieldset hidden>
            <label for="" id="idConcepto">{{ $idConcepto }}</label>
            <label for="" id="idProyecto">{{ $idProyecto }}</label>
        </fieldset>
        <div class="">
            <div class="card">
                <div class="row header">
                    <div class="col-md-1">
                        <a id="btn-back" href="/cotizacion/{{ $titulo }}/{{ $idProyecto }}"><i style="cursor: pointer;"
                                class="material-icons material">arrow_back</i></a>
                    </div>
                    <div class="col-md-11" style="padding-left: 2%">
                        <h2 style="padding-top: 4px;">
                            Editar tarjeta
                        </h2>
                    </div>
                </div>
                <div class="body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-striped table-hover" id="tablaUnitarios">
                            <thead>
                                <tr>
                                    <th>Descripcion</th>
                                    <th>Unidad</th>
                                    <th>Cantidad</th>
                                    <th colspan="2">Precio unitario</th>
                                    <th>Total</th>
                                    <th class="ocultar">idTarjeta</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody id="tbUnitarios">

                            </tbody>
                        </table>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-bordered table-striped table-hover" id="tablaPorcentajes">
                            <thead>
                                <tr>
                                    <th>% Indirectos</th>
                                    <th>% Financiamiento</th>
                                    <th>% Utilidad</th>
                                </tr>
                            </thead>
                            <tbody id="tbPorcentajes">
                                <tr>
                                    <td class="porcentajes"><input class="cantidad" type="number" value="0" min="0"
                                            max="100" id="indirectos"></td>
                                    <td><input class="cantidad" type="number" value="0" min="0" max="100"
                                            id="financiamiento"></td>
                                    <td><input class="cantidad" type="number" value="0" min="0" max="100" id="utilidad">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="container-fluid">
                    <button type="button" id="btn-actualizarPU"
                        class="btn btn-primary btn-lg btn-block">Actualizar</button>
                </div>
            </div>
        </div>
    </div>

</div>
<!-- #END# Exportable Table -->

<!-- MODAL PARA INGRESOS -->
<!-- MODAL Ingresos -->

<div class="modal fade" id="modalMaterial" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header" style="color: white; background: #255070; padding-bottom: 15px;">
                <button type="button" class="close text-white" data-dismiss="modal">&times;</button>
                <h4 class="modal-title text-white" id="modal-title">Editar tarjeta</h4>
            </div>
            <div class="modal-body">
                <div class="form-group" style="padding-top: 20px; padding-buttom: 20px;">
                    <div class="row">
                        <div class="col-md-6">
                            <label class=" control-label">
                                Material
                            </label>
                        </div>
                        <div class="col-md-6">
                            <select class="form-control" name="" id="cbMaterial">
                                <option value="0">-Selecciona-</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <label for="">Cantidad</label>
                        </div>
                        <div class="col-md-6">
                            <input class="form-control" type="number" name="" id="cantidadMaterial">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <label for="">Precio unitario</label>
                        </div>
                        <div class="col-md-6">
                            <input class="form-control" type="number" name="" id="puMaterial">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <label for="">IVA</label>
                        </div>
                        <div class="col-md-6">
                            <input class="form-control" type="number" name="" id="iva" value="0" min="0" max="100">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" name="modal-btn-save" class="btn btn-success" id="btn-material">Agregar</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalMO" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header" style="color: white; background: #255070; padding-bottom: 15px;">
                <button type="button" class="close text-white" data-dismiss="modal">&times;</button>
                <h4 class="modal-title text-white" id="modal-title">Editar tarjeta</h4>
            </div>
            <div class="modal-body">
                <div class="form-group" style="padding-top: 20px; padding-buttom: 20px;">
                    <div class="row">
                        <div class="col-md-6">
                            <label>
                                Mano de obra
                            </label>
                        </div>
                        <div class="col-md-6">
                            <select class="form-control" name="" id="cbMO">
                                <option value="0">-Selecciona-</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <label for="">Cantidad</label>
                        </div>
                        <div class="col-md-6">
                            <input class="form-control" type="number" name="" id="cantidadMO">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <label for="">Costo</label>
                        </div>
                        <div class="col-md-6">
                            <input class="form-control" type="number" name="" id="cuMO">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" name="mo-btn-save" class="btn btn-success" id="btn-mo">Agregar</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalHerramienta" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header" style="color: white; background: #255070; padding-bottom: 15px;">
                <button type="button" class="close text-white" data-dismiss="modal">&times;</button>
                <h4 class="modal-title text-white" id="modal-title">Editar tarjeta</h4>
            </div>
            <div class="modal-body">
                <div class="form-group" style="padding-top: 20px; padding-buttom: 20px;">
                    <div class="row">
                        <div class="col-md-6">
                            <label>
                                Herramienta
                            </label>
                        </div>
                        <div class="col-md-6">
                            <select class="form-control" name="" id="cbHerramienta">
                                <option value="0">-Selecciona-</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <label for="">Cantidad</label>
                        </div>
                        <div class="col-md-6">
                            <input class="form-control" type="number" name="" id="cantidadHerramienta">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <label for="">Costo</label>
                        </div>
                        <div class="col-md-6">
                            <input class="form-control" type="number" name="" id="cuHerramienta">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" name="herramienta-btn-save" class="btn btn-success"
                    id="btn-herramienta">Agregar</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

@endsection



@section('custom-js')
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
<script src="{{ asset('js/unitarios.js') }}"></script>





@endsection





@section('custom-css')
<style>
    .ocultar {
        display: none;
    }

    .col-md-1 {
        width: 1.333333%;
    }

    .modal-dialog {
        width: 800px !important;
    }

    .bg-footer {
        background-color: #e36034 !important;
        color: white;
        font-size: x-large;
        font-weight: bold;
    }

    .bg-secondary {
        background-color: gray !important;
        color: white;
        font-weight: bold;
    }

    .bg-azul {
        background-color: #255070 !important;
        color: white;
        font-weight: bold;
    }

    .bg-dorado {
        background-color: goldenrod !important;
        color: white;
        font-weight: bold;
    }

    .txtRed {
        color: crimson !important;
        font-weight: bold;
    }

    .cantidad {
        border: none;
        text-align: center;
        font-size: medium;
        font-weight: bold;
        background-color: burlywood;
        border-radius: 7px;
    }

    .form-group .form-control {
        background: lightgray;
        border-radius: 5px !important;
    }

    .form-group .row {
        padding-bottom: 20px;
    }
</style>
<meta name="csrf-token" content="{{ csrf_token() }}">
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
@endsection

</body>

</html>