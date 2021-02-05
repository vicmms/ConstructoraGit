<?php
  session_start();
  include("../functions.php");
  $app= new myApp();
  $conn =$app->conectarBD();
  if($conn)
  {

    if ($_SESSION['claveTipoUsuario'] == 4) {
      $tsql_callSP = "{call visorCatalogoChatRutaGet3MensajesCliente (?,?)}";
      $params = array( 
          array($_SESSION['claveEmpresa'], SQLSRV_PARAM_IN),
          array(3, SQLSRV_PARAM_IN)
      );
    }elseif ($_SESSION['claveTipoUsuario'] == 2) {
      $tsql_callSP = "{call visorCatalogoChatRutaGet3Mensajes (?,?)}";
      $params = array( 
          array($_SESSION['claveEmpresa'], SQLSRV_PARAM_IN),
          array($_SESSION['claveUsuario'], SQLSRV_PARAM_IN)
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
      else if( $stmt === false ) 
      { 
        die( print_r( sqlsrv_errors(), true));
      }
        sqlsrv_close( $conn );

      echo json_encode($stmt);
  }

?>
    
