import { RouterModule, Routes } from "@angular/router"
import { ProgressComponent } from "./progress/progress.component"
import { DashboardComponent } from "./dashboard/dashboard.component"
import { Graficas1Component } from "./graficas1/graficas1.component"
import { AccountsSettingsComponent } from "./accounts-settings/accounts-settings.component"
import { PromesasComponent } from "./promesas/promesas.component"
import { RxjsComponent } from "./rxjs/rxjs.component"
import { ProfileComponent } from "./profile/profile.component"
import { RegistroDeFoliosComponent } from "./registro-de-folios/registro-de-folios.component"
import { UsuariosComponent } from "./usuarios/usuarios.component"
import { HospitalesComponent } from "./hospitales/hospitales.component"
import { MedicosComponent } from "./medicos/medicos.component"
import { BusquedaComponent } from "./busqueda/busqueda.component"
import { RegistroDeLineasComponent } from "./registro-de-folios/registro-de-lineas.component"
import { RevisionDeOrdenesComponent } from "./generador-de-ordenes/revision-de-ordenes.component"
import { SeguimientoDeFoliosComponent } from "./seguimiento-de-folios/seguimiento-de-folios.component"
import { MaterialesComponent } from "./departamentos/materiales/materiales.component"
import { TransformacionComponent } from "./departamentos/transformacion/transformacion.component"
import { PulidoComponent } from "./departamentos/pulido/pulido.component"
import { SeleccionComponent } from "./departamentos/seleccion/seleccion.component"
import { VistaParaImprecionComponent } from "./generador-de-ordenes/vista-para-imprecion.component"
import { PastillaComponent } from "./departamentos/pastilla/pastilla.component"
import { EmpaqueComponent } from "./departamentos/empaque/empaque.component"
import { GestionDepartamentoComponent } from "./departamentos/gestion-departamento/gestion-departamento.component"
import { IndicadorDeChecadasComponent } from "./reportes/indicador-de-checadas/indicador-de-checadas.component"
import { _ROLES as ROLES } from "../config/roles.const"
import { ClientesComponent } from "./clientes/clientes.component"
import { ControlDeProduccionComponent } from "./departamentos/control-de-produccion/control-de-produccion.component"
import { ProductoTerminadoComponent } from "./departamentos/producto-terminado/producto-terminado.component"
import { HistorialDeFoliosComponent } from "./reportes/historial-de-folios/historial-de-folios.component"
import { MetalizadoComponent } from "./departamentos/metalizado/metalizado.component"
import { BarnizadoComponent } from "./departamentos/barnizado/barnizado.component"
import { BuratoComponent } from "./departamentos/burato/burato.component"
import { LaserComponent } from "./departamentos/laser/laser.component"
import { AlmacenDeBotonComponent } from "./departamentos/almacen-de-boton/almacen-de-boton.component"
import { ProcesosComponent } from "./gestionDeProcesos/procesos/procesos.component"
import { MaquinasComponent } from "./gestionDeProcesos/maquinas/maquinas.component"
import { FamiliaDeProcesosComponent } from "./gestionDeProcesos/familia-de-procesos/familia-de-procesos.component"
import { FamiliaDeProcesosDetalleComponent } from "./gestionDeProcesos/familia-de-procesos/familia-de-procesos-detalle.component"
import { TamanosComponent } from "./gestionDeProcesos/tamanos/tamanos.component"
import { ColoresComponent } from "./gestionDeProcesos/colores/colores.component"
import { TerminadosComponent } from "./gestionDeProcesos/terminados/terminados.component"
import { ModelosCompletosComponent } from "./gestionDeProcesos/modelos-completos/modelos-completos.component"
import { ModelosComponent } from "./gestionDeProcesos/modelos/modelos.component"
import { LaserReporteComponent } from "./reportes/produccion/laser-reporte/laser-reporte.component"
import { TransformacionReporteComponent } from "./reportes/produccion/transformacion-reporte/transformacion-reporte.component"
import { QuimicaReporteComponent } from "./reportes/produccion/quimica-reporte/quimica-reporte.component"
import { PruebaParaDetallesComponent } from "./prueba-para-detalles/prueba-para-detalles.component"
import { RevisionDeFoliosComponent } from "./gestionDeFolios/revision/revision-de-folios/revision-de-folios.component"
import { FoliosSeguimientoComponent } from "./gestionDeFolios/seguimiento/folios-seguimiento/folios-seguimiento.component"
import { VerificaTokenGuard } from "../services/guards/verifica-token.guard"
import { PermisosGuard } from "../services/guards/permisos.guard"
import { AlmacenDeProductoTerminadoComponent } from "./almacenes/almacenDeProductoTerminado/almacen-de-producto-terminado.component"
import { StockAlmacenProductoTerminadoComponent } from "./almacenes/almacenDeProductoTerminado/stock/stock-almacen-producto-terminado.component"
import { AlamacenProduccion as AlmacenProduccion } from "./almacenes/almacenDeMateriaPrimaYHerramientas/almacen-produccion.component"
import { AlmacenDescripcionComponent } from "./almacenes/almacenDescripcion/almacen-descripcion.component"
import { TenidoComponent } from "./departamentos/tenido/tenido/tenido.component"
import { ProveedorComponent } from "./proveedor/proveedor.component"
import { DivisaComponent } from "./divisa/divisa.component"
import { RequisicionComponent } from "./almacenes/requisicion/requisicion.component"
import { EmpleadoComponent } from "./recursosHumanos/empleado/empleado.component";
import { CursosComponent } from './recursosHumanos/cursos/cursos.component'
import { AreasComponent } from './recursosHumanos/areas/areas.component'
import { PuestosComponent } from './recursosHumanos/puestos/puestos.component'
import { DepartamentoComponent } from './departamento/departamento.component'
import { AlmacenESComponent } from './alamacenes/almacen-es/almacen-es.component'
import { ReporteDeFaltantesProductoTerminadoComponent } from './reportes/reporte-de-faltantes-producto-terminado/reporte-de-faltantes-producto-terminado.component'
import { ReporteDeFaltantesAlmacenDeProduccionComponent } from './reportes/reporte-de-faltantes-almacen-de-produccion/reporte-de-faltantes-almacen-de-produccion.component'

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

  //  <!--
  //  =====================================
  //   Principal
  //  =====================================
  //  -->
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Dashboard",
      roles: [ROLES.USER_ROLE]
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
    path: "reportes/productoTerminado/faltantes",
    component: ReporteDeFaltantesProductoTerminadoComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: "Reporte de faltantes de producto terminado",
      roles: [ROLES.REPORTES_PRODUCTO_TERMINADO_FALTANTES]
    }
  },
  {
    path: "reportes/almacenDeProduccion/faltantes",
    component: ReporteDeFaltantesAlmacenDeProduccionComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: "Reporte de faltantes - Almacen de produccion",
      roles: [ROLES.REPORTES_ALMACEN_PRODUCCION_FALTANTES]
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
    path: "almacen/produccion",
    component: AlmacenProduccion,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: "Materia prima y herramienta",
      roles: [ROLES.ALMACEN_MATERIA_PRIMA, ROLES.ALMACEN_HERRAMIENTAS]
    }
  },

  {
    path: "almacen/productoTerminado",
    component: AlmacenDeProductoTerminadoComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: "Almacen de producto terminado",
      roles: [ROLES.ALMACEN_PRODUCTO_TERMINADO]
    }
  },
  {
    path: "almacen/produccion/entradasYSalidas",
    component: AlmacenESComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: "Entradas y salidas de almacen",
      roles: [ROLES.ALMACEN_MATERIA_PRIMA_ENTRADA_Y_SALIDA]
    }
  },
  {
    path: "almacen/requisiciones",
    component: RequisicionComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: "Requisiciones de articulos",
      roles: [ROLES.ALMACEN_REQUISICION]
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
    path: "folios/revision",
    component: RevisionDeFoliosComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Revision de folios a produccion",
      roles: [ROLES.CONTROL_DE_PRODUCCION_REVISION_DE_FOLIOS]
    }
  },
  {
    path: "folios/seguimiento",
    component: FoliosSeguimientoComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Seguimiento de folios.",
      roles: [ROLES.CONTROL_DE_PRODUCCION_SEGUIMIENTOS]
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
    path: "procesos",
    component: ProcesosComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Gestión de procesos",
      roles: [ROLES.INGENIERIA_PROCESOS]
    }
  },

  {
    path: "maquinas",
    component: MaquinasComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Gestión de Maquinas",
      roles: [ROLES.INGENIERIA_MAQUINAS]
    }
  },

  {
    path: "modelos",
    component: ModelosComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Gestion de Modelos",
      roles: [ROLES.INGENIERIA_MODELOS]
    }
  },

  {
    path: "tamanos",
    component: TamanosComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Gestion de Tamanos",
      roles: [ROLES.INGENIERIA_TAMANOS]
    }
  },

  {
    path: "colores",
    component: ColoresComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Gestion de colores",
      roles: [ROLES.INGENIERIA_COLORES]
    }
  },

  {
    path: "terminados",
    component: TerminadosComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Gestion de terminados",
      roles: [ROLES.INGENIERIA_TERMINADOS]
    }
  },

  {
    path: "modelosCompletos",
    component: ModelosCompletosComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Gestion de Modelos Completos",
      roles: [ROLES.INGENIERIA_MODELOS_COMPLETOS]
    }
  },
  {
    path: "familiaDeProcesos",
    component: FamiliaDeProcesosComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Gestión de Familias de Procesos",
      roles: [ROLES.INGENIERIA_FAMILIA_DE_PROCESOS]
    }
  },
  // {
  //   path: "familiaDeProcesos/detalle/:id",
  //   component: FamiliaDeProcesosDetalleComponent,
  //   canActivate: [VerificaTokenGuard, PermisosGuard],
  //   data: {
  //     titulo: "Detalle de Familia de Procesos",
  //     roles: [ROLES.INGENIERIA_FAMILIA_DE_PROCESOS]
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
    path: "ventas/misFolios",
    component: PruebaParaDetallesComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: { titulo: "Mis folios.", roles: [ROLES.VENTAS_MIS_FOLIOS] }
  },
  {
    path: "ventas/stock",
    component: StockAlmacenProductoTerminadoComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: "Minimos y maximos de productos en almacen",
      roles: [ROLES.VENTAS_STOCK]
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
    path: "proveedores",
    component: ProveedorComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: { titulo: "Proveedores.", roles: [ROLES.COMPRAS_PROVEEDORES] }
  },
  {
    path: "divisas",
    component: DivisaComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: { titulo: "Divisas", roles: [ROLES.COMPRAS_DIVISAS] }
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
    path: "usuarios",
    component: UsuariosComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Mantenimientos de usuarios",
      roles: [ROLES.ADMINISTRADOR_USUARIOS]
    }
  },
  {
    path: "clientes",
    component: ClientesComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Mantenimientos de clientes",
      roles: [ROLES.ADMINISTRADOR_CLIENTES]
    }
  },

  {
    path: "almacenDescripcion",
    component: AlmacenDescripcionComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Mantenimientos de clientes",
      roles: [ROLES.ADMINISTRADOR_ALMACEN_DESCRIPCION]
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
    path: "produccion/controlDeProduccion",
    component: ControlDeProduccionComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Registro de órdenes",
      roles: [ROLES.PRODUCCION_CONTROL_DE_PRODUCCION]
    }
  },
  {
    path: "produccion/almacenDeBoton",
    component: AlmacenDeBotonComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Almacen de boton",
      roles: [ROLES.PRODUCCION_ALMACEN_DE_BOTON]
    }
  },
  {
    path: "produccion/materiales",
    component: MaterialesComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Registro de órdenes",
      roles: [ROLES.PRODUCCION_MATERIALES]
    }
  },
  {
    path: "produccion/pastilla",
    component: PastillaComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Registro de órdenes",
      roles: [ROLES.PRODUCCION_PASTILLA]
    }
  },
  {
    path: "produccion/transformacion",
    component: TransformacionComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Registro de órdenes",
      roles: [ROLES.PRODUCCION_TRANSFORMACION]
    }
  },
  {
    path: "produccion/laser",
    component: LaserComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Registro de órdenes",
      roles: [ROLES.PRODUCCION_LASER]
    }
  },
  {
    path: "produccion/pulido",
    component: PulidoComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Registro de órdenes",
      roles: [ROLES.PRODUCCION_PULIDO]
    }
  },
  {
    path: "produccion/tenido",
    component: TenidoComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Registro de órdenes",
      roles: [ROLES.PRODUCCION_TENIDO]
    }
  },
  {
    path: "produccion/seleccion",
    component: SeleccionComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Registro de órdenes",
      roles: [ROLES.PRODUCCION_SELECCION]
    }
  },
  {
    path: "produccion/empaque",
    component: EmpaqueComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Registro de órdenes",
      roles: [ROLES.PRODUCCION_EMPAQUE]
    }
  },
  {
    path: "produccion/metalizado",
    component: MetalizadoComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Registro de órdenes",
      roles: [ROLES.PRODUCCION_METALIZADO]
    }
  },
  {
    path: "produccion/barnizado",
    component: BarnizadoComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Registro de órdenes",
      roles: [ROLES.PRODUCCION_BARNIZADO]
    }
  },
  {
    path: "produccion/burato",
    component: BuratoComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Registro de órdenes",
      roles: [ROLES.PRODUCCION_BURATO]
    }
  },
  {
    path: "produccion/productoTerminado",
    component: ProductoTerminadoComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Registro de órdenes",
      roles: [ROLES.PRODUCCION_PRODUCTO_TERMINADO]
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
    path: "empleados",
    component: EmpleadoComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Gestion de empleados",
      roles: [ROLES.RH_EMPLEADOS]
    }
  },
  {
    path: "cursos",
    component: CursosComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Gestion de cursos",
      roles: [ROLES.RH_CURSOS]
    }
  },
  {
    path: "areas",
    component: AreasComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Gestion de areas",
      roles: [ROLES.ADMINISTRADOR_AREAS]
    }
  },


  {
    path: "puestos",
    component: PuestosComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Gestion de puestos",
      roles: [ROLES.RH_PUESTOS]
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
    path: "busqueda/:termino",
    component: BusquedaComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Buscador",
      roles: [ROLES.ADMIN_ROLE]
    }
  },

  {
    path: "departamentos",
    component: DepartamentoComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Departamentos",
      roles: [ROLES.ADMIN_ROLE]
    }
  },

  {
    path: "perfil",
    component: ProfileComponent,
    data: { titulo: "Perfil de usuario." }
  },

  // Esta sección es para el trabajo

  {
    path: "folios",
    component: RegistroDeFoliosComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Registro de Folios",
      roles: [ROLES.ADMIN_ROLE]
    }
  },

  {
    path: "folio/:id",
    component: RegistroDeLineasComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Registrar pedidos",
      roles: [ROLES.ADMIN_ROLE]
    }
  },
  {
    path: "ordenes/:idFolio",
    component: RevisionDeOrdenesComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Revisión de órdenes",
      roles: [ROLES.ADMIN_ROLE]
    }
  },
  {
    path: "ordenes/imprecion/:idFolio",
    component: VistaParaImprecionComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Impreción de órdenes",
      roles: [ROLES.ADMIN_ROLE]
    }
  },

  {
    path: "produccion",
    component: SeguimientoDeFoliosComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Seguimiento de folios",
      roles: [ROLES.ADMIN_ROLE]
    }
  },

  // reportes
  {
    path: "reportes/indicadorChecadas",
    component: IndicadorDeChecadasComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: "Indicador de checas personal ( Beta )",
      roles: [ROLES.ADMIN_ROLE]
    }
  },
  // Redirige al dashboard cuando no se ha puesto nada en la url.
  {
    path: "",
    redirectTo: "/dashboard",
    pathMatch: "full"
  },

  {
    path: "medicos",
    component: MedicosComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "Medicos",
      roles: [
        // _ROLES.SUPER_ADMIN,
        ROLES.EMPAQUE_REGISTRO_ROLE,
        ROLES.SELECCION_REGISTRO_ROLE
      ]
    }
  },

  {
    path: "hospitales",
    component: HospitalesComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: "hOSPITALES DESDE ROUTES",
      roles: [ROLES.SUPER_ADMIN]
    }
  },
  {
    path: "progress",
    component: ProgressComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: "Progress",
      roles: [ROLES.SUPER_ADMIN]
    }
  },

  {
    path: "graficas1",
    component: Graficas1Component,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: "Graficas",
      roles: [ROLES.SUPER_ADMIN]
    }
  },

  {
    path: "promesas",
    component: PromesasComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: "Promesas",
      roles: [ROLES.SUPER_ADMIN]
    }
  },

  {
    path: "account-settings",
    component: AccountsSettingsComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: "Informaciónde la cuenta",
      roles: [ROLES.SUPER_ADMIN]
    }
  },

  {
    path: "rxjs",
    component: RxjsComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: "RxJs",
      roles: [ROLES.SUPER_ADMIN]
    }
  }
]

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes)
