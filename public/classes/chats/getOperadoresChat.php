
<?php
  session_start();
  include("../functions.php");
  $app= new myApp();
  $conn =$app->conectarBD();
  if($conn)
  {
    $tsql_callSP = "{call spcatalogoOperadorGetByEmpresaT (?)}";
      $params = array( 
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

      echo json_encode($arr);
  }

?>
    
