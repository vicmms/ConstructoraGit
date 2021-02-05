<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class DirectosController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        
    }

    public function getGastosDirectos(Request $request)
    {
        $submit = DB::table('movimiento')
        ->where([
            ['idTipoGasto','=','1'],
            ['idProyecto','=',$request->input('idProyecto')]
            ])
            ->whereRaw('MONTH(fecha) = ?',[$request->input('mes')])
            ->whereRaw('YEAR(fecha) = ?',[$request->input('anio')])
        ->orderBy('fecha', 'asc')
        ->get();        
        return response()->json($submit);
    }
    
}