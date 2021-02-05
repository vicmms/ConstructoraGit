<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use PDF;
use Luecano\NumeroALetras\NumeroALetras;


class CotizacionesController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        
    }

    public function getProyectoConcepto(Request $request){
        $submit = DB::table('proyecto_concepto')
                    ->join('concepto','concepto.idConcepto','=','proyecto_concepto.idConcepto')
                    ->where('idProyecto', '=', $request->input('idProy'))
                    ->get();        

                    

        return response()->json($submit);
    }
    public function getTarjetas(Request $request){
        $submit1 = DB::table('tarjetas')
                    // ->select('tarjetas.costoUnitario as cu', )
                    ->join('materiales','tarjetas.idRecurso','=','materiales.idMaterial')
                    ->where([
                        ['idConcepto', '=', $request->input('idConcepto')],
                        ['idProyecto', '=', $request->input('idProy')],
                        ['idCategoria', '=', 1],
                    ])
                    ->get();     
        $submit2 = DB::table('tarjetas')
                    ->join('mano_obra','tarjetas.idRecurso','=','mano_obra.idMO')
                    ->where([
                        ['idConcepto', '=', $request->input('idConcepto')],
                        ['idProyecto', '=', $request->input('idProy')],
                        ['idCategoria', '=', 2],
                    ])
                    ->get();
        $submit3 = DB::table('tarjetas')
                    ->join('herramienta','tarjetas.idRecurso','=','herramienta.idHerramienta')
                    ->where([
                        ['idConcepto', '=', $request->input('idConcepto')],
                        ['idProyecto', '=', $request->input('idProy')],
                        ['idCategoria', '=', 3],
                    ])
                    ->get();   
        $submit = array($submit1,$submit2,$submit3);
        return response()->json($submit);
    }
    public function setTarjeta(Request $request){
        $submit = DB::table('proyecto_concepto')->updateOrInsert(
            [
                'idProyecto' => $request->input('idProy'),'idConcepto' => $request->input('idConcepto')
            ],
            [
                'cantidad' => $request->input('cantidad'),
                'costo' => $request->input('pu'),
                'iva' => $request->input('iva'),
                'idUnidad' => $request->input('unidad'),
                'total' => $request->input('costo'),
            ]
            );
        return response()->json($submit);
    }

    public function actualizarCantidadConcepto(Request $request){
        $submit = DB::table('costo_concepto_proyecto')->updateOrInsert(
            [
                'idProyecto' => $request->input('idProy'),'idConcepto' => $request->input('idConcepto')
            ],
            [
                'cantidadCto' => $request->input('cantidad'),
                'indirectos' => $request->input('indirectos'),
                'financiamiento' => $request->input('financiamiento'),
                'utilidad' => $request->input('utilidad'),
                'costoTotal' => $request->input('costoTotal'),
            ]
            );
        return response()->json($submit);
    }

    public function deleteTarjeta(Request $request){
        $submit = DB::table('proyecto_concepto')
        ->where('id', '=', $request->input('id'))
        ->delete();
        
        return response()->json($submit);
    }
    public function limpiarConceptos(Request $request){
        $submit = DB::table('proyecto_concepto')
        ->where('idProyecto', '=', $request->input('idProy'))
        ->delete();
        
        return response()->json($submit);
    }
    public function getConceptos(Request $request){
        $submit = DB::table('concepto')
                    ->join('categoria_concepto','concepto.categoria','=','categoria_concepto.idCategoria')
                    ->join('unidad','unidad.idUnidad','=','concepto.idUnidad')
                    ->where('activoConcepto', '=', true)
                    ->orderBy('categoria', 'asc')
                    ->orderBy('orden', 'asc')
                    //->join('tarjetas','concepto.categoria','=','categoria_concepto.idCategoria')
                    ->get(); 
        $submit2 = DB::table('costo_concepto_proyecto')
                    ->where([
                        ['idProyecto', '=', $request->input('idProyecto')]
                    ])
                    ->get();           
        return response()->json([$submit,$submit2]);
    }

    
    public function imprimirCotizacion(Request $request, $idProyecto)
    {
        $submit = DB::table('proyecto_concepto')
        ->join('concepto','proyecto_concepto.idConcepto','=','concepto.idConcepto')
        ->join('proyecto','proyecto_concepto.idProyecto','=','proyecto.idProyecto')
        ->join('unidad','concepto.idUnidad','=','unidad.idUnidad')
        ->join('categoria_concepto','concepto.categoria','=','categoria_concepto.idCategoria')
        ->where([
            ['proyecto_concepto.idProyecto', '=', $idProyecto],
            ['proyecto_concepto.cantidad', '>', 0]
        ])
        ->orderBy('concepto.idConcepto')
                    ->get();        
        // $mpdf = new \Mpdf\Mpdf();
        // $mpdf->loadView('imprimirCotizacion');
        // $mpdf->Output();
         //dd($submit);
        $subtotal = 0;
        $iva = 0;
        $clausulas = '';
        if (count($submit) > 0) {
            $clausulas = array_map('trim', preg_split('/\R/', $submit[0]->clausulasProyecto));
        }
        for ($i=0; $i < count($submit); $i++) { 
            if($submit[$i]->iva==1){
                // echo($submit[$i]->cantidad.' * '.$submit[$i]->precioUnitario.'\n');
                $subtotal += $submit[$i]->cantidad * $submit[$i]->costo;
                $iva += ($submit[$i]->costo*.16)*$submit[$i]->cantidad;
            }else{
                // echo($submit[$i]->cantidad.' * '.$submit[$i]->precioUnitario.'\n');
                $subtotal += $submit[$i]->cantidad * $submit[$i]->costo;
            }
        }
        // die();
        $formatter = new NumeroALetras();
        $formatter->conector = 'PESOS';
        $totalTexto =  $formatter->toInvoice($subtotal+$iva, 2, 'M.N.');
        // echo($subtotal);
        // echo($totalTexto);
        // echo($iva);
        // die();
        $data = [
            'data' => $submit,
            'subtotal' => $subtotal,
            'ivaTotal' => $iva,
            'textoTotal' => $totalTexto,
            'clausulas' => $clausulas
        ];
        $pdf = PDF::loadView('imprimirCotizacion', $data);
        return $pdf->stream('imprimirCotizacion');
// die();
    }

    public function getView(Request $request){
        return view('cotizaciones',[
            'id' => $request->id,
            'titulo' => $request->titulo
            ]);
    }
    public function updatePU(Request $request){
        $submit = DB::table('concepto')
              ->where('idConcepto', $request->input('id'))
              ->update(['precioUnitario' => $request->input('pu')]);
    }
    public function actualizarOrdenConceptos(Request $request){
        $data = json_decode($request->input('array'));
        for ($i=0; $i < count($data); $i++) { 
            $submit = DB::table('concepto')
              ->where('idConcepto', $data[$i][1])
              ->update(['orden' => intval($data[$i][0])]);
        }
        return $data[0][1];
    }
    public function getConceptosCategoria(Request $request){
        $submit = DB::table('concepto')
              ->where([
                  ['categoria', $request->input('idCategoria')],
                  ['activoConcepto', '=', true]
              ])
              ->get();

        return response()->json($submit);
    }


}