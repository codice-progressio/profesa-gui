import { NgModule } from '@angular/core'
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
import { DndModule } from 'ng2-dnd'
import { OrdenadorVisualComponent } from '../components/ordenador-visual/ordenador-visual.component'
import { ProgressBarComponent } from '../components/progress-bar/progress-bar.component'
import { ModeloCompletoPipe } from '../pipes/modelo-completo.pipe'
import { NgxMaskModule } from 'ngx-mask'
import { OrganizadorDragAndDropComponent } from '../components/organizador-drag-and-drop/organizador-drag-and-drop.component'
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
import { HospitalService } from '../services/hospital/hospital.service'
import { MedicoService } from '../services/medico/medico.service'
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
import { OrdenadorVisualService } from '../components/ordenador-visual/ordenador-visual.service'
import { PermisosGuard } from '../services/guards/permisos.guard'
import { FamiliaDeProcesosService } from '../services/proceso/familia-de-procesos.service'
import { ModeloService } from '../services/modelo/modelo.service'
import { TamanoService } from '../services/modelo/tamano.service'
import { ColorService } from '../services/modelo/color.service'
import { TerminadoService } from '../services/modelo/terminado.service'
import { SortService } from '../directives/sortableComponent/sort.service'
import { FolioNewService } from '../services/folio/folio-new.service'
import { AlmacenProductoTerminadoService } from '../services/almacenDeProductoTerminado/almacen-producto-terminado.service'
import { HttpClientModule } from '@angular/common/http'
import { ImagenPipe } from '../pipes/imagen.pipe'
import { ReporteDeFaltantesAlamcenDeProduccionBaseImprimibleComponent } from '../pages/reportes/reporte-de-faltantes-almacen-de-produccion/reporte-de-faltantes-alamcen-de-produccion-base-imprimible/reporte-de-faltantes-alamcen-de-produccion-base-imprimible.component'
import { RPersonalizadoAlmacenProduccionImprimibleComponent } from '../pages/reportes/r-personalizado-almacen-produccion/r-personalizado-almacen-produccion-imprimible/r-personalizado-almacen-produccion-imprimible.component'
import { OrdenadorDeColumnasDirective } from '../directives/ordenador-de-columnas.directive'
import { DragDropModule} from '@angular/cdk/drag-drop'


@NgModule({
  imports: [
    RouterModule,
    // CommonModule trae el *ng-for
    CommonModule,
    PipesModule,
    DndModule,
    NgxMaskModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    // Para el httpcliente necesitamos importar este modulo.
    HttpClientModule,
    DragDropModule
    
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
    OrdenadorVisualComponent,
    OrganizadorDragAndDropComponent,
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
    DndModule,
    OrdenadorVisualComponent,
    OrganizadorDragAndDropComponent,
    ProgressBarComponent,
    NgxMaskModule,
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
  ]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [
        ModeloCompletoPipe,
        SettingsService,
        SidebarService,
        SharedService,
        UsuarioService,
        LoginGuardGuard,
        AdminGuard,
        SubirArchivoService,
        PreLoaderService,
        ModalUploadService,
        HospitalService,
        MedicoService,
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
        OrdenadorVisualService,
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
        DecimalPipe
      ]
    }
  }
}
