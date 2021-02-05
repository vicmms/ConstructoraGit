<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('login.login');
});

//-----------Login/logout--------------------
Route::any('/login', 'UserController@login')->name('login');

Route::any('/logout', 'UserController@logout')->name('logout');
//-------------------------------------------

Route::get('/home', function () {
    if (Session::get('claveUsuario'))
    {
        return view('main.main');
    }else{
        return view('login.login');
    }
})->name('home');
//rutas proyecto
Route::get('/proyectos', function () {
    return view('proyectos');
})->name('proyectos');
Route::post('/getProyectos','ProyectosController@getProyectos')->name('getProyectos');
Route::post('/insertarProyecto','ProyectosController@insertarProyecto')->name('insertarProyecto');
Route::post('/actualizarClausulas','ProyectosController@actualizarClausulas');

//rutas ingreso
Route::get('/ingresos', function () {
    return view('ingresos');
})->name('ingresos');
Route::post('/getFP','MovimientosController@getFP')->name('getFP');
Route::post('/setIngreso','MovimientosController@setIngreso')->name('setIngreso');
Route::post('/getAllIngresos','MovimientosController@getAllIngresos')->name('getAllIngresos');
Route::post('/getIngresos','MovimientosController@getIngresos')->name('getIngresos');

//rutas egresos
Route::get('/egresos', function () {
    return view('egresos');
})->name('egresos');
Route::post('/setEgreso','MovimientosController@setEgreso')->name('setEgreso');
Route::post('/getTipoGasto','MovimientosController@getTipoGasto')->name('getTipoGasto');
Route::post('/getUnidades','MovimientosController@getUnidades')->name('getUnidades');
Route::post('/getEgresos','MovimientosController@getEgresos')->name('getEgresos');
Route::post('/eliminarUM','MovimientosController@eliminarUM')->name('eliminarUM');

//Control de gastos directos
Route::get('/controlGD', function () {
    return view('directos');
})->name('directos');
Route::post('/getGastosDirectos','DirectosController@getGastosDirectos')->name('getGastosDirectos');
//rutas conceptos
Route::get('/conceptos', function () {
    return view('conceptos');
})->name('conceptos');
Route::post('/setCategorias','UserController@setCategorias')->name('setCategorias');
Route::post('/setTarjetas','UserController@setTarjetas')->name('setTarjetas');
Route::post('/insertarCategoria','ConceptosController@insertarCategoria')->name('insertarCategoria');
Route::post('/actualizarConcepto','ConceptosController@actualizarConcepto');
Route::post('/eliminarConcepto','ConceptosController@eliminarConcepto');
//rutas cotizaciones
Route::get('/cotizaciones', function () {
    return view('cotizaciones');
})->name('cotizaciones');
Route::get('/cotizacion/{titulo}/{id}','CotizacionesController@getView');
Route::post('/getProyectoConcepto','CotizacionesController@getProyectoConcepto');
Route::post('/getConceptos','CotizacionesController@getConceptos');
Route::post('/getConceptosCategoria','CotizacionesController@getConceptosCategoria');
Route::post('/setTarjeta','CotizacionesController@setTarjeta');
Route::post('/deleteTarjeta','CotizacionesController@deleteTarjeta');
Route::post('/limpiarConceptos','CotizacionesController@limpiarConceptos');
Route::post('/actualizarCantidadConcepto','CotizacionesController@actualizarCantidadConcepto');
Route::post('/getTarjetas','CotizacionesController@getTarjetas');
Route::post('/actualizarOrdenConceptos','CotizacionesController@actualizarOrdenConceptos');



Route::get('/cotizaciones/imprimirCotizacion/{idProyecto}','CotizacionesController@imprimirCotizacion')->name('imprimirCotizacion');

//ruta conceptos
Route::post('/setConcepto','ConceptosController@setConcepto');
Route::post('/getCategoriasConceptos','ConceptosController@getCategoriasConceptos');

//rutas unitarios, materiales
Route::get('/tarjetaCostos','UnitariosController@getView');
Route::post('/getTarjetasConcepto','UnitariosController@getTarjetasConcepto');
Route::post('/getTarjetasConcepto','UnitariosController@getTarjetasConcepto');
Route::post('/updatePU','UnitariosController@updatePU');
Route::post('/getMateriales','UnitariosController@getMateriales');
Route::post('/getMO','UnitariosController@getMO');
Route::post('/getHerramientas','UnitariosController@getHerramientas');
Route::post('/setTarjetaPU','UnitariosController@setTarjetaPU');
Route::post('/actualizarPU','UnitariosController@actualizarPU');
Route::post('/eliminarTarjetaUnitarios','UnitariosController@eliminarTarjetaUnitarios');
Route::post('/eliminarMaterial','UnitariosController@eliminarMaterial');
Route::post('/eliminarMO','UnitariosController@eliminarMO');
Route::post('/eliminarHerramienta','UnitariosController@eliminarHerramienta');

//rutas marcas
Route::get('/marcas', function () {
    return view('marcas');
})->name('marcas');
Route::post('/getMarcas','MarcasController@getMarcas');
Route::post('/setMarca','MarcasController@setMarca');
Route::post('/eliminarMarca','MarcasController@eliminarMarca');




//Rutas APP
Route::any('/app/getProyectos','AppController@getProyectos')->name('getProyectosApp');
Route::any('/app/login','AppController@login')->name('loginApp');
Route::any('/app/getComentarios','AppController@getComentarios')->name('getComentariosApp');
Route::any('/app/insertComentario','AppController@insertComentario')->name('insertComentarioApp');
//Fin rutas App

Route::get('/updateapp', function()
{
    \Composer::call('update');
    echo 'dump-autoload complete';
});

//Rutas catalogos

Route::get('/materiales', function () {
    return view('materiales');
})->name('materiales');

Route::post('/insertMaterial','CatalogosController@insertMaterial')->name('insertMaterial');
Route::post('/editMaterial','CatalogosController@editMaterial')->name('editMaterial');


Route::get('/manoObra', function () {
    return view('manoObra');
})->name('manoObra');

Route::post('/insertManoObra','CatalogosController@insertManoObra')->name('insertManoObra');
Route::post('/editManoObra','CatalogosController@editManoObra')->name('editManoObra');


Route::get('/herramientas', function () {
    return view('herramientas');
})->name('herramientas');

Route::post('/insertHerramientas','CatalogosController@insertHerramientas')->name('insertHerramientas');
Route::post('/editHerramientas','CatalogosController@editHerramientas')->name('editHerramientas');



Route::get('/proveedores', function () {
    return view('proveedores');
})->name('proveedores');
Route::post('/getProveedores','CatalogosController@getProveedores')->name('getProveedores');
Route::post('/insertProveedor','CatalogosController@insertProveedor')->name('insertProveedor');
Route::post('/editProveedor','CatalogosController@editProveedor')->name('editProveedor');
Route::post('/eliminarProveedor','CatalogosController@eliminarProveedor');


Route::get('/unidadesMedida', function () {
    return view('unidadesMedida');
})->name('unidadesMedida');

Route::post('/insertUnidad','CatalogosController@insertUnidad')->name('insertUnidad');
Route::post('/editUnidad','CatalogosController@editUnidad')->name('editUnidad');

//Fin rutas catalogos