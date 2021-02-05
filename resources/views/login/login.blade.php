<!DOCTYPE html>
<html>
<head>
<title>Acceso - AC</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!--===============================================================================================-->  
    <link rel="icon" type="image/png" href="{{asset('images/logos/exceed.png')}}"/>
<!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="{{asset('login-assets/vendor/bootstrap/css/bootstrap.min.css')}}">
<!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="{{asset('login-assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css')}}">
<!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="{{asset('login-assets/fonts/Linearicons-Free-v1.0.0/icon-font.min.css')}}">
<!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="{{asset('login-assets/vendor/animate/animate.css')}}">
<!--===============================================================================================-->  
    <link rel="stylesheet" type="text/css" href="{{asset('login-assets/vendor/css-hamburgers/hamburgers.min.css')}}">
<!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="{{asset('login-assets/vendor/select2/select2.min.css')}}">
<!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="{{asset('login-assets/css/util.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('login-assets/css/main.css')}}">

    <style type="text/css">
    	.container-login100
    	{
    		background-image: url("{{asset('login-assets/images/fondo3.jpg')}}");
    	}
    </style>
<!--===============================================================================================-->
</head>
<body>
    
    <div class="limiter">
        <div class="container-login100">
            <div class="wrap-login100 p-t-40 p-b-30">
                <div class="text-center">
                    <img src="{{asset('login-assets/images/logo.png')}}" style="height:220px;">
                </div>
                <form class="" role="form" method="POST" action="./login">
                	@csrf
                	
                    <span class="login100-form-title p-t-20 p-b-45">
                        
                    </span>

                    <div class="wrap-input100 validate-input m-b-10" data-validate = "Se requiere el usuario">
                        <input class="input100" type="text" name="username" placeholder="Usuario" required="">
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                            <i class="fa fa-user"></i>
                        </span>
                    </div>

                    <div class="wrap-input100 validate-input m-b-10" data-validate = "Se requiere contraseña">
                        <input class="input100" type="password" name="password" placeholder="Contraseña" required="">
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                            <i class="fa fa-lock"></i>
                        </span>
                    </div>

                    <div class="container-login100-form-btn p-t-10">
                        <input type="submit" class="login100-form-btn" value="Entrar">
                    </div>
                </form>
            </div>
        </div>
    </div>
    
    

    
<!--===============================================================================================-->  
    <script src="{{asset('login-assets/vendor/jquery/jquery-3.2.1.min.js')}}"></script>
<!--===============================================================================================-->
    <script src="{{asset('login-assets/vendor/bootstrap/js/popper.js')}}"></script>
    <script src="{{asset('login-assets/vendor/bootstrap/js/bootstrap.min.js')}}"></script>
<!--===============================================================================================-->
    <script src="{{asset('login-assets/vendor/select2/select2.min.js')}}"></script>
<!--===============================================================================================-->
    <script src="{{asset('login-assets/js/main.js')}}"></script>

</body>
</html>