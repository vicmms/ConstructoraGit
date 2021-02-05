
<?php
  session_start();
  include("../functions.php");
  $app= new myApp();
  $conn =$app->conectarBD();
  if($conn)
  {
     $tsql_callSP = "{call appLiderCatalogoChatEmpresaTEmpresaCGetMensajes(?,?,?)}";
          $params = array(  
                  array($_SESSION['claveEmpresa'], SQLSRV_PARAM_IN),
                  array($_POST['datos'][0]['claveEmpresaT'], SQLSRV_PARAM_IN),                  
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

            if (($row['isEmpresaT'] == 1) || ($row['isEmpresaT'] == 0 && $row['nombre'] != $_SESSION['nombre'])) {
              $arr[$i]['ladoChat'] = 0;
            }else{
              $arr[$i]['ladoChat'] = 1;
            }            

            $i++;
         }
        } while(sqlsrv_next_result($stmt));
        }
        sqlsrv_close( $conn );

      echo json_encode($arr);
  }

?>
    
