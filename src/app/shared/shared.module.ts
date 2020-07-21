import { NgModule, ModuleWithProviders } from '@angular/core'
import { HeaderComponent } from './header/header.component'
import { SidebarComponent } from './sidebar/sidebar.component'
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component'
import { NopagefoundComponent } from './nopagefound/nopagefound.component'
import { RouterModule } from '@angular/router'
import { CommonModule, DecimalPipe } from '@angular/common'

// Pipes
import { PipesModule } from '../pipes/pipes.module'

import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component'
import { BuscadorRapidoComponent } from '../components/buscador-rapido/buscador-rapido.component'
import { PreLoaderComponent } from '../components/pre-loader/pre-loader.component'
import { NivelUrgenciaComponent } from '../components/nivel-urgencia/nivel-urgencia.component'
import { PaginadorComponent } from '../components/paginador/paginador.component'
import { ListaDeOrdenesComponent } from '../components/lista-de-ordenes/lista-de-ordenes.component'
import { QrScannerComponent } from '../components/qr-scanner/qr-scanner.component'
import { ValidacionInputsComponent } from '../components/validacion-inputs/validacion-inputs.component'
import { ProgressBarComponent } from '../components/progress-bar/progress-bar.component'
import { ModeloCompletoPipe } from '../pipes/modelo-completo.pipe'
import { NgxMaskModule } from 'ngx-mask'
// import { OrganizadorDragAndDropComponent } from '../components/organizador-drag-and-drop/organizador-drag-and-drop.component'
import { Paginador2Component } from '../components/paginador2/paginador2.component'
import { BotonParaImprecionComponent } from './boton-para-imprecion/boton-para-imprecion.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BuscadorPacienteComponent } from './buscador-paciente/buscador-paciente.component'
import { ModeloCompletoGestorDeProcesosEspecialesComponent } from './modelo-completo-gestor-de-procesos-especiales/modelo-completo-gestor-de-procesos-especiales.component'
import { PaginadorAbstractoComponent } from './paginador-abstracto/paginador-abstracto.component'
import { DataListComponent } from './data-list/data-list.component'
import { VisorDeImagenesGeneralComponent } from './visor-de-imagenes-general/visor-de-imagenes-general.component'
import { CargaDeImagenesComponent } from './carga-de-imagenes/carga-de-imagenes.component'
import { VisorDeImagenesConPaginacionComponent } from './visor-de-imagenes-con-paginacion/visor-de-imagenes-con-paginacion.component'

import { PaginadorComponent as Paginador } from './paginador/paginador.component'
import { ReporteDeFaltantesProductoTerminadoBaseImprimibleComponent } from '../pages/reportes/reporte-de-faltantes-producto-terminado/reporte-de-faltantes-producto-terminado-base-imprimible/reporte-de-faltantes-producto-terminado-base-imprimible.component'
import { GestorDeImpresionesComponent } from './gestor-de-impresiones/gestor-de-impresiones.component'
import { SettingsService } from '../services/settings/settings.service'
import { SidebarService } from '../services/shared/sidebar.service'
import { SharedService } from '../services/shared/shared.service'
import { UsuarioService } from '../services/usuario/usuario.service'
import { LoginGuardGuard } from '../services/guards/login-guard.guard'
import { AdminGuard } from '../services/guards/admin.guard'
import { SubirArchivoService } from '../services/subir-archivo/subir-archivo.service'
import { PreLoaderService } from '../components/pre-loader/pre-loader.service'
import { ModalUploadService } from '../components/modal-upload/modal-upload.service'

import { VerificaTokenGuard } from '../services/guards/verifica-token.guard'
import { ClienteService } from '../services/cliente/cliente.service'
import { ModeloCompletoService } from '../services/modelo/modelo-completo.service'
import { BuscadorRapidoService } from '../components/buscador-rapido/buscador-rapido.service'
import { UtilidadesService } from '../services/utilidades/utilidades.service'
import { ManejoDeMensajesService } from '../services/utilidades/manejo-de-mensajes.service'
import { ValidacionesService } from '../services/utilidades/validaciones.service'
import { MaquinaService } from '../services/maquina/maquina.service'
import { DepartamentoService } from '../services/departamento/departamento.service'
import { ProcesoService } from '../services/proceso/proceso.service'
import { GastoService } from '../services/gastos/gasto.service'
import { CalculosDeCostosService } from '../services/gastos/calculos-de-costos.service'
import { PermisosGuard } from '../services/guards/permisos.guard'
import { FamiliaDeProcesosService } from '../services/proceso/familia-de-procesos.service'
import { ModeloService } from '../services/modelo/modelo.service'
import { TamanoService } from '../services/modelo/tamano.service'
import { ColorService } from '../services/modelo/color.service'
import { TerminadoService } from '../services/modelo/terminado.service'
import { SortService } from '../directives/sortableComponent/sort.service'
import { FolioNewService } from '../services/folio/folio-new.service'
import { AlmacenProductoTerminadoService } from '../services/almacenDeProductoTerminado/almacen-producto-terminado.service'
import { ImagenPipe } from '../pipes/imagen.pipe'
import { ReporteDeFaltantesAlamcenDeProduccionBaseImprimibleComponent } from '../pages/reportes/reporte-de-faltantes-almacen-de-produccion/reporte-de-faltantes-alamcen-de-produccion-base-imprimible/reporte-de-faltantes-alamcen-de-produccion-base-imprimible.component'
import { RPersonalizadoAlmacenProduccionImprimibleComponent } from '../pages/reportes/r-personalizado-almacen-produccion/r-personalizado-almacen-produccion-imprimible/r-personalizado-almacen-produccion-imprimible.component'
import { OrdenadorDeColumnasDirective } from '../directives/ordenador-de-columnas.directive'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { FechaPipe } from '../pipes/fecha.pipe'
import { QRCodeModule } from 'angularx-qrcode'
import { TiempoTranscurridoComponent } from './tiempo-transcurrido/tiempo-transcurrido.component'
import { ProgramacionTransformacionImprimirComponent } from '../pages/programacion/programacion-transformacion/programacion-transformacion-imprimir/programacion-transformacion-imprimir.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr'
import { OrdenDetalleAlmacenDeBotonComponent } from '../pages/orden-detalles/orden-detalle-almacen-de-boton/orden-detalle-almacen-de-boton.component'
import { OrdenDetalleBarnizadoComponent } from '../pages/orden-detalles/orden-detalle-barnizado/orden-detalle-barnizado.component'
import { OrdenDetalleBuratoComponent } from '../pages/orden-detalles/orden-detalle-burato/orden-detalle-burato.component'
import { OrdenDetalleEmpaqueComponent } from '../pages/orden-detalles/orden-detalle-empaque/orden-detalle-empaque.component'
import { OrdenDetalleLaserComponent } from '../pages/orden-detalles/orden-detalle-laser/orden-detalle-laser.component'
import { OrdenDetalleMaterialesComponent } from '../pages/orden-detalles/orden-detalle-materiales/orden-detalle-materiales.component'
import { OrdenDetalleMetalizadoComponent } from '../pages/orden-detalles/orden-detalle-metalizado/orden-detalle-metalizado.component'
import { OrdenDetallePastillaComponent } from '../pages/orden-detalles/orden-detalle-pastilla/orden-detalle-pastilla.component'
import { OrdenDetalleProductoTerminadoComponent } from '../pages/orden-detalles/orden-detalle-producto-terminado/orden-detalle-producto-terminado.component'
import { OrdenDetallePulidoComponent } from '../pages/orden-detalles/orden-detalle-pulido/orden-detalle-pulido.component'
import { OrdenDetalleSeleccionComponent } from '../pages/orden-detalles/orden-detalle-seleccion/orden-detalle-seleccion.component'
import { OrdenDetalleTenidoComponent } from '../pages/orden-detalles/orden-detalle-tenido/orden-detalle-tenido.component'
import { OrdenDetalleTransformacionComponent } from '../pages/orden-detalles/orden-detalle-transformacion/orden-detalle-transformacion.component'
import { OrdenDetalleAvanceComponent } from '../pages/orden-detalles/orden-detalle-avance/orden-detalle-avance.component'
import { PedidosDetalleComponent } from '../pages/gestionDeFolios/pedidos/pedidos-detalle.component'
import { FoliosDetalleAbstractoComponent } from '../pages/gestionDeFolios/folios/abstractos/folios-detalle-abstracto.component'
import { OrdenesDetalleComponent } from '../pages/gestionDeFolios/ordenes/ordenes-detalle.component'
import { ContieneElPermisoPipe } from '../pipes/contiene-el-permiso.pipe'
import { ScannerFormularioDinamicoComponent } from '../components/scanner-formulario-dinamico/scanner-formulario-dinamico.component'
import { DynamicFormComponent } from '../components/formulario-dinamico/dynamic-form/dynamic-form.component'
import { DynamicFormQuestionComponent } from '../components/formulario-dinamico/dynamic-form-question/dynamic-form-question.component'
import { ZXingScannerModule } from '@zxing/ngx-scanner'
import { OrdenesPorDepartamentoEnProcesosComponent } from '../components/ordenes-por-departamento-en-procesos/ordenes-por-departamento-en-procesos.component'
import { ScannerFormularioDinamicoMaquinasComponent } from '../components/scanner-formulario-dinamico/scanner-formulario-dinamico-maquinas/scanner-formulario-dinamico-maquinas.component'
import { OrdenDetalleImprimirComponent } from '../pages/gestionDeFolios/ordenes/orden-detalle-imprimir/orden-detalle-imprimir.component'

@NgModule({
  imports: [
    RouterModule,
    // CommonModule trae el *ng-for
    CommonModule,
    PipesModule,
    NgxMaskModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    QRCodeModule,
    ToastrModule.forRoot({
      timeOut: 20000,
      positionClass: 'toast-top-right',
      enableHtml: true
    }),
    ZXingScannerModule
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    NopagefoundComponent,
    BreadcrumbsComponent,
    ModalUploadComponent,
    BuscadorRapidoComponent,
    PreLoaderComponent,
    NivelUrgenciaComponent,
    PaginadorComponent,
    ListaDeOrdenesComponent,
    QrScannerComponent,
    ValidacionInputsComponent,
    // OrganizadorDragAndDropComponent,
    ProgressBarComponent,
    Paginador2Component,
    BotonParaImprecionComponent,
    BuscadorPacienteComponent,
    ModeloCompletoGestorDeProcesosEspecialesComponent,
    PaginadorAbstractoComponent,
    DataListComponent,
    VisorDeImagenesGeneralComponent,
    CargaDeImagenesComponent,
    VisorDeImagenesConPaginacionComponent,
    Paginador,
    ReporteDeFaltantesProductoTerminadoBaseImprimibleComponent,
    GestorDeImpresionesComponent,
    ReporteDeFaltantesAlamcenDeProduccionBaseImprimibleComponent,
    RPersonalizadoAlmacenProduccionImprimibleComponent,
    OrdenadorDeColumnasDirective,
    TiempoTranscurridoComponent,
    ProgramacionTransformacionImprimirComponent,
    OrdenDetalleAlmacenDeBotonComponent,
    OrdenDetalleBarnizadoComponent,
    OrdenDetalleBuratoComponent,
    OrdenDetalleEmpaqueComponent,
    OrdenDetalleLaserComponent,
    OrdenDetalleMaterialesComponent,
    OrdenDetalleMetalizadoComponent,
    OrdenDetallePastillaComponent,
    OrdenDetalleProductoTerminadoComponent,
    OrdenDetallePulidoComponent,
    OrdenDetalleSeleccionComponent,
    OrdenDetalleTenidoComponent,
    OrdenDetalleTransformacionComponent,
    OrdenDetalleAvanceComponent,
    PedidosDetalleComponent,
    FoliosDetalleAbstractoComponent,
    OrdenesDetalleComponent,
    ScannerFormularioDinamicoComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    OrdenesPorDepartamentoEnProcesosComponent,
    ScannerFormularioDinamicoMaquinasComponent,
    OrdenDetalleImprimirComponent
  ],
  exports: [
    NopagefoundComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    ModalUploadComponent,
    BuscadorRapidoComponent,
    PreLoaderComponent,
    NivelUrgenciaComponent,
    PaginadorComponent,
    ListaDeOrdenesComponent,
    QrScannerComponent,
    ValidacionInputsComponent,
    // OrganizadorDragAndDropComponent,
    ProgressBarComponent,
    Paginador2Component,
    BotonParaImprecionComponent,
    BuscadorPacienteComponent,
    ModeloCompletoGestorDeProcesosEspecialesComponent,
    DataListComponent,
    VisorDeImagenesGeneralComponent,
    VisorDeImagenesConPaginacionComponent,
    Paginador,
    CargaDeImagenesComponent,
    ReporteDeFaltantesProductoTerminadoBaseImprimibleComponent,
    GestorDeImpresionesComponent,
    ReporteDeFaltantesAlamcenDeProduccionBaseImprimibleComponent,
    RPersonalizadoAlmacenProduccionImprimibleComponent,
    OrdenadorDeColumnasDirective,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    PipesModule,
    DragDropModule,
    QRCodeModule,
    TiempoTranscurridoComponent,
    ProgramacionTransformacionImprimirComponent,
    OrdenDetalleAlmacenDeBotonComponent,
    OrdenDetalleBarnizadoComponent,
    OrdenDetalleBuratoComponent,
    OrdenDetalleEmpaqueComponent,
    OrdenDetalleLaserComponent,
    OrdenDetalleMaterialesComponent,
    OrdenDetalleMetalizadoComponent,
    OrdenDetallePastillaComponent,
    OrdenDetalleProductoTerminadoComponent,
    OrdenDetallePulidoComponent,
    OrdenDetalleSeleccionComponent,
    OrdenDetalleTenidoComponent,
    OrdenDetalleTransformacionComponent,
    OrdenDetalleAvanceComponent,
    PedidosDetalleComponent,
    FoliosDetalleAbstractoComponent,
    OrdenesDetalleComponent,
    ScannerFormularioDinamicoComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    OrdenesPorDepartamentoEnProcesosComponent,
    ScannerFormularioDinamicoMaquinasComponent,
    OrdenDetalleImprimirComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        SettingsService,
        SidebarService,
        SharedService,
        UsuarioService,
        LoginGuardGuard,
        AdminGuard,
        SubirArchivoService,
        PreLoaderService,
        ModalUploadService,
        VerificaTokenGuard,
        // Sistema Carrduci
        ClienteService,
        ModeloCompletoService,
        BuscadorRapidoService,
        UtilidadesService,
        ManejoDeMensajesService,
        ValidacionesService,
        MaquinaService,
        DepartamentoService,
        ProcesoService,
        GastoService,
        CalculosDeCostosService,
        PermisosGuard,
        FamiliaDeProcesosService,
        ModeloService,
        TamanoService,
        ColorService,
        TerminadoService,
        SortService,
        FolioNewService,
        AlmacenProductoTerminadoService,
        ImagenPipe,
        FechaPipe,
        ModeloCompletoPipe,
        DecimalPipe,
        ContieneElPermisoPipe
      ]
    }
  }
}
