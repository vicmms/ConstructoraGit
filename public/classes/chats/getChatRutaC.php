
<?php
  session_start();
  include("../functions.php");
  $app= new myApp();
  $conn =$app->conectarBD();
  if($conn)
  {
    $tsql_callSP = "{call appOperadorCatalogoChatRutaGetMensajes(?,?,?,?)}";
    $params = array(  
            array($_POST['datos'][0]['claveEmpresaT'], SQLSRV_PARAM_IN),
            array($_SESSION['claveEmpresa'], SQLSRV_PARAM_IN),            
            array($_POST['datos'][0]['claveProgramacion'], SQLSRV_PARAM_IN),
            array($_POST['datos'][0]['cantidadChats'], SQLSRV_PARAM_IN)
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
            if (($row['isUsuario'] == 1) || ($row['isUsuario'] == 3) ) {
              $arr[$i]['ladoChat'] = 0;
            }else{
              $arr[$i]['ladoChat'] = 1;
            }

            $arr[$i]['fotoCabina'] = $_SESSION['imagen'];

            $i++;
         }
        } while(sqlsrv_next_result($stmt));
        }
        sqlsrv_close( $conn );

      echo json_encode($arr);
  }

?>
    
