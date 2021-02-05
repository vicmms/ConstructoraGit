@extends('main.main')



@section('titulo', 'Proveedores - ')



@section('content')


<div class="block-header">





    <div class="col-xs-12 sm-2">

        <div class="col-md" align="right">

            <button type="button" id="btn-addMaterial" class="btn-agregar btn waves-effect waves-light btn-outline-danger float-right btn-rounded" data-toggle="modal" data-target="#modalProyecto">Agregar Proveedor</button>

        </div>

        <br>

    </div>



    <!-- Exportable Table -->

        <div class="col-sm-12 col-xs-12">

            <div class="card">

                <div class="header">

                    <h2>

                        Proveedores

                    </h2>

                </div> 

                <div class="body">

                    <div class="table-responsive">

                        <table class="table table-bordered table-striped table-hover" id="tablaProyectos">

                            <thead>

                                <tr>
                                    <th>Nombre</th>
                                    <th>Dirección</th>
                                    <th>Teléfono</th>
									<th>Acciones</th>
									<th>id</th>
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

							<h4 class="modal-title text-white" id="modal-title">Agregar Proveedor</h4>

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

																					idProveedor

																	</label>

																	<div class="col-sm-9">

																					<input class="form-control" type="text" required="required" id="idProveedor" name="idProveedor" style="border:1px solid #c9c8c7; padding: 5px; "  />

																	</div>

													</div>

									</div>
								</fieldset>
								<div class="form-group" style="padding-top: 20px; padding-buttom: 20px;">

												<div class="row">

																<label class="col-sm-3 control-label">

																				Nombre

																</label>

																<div class="col-sm-9">

																				<input class="form-control" type="text" required="required" id="nombre" name="nombre" style="border:1px solid #c9c8c7; padding: 5px; " />

																</div>

												</div>

								</div>
								<div class="form-group" style="padding-top: 20px; padding-buttom: 20px;">

												<div class="row">

																<label class="col-sm-3 control-label">

																				Dirección

																</label>

																<div class="col-sm-9">

																				<input class="form-control" type="text" required="required" id="direccion" name="direccion" style="border:1px solid #c9c8c7; padding: 5px; " />

																</div>

												</div>

								</div>
								<div class="form-group" style="padding-top: 20px; padding-buttom: 20px;">
										<div class="row">
											<label class="col-sm-3 control-label">
												Teléfono
											</label>
											<div class="col-sm-9">
												<input class="form-control" type="tel" required="required" id="telefono" name="telefono" style="border:1px solid #c9c8c7; padding: 5px; " />
											</div>
										</div>
								</div>
								<div class="modal-footer">

												<button type="button" name="modal-btn-save" class="btn btn-success" id="modal-btn">Registrar</button>

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

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>

<script src="{{asset('js/proveedores.js')}}"></script>





@endsection





@section('custom-css')

<meta name="csrf-token" content="{{ csrf_token() }}">


@endsection

</body>



</html>

