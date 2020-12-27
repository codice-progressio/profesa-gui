import { NgModule } from '@angular/core'
import { DashboardComponent } from './dashboard/dashboard.component'
import { SharedModule } from '../shared/shared.module'

import { AccountsSettingsComponent } from './accounts-settings/accounts-settings.component'
import { ProfileComponent } from './profile/profile.component'

// Sistema
import { SeguimientoDeFoliosComponent } from './seguimiento-de-folios/seguimiento-de-folios.component'
import { MaterialesComponent } from './departamentos/materiales/materiales.component'
import { TransformacionComponent } from './departamentos/transformacion/transformacion.component'
import { PulidoComponent } from './departamentos/pulido/pulido.component'
import { SeleccionComponent } from './departamentos/seleccion/seleccion.component'
import { PastillaComponent } from './departamentos/pastilla/pastilla.component'
import { EmpaqueComponent } from './departamentos/empaque/empaque.component'
import { GestionDepartamentoComponent } from './departamentos/gestion-departamento/gestion-departamento.component'
import { IndicadorDeChecadasComponent } from './reportes/indicador-de-checadas/indicador-de-checadas.component'
import { ClientesComponent } from './clientes/clientes.component'
import { ControlDeProduccionComponent } from './departamentos/control-de-produccion/control-de-produccion.component'
import { ProductoTerminadoComponent } from './departamentos/producto-terminado/producto-terminado.component'
import { MetalizadoComponent } from './departamentos/metalizado/metalizado.component'
import { BuratoComponent } from './departamentos/burato/burato.component'
import { BarnizadoComponent } from './departamentos/barnizado/barnizado.component'
import { LaserComponent } from './departamentos/laser/laser.component'
import { AlmacenDeBotonComponent } from './departamentos/almacen-de-boton/almacen-de-boton.component'
import { FamiliaDeProcesosComponent } from './gestionDeProcesos/familia-de-procesos/familia-de-procesos.component'
import { ProcesosComponent } from './gestionDeProcesos/procesos/procesos.component'
import { MaquinasComponent } from './gestionDeProcesos/maquinas/maquinas.component'
import { FamiliaDeProcesosDetalleComponent } from './gestionDeProcesos/familia-de-procesos/familia-de-procesos-detalle.component'
import { ProcesosDetalleComponent } from './gestionDeProcesos/procesos/procesos-detalle.component'
import { MaquinasDetalleComponent } from './gestionDeProcesos/maquinas/maquinas-detalle.component'
import { MaquinasCrearModificarComponent } from './gestionDeProcesos/maquinas/maquinas-crear-modificar.component'
import { ModalComponent } from './utilidadesPages/utilidades-tipo-crud-para-GUI/plantillas/modal.component'
import { CrearModificarComponent } from './utilidadesPages/utilidades-tipo-crud-para-GUI/plantillas/crear-modificar.component'
import { GeneralComponent } from './utilidadesPages/utilidades-tipo-crud-para-GUI/plantillas/general.component'
import { ProcesosCrearModificarComponent } from './gestionDeProcesos/procesos/procesos-crear-modificar.component'
import { ModelosCrearModificarComponent } from './gestionDeProcesos/modelos/modelos-crear-modificar.component'
import { ModelosDetalleComponent } from './gestionDeProcesos/modelos/modelos-detalle.component'
import { TamanosCrearModificarComponent } from './gestionDeProcesos/tamanos/tamanos-crear-modificar.component'
import { TamanosDetalleComponent } from './gestionDeProcesos/tamanos/tamanos-detalle.component'
import { TamanosComponent } from './gestionDeProcesos/tamanos/tamanos.component'
import { ColoresCrearModificarComponent } from './gestionDeProcesos/colores/colores-crear-modificar.component'
import { ColoresDetalleComponent } from './gestionDeProcesos/colores/colores-detalle.component'
import { ColoresComponent } from './gestionDeProcesos/colores/colores.component'
import { TerminadosDetalleComponent } from './gestionDeProcesos/terminados/terminados-detalle.component'
import { TerminadosComponent } from './gestionDeProcesos/terminados/terminados.component'
import { TerminadosCrearModificarComponent } from './gestionDeProcesos/terminados/terminados-crear-modificar.component'
import { ModelosCompletosCrearModificarComponent } from './gestionDeProcesos/modelos-completos/modelos-completos-crear-modificar.component'
import { ModelosCompletosDetalleComponent } from './gestionDeProcesos/modelos-completos/modelos-completos-detalle.component'
import { ModelosCompletosComponent } from './gestionDeProcesos/modelos-completos/modelos-completos.component'
import { ModelosComponent } from './gestionDeProcesos/modelos/modelos.component'
import { FamiliaDeProcesosCrearModificarComponent } from './gestionDeProcesos/familiaDeProcesos/familia-de-procesos-crear-modificar.component'
import { LaserReporteComponent } from './reportes/produccion/laser-reporte/laser-reporte.component'
import { TransformacionReporteComponent } from './reportes/produccion/transformacion-reporte/transformacion-reporte.component'
import { QuimicaReporteComponent } from './reportes/produccion/quimica-reporte/quimica-reporte.component'
import { TransformacionReporteSimplificadoComponent } from './reportes/produccion/transformacion-reporte/transformacion-reporte-simplificado.component'
import { SortableColumnComponent } from '../directives/sortableComponent/sortable-column/sortable-column.component'
import { SortableTableDirective } from '../directives/sortableComponent/sortable-table.directive'
import { PruebaParaDetallesComponent } from './prueba-para-detalles/prueba-para-detalles.component'
import { FoliosCrearModificarComponent } from './gestionDeFolios/folios/folios-crear-modificar.component'
import { FoliosDetalleComponent } from './gestionDeFolios/folios/folios-detalle.component'
import { FoliosComponent } from './gestionDeFolios/folios/folios.component'
import { PedidosCrearModificarComponent } from './gestionDeFolios/pedidos/pedidos-crear-modificar.component'
import { OrdenesCrearModificarComponent } from './gestionDeFolios/ordenes/ordenes-crear-modificar.component'
import { OrdenesComponent } from './gestionDeFolios/ordenes/ordenes.component'
import { RevisionDeFoliosComponent } from './gestionDeFolios/revision/revision-de-folios/revision-de-folios.component'
import { FoliosCrearModificarAbstractoComponent } from './gestionDeFolios/folios/abstractos/folios-crear-modificar-abstracto.component'
import { RevisionDeOrdenesAbstractoComponent } from './gestionDeFolios/revision/revision-de-ordenes-abstracto/revision-de-ordenes-abstracto.component'
import { FoliosSeguimientoComponent } from './gestionDeFolios/seguimiento/folios-seguimiento/folios-seguimiento.component'
import { ClientesCrearModificarComponent } from './clientes/clientes-crear-modificar.component'
import { ClientesDetalleComponent } from './clientes/clientes-detalle.component'
import { AlmacenDeProductoTerminadoCrearModificarComponent } from './almacenes/almacenDeProductoTerminado/almacen-de-producto-terminado-crear-modificar.component'
import { AlmacenDeProductoTerminadoDetalleComponent } from './almacenes/almacenDeProductoTerminado/almacen-de-producto-terminado-detalle.component'
import { AlmacenDeProductoTerminadoComponent } from './almacenes/almacenDeProductoTerminado/almacen-de-producto-terminado.component'
import { AlmacenDeProductoTerminadoCrearModificarEntradaComponent } from './almacenes/almacenDeProductoTerminado/es/almacen-de-producto-terminado-crear-modificar-entrada/almacen-de-producto-terminado-crear-modificar-entrada.component'
import { AlmacenDeProductoTerminadoCrearModificarSalidaComponent } from './almacenes/almacenDeProductoTerminado/es/almacen-de-producto-terminado-crear-modificar-salida/almacen-de-producto-terminado-crear-modificar-salida.component'
import { AlmacenDeProductoTerminadoCrearModificarDevolucionComponent } from './almacenes/almacenDeProductoTerminado/es/almacen-de-producto-terminado-crear-modificar-devolucion/almacen-de-producto-terminado-crear-modificar-devolucion.component'
import { LoteDetalleComponent } from './gestionDeProcesos/modelos-completos/lotes/lote-detalle/lote-detalle.component'
import { StockAlmacenProductoTerminadoComponent } from './almacenes/almacenDeProductoTerminado/stock/stock-almacen-producto-terminado.component'
import { ArticuloCrearModificarComponent } from './almacenes/articulo/articulo-crear-modificar.component'
import { ArticuloDetalleComponent } from './almacenes/articulo/articulo-detalle.component'
import { ArticuloComponent } from './almacenes/articulo/articulo.component'
import { ProveedorCrearModificarComponent } from './proveedor/proveedor-crear-modificar.component'
import { ProveedorDetalleComponent } from './proveedor/proveedor-detalle.component'
import { ProveedorComponent } from './proveedor/proveedor.component'
import { DivisaCrearModificarComponent } from './divisa/divisa-crear-modificar.component'
import { DivisaDetalleComponent } from './divisa/divisa-detalle.component'
import { DivisaComponent } from './divisa/divisa.component'
import { TenidoComponent } from './departamentos/tenido/tenido/tenido.component'
import { RequisicionCrearModificarComponent } from './almacenes/requisicion/requisicion-crear-modificar.component'
import { RequisicionDetalleComponent } from './almacenes/requisicion/requisicion-detalle.component'
import { RequisicionComponent } from './almacenes/requisicion/requisicion.component'
import { RequisicionEstatusGeneralComponent } from './almacenes/requisicion/estatus/requisicion-estatus-general/requisicion-estatus-general.component'
import { RequisicionEstatusEsRequisicionComponent } from './almacenes/requisicion/estatus/requisicion-estatus-es-requisicion/requisicion-estatus-es-requisicion.component'
import { RequisicionEstatusEsOrdenDeCompraComponent } from './almacenes/requisicion/estatus/requisicion-estatus-es-orden-de-compra/requisicion-estatus-es-orden-de-compra.component'
import { RequisicionEstatusEsEntregaParcialComponent } from './almacenes/requisicion/estatus/requisicion-estatus-es-entrega-parcial/requisicion-estatus-es-entrega-parcial.component'
import { RequisicionEstatusEsTerminadaComponent } from './almacenes/requisicion/estatus/requisicion-estatus-es-terminada/requisicion-estatus-es-terminada.component'
import { RequisicionEstatusEsCanceladaComponent } from './almacenes/requisicion/estatus/requisicion-estatus-es-cancelada/requisicion-estatus-es-cancelada.component'
import { RecibirParcialidadComponent } from './almacenes/requisicion/estatus/requisicion-estatus-es-entrega-parcial/recibirParcialidad/recibir-parcialidad.component'
import { RecibirTerminacionComponent } from './almacenes/requisicion/estatus/requisicion-estatus-es-terminada/recibir-terminacion/recibir-terminacion.component'
import { RecibirCancelacionComponent } from './almacenes/requisicion/estatus/requisicion-estatus-es-cancelada/recibir-cancelacion/recibir-cancelacion.component'
import { RequisicionFiltrosComponent } from './almacenes/requisicion/requisicion-filtros/requisicion-filtros.component'
import { EmpleadoCrearModificarComponent } from './recursosHumanos/empleado/empleado-crear-modificar.component'
import { EmpleadoDetalleComponent } from './recursosHumanos/empleado/empleado-detalle.component'
import { EmpleadoComponent } from './recursosHumanos/empleado/empleado.component'
import { CursosCrearModificarComponent } from './recursosHumanos/cursos/cursos-crear-modificar.component'
import { CursosDetalleComponent } from './recursosHumanos/cursos/cursos-detalle.component'
import { CursosComponent } from './recursosHumanos/cursos/cursos.component'
import { AreasCrearModificarComponent } from './recursosHumanos/areas/areas-crear-modificar.component'
import { AreasDetalleComponent } from './recursosHumanos/areas/areas-detalle.component'
import { AreasComponent } from './recursosHumanos/areas/areas.component'
import { PuestosCrearModificarComponent } from './recursosHumanos/puestos/puestos-crear-modificar.component'
import { PuestosDetalleComponent } from './recursosHumanos/puestos/puestos-detalle.component'
import { PuestosComponent } from './recursosHumanos/puestos/puestos.component'
import { DepartamentoCrearModificarComponent } from './departamento/departamento-crear-modificar.component'
import { DepartamentoDetalleComponent } from './departamento/departamento-detalle.component'
import { DepartamentoComponent } from './departamento/departamento.component'
import { EmpleadoFiltrosComponent } from './recursosHumanos/empleado/empleado-filtros/empleado-filtros.component'
import { EmpleadoEventoCursoComponent } from './recursosHumanos/empleado/empleado-eventos/empleado-evento-curso.component'
import { EmpleadoEventoVacacionesComponent } from './recursosHumanos/empleado/empleado-eventos/empleado-evento-vacaciones.component'
import { EmpleadoEventoCambioDeSueldoComponent } from './recursosHumanos/empleado/empleado-eventos/empleado-evento-cambio-de-sueldo.component'
import { EmpleadoEventoPuestoComponent } from './recursosHumanos/empleado/empleado-eventos/empleado-evento-puesto.component'
import { EmpleadoEventoFelicitacionesPorEscritoComponent } from './recursosHumanos/empleado/empleado-eventos/empleado-evento-felicitaciones-por-escrito.component'
import { EmpleadoEventoAmonestacionesPorEscritoComponent } from './recursosHumanos/empleado/empleado-eventos/empleado-evento-amonestaciones-por-escrito.component'
import { EmpleadoEventoCastigoComponent } from './recursosHumanos/empleado/empleado-eventos/empleado-evento-castigo.component'
import { EmpleadoEventoPermisoComponent } from './recursosHumanos/empleado/empleado-eventos/empleado-evento-permiso.component'
import { EmpleadoEventoBonoComponent } from './recursosHumanos/empleado/empleado-eventos/empleado-evento-bono.component'
import { EmpleadoEventoEstatusLaboralComponent } from './recursosHumanos/empleado/empleado-eventos/empleado-evento-estatus-laboral.component'
import { EmpleadoEventoManejadorComponent } from './recursosHumanos/empleado/empleado-eventos/empleado-evento-manejador.component'
import { EmpleadoEventoPlantillaComponent } from './recursosHumanos/empleado/empleado-eventos/empleado-evento-plantilla/empleado-evento-plantilla.component'
import { EmpleadoEventoAgregarCursoComponent } from './recursosHumanos/empleado/empleado-eventos-crear/empleado-evento-agregar-curso.component'
import { EmpleadoEventosCrearModalComponent } from './recursosHumanos/empleado/empleado-eventos-crear/empleado-eventos-crear-modal/empleado-eventos-crear-modal.component'
import { EmpleadoAgregarVacacionesComponent } from './recursosHumanos/empleado/empleado-eventos-crear/empleado-agregar-vacaciones.component'
import { EmpleadoAgregarCambiosDeSueldoComponent } from './recursosHumanos/empleado/empleado-eventos-crear/empleado-agregar-cambios-de-sueldo.component'
import { EmpleadoAgregarPuestoComponent } from './recursosHumanos/empleado/empleado-eventos-crear/empleado-agregar-puesto.component'
import { EmpleadoAgregarFelicitacionPorEscritoComponent } from './recursosHumanos/empleado/empleado-eventos-crear/empleado-agregar-felicitacion-por-escrito.component'
import { EmpleadoAgregarAmonestacionPorEscritoComponent } from './recursosHumanos/empleado/empleado-eventos-crear/empleado-agregar-amonestacion-por-escrito.component'
import { EmpleadoAgregarCastigoComponent } from './recursosHumanos/empleado/empleado-eventos-crear/empleado-agregar-castigo.component'
import { EmpleadoAgregarPermisoComponent } from './recursosHumanos/empleado/empleado-eventos-crear/empleado-agregar-permiso.component'
import { EmpleadoAgregarBonoComponent } from './recursosHumanos/empleado/empleado-eventos-crear/empleado-agregar-bono.component'
import { EmpleadoAgregarEstatusLaboralComponent } from './recursosHumanos/empleado/empleado-eventos-crear/empleado-agregar-estatus-laboral.component'
import { AlmacenESComponent } from './alamacenes/almacen-es/almacen-es.component'
import { ReporteDeFaltantesProductoTerminadoComponent } from './reportes/reporte-de-faltantes-producto-terminado/reporte-de-faltantes-producto-terminado.component'
import { ReporteDeFaltantesAlmacenDeProduccionComponent } from './reportes/reporte-de-faltantes-almacen-de-produccion/reporte-de-faltantes-almacen-de-produccion.component'
import { ReportePersonalizadoAlmacenProduccionCrearModificarComponent } from './almacenes/reportePersonalizadoAlmacenProduccion/reporte-personalizado-almacen-produccion-crear-modificar.component'
import { ReportePersonalizadoAlmacenProduccionDetalleComponent } from './almacenes/reportePersonalizadoAlmacenProduccion/reporte-personalizado-almacen-produccion-detalle.component'
import { RPersonalizadoAlmacenProduccionComponent } from './reportes/r-personalizado-almacen-produccion/r-personalizado-almacen-produccion.component'
import { ReportePersonalizadoAlmacenProduccionComponent } from './almacenes/reportePersonalizadoAlmacenProduccion/reporte-personalizado-almacen-produccion.component'
import { ProgramacionTransformacionComponent } from './programacion/programacion-transformacion/programacion-transformacion.component'
import { CommonModule } from '@angular/common'
import { ProgramacionTransformacionReporteComponent } from './programacion/programacion-transformacion/programacion-transformacion-reporte/programacion-transformacion-reporte.component'
import { UsuarioCrearComponent } from './usuarios/usuario-crear/usuario-crear.component'
import { UsuarioDetalleComponent } from './usuarios/usuario-detalle/usuario-detalle.component'
import { UsuarioLeerComponent } from './usuarios/usuario-leer/usuario-leer.component'
import { ProcesosInicialesYFinalesComponent } from './parametros/procesos-iniciales-yfinales/procesos-iniciales-yfinales.component'
import { ProcesosEspecialesComponent } from './parametros/procesos-especiales/procesos-especiales.component'
import { AdministradorComponent } from './parametros/administrador/administrador.component'
import { EstacionesDeEscaneoComponent } from './parametros/estaciones-de-escaneo/estaciones-de-escaneo.component'
import { CreadorDeFormulariosComponent } from './parametros/estaciones-de-escaneo/creador-de-formularios/creador-de-formularios.component'
import { RouterModule, Routes } from '@angular/router'
import { ScannerFormularioDinamicoComponent } from '../components/scanner-formulario-dinamico/scanner-formulario-dinamico.component'
import permisosKeysConfig from '../config/permisosKeys.config'
import { PermisosGuard } from '../services/guards/permisos.guard'
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard'

const pagesRoutes: Routes = [
  // Redirecciona a PagesComponent para separar el login
  // de la estructura principal.
  // {
  //     // Esta es la ruta padre y tiene hijos. Esto permite la separación
  //     // entre el login y el dashboard para los templates.
  //     path: '',
  //     component: PagesComponent,
  //     canActivate: [LoginGuardGuard],
  //     children: [
  // Sección de estudio.

  {
    path: 'parametros/localizacionDeOrdenes',
    component: ProcesosInicialesYFinalesComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: '',
      permissions: permisosKeysConfig['menu:parametros:localizacionDeOrdenes']
    }
  },
  {
    path: 'parametros/procesosEspeciales',
    component: ProcesosEspecialesComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: '',
      permissions: permisosKeysConfig['menu:parametros:procesosEspeciales']
    }
  },
  {
    path: 'parametros/administrador',
    component: AdministradorComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: '',
      permissions: permisosKeysConfig.SUPER_ADMIN
    }
  },
  {
    path: 'parametros/scanners',
    component: EstacionesDeEscaneoComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: '',
      permissions: permisosKeysConfig.SUPER_ADMIN
    }
  },

  //  <!--
  //  =====================================
  //   Principal
  //  =====================================
  //  -->
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Dashboard',
      permissions: permisosKeysConfig.login
    }
  },

  //  <!--
  //  =====================================
  //   END Principal
  //  =====================================
  //  -->

  // <!--
  // =====================================
  //  Reportes
  // =====================================
  // -->

  {
    path: 'reportes/productoTerminado/faltantes',
    component: ReporteDeFaltantesProductoTerminadoComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: 'Reporte de faltantes de producto terminado',
      permissions:
        permisosKeysConfig['menu:reportes:productoTerminado:faltantes']
    }
  },
  {
    path: 'reportes/almacenDeProduccion/faltantes',
    component: ReporteDeFaltantesAlmacenDeProduccionComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: 'Reporte de faltantes - Almacen de produccion',
      permissions:
        permisosKeysConfig['menu:reportes:almacenDeProduccion:faltantes']
    }
  },
  {
    path: 'reportes/almacenDeProduccion/personalizado',
    component: ReportePersonalizadoAlmacenProduccionComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: 'Reporte personalizado - Almacen de produccion',
      permissions:
        permisosKeysConfig['menu:reportes:almacenDeProduccion:personalizado']
    }
  },
  {
    path: 'reportes/almacenDeProduccion/personalizado/:id',
    component: RPersonalizadoAlmacenProduccionComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: 'Reporte personalizado - Almacen de produccion',
      permissions:
        permisosKeysConfig['menu:reportes:almacenDeProduccion:personalizado']
    }
  },
  {
    path: 'reportes/transformacion',
    component: ProgramacionTransformacionReporteComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: 'Reporte de transformacion',
      permissions: permisosKeysConfig['menu:reportes:transformacion']
    }
  },

  // <!--
  // =====================================
  //  END Reportes
  // =====================================
  // -->

  // <!--
  // =====================================
  //  Almacen
  // =====================================
  // -->
  {
    path: 'almacen/productoTerminado',
    component: AlmacenDeProductoTerminadoComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: 'Almacen de producto terminado',
      permissions: permisosKeysConfig['menu:almacen:productoTerminado']
    }
  },

  {
    path: 'almacen/productoTerminado/detalle/:id',
    component: AlmacenDeProductoTerminadoDetalleComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: 'Almacen de producto terminado',
      permissions: permisosKeysConfig['almacenDeProductoTerminado:leer:todo']
    }
  },

  {
    path: 'almacen/productoTerminado/salida/:id',
    component: AlmacenDeProductoTerminadoCrearModificarSalidaComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: 'Almacen de producto terminado',
      permissions: permisosKeysConfig['almacenDeProductoTerminado:salida']
    }
  },

  {
    path: 'almacen/productoTerminado/entrada/:id',
    component: AlmacenDeProductoTerminadoCrearModificarEntradaComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: 'Almacen de producto terminado',
      permissions: permisosKeysConfig['almacenDeProductoTerminado:lote:crear']
    }
  },

  {
    path: 'almacen/produccion/entradasYSalidas',
    component: AlmacenESComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: 'Entradas y salidas de almacen',
      permissions:
        permisosKeysConfig['menu:almacen:produccion:entradasYSalidas']
    }
  },
  {
    path: 'almacen/requisiciones',
    component: RequisicionComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: 'Requisiciones de articulos',
      permissions: permisosKeysConfig['menu:almacen:requisiciones']
    }
  },
  {
    path: 'almacen/requisiciones/crear',
    component: RequisicionCrearModificarComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: 'Requisiciones de articulos',
      permissions: permisosKeysConfig['requisicion:crear']
    }
  },
  {
    path: 'almacen/requisiciones/modificar/:id',
    component: RequisicionCrearModificarComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: 'Requisiciones de articulos',
      permissions: permisosKeysConfig['requisicion:modificar']
    }
  },
  {
    path: 'almacen/requisiciones/detalle/:id',
    component: RequisicionDetalleComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: 'Requisiciones de articulos',
      permissions: permisosKeysConfig['requisicion:leer:id']
    }
  },
  {
    path: 'almacen/reportesPersonalizados',
    component: ReportePersonalizadoAlmacenProduccionComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: 'Gestion de reportes personalizados',
      permissions: permisosKeysConfig['menu:almacen:reportesPersonalizados']
    }
  },
  {
    path: 'almacen/reportesPersonalizados/crear',
    component: ReportePersonalizadoAlmacenProduccionCrearModificarComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: 'Gestion de reportes personalizados',
      permissions: permisosKeysConfig['menu:almacen:reportesPersonalizados']
    }
  },
  {
    path: 'almacen/reportesPersonalizados/modificar/:id',
    component: ReportePersonalizadoAlmacenProduccionCrearModificarComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: 'Gestion de reportes personalizados',
      permissions: permisosKeysConfig['menu:almacen:reportesPersonalizados']
    }
  },
  {
    path: 'almacen/reportesPersonalizados/detalle/:id',
    component: ReportePersonalizadoAlmacenProduccionDetalleComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: 'Gestion de reportes personalizados',
      permissions: permisosKeysConfig['menu:almacen:reportesPersonalizados']
    }
  },

  // <!--
  // =====================================
  //  END Almacen
  // =====================================
  // -->

  // <!--
  // =====================================
  //  CONTROL DE PRODUCCION
  // =====================================
  // -->

  {
    path: 'folios/revision',
    component: RevisionDeFoliosComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Revision de folios a produccion',
      permissions:
        permisosKeysConfig['menu:controlDeProduccion:folios:revision']
    }
  },
  {
    path: 'folios/revision/:id',
    component: RevisionDeOrdenesAbstractoComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Generar ordenes para folio',
      permissions:
        permisosKeysConfig['menu:controlDeProduccion:folios:revision']
    }
  },
  {
    path: 'folios/seguimiento',
    component: FoliosSeguimientoComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Seguimiento de folios.',
      permissions:
        permisosKeysConfig['menu:controlDeProduccion:folios:seguimiento']
    }
  },
  {
    path: 'folios/asignarOrdenes',
    component: ProgramacionTransformacionComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Asignar ordenes a maquinas.',
      permissions:
        permisosKeysConfig['menu:controlDeProduccion:folios:asignarOrdenes']
    }
  },

  // <!--
  // =====================================
  //  END CONTROL DE PRODUCCION
  // =====================================
  // -->

  // <!--
  // =====================================
  //  INGENIERIA
  // =====================================
  // -->

  // <!--
  // =====================================
  //  END INGENIERIA
  // =====================================
  // -->

  {
    path: 'procesos',
    component: ProcesosComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Procesos',
      permissions: permisosKeysConfig['menu:ingenieria:procesos']
    }
  },
  {
    path: 'proceso/crear',
    component: ProcesosCrearModificarComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Proceso',
      permissions: permisosKeysConfig['proceso:crear']
    }
  },
  {
    path: 'proceso/modificar/:id',
    component: ProcesosCrearModificarComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Proceso',
      permissions: permisosKeysConfig['proceso:modificar']
    }
  },

  {
    path: 'maquinas',
    component: MaquinasComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Gestión de Maquinas',
      permissions: permisosKeysConfig['menu:ingenieria:maquinas']
    }
  },

  {
    path: 'modelos',
    component: ModelosComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Gestion de Modelos',
      permissions: permisosKeysConfig['menu:ingenieria:modelos']
    }
  },
  {
    path: 'modelo/crear',
    component: ModelosCrearModificarComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Gestion de Modelos',
      permissions: permisosKeysConfig['modelo:crear']
    }
  },
  {
    path: 'modelo/modificar/:id',
    component: ModelosCrearModificarComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Gestion de Modelos',
      permissions: permisosKeysConfig['modelo:modificar']
    }
  },

  {
    path: 'tamanos',
    component: TamanosComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Gestion de Tamanos',
      permissions: permisosKeysConfig['menu:ingenieria:tamanos']
    }
  },
  {
    path: 'tamano/crear',
    component: TamanosCrearModificarComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Gestion de Tamanos',
      permissions: permisosKeysConfig['tamano:crear']
    }
  },
  {
    path: 'tamano/modificar/:id',
    component: TamanosCrearModificarComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Gestion de Tamanos',
      permissions: permisosKeysConfig['tamano:modificar']
    }
  },

  {
    path: 'colores',
    component: ColoresComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Gestion de colores',
      permissions: permisosKeysConfig['menu:ingenieria:colores']
    }
  },
  {
    path: 'color/crear',
    component: ColoresCrearModificarComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Gestion de colores',
      permissions: permisosKeysConfig['color:crear']
    }
  },
  {
    path: 'color/modificar/:id',
    component: ColoresCrearModificarComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Gestion de colores',
      permissions: permisosKeysConfig['color:modificar']
    }
  },

  {
    path: 'terminados',
    component: TerminadosComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Gestion de terminados',
      permissions: permisosKeysConfig['menu:ingenieria:terminados']
    }
  },
  {
    path: 'terminado/crear',
    component: TerminadosCrearModificarComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Gestion de terminados',
      permissions: permisosKeysConfig['terminado:crear']
    }
  },
  {
    path: 'terminado/modificar/:id',
    component: TerminadosCrearModificarComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Gestion de terminados',
      permissions: permisosKeysConfig['terminado:modificar']
    }
  },

  {
    path: 'sku',
    component: ModelosCompletosComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Gestion de SKU - Produccion',
      permissions: permisosKeysConfig['menu:ingenieria:sku']
    }
  },
  {
    path: 'sku/crear',
    component: ModelosCompletosCrearModificarComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Gestion de SKU - Produccion',
      permissions: permisosKeysConfig['modeloCompleto:crear']
    }
  },
  {
    path: 'sku/modificar/:id',
    component: ModelosCompletosCrearModificarComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Gestion de SKU - Produccion',
      permissions: permisosKeysConfig['modeloCompleto:modificar']
    }
  },
  {
    path: 'familiaDeProcesos',
    component: FamiliaDeProcesosComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Gestión de Familias de Procesos',
      permissions: permisosKeysConfig['menu:ingenieria:familiaDeProcesos']
    }
  },
  {
    path: 'familiaDeProcesos/crear',
    component: FamiliaDeProcesosCrearModificarComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Gestión de Familias de Procesos',
      permissions: permisosKeysConfig['familiaDeProcesos:crear']
    }
  },
  {
    path: 'familiaDeProcesos/modificar/:id',
    component: FamiliaDeProcesosCrearModificarComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Gestión de Familias de Procesos',
      permissions: permisosKeysConfig['familiaDeProcesos:modificar']
    }
  },
  // {
  //   path: "familiaDeProcesos/detalle/:id",
  //   component: FamiliaDeProcesosDetalleComponent,
  //   canActivate: [VerificaTokenGuard, PermisosGuard],
  //   data: {
  //     titulo: "Detalle de Familia de Procesos",
  //    permissions: permisosKeysConfig.
  //   }
  // },

  // <!--
  // =====================================
  //  Manejo de folios
  // =====================================
  // -->

  // <!--
  // =====================================
  //  VENTAS
  // =====================================
  // -->

  {
    path: 'ventas/misFolios',
    component: PruebaParaDetallesComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Mis folios.',
      permissions: permisosKeysConfig['menu:ventas']
    }
  },
  {
    path: 'ventas/misFolios/crear',
    component: FoliosCrearModificarComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Crear folio',
      permissions: permisosKeysConfig['menu:ventas:misFolios']
    }
  },
  {
    path: 'ventas/misFolios/editar/:id',
    component: FoliosCrearModificarComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Crear folio',
      permissions: permisosKeysConfig['folio:modificar']
    }
  },
  {
    path: 'ventas/stock',
    component: StockAlmacenProductoTerminadoComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: 'Minimos y maximos de productos en almacen',
      permissions: permisosKeysConfig['menu:ventas:stock']
    }
  },

  // <!--
  // =====================================
  //  END VENTAS
  // =====================================
  // -->
  // <!--
  // =====================================
  //  COMPRAS
  // =====================================
  // -->

  {
    path: 'proveedores',
    component: ProveedorComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Proveedores.',
      permissions: permisosKeysConfig['menu:compras:proveedores']
    }
  },
  {
    path: 'divisas',
    component: DivisaComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Divisas',
      permissions: permisosKeysConfig['menu:compras:divisas']
    }
  },

  // <!--
  // =====================================
  //  END COMPRAS
  // =====================================
  // -->

  // <!--
  // =====================================
  //  ADMINISTRADOR
  // =====================================
  // -->

  // Mantenimientos

  {
    path: 'usuarios',
    component: UsuarioLeerComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Usuarios',
      permissions: permisosKeysConfig['menu:administrador:usuarios']
    }
  },

  {
    path: 'usuario/crear',
    component: UsuarioCrearComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Usuarios',
      permissions: permisosKeysConfig['administrador:usuario:crear']
    }
  },
  {
    path: 'usuario/modificar/:id',
    component: UsuarioCrearComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Usuario',
      permissions: permisosKeysConfig['usuario:modificar']
    }
  },
  {
    path: 'usuario/detalle/:id',
    component: UsuarioDetalleComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Usuario',
      permissions: permisosKeysConfig['administrador:usuario:leer']
    }
  },

  {
    path: 'clientes',
    component: ClientesComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Mantenimientos de clientes',
      permissions: permisosKeysConfig['menu:administrador:clientes']
    }
  },
  {
    path: 'cliente/crear',
    component: ClientesCrearModificarComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Mantenimientos de clientes',
      permissions: permisosKeysConfig['cliente:crear']
    }
  },
  {
    path: 'cliente/modificar/:id',
    component: ClientesCrearModificarComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Mantenimientos de clientes',
      permissions: permisosKeysConfig['cliente:modificar']
    }
  },


  // <!--
  // =====================================
  //  END ADMINISTRADOR
  // =====================================
  // -->

  // <!--
  // =====================================
  //  PRODUCCION
  // =====================================
  // -->

  {
    path: 'escaner/:departamento/:id',
    component: ScannerFormularioDinamicoComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Registro de órdenes',
      permissions: permisosKeysConfig['menu:scanner']
    }
  },

  // <!--
  // =====================================
  //  END PRODUCCION
  // =====================================
  // -->

  // <!--
  // =====================================
  //  RH
  // =====================================
  // -->

  {
    path: 'empleados',
    component: EmpleadoComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Gestion de empleados',
      permissions: permisosKeysConfig['menu:rh:empleados']
    }
  },
  {
    path: 'cursos',
    component: CursosComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Gestion de cursos',
      permissions: permisosKeysConfig['menu:rh:cursos']
    }
  },
  {
    path: 'areas',
    component: AreasComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Gestion de areas',
      permissions: permisosKeysConfig['menu:administrador:areas']
    }
  },

  {
    path: 'puestos',
    component: PuestosComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Gestion de puestos',
      permissions: permisosKeysConfig['menu:rh:puestos']
    }
  },

  // <!--
  // =====================================
  //  END RH
  // =====================================
  // -->

  // =================================+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // -->

  {
    path: 'departamentos',
    component: DepartamentoComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Departamentos',
      permissions: permisosKeysConfig['menu:administrador:departamentos']
    }
  },

  {
    path: 'perfil',
    component: ProfileComponent,
    data: { titulo: 'Perfil de usuario.' }
  },

  // Esta sección es para el trabajo

  {
    path: 'produccion',
    component: SeguimientoDeFoliosComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Seguimiento de folios',
      permissions:
        permisosKeysConfig['menu:controlDeProduccion:folios:seguimiento']
    }
  },

  // Redirige al dashboard cuando no se ha puesto nada en la url.
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },

  {
    path: 'account-settings',
    component: AccountsSettingsComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: 'Informaciónde la cuenta',
      permissions: permisosKeysConfig.login
    }
  }
]

@NgModule({
  declarations: [
    DashboardComponent,

    AccountsSettingsComponent,
    ProfileComponent,
    // sistema
    SeguimientoDeFoliosComponent,
    MaterialesComponent,
    TransformacionComponent,
    PulidoComponent,
    SeleccionComponent,
    PastillaComponent,
    EmpaqueComponent,
    GestionDepartamentoComponent,
    IndicadorDeChecadasComponent,
    ClientesComponent,
    ControlDeProduccionComponent,
    ProductoTerminadoComponent,
    MetalizadoComponent,
    BuratoComponent,
    BarnizadoComponent,
    LaserComponent,
    AlmacenDeBotonComponent,
    FamiliaDeProcesosComponent,
    ProcesosComponent,
    ProcesosDetalleComponent,
    MaquinasComponent,
    FamiliaDeProcesosDetalleComponent,
    MaquinasDetalleComponent,
    MaquinasCrearModificarComponent,
    ModalComponent,
    CrearModificarComponent,
    GeneralComponent,
    ProcesosCrearModificarComponent,
    ModelosCrearModificarComponent,
    ModelosDetalleComponent,
    ModelosComponent,
    TamanosCrearModificarComponent,
    TamanosDetalleComponent,
    TamanosComponent,
    ColoresCrearModificarComponent,
    ColoresDetalleComponent,
    ColoresComponent,
    TerminadosDetalleComponent,
    TerminadosComponent,
    TerminadosCrearModificarComponent,
    ModelosCompletosCrearModificarComponent,
    ModelosCompletosDetalleComponent,
    ModelosCompletosComponent,
    FamiliaDeProcesosCrearModificarComponent,
    LaserReporteComponent,
    TransformacionReporteComponent,
    QuimicaReporteComponent,
    TransformacionReporteSimplificadoComponent,
    SortableColumnComponent,
    SortableTableDirective,
    PruebaParaDetallesComponent,
    FoliosCrearModificarComponent,
    FoliosDetalleComponent,
    FoliosComponent,
    PedidosCrearModificarComponent,
    OrdenesCrearModificarComponent,
    OrdenesComponent,
    RevisionDeFoliosComponent,
    FoliosCrearModificarAbstractoComponent,
    RevisionDeOrdenesAbstractoComponent,
    FoliosSeguimientoComponent,
    ClientesCrearModificarComponent,
    ClientesDetalleComponent,
    AlmacenDeProductoTerminadoCrearModificarComponent,
    AlmacenDeProductoTerminadoDetalleComponent,
    AlmacenDeProductoTerminadoComponent,
    AlmacenDeProductoTerminadoCrearModificarEntradaComponent,
    AlmacenDeProductoTerminadoCrearModificarSalidaComponent,
    AlmacenDeProductoTerminadoCrearModificarDevolucionComponent,
    LoteDetalleComponent,
    StockAlmacenProductoTerminadoComponent,
    ArticuloCrearModificarComponent,
    ArticuloDetalleComponent,
    ArticuloComponent,
    ProveedorCrearModificarComponent,
    ProveedorDetalleComponent,
    ProveedorComponent,
    DivisaCrearModificarComponent,
    DivisaDetalleComponent,
    DivisaComponent,
    TenidoComponent,
    RequisicionCrearModificarComponent,
    RequisicionDetalleComponent,
    RequisicionComponent,
    RequisicionEstatusGeneralComponent,
    RequisicionEstatusEsRequisicionComponent,
    RequisicionEstatusEsOrdenDeCompraComponent,
    RequisicionEstatusEsEntregaParcialComponent,
    RequisicionEstatusEsTerminadaComponent,
    RequisicionEstatusEsCanceladaComponent,
    RecibirParcialidadComponent,
    RecibirTerminacionComponent,
    RecibirCancelacionComponent,
    RequisicionFiltrosComponent,
    EmpleadoCrearModificarComponent,
    EmpleadoDetalleComponent,
    EmpleadoComponent,
    CursosCrearModificarComponent,
    CursosDetalleComponent,
    CursosComponent,
    AreasCrearModificarComponent,
    AreasDetalleComponent,
    AreasComponent,
    PuestosCrearModificarComponent,
    PuestosDetalleComponent,
    PuestosComponent,
    DepartamentoCrearModificarComponent,
    DepartamentoDetalleComponent,
    DepartamentoComponent,
    EmpleadoFiltrosComponent,
    EmpleadoEventoCursoComponent,
    EmpleadoEventoVacacionesComponent,
    EmpleadoEventoCambioDeSueldoComponent,
    EmpleadoEventoPuestoComponent,
    EmpleadoEventoFelicitacionesPorEscritoComponent,
    EmpleadoEventoAmonestacionesPorEscritoComponent,
    EmpleadoEventoCastigoComponent,
    EmpleadoEventoPermisoComponent,
    EmpleadoEventoBonoComponent,
    EmpleadoEventoEstatusLaboralComponent,
    EmpleadoEventoManejadorComponent,
    EmpleadoEventoPlantillaComponent,
    EmpleadoEventoAgregarCursoComponent,
    EmpleadoEventosCrearModalComponent,
    EmpleadoAgregarVacacionesComponent,
    EmpleadoAgregarCambiosDeSueldoComponent,
    EmpleadoAgregarPuestoComponent,
    EmpleadoAgregarFelicitacionPorEscritoComponent,
    EmpleadoAgregarAmonestacionPorEscritoComponent,
    EmpleadoAgregarCastigoComponent,
    EmpleadoAgregarPermisoComponent,
    EmpleadoAgregarBonoComponent,
    EmpleadoAgregarEstatusLaboralComponent,
    AlmacenESComponent,
    ReporteDeFaltantesProductoTerminadoComponent,
    ReporteDeFaltantesAlmacenDeProduccionComponent,
    ReportePersonalizadoAlmacenProduccionCrearModificarComponent,
    ReportePersonalizadoAlmacenProduccionDetalleComponent,
    RPersonalizadoAlmacenProduccionComponent,
    ReportePersonalizadoAlmacenProduccionComponent,
    ProgramacionTransformacionComponent,
    ProgramacionTransformacionReporteComponent,
    UsuarioCrearComponent,
    UsuarioDetalleComponent,
    UsuarioLeerComponent,
    ProcesosInicialesYFinalesComponent,
    ProcesosEspecialesComponent,
    AdministradorComponent,
    EstacionesDeEscaneoComponent,
    CreadorDeFormulariosComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    RouterModule.forChild(pagesRoutes)
  ],
  providers: []
})
export class PagesModule {}
