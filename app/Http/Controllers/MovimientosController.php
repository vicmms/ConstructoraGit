<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class MovimientosController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        
    }

    public function getFP(Request $request)
    {
        $submit = DB::table('forma_pago')->get();        
        return response()->json($submit);
    }

    public function getTipoGasto(Request $request)
    {
        $submit = DB::table('tipo_gasto')->get();        
        return response()->json($submit);
    }

    public function getUnidades(Request $request)
    {
        $submit = DB::table('unidad')
        ->where('activoUnidad', '=', true)   
        ->get();
             
        return response()->json($submit);
    }
    //ingresos
    public function getAllIngresos(Request $request)
    {
        $submit = DB::table('movimiento')
                    ->join('proyecto','movimiento.idProyecto','=','proyecto.idProyecto')
                    ->join('forma_pago','forma_pago.idFormaPago','=','movimiento.idFormaPago')
                    ->select('movimiento.*', 'proyecto.nombreProyecto', 'forma_pago.descripcion')
                    ->where('idTipo', '=', 1)
                    ->get();        
        return response()->json($submit);
    }

    public function getIngresos(Request $request)
    {
        $submit = DB::table('movimiento')
                    ->join('proyecto','movimiento.idProyecto','=','proyecto.idProyecto')
                    ->join('forma_pago','forma_pago.idFormaPago','=','movimiento.idFormaPago')
                    ->select('movimiento.*', 'proyecto.nombreProyecto', 'forma_pago.descripcion')
                    ->where([
                        ['idTipo', '=', 1],
                        ['movimiento.idProyecto','=', $request->input('idProy')]
                    ])
                    ->get();        
        return response()->json($submit);
    }

    public function setIngreso(Request $request)
    {
        $submit = DB::table('movimiento')->insertGetId([
            'idProyecto' => $request->input('idProyecto'), 
            'fecha' => $request->input('fecha'),
            'idTipo' => 1, 
            'idFormaPago' => $request->input('formaPago'), 
            'monto' => $request->input('monto'), 
            'concepto' => $request->input('concepto'), 
            ]
        );
        return response()->json($submit);
    }

    //egresos
    public function getEgresos(Request $request)
    {
        $submit = DB::table('movimiento')
                    ->join('proyecto','movimiento.idProyecto','=','proyecto.idProyecto')
                    ->join('forma_pago','forma_pago.idFormaPago','=','movimiento.idFormaPago')
                    ->join('tipo_gasto','tipo_gasto.idtipoGasto','=','movimiento.idTipoGasto')
                    ->join('unidad','unidad.idUnidad','=','movimiento.idUnidad')
                    ->select('movimiento.*', 'proyecto.nombreProyecto', 'forma_pago.descripcion', 'tipo_gasto.tipoGasto', 'unidad.unidad')
                    ->where('idTipo', '=', 2)
                    ->get();        
        return response()->json($submit);
    }

    public function setEgreso(Request $request)
    {
        $submit = DB::table('movimiento')->insertGetId([
            'idProyecto' => $request->input('idProyecto'), 
            'fecha' => $request->input('fecha'),
            'idTipo' => 2, 
            'idFormaPago' => $request->input('formaPago'), 
            'idTipoGasto' => $request->input('tipoGasto'), 
            'idUnidad' => $request->input('unidad'), 
            'cantidadUnidad' => $request->input('cantidadUnidad'), 
            'monto' => $request->input('monto'), 
            'concepto' => $request->input('concepto'), 
            ]
        );
        return response()->json($submit);
    }

    public function eliminarUM(Request $request){
        $submit = DB::table('unidad')
        ->where('idUnidad', '=', $request->input('idUM'))
        ->update(['activoUnidad' => false]);

        return response()->json($submit);
    }

    
}