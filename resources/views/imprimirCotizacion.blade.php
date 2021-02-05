<!DOCTYPE html>
<html lang="es">

<head>
  <title>Cotización</title>
  <meta charset="UTF-8">
  <meta name="title" content="Cotizacion">
  <meta name="description" content="Descripción de la WEB">
  <link href="{{ asset('css/pdftemplate.css') }}" rel="stylesheet" type="text/css" />
</head>

<body>
  
  {{-- <label style="display: none;" for="" id="lblClausulas">{{$clausulas}}</label> --}}

  <htmlpageheader name="myHeader" style="display:none">
    <header class="clearfix">
      <div id="logo">
        <img id="imglogo" src="{{ asset('login-assets/images/logo.png') }}">
      </div>
      <div id="company">
        <h2 class="name">AC Construcción</h2>
        <div>Correo: acconstruccion-presupuestos@outlook.com</div>
        <div>Teléfono: 411-111-1362</div>
      </div>
    </header>
  </htmlpageheader>

  <main>
    <div id="details" class="clearfix">
      <div id="client">
        <div class="to">Detalle de cotización</div>
        <div class="date"><b>Proyecto: </b>{{ $data[0]->nombreProyecto }}</div>
        <div class="date"><b>Dirección: </b>Dirección Proyecto</div>
        <div class="date"><b>Cliente: </b>{{ $data[0]->nombreClienteProyecto }}</div>
        <div class="date"><b>Fecha: </b><?php echo date("d/m/Y") ?></div>
      </div>
    </div>
  </main>

  <?php $idCategoria = $data[0]->idCategoria; $total = 0; ?>
  <div id="subtitle">
    <div>{{ $data[0]->descripcionCategoria }}</div>
  </div>
  <table border="0" cellspacing="0" cellpadding="0">
    <thead>
      <tr class="title">
        <th style="text-align: left">Concepto</th>
        <th style="text-align: left">Unidad</th>
        <th style="text-align: left">Cantidad</th>
        <th style="text-align: left">Costo Unitario</th>
        <!-- <th style="text-align: left; display: none;">IVA</th> -->
        <th style="text-align: left">Total</th>
      </tr>
    </thead>
    <tbody>
      @foreach( $data as $clave => $conceptos)
        @if($idCategoria != $conceptos->idCategoria)
          <tr>
            <td colspan="4" style="text-align: right">Total</td>
            <td>${{ number_format($total,2) }}</td>
          </tr>
    </tbody>
  </table>
  <?php 
        $total = 0;
        $iva = $conceptos->iva == 1 ? $conceptos->costo * 0.16 * $conceptos->cantidad : 0;
        $total += $conceptos->cantidad*$conceptos->costo + $iva; 
      ?>
  <div id="subtitle">
    <div>{{ $conceptos->descripcionCategoria }}</div>
  </div>
  <table border="0" cellspacing="0" cellpadding="0">
    <thead>
      <tr class="title">
        <th style="text-align: left">Concepto</th>
        <th style="text-align: left">Unidad</th>
        <th style="text-align: left">Cantidad</th>
        <th style="text-align: left">Costo Unitario</th>
        <!-- <th style="text-align: left; display: none;">IVA</th> -->
        <th style="text-align: left">Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{ $conceptos->descripcion }}</td>
        <td>{{ $conceptos->unidad }}</td>
        <td>{{ $conceptos->cantidad }}</td>
        <td>${{ number_format(($conceptos->total / $conceptos->cantidad),2) }}</td>
        <!-- <td style="display: none;">${{ $iva }}</td> -->
        <td>${{ number_format($conceptos->total,2) }}</td>
      </tr>
      <?php $idCategoria = $conceptos->idCategoria; ?>
    @else
      <?php 
        $iva = $conceptos->iva == 1 ? $conceptos->costo * 0.16 * $conceptos->cantidad : 0;
        $total += $conceptos->cantidad*$conceptos->costo + $iva;
      ?>
      <tr>
        <td>{{ $conceptos->descripcion }}</td>
        <td>{{ $conceptos->unidad }}</td>
        <td>{{ $conceptos->cantidad }}</td>
        <td>${{ number_format(($conceptos->total / $conceptos->cantidad),2) }}</td>
        <!-- <td style="display: none;">${{ $iva }}</td> -->
        <td>${{ number_format($conceptos->total,2) }}</td>
      </tr>
      @endif
      @endforeach
      <tr>
        <td colspan="4" style="text-align: right">Total</td>
        <td>${{ number_format($total,2) }}</td>
      </tr>
    </tbody>
  </table>

  <div class="company">

    <h3 style="padding-bottom: -12px;">Total ${{ number_format($subtotal+$ivaTotal,2) }}</h3>
    <h3>({{ $textoTotal }})</h3>
  </div>
  
  
  <p class="texto" id="pclausulas">
    <?php 
      for ($i=0; $i < count($clausulas); $i++) { 
        echo $clausulas[$i];
        echo '<br>';
      }  
    ?>
    {{-- 1. NO INCLUYE COSTOS POR CUALQUIER TRÁMITE DERIVADO DE ESTE U OTROS TRABAJOS ANTE CUALQUIER DEPENDENCIA O INSTANCIA
    DE GOBIERNO. <br>
    2. EL TIEMPO DE ENTREGA SE DEFINIRÁ EN COMÚN ACUERDO CON EL CLIENTE. <br>
    3. ESTE PRESUPUESTO ESTA SUJETO A CAMBIO SIN PREVIO AVISO, DEBIDO AL INCREMENTO DEL COSTO DE LOS MATERIALES EN EL
    SECTOR DE MERCADO
    4. LAS MODIFICACIONES MOTIVADAS POR EL CLIENTE O POR TERCEROS CON AUTORIZACION, ASI COMO LAS DESVIACIONES PROPIAS DE
    LA OBRA QUE AFECTEN A LA INSTALACION, SERAN CON CARGO AL CLIENTE. <br>
    5. TODA NOTIFICACIÓN DEBERA SER CANALIZADA A TRAVES DEL SUPEVISOR Y SER ANOTADA EN LA BITACORA DE OBRA O POR MEDIO
    DE UN ESCRITO. <br>
    6. FORMA DE PAGO: A NEGOCIAR CON EL CLIENTE. <br>
    7. CUALQUIER TRABAJO NO CONTEMPLADO EN ESTE PRESUPUESTO SERA COBRADO APARTE EN ACUERDO DE LAS PARTES CON PREVIA
    AUTORIZACION PARA SU EJECUCION. <br>
    8. LOS PRECIOS AQUÍ MOSTRADOS YA INCLUYEN IVA. <br> --}}
  </p>

  <p class="final">
    A T E N T A M E N T E <br>
    ________________________________________ <br>
    ADAN CHRISTOPHER FLORES TOVAR <br>
    SUPERVISOR DE PROYECTOS <br>
    Tel. 411-111-13-62, E-mail: acconstruccion-presupuestos@outlook.com <br>
  </p>
 
 
  <htmlpagefooter name="footer" style="display:none">
    <div id="footer">
      <img id="imgFooter" style="text-align: left;"
        src="{{ asset('login-assets/images/logo.png') }}">
    </div>
    <div id="footer2" style="text-align:right;">
      Pag. {PAGENO} de {nb}
    </div>
  </htmlpagefooter>

  
  

</body>

</html>