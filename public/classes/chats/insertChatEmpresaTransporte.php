
<?php
  session_start();
  include("../functions.php");
  $app= new myApp();
  $conn =$app->conectarBD();
  if($conn)
  {
    $tsql_callSP = "{call appClienteCatalogoChatEmpresaTEmpresaCSPInsert(?,?,?,?,?)}";
          $params = array( 
                  array($_POST['datos'][0]['claveEmpresaT'], SQLSRV_PARAM_IN),
                  array($_SESSION['claveEmpresa'], SQLSRV_PARAM_IN),                   
                  array($_SESSION['claveUsuario'], SQLSRV_PARAM_IN),
                  array($_POST['datos'][0]['chat'], SQLSRV_PARAM_IN),
                   array(1, SQLSRV_PARAM_IN)
                 
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
            $arr[$i]=$row['claveNotificacion'];
            $i++;
         }
        } while(sqlsrv_next_result($stmt));
        }

        sendMessage($arr, $_POST['datos'][0]['chat']);

        sqlsrv_close( $conn );

      echo json_encode($arr);
  }


  function sendMessage($array, $chat){ 
    $dataArray=array();
    $dataArray['TipoNotificacion'] = '1';

    $titulo= 'Nuevo mensaje de chat';
    $titulo2 = array( "en" => $titulo);
    $chat2=$chat.'.';
    $content = array("en" => $chat2);

    $fields = array(
        'app_id' => 'd2510896-380f-4b18-86c5-9355fd7b383e',    
        'include_player_ids'=> $array,
        'large_icon'=>'http://51.79.20.149/appCV/images/smtppiLogo.png',
        'data'=> $dataArray,
        'android_channel_id'=>'4324ba35-dbf5-40e5-bcc9-559b0f50f69e',
        //'android_sound'=>'tono',
        //'ios_sound'=>'tono.wav',
        'headings' => $titulo2,
        'contents' => $content
    );
    
    $fields = json_encode($fields);
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8',
                                               'Authorization: Basic NmU5MDNmN2EtZDU1Ny00YjYyLTk5MjktMjI1OTJhMDk2ZjFj'));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_HEADER, FALSE);
    curl_setopt($ch, CURLOPT_POST, TRUE);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

    $response = curl_exec($ch);
    curl_close($ch);
    return $response;



  }


?>
    
