<?php 
class myApp{
	function conectarBD(){
		$serverName = "NS566759"; //serverName\instanceName
		//$serverName ="localhost\\SQL";
		$connectionInfo = array( "database"=>"checadorVirtual", "UID"=>"sa", "PWD"=>"Guayabin2020@@....", "CharacterSet" => "UTF-8");
		//echo "<script>console.log( 'Debug Objects' );</script>";
		$conn = sqlsrv_connect( $serverName, $connectionInfo);
	
		return $conn;
	}

	private function execQuery($query){
		$conn=$this->conectarBD();
		$stmt= sqlsrv_query($conn,$query) or die(print_r( sqlsrv_errors(), true)) ;
		if($stmt===false){
			return false;
		}else{
			$x=array();
			while($row=sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)){
				$x[]=$row;
			}
			sqlsrv_close($conn);
			return $x;	
		}
	}

	//Additional functions
	function cleanString($string) {
		return preg_replace('/[^A-Za-z0-9\. -]/', '', $string); // Removes special chars.
	 }



	/**		FUNCTIONES PARA ingresar */
	public function ingresar($data){
		$conn=$this->conectarBD();
		
		$usuario=$this->cleanString($data['usuario']);
		$pass=$this->cleanString($data['pass']);
		
		
			$response=array();
			$response['data']=$this->execQuery("exec catalogoSpUsuarioLogin '$usuario', '$pass'")[0];
			if($response['data'] != null){
				$response['status']=true;
				
			}else{
				$response['status']=false;
			}
		
		return $response;
	}

	public function insertPasajero($data, $claveEmpresa){
		session_start();
		$conn=$this->conectarBD();
		$nombre=$data['nombre'];		
		$codigoAcceso=$data['codigoAcceso'];
		$NSS=$data['NSS'];
		$RFC=$data['RFC'];
		$curp=$data['curp'];
		$domicilio=$data['domicilio'];
		$correo=$data['correo'];
		$ant_no_penales='';
		$ine='';
		$comprobanteDom='';

		$tsql_callSP = "{call spcatalogoPasajeroInsert(?,?,?,?,?,?,?,?,?,?,?,?)}";
	      $params = array(           
	          array($claveEmpresa, SQLSRV_PARAM_IN),
	          array($nombre, SQLSRV_PARAM_IN),
	          array($codigoAcceso, SQLSRV_PARAM_IN),
	          array($NSS, SQLSRV_PARAM_IN),
	          array($RFC, SQLSRV_PARAM_IN),
	          array($curp, SQLSRV_PARAM_IN),
	          array($domicilio, SQLSRV_PARAM_IN),
	          array($correo, SQLSRV_PARAM_IN),
	          array($ant_no_penales, SQLSRV_PARAM_IN),
	          array($ine, SQLSRV_PARAM_IN),
	          array($comprobanteDom, SQLSRV_PARAM_IN),
	          array($_SESSION['claveEmpresa'], SQLSRV_PARAM_IN)
	      );
        $stmt = sqlsrv_query( $conn, $tsql_callSP,$params); 
        if( $stmt)
        { 

          $arr=array();
          $i=0;
          do
          {
           while( $row = sqlsrv_fetch_array( $stmt))
           {
              $arr[$i]=$row;
              $i++;
           }
          } while(sqlsrv_next_result($stmt));
        }
        sqlsrv_close( $conn );

		return $arr[0];
	}

	public function insertPasajeroCli($data, $claveEmpresa){
		session_start();
		$conn=$this->conectarBD();
		$nombre=$data['nombre'];		
		$codigoAcceso=$data['codigoAcceso'];
		$NSS=$data['NSS'];
		$RFC=$data['RFC'];
		$curp=$data['curp'];
		$domicilio=$data['domicilio'];
		$correo=$data['correo'];
		$ant_no_penales='';
		$ine='';
		$comprobanteDom='';

		$tsql_callSP = "{call spcatalogoPasajeroInsert(?,?,?,?,?,?,?,?,?,?,?,?)}";

		if ($_SESSION['claveTipoUsuario'] == 4) {
	      $params = array(           
	          array($_SESSION['claveEmpresa'], SQLSRV_PARAM_IN),
	          array($nombre, SQLSRV_PARAM_IN),
	          array($codigoAcceso, SQLSRV_PARAM_IN),
	          array($NSS, SQLSRV_PARAM_IN),
	          array($RFC, SQLSRV_PARAM_IN),
	          array($curp, SQLSRV_PARAM_IN),
	          array($domicilio, SQLSRV_PARAM_IN),
	          array($correo, SQLSRV_PARAM_IN),
	          array($ant_no_penales, SQLSRV_PARAM_IN),
	          array($ine, SQLSRV_PARAM_IN),
	          array($comprobanteDom, SQLSRV_PARAM_IN),
	          array($claveEmpresa, SQLSRV_PARAM_IN)
	      );
	    }elseif ($_SESSION['claveTipoUsuario'] == 2) {
	      $params = array(           
	          array($claveEmpresa, SQLSRV_PARAM_IN),
	          array($nombre, SQLSRV_PARAM_IN),
	          array($codigoAcceso, SQLSRV_PARAM_IN),
	          array($NSS, SQLSRV_PARAM_IN),
	          array($RFC, SQLSRV_PARAM_IN),
	          array($curp, SQLSRV_PARAM_IN),
	          array($domicilio, SQLSRV_PARAM_IN),
	          array($correo, SQLSRV_PARAM_IN),
	          array($ant_no_penales, SQLSRV_PARAM_IN),
	          array($ine, SQLSRV_PARAM_IN),
	          array($comprobanteDom, SQLSRV_PARAM_IN),
	          array($_SESSION['claveEmpresa'], SQLSRV_PARAM_IN)
	      );
	    }  

	      
        $stmt = sqlsrv_query( $conn, $tsql_callSP,$params); 
        if( $stmt)
        { 

          $arr=array();
          $i=0;
          do
          {
           while( $row = sqlsrv_fetch_array( $stmt))
           {
              $arr[$i]=$row;
              $i++;
           }
          } while(sqlsrv_next_result($stmt));
        }
        sqlsrv_close( $conn );

		return $arr[0];
	}

	public function insertVehiculo($data){
		session_start();
		$conn=$this->conectarBD();
		$noInterno=$data['noInterno'];		
		$marca=$data['marca'];
		$modelo=$data['modelo'];
		$capacidad=$data['capacidad'];
		$placa=$data['placa'];
		$numSerie=$data['numSerie'];

		$tarjetaCirFinal='';
        $polizaFinal='';
        $permisoFinal='';
        $autoFinal='';
        $revistaFinal='';
        $verificaFinal='';
        $bitacoraFinal='';
        $fechaUlt='';
        $zonasInspeccion= "1,2,3,4,5";
        $response='0';
		

		/*$tsql_callSP = "{call spcatalogoVehiculoInsert(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        $params = array( 
            array($_SESSION['claveEmpresa'], SQLSRV_PARAM_IN),
            array($noInterno, SQLSRV_PARAM_IN),
            array($marca, SQLSRV_PARAM_IN),
            array($modelo, SQLSRV_PARAM_IN),
            array($capacidad, SQLSRV_PARAM_IN),
            array($tarjetaCirFinal, SQLSRV_PARAM_IN),
            array($polizaFinal, SQLSRV_PARAM_IN),            
            array($polizaFinal, SQLSRV_PARAM_IN),
            array($permisoFinal, SQLSRV_PARAM_IN),
            array($permisoFinal, SQLSRV_PARAM_IN),
            array($permisoFinal, SQLSRV_PARAM_IN),            
            array($autoFinal, SQLSRV_PARAM_IN),
            array($placa, SQLSRV_PARAM_IN),
            array($noInterno, SQLSRV_PARAM_IN),
            array($zonasInspeccion, SQLSRV_PARAM_IN),
            array($revistaFinal, SQLSRV_PARAM_IN),
            array($verificaFinal, SQLSRV_PARAM_IN),
            array($verificaFinal, SQLSRV_PARAM_IN), 
            array($bitacoraFinal, SQLSRV_PARAM_IN),
            array($fechaUlt, SQLSRV_PARAM_IN),
            array($numSerie, SQLSRV_PARAM_IN), 
            array($fechaUlt, SQLSRV_PARAM_IN), 
            array($fechaUlt, SQLSRV_PARAM_IN), 
            array($fechaUlt, SQLSRV_PARAM_IN)     
            
        );*/

        $tsql_callSP = "{call spcatalogoVehiculoInsertNuevo(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
	      $params = array( 
	          array($_SESSION['claveEmpresa'], SQLSRV_PARAM_IN),
	          array($noInterno, SQLSRV_PARAM_IN),
	          array($marca, SQLSRV_PARAM_IN),
	          array($modelo, SQLSRV_PARAM_IN),
	          array($capacidad, SQLSRV_PARAM_IN),
	          array($autoFinal, SQLSRV_PARAM_IN),
	          array($placa, SQLSRV_PARAM_IN),
	          array($noInterno, SQLSRV_PARAM_IN),
	          array($zonasInspeccion, SQLSRV_PARAM_IN),
	          array($numSerie, SQLSRV_PARAM_IN),
	          array($fechaUlt, SQLSRV_PARAM_IN),
	          array($fechaUlt, SQLSRV_PARAM_IN),
	          array($fechaUlt, SQLSRV_PARAM_IN),
	          array(NULL, SQLSRV_PARAM_IN)
	      );


        $stmt = sqlsrv_query( $conn, $tsql_callSP,$params); 
        
        if( $stmt)
        { 
          do
          {
           while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_NUMERIC))
           {              
              $cveUnidad=$row[0];
              $ipMonitoreo =$row[1];
           }
          } while(sqlsrv_next_result($stmt));

          if ($ipMonitoreo != '' && $ipMonitoreo != null) {
            $endpoint = 'http://'.$ipMonitoreo.'/monitoreo/public/api/replica/unidad/insert';
            $dataPostImagen = [
              "claveVehiculo" => $cveUnidad,
              "claveTransportista" => $_SESSION['claveEmpresa'],
              "noInterno" => $noInterno
            ];

            $curl = curl_init();
            curl_setopt_array($curl, array(
                CURLOPT_URL => $endpoint,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30000,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_SSL_VERIFYHOST => 0,
                CURLOPT_SSL_VERIFYPEER => 0,
                CURLOPT_POSTFIELDS => json_encode($dataPostImagen),
                CURLOPT_HTTPHEADER => array(
                    // Set here requred headers
                    "accept: /",
                    "accept-language: en-US,en;q=0.8",
                    "content-type: application/json",
                ),
            ));

            $response = curl_exec($curl);
            $response = strval($response);
            $resp = json_decode($response);
            $err = curl_error($curl);
            curl_close($curl);
          }else{
            $response='1';
          }

          if ($response != '1') {
          	$tsql_callSP2 = "{call spcatalogoVehiculoDelete(?,?)}";
            $params2 = array( 
                array($_SESSION['claveEmpresa'], SQLSRV_PARAM_IN),
                array($cveUnidad, SQLSRV_PARAM_IN)
            );

            $stmt = sqlsrv_query( $conn, $tsql_callSP2,$params2);
            $response = '0';
          }

        }
        sqlsrv_close( $conn );

		return $response;
	}

	public function insertOperador($data){
		session_start();
		$conn=$this->conectarBD();
		$fotoFinal=""; 
		$nombre=$data['nombre'];
		$rfc=$data['rfc'];
		$domicilio=$data['domicilio'];
		$nss=$data['nss'];
		$fechaNacimiento=$data['fechaNacimiento'];

		if ($data['fechaIngreso'] == null || $data['fechaIngreso'] == '')  $fechaIngreso = date('Y-m-d');
		else $fechaIngreso = $data['fechaIngreso'];
				

		$tsql_callSP = "{call spcatalogoOperadorInsertNuevo(?,?,?,?,?,?,?,?,?)}";
	      $params = array( 
	          array($_SESSION['claveEmpresa'], SQLSRV_PARAM_IN),
	          array($nombre, SQLSRV_PARAM_IN),
	          array($fotoFinal, SQLSRV_PARAM_IN),
	          array('', SQLSRV_PARAM_IN),
	          array($rfc, SQLSRV_PARAM_IN),
	          array($fechaNacimiento, SQLSRV_PARAM_IN),
	          array($domicilio, SQLSRV_PARAM_IN),
	          array($nss, SQLSRV_PARAM_IN),
	          array($fechaIngreso, SQLSRV_PARAM_IN)
	      );
        $stmt = sqlsrv_query( $conn, $tsql_callSP,$params); 
        if( $stmt)
        { 

          $arr=array();
          $i=0;
          do
          {
           while( $row = sqlsrv_fetch_array( $stmt))
           {
              $arr[$i]=$row;
              $i++;
           }
          } while(sqlsrv_next_result($stmt));
        }
        sqlsrv_close( $conn );

		return $arr[0];
	}

	public function insertParada($data){
		session_start();
		$conn=$this->conectarBD();
		$parada = $data['parada'];
		$direccion = $data['direccion'];
		$latitud = $data['latitud'];
		$longitud = $data['longitud'];
		$color = $data['color'];
		$radio = $data['radio'];


		if (strval($color) != '0066ff' && strval($color) != '33cc33' && strval($color) != 'ff0000' && strval($color) != 'cc0099' && strval($color) != '999966' && strval($color) != '993300') {
			$color = 'ff0000';
		}

		if (is_numeric($radio)) {
			if (intval($radio) < 40) {
				$radio = 40;
			}
		}else{
			$radio = 40;
		}

		$tsql_callSP = "{call spcatalogoParadaInsert(?,?,?,?,?,?,?)}";
		$params = array( 
			array($_SESSION['claveEmpresa'], SQLSRV_PARAM_IN),
			array($parada, SQLSRV_PARAM_IN),
			array($direccion, SQLSRV_PARAM_IN),
			array($latitud, SQLSRV_PARAM_IN),
			array($longitud, SQLSRV_PARAM_IN),
			array($color, SQLSRV_PARAM_IN),
			array($radio, SQLSRV_PARAM_IN)
		);
        $stmt = sqlsrv_query( $conn, $tsql_callSP,$params); 
        if( $stmt)
        { 
          $arr=array();
          $i=0;
          do
          {
           while( $row = sqlsrv_fetch_array( $stmt))
           {
              $arr[$i]=$row;
              $ipMonitoreo = $row['ipMonitoreo'];
	          $cveParada = $row['claveParada'];
              $i++;
           }
          } while(sqlsrv_next_result($stmt));

          if ($ipMonitoreo != '' && $ipMonitoreo != null) {
            $endpoint = 'http://'.$ipMonitoreo.'/monitoreo/public/api/replica/parada/insert';
            $dataPostImagen = [
              "claveTransportista" => $_SESSION['claveEmpresa'],
              "claveParada" => $cveParada,              
              "latitud" => $latitud,
              "longitud" => $longitud,
              "nombre" => $parada,
              "radio" => intval($radio),
              "color" => $color
            ];

            $curl = curl_init();
            curl_setopt_array($curl, array(
                CURLOPT_URL => $endpoint,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30000,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_SSL_VERIFYHOST => 0,
                CURLOPT_SSL_VERIFYPEER => 0,
                CURLOPT_POSTFIELDS => json_encode($dataPostImagen),
                CURLOPT_HTTPHEADER => array(
                    // Set here requred headers
                    "accept: /",
                    "accept-language: en-US,en;q=0.8",
                    "content-type: application/json",
                ),
            ));

            $response = curl_exec($curl);
            $response = strval($response);
            $resp = json_decode($response);
            $err = curl_error($curl);
            curl_close($curl);
          }else{
            $response='1';
          }

          if ($response != '1') {
          	$tsql_callSP2 = "{call spcatalogoParadaDelete(?,?)}";
            $params2 = array( 
                array($_SESSION['claveEmpresa'], SQLSRV_PARAM_IN),
                array($cveParada, SQLSRV_PARAM_IN)
            );

            $stmt = sqlsrv_query( $conn, $tsql_callSP2,$params2);
            $response = '0';
          }

        }
        sqlsrv_close( $conn );

		return $response;
	}

	function getListarBitacorasDash(){
		$conn=$this->conectarBD();
	 	$cadena="";
		if($conn)
		{
			 $tsql_callSP = "{call spgetBitacoraVehiculo(?)}";
			    		$params = array(    
			    			array($_SESSION['claveEmpresa'], SQLSRV_PARAM_IN)  
							       );
				$stmt = sqlsrv_query( $conn, $tsql_callSP,$params);

			    if( $stmt === false )
			    { 
			    	$cadena.="error";
			    }
			    else
			    {		    	
				do
				{
					 while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC))
					 {

						 $cadena.='<tr><td class="text-center">'.$row['noInterno'].'</td>'.
						 '<td class="text-center"><a class="btn btn-danger btn-icon-text" href="https://pi.gtdevs.com/appCV/wsApp/reporte_bitacora.php?bitacora='.$row['claveEvaluacion'].'" target="_blank"><i class="fa fa-download"></i></a></td>'
						 .'<td class="text-center">'.$row['fechaEvaluacion'].'</td>';

					 }
				} while(sqlsrv_next_result($stmt));
				}
		}
		sqlsrv_close( $conn );

		return $cadena;
	}

	function getListarTipoEmpresas(){
		$conn=$this->conectarBD();
	 	$cadena="";
		if($conn)
		{
			 $tsql_callSP = "{call spcatalogoTipoEmpresaGet()}";
			    		$params = array(      
							       );
				$stmt = sqlsrv_query( $conn, $tsql_callSP,$params);

			    if( $stmt === false )
			    { 
			    	$cadena.="error";
			    }
			    else
			    {		    	
				do
				{
					 while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC))
					 {

						 $cadena.='<option value="'.$row['claveTipoEmpresa'].'">'.$row['tipoEmpresa'].'</option>';

					 }
				} while(sqlsrv_next_result($stmt));
				}
		}
		sqlsrv_close( $conn );

		return $cadena;
	}

	function getListarTipoUsuario(){
		$conn=$this->conectarBD();
	 	$cadena="";
		if($conn)
		{
			 $tsql_callSP = "{call spcatalogoTipoUsuariosGet()}";
			    		$params = array(      
							       );
				$stmt = sqlsrv_query( $conn, $tsql_callSP,$params);

			    if( $stmt === false )
			    { 
			    	$cadena.="error";
			    }
			    else
			    {		    	
				do
				{
					 while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC))
					 {

						 $cadena.='<option value="'.$row['claveTipoUsuario'].'">'.$row['tipoUsuario'].'</option>';

					 }
				} while(sqlsrv_next_result($stmt));
				}
		}
		sqlsrv_close( $conn );

		return $cadena;
	}

	function getListarEmpresas()
	{
		$conn=$this->conectarBD();
	 	$cadena="";
		if($conn)
		{
			 $tsql_callSP = "{call spcatalogoEmpresaGet(?,?)}";
			    		$params = array( 
									array($_SESSION['claveUsuario'], SQLSRV_PARAM_IN),
									array($_SESSION['claveTipoUsuario'], SQLSRV_PARAM_IN)
								);
				$stmt = sqlsrv_query( $conn, $tsql_callSP,$params);

			    if( $stmt === false )
			    { 
			    	$cadena.="error";
			    }
			    else
			    {		    	
				do
				{
					 while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC))
					 {

						 $cadena.='<option value="'.$row['claveEmpresa'].'">'.$row['Empresa'].'</option>';

					 }
				} while(sqlsrv_next_result($stmt));
				}
		}
		sqlsrv_close( $conn );

		return $cadena;
	}

	function getListarEmpresaCli()
	{
		$conn=$this->conectarBD();
	 	$cadena="";
		if($conn)
		{
			 $tsql_callSP = "{call spcatalogoEmpresaCliGet(?)}";
			    		$params = array( 
			    			array($_SESSION['claveEmpresa'], SQLSRV_PARAM_IN)
								);
				$stmt = sqlsrv_query( $conn, $tsql_callSP,$params);

			    if( $stmt === false )
			    { 
			    	$cadena.="error";
			    }
			    else
			    {		    	
				do
				{
					 while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC))
					 {

						 $cadena.='<option value="'.$row['claveEmpresaCliente'].'">'.$row['Empresa'].'</option>';

					 }
				} while(sqlsrv_next_result($stmt));
				}
		}
		sqlsrv_close( $conn );

		return $cadena;
	}

	function getListarParadaByEmpresaT()
	{
		$conn=$this->conectarBD();
	 	$cadena="";
		if($conn)
		{
			 $tsql_callSP = "{call spcatalogoParadaGetByEmpresaT(?)}";
			    		$params = array( 
			    					array($_SESSION['claveEmpresa'], SQLSRV_PARAM_IN)
								);
				$stmt = sqlsrv_query( $conn, $tsql_callSP,$params);

			    if( $stmt === false )
			    { 
			    	$cadena.="error";
			    }
			    else
			    {		    	
				do
				{
					 while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC))
					 {

						 $cadena.='<option value="'.$row['claveParada'].'">'.$row['parada'].'</option>';

					 }
				} while(sqlsrv_next_result($stmt));
				}
		}
		sqlsrv_close( $conn );

		return $cadena;
	}

	function getListaParadaEmpresaT()
	{
		$conn=$this->conectarBD();
	 	$cadena="";
		if($conn)
		{
			 $tsql_callSP = "{call spcatalogoParadaGetByEmpresaT(?)}";
			    		$params = array( 
			    					array($_SESSION['claveEmpresa'], SQLSRV_PARAM_IN)
								);
				$stmt = sqlsrv_query( $conn, $tsql_callSP,$params);

			    if( $stmt === false )
			    { 
			    	$cadena.="error";
			    }
			    else
			    {		    	
				do
				{
					 while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC))
					 {

						//$cadena.='<option value="'.$row['claveParada'].'">'.$row['parada'].'</option>';

					 	$cadena.='<div class="card rounded border mb-2 selectParada" data-id="'.$row['claveParada'].'">
                                <div class="editIcons">
                                	<a class="clicBtn iconEditP" href="" onclick="editarParada(event,'.$row['claveParada'].')"><i class="mdi mdi-pencil"></i></a>';
                        if($row['rutaSN'] == 0)
                            $cadena.='<a class="clicBtn iconDeleteP" href="" onclick="eliminarParada(event,'.$row['claveParada'].')"><i class="mdi mdi-delete"></i></a>';
                        else
                        	$cadena.='<a class="clicBtn iconDeletePNo" href="#"><i class="mdi mdi-delete"></i></a>';
                        $cadena.='</div>
                          <div class="card-body d-flex align-items-center justify-content-between cardParada" style="border-right:solid 5px #';
                          if(!$row['color'])
                          	$cadena .= 'ff8888';
                          else
                          	$cadena .= $row['color'];
                        $cadena.=';">
                            <div class="media">
                              <div class="media-body contentTextCard">
                                <h6 class="mb-1">'.$row['parada'].'</h6>
                                <p class="mb-0 text-muted">'.$row['direccion'].'</p>
                              </div>                              
                            </div> 
                          </div>
                        </div>';
					 }
				} while(sqlsrv_next_result($stmt));
				}
		}
		sqlsrv_close( $conn );

		return $cadena;
	}

	function getListaParadaRutaEmpresaT()
	{
		$conn=$this->conectarBD();
	 	$cadena="";
		if($conn)
		{
			 $tsql_callSP = "{call spcatalogoParadaGetByEmpresaT(?)}";
			    		$params = array( 
			    					array($_SESSION['claveEmpresa'], SQLSRV_PARAM_IN)
								);
				$stmt = sqlsrv_query( $conn, $tsql_callSP,$params);

			    if( $stmt === false )
			    { 
			    	$cadena.="error";
			    }
			    else
			    {		    	
				do
				{
					 while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC))
					 {

						//$cadena.='<option value="'.$row['claveParada'].'">'.$row['parada'].'</option>';

					 	$cadena.='<div class="card rounded border mb-2 selectParada" data-id="'.$row['claveParada'].'" data-cve="'.$row['claveEmpresa'].'">
					 		<div class="editIcons colorB">
                                	<a class="click_area btn"><i class="mdi mdi-arrow-right-bold-circle"></i></a>
                                </div>
                          <div class="card-body d-flex align-items-center justify-content-between p-3 cardbodyG">
                            <div class="media">
                              <i class="icon-sm align-self-center mr-3 ordenParada"></i>
                              <div class="media-body">
                                <h5 class="mb-1 tit-parada">'.$row['parada'].'</h5>
                                <p class="mb-0 text-muted">'.$row['direccion'].'</p> 
                                                               
                              </div>                              
                            </div> 
                          </div>
                        </div>';
					 }
				} while(sqlsrv_next_result($stmt));
				}
		}
		sqlsrv_close( $conn );

		return $cadena;
	}

	function getListaVehiculosEmpresaT()
	{
		$conn=$this->conectarBD();
	 	$cadena="";
		if($conn)
		{
			 $tsql_callSP = "{call spcatalogoVehiculoGetbyEmpresa(?)}";
			    		$params = array( 
			    					array($_SESSION['claveEmpresa'], SQLSRV_PARAM_IN)
								);
				$stmt = sqlsrv_query( $conn, $tsql_callSP,$params);

			    if( $stmt === false )
			    { 
			    	$cadena.="error";
			    }
			    else
			    {		    	
				do
				{
					 while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC))
					 {

						//$cadena.='<option value="'.$row['claveParada'].'">'.$row['parada'].'</option>';

					 	$cadena.='<div class="card rounded border mb-2 selectParada cardVehiculos" data-id="'.$row['claveVehiculo'].'">
                          <div class="card-body p-3">
                            <div class="media">
                              <div class="media-body">
                                <h6 class="mb-1">Unidad: '.$row['noInterno'].'</h6>
                                 <p class="mb-0 text-muted">'.$row['marca'].' - '.$row['modelo'].'</p>
                                <p class="mb-0 text-muted">Pasajeros: '.$row['noPasajeros'].'</p>
                              </div>                              
                            </div> 
                          </div>
                        </div>';

					 	/*$cadena.='<div class="card rounded border mb-2 cardVehiculos" data-cve="'.$row['claveVehiculo'].'" style="background: #F2F3F4; cursor:pointer;">
                          <div class="card-body p-3">
                            <div class="media">
                              
                              <div class="media-body">
                                <h6 class="mb-1">'.$row['marca'].' - '.$row['modelo'].'</h6>                                
                                <p class="mb-0 text-muted">Pasajeros: '.$row['noPasajeros'].'</p>
                              </div>  
                              <i class="mdi mdi-check icon-sm text-primary align-self-center mr-3"></i>                            
                            </div> 
                          </div>
                        </div>';*/
					 }
				} while(sqlsrv_next_result($stmt));
				}
		}
		sqlsrv_close( $conn );

		return $cadena;
	}

	function getListaOperadoresEmpresaT()
	{
		$conn=$this->conectarBD();
	 	$cadena="";
		if($conn)
		{
			 $tsql_callSP = "{call spcatalogoOperadoresGetbyEmpresa(?)}";
			    		$params = array( 
			    					array($_SESSION['claveEmpresa'], SQLSRV_PARAM_IN)
								);
				$stmt = sqlsrv_query( $conn, $tsql_callSP,$params);

			    if( $stmt === false )
			    { 
			    	$cadena.="error";
			    }
			    else
			    {		    	
				do
				{
					 while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC))
					 {

						//$cadena.='<option value="'.$row['claveParada'].'">'.$row['parada'].'</option>';

						$cadena.='<div class="card rounded border mb-2 selectParada cardOperadores" data-id="'.$row['claveoperador'].'">
                          <div class="card-body p-3">
                            <div class="media">
                              <div class="media-body">
                                <h6 class="mb-1">'.$row['nombre'].'</h6>
                              </div>                              
                            </div> 
                          </div>
                        </div>';
					 }
				} while(sqlsrv_next_result($stmt));
				}
		}
		sqlsrv_close( $conn );

		return $cadena;
	}

	function getListaOperadoresEmpresaTProgramacion()
	{
		$conn=$this->conectarBD();
	 	$cadena="";
		if($conn)
		{
			 $tsql_callSP = "{call spcatalogoOperadoresGetbyEmpresa(?)}";
			    		$params = array( 
			    					array($_SESSION['claveEmpresa'], SQLSRV_PARAM_IN)
								);
				$stmt = sqlsrv_query( $conn, $tsql_callSP,$params);

			    if( $stmt === false )
			    { 
			    	$cadena.="error";
			    }
			    else
			    {		    	
				do
				{
					 while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC))
					 {

						$cadena.='<option value="'.$row['claveoperador'].'" data-empresa="'.$row['claveEmpresa'].'">'.$row['nombre'].'</option>';
					 }
				} while(sqlsrv_next_result($stmt));
				}
		}
		sqlsrv_close( $conn );

		return $cadena;
	}

	function getListarVehiculobyEmpresa()
	{
		$conn=$this->conectarBD();
	 	$cadena="";
		if($conn)
		{
			 $tsql_callSP = "{call spcatalogoVehiculoGetbyEmpresa(?)}";
		    		$params = array( 
		    					array($_SESSION['claveEmpresa'], SQLSRV_PARAM_IN)
							);
				$stmt = sqlsrv_query( $conn, $tsql_callSP,$params);

			    if( $stmt === false )
			    { 
			    	$cadena.="error";
			    }
			    else
			    {		    	
				do
				{
					 while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC))
					 {

						 $cadena.='<option value="'.$row['claveVehiculo'].'" data-empresa="'.$row['claveEmpresa'].'">'.$row['noInterno'].'</option>';

					 }
				} while(sqlsrv_next_result($stmt));
				}
		}
		sqlsrv_close( $conn );

		return $cadena;
	}

	function getListarZonasVehiculo()
	{
		$conn=$this->conectarBD();
	 	$cadena="";
		if($conn)
		{
			 $tsql_callSP = "{call spGetcatalogoZonas()}";
		    		$params = array( 
							);
				$stmt = sqlsrv_query( $conn, $tsql_callSP,$params);

			    if( $stmt === false )
			    { 
			    	$cadena.="error";
			    }
			    else
			    {		    	
				do
				{
					 while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC))
					 {

						 $cadena.='<option value="'.$row['claveZona'].'" >'.$row['zona'].'</option>';

					 }
				} while(sqlsrv_next_result($stmt));
				}
		}
		sqlsrv_close( $conn );

		return $cadena;
	}

	function getListarOperadorbyEmpresa()
	{
		$conn=$this->conectarBD();
	 	$cadena="";
		if($conn)
		{
			 $tsql_callSP = "{call spcatalogoOperadorGetbyEmpresa(?)}";
		    		$params = array( 
		    					array($_SESSION['claveEmpresa'], SQLSRV_PARAM_IN)
							);
				$stmt = sqlsrv_query( $conn, $tsql_callSP,$params);

			    if( $stmt === false )
			    { 
			    	$cadena.="error";
			    }
			    else
			    {		    	
				do
				{
					 while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC))
					 {

						 $cadena.='<option value="'.$row['claveOperador'].'">'.$row['nombre'].'</option>';

					 }
				} while(sqlsrv_next_result($stmt));
				}
		}
		sqlsrv_close( $conn );

		return $cadena;
	}
	function getListarRutabyEmpresa()
	{
		$conn=$this->conectarBD();
	 	$cadena="";
		if($conn)
		{
			 $tsql_callSP = "{call spcatalogoRutaGetbyEmpresa(?)}";
		    		$params = array( 
		    					array($_SESSION['claveEmpresa'], SQLSRV_PARAM_IN)
							);
				$stmt = sqlsrv_query( $conn, $tsql_callSP,$params);

			    if( $stmt === false )
			    { 
			    	$cadena.="error";
			    }
			    else
			    {		    	
				do
				{
					 while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC))
					 {

						 $cadena.='<option value="'.$row['claveRuta'].'">'.$row['ruta'].'</option>';

					 }
				} while(sqlsrv_next_result($stmt));
				}
		}
		sqlsrv_close( $conn );

		return $cadena;
	}
	function getListarRutaInfoGeneralProg() {
		$conn=$this->conectarBD();
	 	$cadena="";
		if($conn)
		{
			 $tsql_callSP = "{call spcatalogoRutaGetbyEmpresaT(?)}";
			    		$params = array(      
			    			array($_SESSION['claveEmpresa'], SQLSRV_PARAM_IN)
							       );
				$stmt = sqlsrv_query( $conn, $tsql_callSP,$params);

			    if( $stmt === false )
			    { 
			    	$cadena.="";
			    }
			    else
			    {		    	
				do
				{
					while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC))
					{
						$cadena.='<div class="card rounded border mb-2 selectParada" data-id="'.$row['claveRuta'].'" data-cve="'.$row['claveEmpresaTransporte'].'"  data-cveCli="'.$row['claveEmpresaCliente'].'" onclick="seleccionaRuta(this)">
					 		<div class="editIcons colorB">
                                </div>
                          <div class="card-body d-flex align-items-center justify-content-between p-3 cardbodyG">
                            <div class="media">
                              <i class="icon-sm align-self-center mr-3 ordenParada"></i>
                              <div class="media-body">
                                <h5 class="mb-1 tit-parada">'.$row['idRuta'].':'.$row['ruta'].'</h5>
                                <p class="mb-0 text-muted">'.$row['primeraparada'].'-'.$row['ultimaParada'].'</p> 
                                                               
                              </div>                              
                            </div> 
                          </div>
                        </div>';
					}
				} while(sqlsrv_next_result($stmt));
				}
		}
		sqlsrv_close( $conn );

		return $cadena;
	}
	function getListarRutaInfoGeneralDT(){
		$conn=$this->conectarBD();
	 	$cadena="";
		if($conn)
		{
			 $tsql_callSP = "{call spCatalogoRutaGetInfoGeneral(?)}";
			    		$params = array(      
			    			array($_SESSION['claveEmpresa'], SQLSRV_PARAM_IN)
							       );
				$stmt = sqlsrv_query( $conn, $tsql_callSP,$params);

			    if( $stmt === false )
			    { 
			    	$cadena.="";
			    }
			    else
			    {		    	
				do
				{
					 while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC))
					 {
					 	$cadena.= '<tr>' .
                            '<td class="box"><div class="txt"><p data-toggle="tooltip" title="'.$row['ruta'].'" data-custom-class="tooltip-primary" style="cursor:help;">'.$row['idRuta'].':'.$row['ruta'].'</p></div><div class="input"><input type="text"/></div></td>'.
                            '<td><div>'.$row['horaInicio'].'</td>'.
                            '<td><p data-toggle="tooltip" title="'.$row['primeraParada'].'" data-custom-class="tooltip-primary" style="cursor:help;" class="primary">';
                        if(strlen($row['primeraParada']) > 25)
                        	$cadena.=substr($row['primeraParada'], 0, 25);
                        else 
                        	$cadena.= $row['primeraParada'];
                        $cadena.= '</p> / <p data-toggle="tooltip" title="'.$row['ultimaParada'].'" data-custom-class="tooltip-primary" style="cursor:help;" class="primary">';
                        if(strlen($row['ultimaParada']) > 25)
                        	$cadena.=substr($row['ultimaParada'], 0, 25);
                        else
                        	$cadena.= $row['ultimaParada'];
                        $cadena.= '</p></td><td style="padding-left:0px;">';
                        if($row['claveOperador'] == '')
                        	$cadena.='<a class="nav-link btnOperador" id="btnOperador'.$row['claveOperador'].'" href="#" role="tab" aria-controls="profile-2" aria-selected="false" data-empresa="'.$row['claveEmpresa'].'" data-programa="'.$row['clavePrograma'].'" data-toggle="modal" data-target="#modalOperador">
                          <i class="mdi mdi-account text-danger ml-2"></i>
                          </a>';
                         else
                         	$cadena.='<a class="nav-link btnOperador" id="btnOperador'.$row['claveOperador'].'" href="#" role="tab" aria-controls="profile-2" aria-selected="false" data-empresa="'.$row['claveEmpresa'].'" data-programa="'.$row['clavePrograma'].'" data-toggle="modal" data-target="#modalOperador">
                          <i class="mdi mdi-account text-success ml-2"></i>
                          '.$row['operador'].'
                          </a>';
                            $cadena.='</td><td style="padding-left:0px;">';
                            if($row['claveVehiculo'] == '')
	                          $cadena.='<a class="nav-link btnVehiculo" id="btnVehiculo'.$row['claveVehiculo'].'" href="#" role="tab" aria-controls="contact-2" aria-selected="false"  data-toggle="modal" data-target="#modalVehiculo" data-empresa="'.$row['claveEmpresaV'].'" data-programa="'.$row['clavePrograma'].'" data-vehiculo="'.$row['claveVehiculo'].'">
	                          <i class="mdi mdi mdi-bus text-danger ml-2"></i>
	                          '.$row['Vehiculo'].'
	                          </a>';
	                        else
	                        	$cadena.='<a class="nav-link btnVehiculo" id="btnVehiculo'.$row['claveVehiculo'].'" href="#" role="tab" aria-controls="contact-2" aria-selected="false"  data-toggle="modal" data-target="#modalVehiculo" data-empresa="'.$row['claveEmpresaV'].'" data-programa="'.$row['clavePrograma'].'" data-vehiculo="'.$row['claveVehiculo'].'">
	                          <i class="mdi mdi mdi-bus text-success ml-2"></i>
	                          '.$row['Vehiculo'].'
	                          </a>';
                            $cadena.=/*'</td><td><label class="switch"><input type="checkbox" checked><span class="slider round"></span></label>'.
                            '</td>'.*/
                              '<td class="text-center">'.
                              '<a href="#" class="btnEliminarProgramacion" data-programa="'.$row['clavePrograma'].'"><i class="mdi mdi-delete text-danger"></i></a>' .
                        '</td></tr>';
                        
					 }
				} while(sqlsrv_next_result($stmt));
				}
		}
		sqlsrv_close( $conn );

		return $cadena;
	}



	function getListarRutaInfoGeneral(){
		$conn=$this->conectarBD();
	 	$cadena="";
		if($conn)
		{
			 $tsql_callSP = "{call spCatalogoRutaGetInfoGeneral(?)}";
			    		$params = array(      
			    			array($_SESSION['claveEmpresa'], SQLSRV_PARAM_IN)
							       );
				$stmt = sqlsrv_query( $conn, $tsql_callSP,$params);

			    if( $stmt === false )
			    { 
			    	$cadena.="error";
			    }
			    else
			    {		    	
				do
				{
					 while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC))
					 {
					 	$cadena.= '<div class="row top">
          		 					<div class="col-md-12 grid-margin">
          		 					<div class="card bg-white">
          		 					<div class="card-body d-flex align-items-center justify-content-between cardbody">
                      				<div class="card-head row cardhead">
                        			<h4>'.$row['idRuta'].' : '.$row['primeraParada'].' - '.$row['ultimaParada'].'</h4>
                        			<h6>'.$row['ruta'].'</h6>
                      				</div>
		          		 			</div>
		          		 			<div class="row">
                    <div class="col-4">
                      <ul class="nav nav-tabs nav-tabs-vertical" role="tablist">
                        <li class="nav-item">';
                        if($row['claveOperador'] == '')
                        	$cadena.='<a class="nav-link btnOperador" id="btnOperador'.$row['claveOperador'].'" href="#" role="tab" aria-controls="profile-2" aria-selected="false" data-empresa="'.$row['claveEmpresa'].'" data-programa="'.$row['clavePrograma'].'" data-toggle="modal" data-target="#modalOperador">
                          <i class="mdi mdi-account text-danger ml-2"></i>
                          </a>';
                        else	
                          $cadena.='<a class="nav-link btnOperador" id="btnOperador'.$row['claveOperador'].'" href="#" role="tab" aria-controls="profile-2" aria-selected="false" data-empresa="'.$row['claveEmpresa'].'" data-programa="'.$row['clavePrograma'].'" data-toggle="modal" data-target="#modalOperador">
                          <i class="mdi mdi-account text-success ml-2"></i>
                          '.$row['operador'].'
                          </a>';
                        $cadena.= '</li>
                        <li class="nav-item">';
                        if($row['claveVehiculo'] == '')
                          $cadena.='<a class="nav-link btnVehiculo" id="btnVehiculo'.$row['claveVehiculo'].'" href="#" role="tab" aria-controls="contact-2" aria-selected="false"  data-toggle="modal" data-target="#modalVehiculo" data-empresa="'.$row['claveEmpresaV'].'" data-programa="'.$row['clavePrograma'].'" data-vehiculo="'.$row['claveVehiculo'].'">
                          <i class="mdi mdi mdi-bus text-danger ml-2"></i>
                          '.$row['Vehiculo'].'
                          </a>';
                        else
                        	$cadena.='<a class="nav-link btnVehiculo" id="btnVehiculo'.$row['claveVehiculo'].'" href="#" role="tab" aria-controls="contact-2" aria-selected="false"  data-toggle="modal" data-target="#modalVehiculo" data-empresa="'.$row['claveEmpresaV'].'" data-programa="'.$row['clavePrograma'].'" data-vehiculo="'.$row['claveVehiculo'].'">
                          <i class="mdi mdi mdi-bus text-success ml-2"></i>
                          '.$row['Vehiculo'].'
                          </a>';
                        $cadena.='</li>
                      </ul>
                    </div>
                    <div class="col-8">
                    </div>
                  </div>
		          		 			</div>
		          		 			</div>
		          		 			</div>';

					 }
				} while(sqlsrv_next_result($stmt));
				}
		}
		sqlsrv_close( $conn );

		return $cadena;
	}

}
?>
