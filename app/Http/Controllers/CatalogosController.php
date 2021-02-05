<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;


class CatalogosController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        
    }

    public function insertMaterial(Request $request){
        $hoy = date('Y/m/d');
        $submit = DB::table('materiales')->insertGetId([
            "descripcion" => $request->input('descripcion'),
            "idMarca" => $request->input('idMarca'),
            "idUnidad" => $request->input('unidad'),
            "cantidad" => $request->input('cantidad'),
            "precioUnitario" => $request->input('precioUnitario'),
            "iva" => $request->input('iva'),
            "total" => $request->input('total'),
            "idProveedor" => $request->input('proveedor'),
            "fechaRegistro" => $hoy,
            ]
        );
        
        return response()->json($submit);
    }

    public function editMaterial(Request $request){
        $submit = DB::table('materiales')->where('idMaterial', $request->input('idMaterial'))->update([
            "descripcion" => $request->input('descripcion'),
            "idMarca" => $request->input('idMarca'),
            "idUnidad" => $request->input('unidad'),
            "cantidad" => $request->input('cantidad'),
            "precioUnitario" => $request->input('precioUnitario'),
            "iva" => $request->input('iva'),
            "total" => $request->input('total'),
            "idProveedor" => $request->input('proveedor'),
            ]
        );
        
        return response()->json($submit);
    }

    public function insertManoObra(Request $request){
        $submit = DB::table('mano_obra')->insertGetId([
            "descripcion" => $request->input('descripcion'),
            "idUnidad" => $request->input('unidad'),
            "cantidad" => $request->input('cantidad'),
            "costoUnitario" => $request->input('costoUnitario'),
            "total" => $request->input('total'),
            ]
        );
        
        return response()->json($submit);
    }

    public function editManoObra(Request $request){
        $submit = DB::table('mano_obra')->where('idMO', $request->input('idMO'))->update([
            "descripcion" => $request->input('descripcion'),
            "idUnidad" => $request->input('unidad'),
            "cantidad" => $request->input('cantidad'),
            "costoUnitario" => $request->input('costoUnitario'),
            "total" => $request->input('total'),
            ]
        );
        
        return response()->json($submit);
    }

    public function insertHerramientas(Request $request){
        $submit = DB::table('herramienta')->insertGetId([
            "descripcion" => $request->input('descripcion'),
            "idUnidad" => $request->input('unidad'),
            "cantidad" => $request->input('cantidad'),
            "costoUnitario" => $request->input('costoUnitario'),
            "total" => $request->input('total'),
            ]
        );
        
        return response()->json($submit);
    }

    public function editHerramientas(Request $request){
        $submit = DB::table('herramienta')->where('idHerramienta', $request->input('idHerramienta'))->update([
            "descripcion" => $request->input('descripcion'),
            "idUnidad" => $request->input('unidad'),
            "cantidad" => $request->input('cantidad'),
            "costoUnitario" => $request->input('costoUnitario'),
            "total" => $request->input('total'),
            ]
        );
        
        return response()->json($submit);
    }



    public function getProveedores(Request $request)
    {
          
        $submit = DB::table('proveedor')
        ->where('activoProveedor', '=', true)
        ->get();        
        
        return response()->json($submit);
    }

    public function insertProveedor(Request $request){
        $submit = DB::table('proveedor')->insertGetId([
            "nombreProveedor" => $request->input('nombre'),
            "direccionProveedor" => $request->input('direccion'),
            "telefonoProveedor" => $request->input('telefono')
            ]
        );
        
        return response()->json($submit);
    }

    public function editProveedor(Request $request){
        $submit = DB::table('proveedor')->where('idProveedor', $request->input('idProveedor'))->update([
            "nombreProveedor" => $request->input('nombre'),
            "direccionProveedor" => $request->input('direccion'),
            "telefonoProveedor" => $request->input('telefono')
            ]
        );
        
        return response()->json($submit);
    }

    public function insertUnidad(Request $request){
        $submit = DB::table('unidad')->insertGetId([
            "unidad" => $request->input('nombreCorto'),
            "nombreUnidad" => $request->input('unidad')
            ]
        );
        
        return response()->json($submit);
    }

    public function editUnidad(Request $request){
        $submit = DB::table('unidad')->where('idUnidad', $request->input('idUnidad'))->update([
            "unidad" => $request->input('nombreCorto'),
            "nombreUnidad" => $request->input('unidad')
            ]
        );
        
        return response()->json($submit);
    }

    public function eliminarProveedor(Request $request){
        $submit = DB::table('proveedor')
        ->where('idProveedor', '=', $request->input('idProveedor'))
        ->update(['activoProveedor' => false]);

        return response()->json($submit);
    }


}