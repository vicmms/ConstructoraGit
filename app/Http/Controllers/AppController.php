<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class AppController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        
    }

    public function login(Request $request)
    {
        $data = json_decode(request()->getContent(), true);
        $login =  DB::select('SELECT * FROM usuarios WHERE usuario = ? AND password = ?', [$data['user'], $data['pass']]);
      
        return $login;
    }

    
    public function getProyectos(Request $request)
    {
        $submit = DB::table('proyecto')->get();    

        return response()->json($submit);
    }

    public function getComentarios(Request $request)
    {
        $data = json_decode(request()->getContent(), true);
        $submit =  DB::select("SELECT * FROM bitacora INNER JOIN usuarios on bitacora.claveUsuario = usuarios.claveUsuario where bitacora.idProyecto = ? order by bitacora.idBitacora desc", [$data['idProyecto']]);
      
        return $submit;
    }

    public function insertComentario(Request $request)
    {
        $data = json_decode(request()->getContent(), true);
        $submit =  DB::select('INSERT INTO bitacora (idProyecto, claveUsuario, fecha, descripcion) values (?, ?, ?, ?)', [$data['idProyecto'], $data['claveUsuario'], $data['fecha'], $data['descripcion']]);
      
        return $submit;
    }
    
}