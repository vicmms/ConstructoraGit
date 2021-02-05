<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use DB;
use Session;

class UserController extends Controller
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

        $usuario    = $request->input('username');
        $pass       = $request->input('password');

        $login =  DB::select('SELECT * FROM usuarios WHERE usuario = ? AND password = ?', [$usuario, $pass]);
        if(!count($login))
        {
            return view('login.login');
        }
        else
        {
            Session::put('claveUsuario',         $login[0]->claveUsuario); 
            session()->put('nombre',      $login[0]->nombre);
            session()->put('usuario',     $login[0]->usuario);
            session()->put('claveTipoUsuario',    $login[0]->cveTipoUsuario);
            
            session()->save();

            return redirect('/proyectos');
        }
    }

    public function logout(Request $request)
    {
        $request->session()->flush();

        return redirect('/');
    }

    public function setCategorias(Request $request){
        for ($i=0; $i < count($request->input('categorias')); $i++) { 
            DB::table('Categoria_Tarjeta')->insertGetId(
                ['categoria' => $request->input('categorias')[$i]]
            );
        }
    }
    public function setTarjetas(Request $request){
        for ($i=0; $i < count($request->input('conceptos')); $i++) { 
            DB::table('Tarjeta')->insertGetId(
                ['descripcion' => $request->input('conceptos')[$i],'costo' => $request->input('costos')[$i],'categoria' => $request->input('idCategoria')[$i]]
            );
        }
    }
}