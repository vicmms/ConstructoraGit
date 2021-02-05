<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use PDF;
use Luecano\NumeroALetras\NumeroALetras;


class ConceptosController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        
    }
    public function setConcepto(Request $request){
        $submit = DB::table('concepto')->insert([
            'descripcion' => $request->input('descripcion'),
            'categoria' => $request->input('idCategoria'),
            'idUnidad' => $request->input('idUnidad'),
            'precioUnitario' => 0,
            'cantidadConcepto' => 0,
            'indirectos' => 0
        ]);
        return response()->json($submit);
    }

    public function insertarCategoria(Request $request){
        $submit = DB::table('categoria_concepto')->insert([
            'descripcionCategoria' => $request->input('categoria'),
            'nombreCorto' => $request->input('nombreCorto'),
        ]);
        return response()->json($submit);
    }

    public function getCategoriasConceptos(Request $request){
        $submit = DB::table('categoria_concepto')->get();
        return response()->json($submit);
    }
    public function actualizarConcepto(Request $request)
    {
          
        $submit = DB::table('concepto')
        ->where('idConcepto', $request->input('idConcepto'))
        ->update(
            ['idUnidad' => $request->input('idUnidad'),
            'categoria' => $request->input('idCategoria'),
            'descripcion' => $request->input('descripcion')]

        );        
        
        return response()->json($submit);
    }
    public function eliminarConcepto(Request $request){
        $submit = DB::table('concepto')
        ->where('idConcepto', '=', $request->input('idConcepto'))
        ->update(['activoConcepto' => false]);

        return response()->json($submit);
    }
}

?>