
<?php
  session_start();
  include("../functions.php");
  $app= new myApp();
  $conn =$app->conectarBD();
  if($conn)
  {
    $tsql_callSP = "{call appLiderCatalogoChatEmpresaOperadorGetMensajes(?,?,?)}";
          $params = array(  
                  array($_SESSION['claveEmpresa'], SQLSRV_PARAM_IN),
                  array($_POST['datos'][0]['claveOpe'], SQLSRV_PARAM_IN),
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

            if (($row['isOperador'] == 1) || ($row['isOperador'] == 0 && $row['nombreEnvia'] != $_SESSION['nombre'])) {
              $arr[$i]['ladoChat'] = 0;
            }else{
              $arr[$i]['ladoChat'] = 1;
            }

            //Agregamos al arreglo la imagen de la session para el caso de cabina
            $arr[$i]['fotoCabina'] = $_SESSION['imagen'];             

            $i++;
         }
        } while(sqlsrv_next_result($stmt));
        }
        sqlsrv_close( $conn );

      echo json_encode($arr);
  }

?>
    
