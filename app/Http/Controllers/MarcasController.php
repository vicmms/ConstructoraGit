<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class MarcasController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        
    }
    public function getMarcas(Request $request)
    {
          
        $submit = DB::table('marcas')
        ->where('activoMarca','=', true)
        ->get();        
        
        return response()->json($submit);
    }
    public function setMarca(Request $request)
    {
          
        $submit = DB::table('marcas')->insert([
                    'marca' => $request->input('marca'),
                    'provee' => $request->input('provee'),
                ]);    
        
        return response()->json($submit);
    }
    public function eliminarMarca(Request $request){
        $submit = DB::table('marcas')
        ->where('idMarca', '=', $request->input('idMarca'))
        ->update(['activoMarca' => false]);

        return response()->json($submit);
    }
    
}