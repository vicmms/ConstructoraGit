<?php
  session_start();


  $arr=array();
  $arr[0]['cveChat']=$_SESSION['cveChat'];
  $arr[0]['idChat']=$_SESSION['idChat'];

  
  unset($_SESSION['cveChat']);
  unset($_SESSION['idChat']);
  

  echo json_encode($arr);
  

?>
    
