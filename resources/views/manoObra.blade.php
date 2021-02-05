@extends('main.main')



@section('titulo', 'Mano de Obra - ')



@section('content')


<div class="block-header">





    <div class="col-xs-12 sm-2">

        <div class="col-md" align="right">

            <button type="button" id="btn-addManoObra" class="btn-agregar btn waves-effect waves-light btn-outline-danger float-right btn-rounded" data-toggle="modal" data-target="#modalProyecto">Agregar Mano de Obra</button>

        </div>

        <br>

    </div>



    <!-- Exportable Table -->

        <div class="col-sm-12 col-xs-12">

            <div class="card">

                <div class="header">

                    <h2>

                        Mano de Obra

                    </h2>

                </div>

                <div class="body">

                    <div class="table-responsive">

                        <table class="table table-bordered table-striped table-hover" id="tablaProyectos">

                            <thead>

                                <tr>
                                    <th>Descripción</th>
                                    <th>Unidad</th>
                                    <th>Cantidad</th>
                                    <th>C/U</th>
                                    <th>Total</th>
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

							<h4 class="modal-title text-white" id="modal-title">Agregar Mano de Obra</h4>

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

																					idManoObra

																	</label>

																	<div class="col-sm-9">

																					<input class="form-control" type="text" required="required" id="idMO" name="idMO" style="border:1px solid #c9c8c7; padding: 5px; "  />

																	</div>

													</div>

									</div>
								</fieldset>
								<div class="form-group" style="padding-top: 20px; padding-buttom: 20px;">

												<div class="row">

																<label class="col-sm-3 control-label">

																				Descripción

																</label>

																<div class="col-sm-9">

																				<input class="form-control" type="text" required="required" id="descripcion" name="descripcion" style="border:1px solid #c9c8c7; padding: 5px; " />

																</div>

												</div>

								</div>
								<div class="form-group" style="padding-top: 20px; padding-buttom: 20px;">
										<div class="row">
											<label class="col-sm-3 control-label">
												Unidad
											</label>
											<div class="col-sm-9">
													<select class="form-control"  name="unidad" id="unidad" style="border:1px solid #c9c8c7; padding: 5px; ">
														<option value="0">Unidad</option>
													</select>
											</div>
										</div>
								</div>
								<div class="form-group" style="padding-top: 20px; padding-buttom: 20px;">
										<div class="row">
											<label class="col-sm-3 control-label">
												Cantidad
											</label>
											<div class="col-sm-9">
												<input class="form-control" type="number" required="required" id="cantidad" name="cantidad" style="border:1px solid #c9c8c7; padding: 5px; " />
											</div>
										</div>
								</div>
								<div class="form-group" style="padding-top: 20px; padding-buttom: 20px;">
										<div class="row">
											<label class="col-sm-3 control-label">
												Costo Unitario
											</label>
											<div class="col-sm-9">
												<input class="form-control" type="number" required="required" id="costoUnitario" name="costoUnitario" style="border:1px solid #c9c8c7; padding: 5px; " />
											</div>
										</div>
								</div>
								<div class="form-group" style="padding-top: 20px; padding-buttom: 20px;">
										<div class="row">
											<label class="col-sm-3 control-label">
												Total
											</label>
											<div class="col-sm-9">
												<input disabled class="form-control" type="number" required="required" id="total" name="total" style="border:1px solid #c9c8c7; padding: 5px; " />
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

<script src="{{asset('js/manoObra.js')}}"></script>





@endsection





@section('custom-css')

<meta name="csrf-token" content="{{ csrf_token() }}">


@endsection

</body>



</html>

