<section>

    <!-- Left Sidebar -->

    <aside id="leftsidebar" class="sidebar">


        <div class="menu">
            <ul class="list">
                <!-- <li class="header">Navegación principal</li> -->
                <li>
                    <a href="{{ route('proyectos') }}">
                        <i class="material-icons">business</i>
                        <span>Proyectos</span>
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0);" class="menu-toggle">
                        <i class="material-icons">account_balance</i>
                        <span>Contabilidad</span>
                    </a>
                    <ul class="ml-menu">
                        <li>
                            <a href="{{ route('ingresos') }}">
                                <i class="material-icons">attach_money</i>
                                <span>Ingresos</span>
                            </a>
                        </li>
                        <li>
                            <a href="{{ route('egresos') }}">
                                <i class="material-icons">money_off</i>
                                <span>Egresos</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="javascript:void(0);" class="menu-toggle">
                        <i class="material-icons">import_export</i>
                        <span>Control de gastos</span>
                    </a>
                    <ul class="ml-menu">
                        <li>
                            <a href="{{ route('directos') }}">
                                <i class="material-icons">add_circle</i>
                                <span>Directos</span>
                            </a>
                        </li>
                        <li>
                            <a href="{{ route('egresos') }}">
                                <i class="material-icons">add_circle_outline</i>
                                <span>Indirectos</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="{{ route('conceptos') }}">
                        <i class="material-icons">subtitles</i>
                        <span>Conceptos</span>
                    </a>
                </li>
                <!-- <li>
                    <a href="{{ route('cotizaciones') }}">
                        <i class="material-icons">business</i>
                        <span>Cotizaciones</span>
                    </a>
                </li> -->

                <li>
                    <a href="javascript:void(0);" class="menu-toggle">
                        <i class="material-icons">view_list</i>
                        <span>Catalogos</span>
                    </a>
                    <ul class="ml-menu">
                        <li>
                            <a href="{{ route('materiales') }}">
                                <i class="material-icons">store_mall_directory</i>
                                <span>Materiales</span>
                            </a>
                        </li>
                        <li>
                            <a href="{{ route('manoObra') }}">
                                <i class="material-icons">engineering</i>
                                <span>Mano de Obra</span>
                            </a>
                        </li>
                        <li>
                            <a href="{{ route('herramientas') }}">
                                <i class="material-icons">construction</i>
                                <span>Herramientas</span>
                            </a>
                        </li>
                        <li>
                            <a href="{{ route('proveedores') }}">
                                <i class="material-icons">group</i>
                                <span>Proveedores</span>
                            </a>
                        </li>
                        <li>
                            <a href="{{ route('unidadesMedida') }}">
                                <i class="material-icons">design_services</i>
                                <span>Unidades de Medida</span>
                            </a>
                        </li>
                        <li>
                            <a href="{{ route('marcas') }}">
                                <i class="material-icons">wb_iridescent</i>
                                <span>Marcas</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- #Menu -->
        <!-- Footer -->
        <div class="legal">
            <div class="copyright">
                &copy; 2020 <a href="javascript:void(0);">Arquitectos constructores</a>.
            </div>
            <div class="version">
                <b>Version: </b> 1.1.0
            </div>
        </div>
        <!-- #Footer -->
    </aside>
    <!-- #END# Left Sidebar -->
    <!-- Right Sidebar -->
    <aside id="rightsidebar" class="right-sidebar">
        <ul class="nav nav-tabs tab-nav-right" role="tablist">
            <li role="presentation" class="active"><a href="#skins" data-toggle="tab">SKINS</a></li>
            <li role="presentation"><a href="#settings" data-toggle="tab">SETTINGS</a></li>
        </ul>
        <div class="tab-content">

            <div role="tabpanel" class="tab-pane fade in active in active" id="skins">

                <ul class="demo-choose-skin">

                    <li data-theme="red" class="active">

                        <div class="red"></div>

                        <span>Red</span>

                    </li>

                    <li data-theme="pink">

                        <div class="pink"></div>

                        <span>Pink</span>

                    </li>

                    <li data-theme="purple">

                        <div class="purple"></div>

                        <span>Purple</span>

                    </li>

                    <li data-theme="deep-purple">

                        <div class="deep-purple"></div>

                        <span>Deep Purple</span>

                    </li>

                    <li data-theme="indigo">

                        <div class="indigo"></div>

                        <span>Indigo</span>

                    </li>

                    <li data-theme="blue">

                        <div class="blue"></div>

                        <span>Blue</span>

                    </li>

                    <li data-theme="light-blue">

                        <div class="light-blue"></div>

                        <span>Light Blue</span>

                    </li>

                    <li data-theme="cyan">

                        <div class="cyan"></div>

                        <span>Cyan</span>

                    </li>

                    <li data-theme="teal">

                        <div class="teal"></div>

                        <span>Teal</span>

                    </li>

                    <li data-theme="green">

                        <div class="green"></div>

                        <span>Green</span>

                    </li>

                    <li data-theme="light-green">

                        <div class="light-green"></div>

                        <span>Light Green</span>

                    </li>

                    <li data-theme="lime">

                        <div class="lime"></div>

                        <span>Lime</span>

                    </li>

                    <li data-theme="yellow">

                        <div class="yellow"></div>

                        <span>Yellow</span>

                    </li>

                    <li data-theme="amber">

                        <div class="amber"></div>

                        <span>Amber</span>

                    </li>

                    <li data-theme="orange">

                        <div class="orange"></div>

                        <span>Orange</span>

                    </li>

                    <li data-theme="deep-orange">

                        <div class="deep-orange"></div>

                        <span>Deep Orange</span>

                    </li>

                    <li data-theme="brown">

                        <div class="brown"></div>

                        <span>Brown</span>

                    </li>

                    <li data-theme="grey">

                        <div class="grey"></div>

                        <span>Grey</span>

                    </li>

                    <li data-theme="blue-grey">

                        <div class="blue-grey"></div>

                        <span>Blue Grey</span>

                    </li>

                    <li data-theme="black">

                        <div class="black"></div>

                        <span>Black</span>

                    </li>

                </ul>

            </div>

            <div role="tabpanel" class="tab-pane fade" id="settings">

                <div class="demo-settings">

                    <p>GENERAL SETTINGS</p>

                    <ul class="setting-list">

                        <li>

                            <span>Report Panel Usage</span>

                            <div class="switch">

                                <label><input type="checkbox" checked><span class="lever"></span></label>

                            </div>

                        </li>

                        <li>

                            <span>Email Redirect</span>

                            <div class="switch">

                                <label><input type="checkbox"><span class="lever"></span></label>

                            </div>

                        </li>

                    </ul>

                    <p>SYSTEM SETTINGS</p>

                    <ul class="setting-list">

                        <li>

                            <span>Notifications</span>

                            <div class="switch">

                                <label><input type="checkbox" checked><span class="lever"></span></label>

                            </div>

                        </li>

                        <li>

                            <span>Auto Updates</span>

                            <div class="switch">

                                <label><input type="checkbox" checked><span class="lever"></span></label>

                            </div>

                        </li>

                    </ul>

                    <p>ACCOUNT SETTINGS</p>

                    <ul class="setting-list">

                        <li>

                            <span>Offline</span>

                            <div class="switch">

                                <label><input type="checkbox"><span class="lever"></span></label>

                            </div>

                        </li>

                        <li>

                            <span>Location Permission</span>

                            <div class="switch">

                                <label><input type="checkbox" checked><span class="lever"></span></label>

                            </div>

                        </li>

                    </ul>

                </div>

            </div>

        </div>

    </aside>

    <!-- #END# Right Sidebar -->

</section>