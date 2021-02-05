<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class ProyectosController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        
    }
    public function getProyectos(Request $request)
    {
        $submit = DB::table('proyecto')->get();        
        return response()->json($submit);
    }
    public function insertarProyecto(Request $request){

        $submit = DB::table('proyecto')->insertGetId([

            'nombreProyecto' => $request->input('nombreProy'), 
            'nombreClienteProyecto' => $request->input('nombreCP'),
            'fechaInicio' => $request->input('fi'),
            'fechaFin' => null,
            'descripcionProyecto' => $request->input('descripcion'),
            ]
        );
        
        return response()->json($submit);

    }

    public function actualizarClausulas(Request $request){
        $submit = DB::table('proyecto')
              ->where('idProyecto', $request->input('idProyecto'))
              ->update(['clausulasProyecto' => $request->input('clausulas')]);
        return response()->json($submit);
    }

    
}