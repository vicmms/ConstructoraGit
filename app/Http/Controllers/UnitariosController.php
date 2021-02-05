<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class UnitariosController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        
    }
    public function getTarjetasConcepto(Request $request)
    {
          
        $submit = DB::table('tarjetas')
        // ->select('tarjetas.costoUnitario as cu')
        ->join('materiales', 'materiales.idMaterial', '=', 'tarjetas.idRecurso')
        ->join('mano_obra', 'mano_obra.idMO', '=', 'tarjetas.idRecurso')
        ->join('herramienta', 'herramienta.idHerramienta', '=', 'tarjetas.idRecurso')
        ->where('idConcepto', $request->input('id'))
        ->get();        
        
        return response()->json($submit);
    }
    public function updatePU(Request $request)
    {
          
        $submit = DB::table('concepto')
        ->where('idConcepto', $request->input('idConcepto'))
        ->update(['precioUnitario' => $request->input('pu')]);        
        
        return response()->json($submit);
    }
    public function getView(Request $request){
        return view('unitarios',[
            'idConcepto' => $_GET['cto'],
            'titulo' => $_GET['tlo'],
            'idProyecto' => $_GET['pto']
            //'titulo' => $request->titulo
            ]);
    }
    public function getMateriales(Request $request)
    {
          
        $submit = DB::table('materiales')
        ->join('unidad', 'materiales.idUnidad', '=', 'unidad.idUnidad')
        ->join('proveedor', 'materiales.idProveedor', '=', 'proveedor.idProveedor')
        ->join('marcas', 'materiales.idMarca', '=', 'marcas.idMarca')
        ->where('activo', '=', true)
        ->get();        
        
        return response()->json($submit);
    }
    public function getMO(Request $request)
    {
          
        $submit = DB::table('mano_obra')
        ->join('unidad', 'mano_obra.idUnidad', '=', 'unidad.idUnidad')
        ->where('activo', '=', true)
        ->get();        
        
        return response()->json($submit);
    }
    public function getHerramientas(Request $request)
    {
          
        $submit = DB::table('herramienta')
        ->join('unidad', 'herramienta.idUnidad', '=', 'unidad.idUnidad')
        ->where('activo', '=', true)
        ->get();        
        
        return response()->json($submit);
    }
    public function setTarjetaPU(Request $request)
    {
          
        $submit = DB::table('tarjetas')->insert([
                    'idConcepto' => $request->input('idConcepto'),
                    'idProyecto' => $request->input('idProyecto'),
                    'idCategoria' => $request->input('idCategoria'),
                    'idRecurso' => $request->input('idRecurso'),
                    'cantidadTarjeta' => $request->input('cantidad'),
                    'costoUnitarioTarjeta' => $request->input('cu'),
                    'totalTarjeta' => $request->input('total'),
                    'ivaTarjeta' => $request->input('iva')
                ]);    
        
        return response()->json($submit);
    }
    public function actualizarPU(Request $request){
        $submit = DB::table('costo_concepto_proyecto')->updateOrInsert(
            ['idProyecto' => $request->input('idProyecto'),'idConcepto' => $request->input('idConcepto')]
        , ['costoTotal' => $request->input('costo'), 'indirectos' => $request->input('indirectos'), 'financiamiento' => $request->input('financiamiento'), 'utilidad' => $request->input('utilidad')]);

        return response()->json($submit);
    }

    public function eliminarTarjetaUnitarios(Request $request){
        $submit = DB::table('tarjetas')->where('idTarjeta', '=', $request->input('idTarjeta'))->delete();

        return response()->json($submit);
    }
    public function eliminarMaterial(Request $request){
        $submit = DB::table('materiales')
        ->where('idMaterial', '=', $request->input('idMaterial'))
        ->update(['activo' => false]);

        return response()->json($submit);
    }
    public function eliminarMO(Request $request){
        $submit = DB::table('mano_obra')
        ->where('idMO', '=', $request->input('idMO'))
        ->update(['activo' => false]);

        return response()->json($submit);
    }
    public function eliminarHerramienta(Request $request){
        $submit = DB::table('herramienta')
        ->where('idHerramienta', '=', $request->input('idHerramienta'))
        ->update(['activo' => false]);

        return response()->json($submit);
    }
}