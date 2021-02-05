<!DOCTYPE html>

<html>



<head>

    <meta charset="UTF-8">

    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

    <meta http-equiv="Content-Language" content="es" />

    <title>@yield('titulo') Constructora AC</title>

    <!-- Favicon-->

    <link rel="icon" href="{{ asset('f-morada.png') }}" type="image/x-icon">



    <!-- Google Fonts -->

    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet"
        type="text/css">

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">



    <!-- Bootstrap Core Css -->

    <link href="{{ asset('plugins/bootstrap/css/bootstrap.css') }}" rel="stylesheet">



    <!-- Waves Effect Css -->

    <link href="{{ asset('plugins/node-waves/waves.css') }}" rel="stylesheet" />



    <!-- Animation Css -->

    <link href="{{ asset('plugins/animate-css/animate.css') }}" rel="stylesheet" />



    <!-- Custom Css -->

    <link href="{{ asset('css/style.css') }}" rel="stylesheet">

    <link href="{{ asset('css/buttons.css') }}" rel="stylesheet">



    <!-- AdminBSB Themes. You can choose a theme from css/themes instead of get all themes -->

    <link href="{{ asset('css/themes/all-themes.css') }}" rel="stylesheet" />



    @section('custom-css')
        
    @show

</head>



<body class="theme-red">

    <style>
        .form-control {
    width: 100%;
    /* border: 1px; */
    box-shadow: 0px 0px 10px lightsteelblue;
    /* -webkit-border-radius: 0; */
    -moz-border-radius: 0;
    -ms-border-radius: 0;
    border-radius: 75px;
    text-align-last: center;
    text-align: center;
    }
    </style>

    <div class="page-loader-wrapper">

        <div class="loader">

            <div class="preloader">

                <div class="spinner-layer pl-blue">

                    <div class="circle-clipper left">

                        <div class="circle"></div>

                    </div>

                    <div class="circle-clipper right">

                        <div class="circle"></div>

                    </div>

                </div>

            </div>

            <p>Cargando...</p>

        </div>

    </div>



    @include('main.topbar')



    @include('main.sidebar')



    <section class="content">

        <div class="container-fluid">

            @section('content')

            @show

        </div>

    </section>



    <!-- Jquery Core Js -->

    <script src="{{ asset('/plugins/jquery/jquery.min.js') }}"></script>



    <!-- Bootstrap Core Js -->

    <script src="{{ asset('plugins/bootstrap/js/bootstrap.js') }}"></script>



    <!-- Select Plugin Js >

    <script src="{{ asset('plugins/bootstrap-select/js/bootstrap-select.js') }}"></script-->



    <!-- Slimscroll Plugin Js -->

    <script src="{{ asset('plugins/jquery-slimscroll/jquery.slimscroll.js') }}"></script>



    <!-- Waves Effect Plugin Js -->

    <script src="{{ asset('plugins/node-waves/waves.js') }}"></script>



    <!-- Custom Js -->

    <script src="{{ asset('js/admin.js') }}"></script>



    <script src="{{ asset('js/pages/ui/tooltips-popovers.js') }}"></script>



    @section('custom-js')

    @show

    <!-- Demo Js -->

    <script src="{{ asset('js/demo.js') }}"></script>



</body>



</html>