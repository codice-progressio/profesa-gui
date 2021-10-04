import { NgModule, ModuleWithProviders } from '@angular/core'
import { HeaderComponent } from './header/header.component'
import { SidebarComponent } from './sidebar/sidebar.component'
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component'
import { NopagefoundComponent } from './nopagefound/nopagefound.component'
import { RouterModule } from '@angular/router'
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common'
// Pipes
import { PipesModule } from '../pipes/pipes.module'
import { PreLoaderComponent } from '../components/pre-loader/pre-loader.component'
import { NivelUrgenciaComponent } from '../components/nivel-urgencia/nivel-urgencia.component'
import { PaginadorComponent } from '../components/paginador/paginador.component'
import { ProgressBarComponent } from '../components/progress-bar/progress-bar.component'
import { NgxMaskModule } from 'ngx-mask'
import { Paginador2Component } from '../components/paginador2/paginador2.component'
import { BotonParaImprecionComponent } from './boton-para-imprecion/boton-para-imprecion.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PaginadorAbstractoComponent } from './paginador-abstracto/paginador-abstracto.component'
import { DataListComponent } from './data-list/data-list.component'
import { VisorDeImagenesGeneralComponent } from './visor-de-imagenes-general/visor-de-imagenes-general.component'
import { CargaDeImagenesComponent } from './carga-de-imagenes/carga-de-imagenes.component'

import { PaginadorComponent as Paginador } from './paginador/paginador.component'
import { SettingsService } from '../services/settings/settings.service'
import { SidebarService } from '../services/shared/sidebar.service'

import { UsuarioService } from '../services/usuario/usuario.service'
import { LoginGuardGuard } from '../services/guards/login-guard.guard'
import { AdminGuard } from '../services/guards/admin.guard'
import { SubirArchivoService } from '../services/subir-archivo/subir-archivo.service'
import { PreLoaderService } from '../components/pre-loader/pre-loader.service'

import { VerificaTokenGuard } from '../services/guards/verifica-token.guard'
import { UtilidadesService } from '../services/utilidades/utilidades.service'
import { ManejoDeMensajesService } from '../services/utilidades/manejo-de-mensajes.service'
import { ValidacionesService } from '../services/utilidades/validaciones.service'
import { PermisosGuard } from '../services/guards/permisos.guard'
import { SortService } from '../directives/sortableComponent/sort.service'
import { ImagenPipe } from '../pipes/imagen.pipe'
import { OrdenadorDeColumnasDirective } from '../directives/ordenador-de-columnas.directive'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { FechaPipe } from '../pipes/fecha.pipe'
import { QRCodeModule } from 'angularx-qrcode'
import { ContieneElPermisoPipe } from '../pipes/contiene-el-permiso.pipe'
import { ZXingScannerModule } from '@zxing/ngx-scanner'
import { DirectivesModule } from '../directives/directives.module'

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

    ZXingScannerModule,
    DirectivesModule
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    NopagefoundComponent,
    BreadcrumbsComponent,
    PreLoaderComponent,
    NivelUrgenciaComponent,
    PaginadorComponent,
    // OrganizadorDragAndDropComponent,
    ProgressBarComponent,
    Paginador2Component,
    BotonParaImprecionComponent,
    PaginadorAbstractoComponent,
    DataListComponent,
    VisorDeImagenesGeneralComponent,
    CargaDeImagenesComponent,
    Paginador,
    OrdenadorDeColumnasDirective
  ],
  exports: [
    CommonModule,
    NopagefoundComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    PreLoaderComponent,
    PaginadorComponent,
    // OrganizadorDragAndDropComponent,
    ProgressBarComponent,
    Paginador2Component,
    BotonParaImprecionComponent,
    DataListComponent,
    VisorDeImagenesGeneralComponent,
    Paginador,
    CargaDeImagenesComponent,
    OrdenadorDeColumnasDirective,
    FormsModule,
    NgxMaskModule,
    PipesModule,
    DragDropModule,
    QRCodeModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        SettingsService,
        SidebarService,
        UsuarioService,
        LoginGuardGuard,
        AdminGuard,
        SubirArchivoService,
        PreLoaderService,
        VerificaTokenGuard,
        UtilidadesService,
        ManejoDeMensajesService,
        ValidacionesService,
        PermisosGuard,
        SortService,
        ImagenPipe,
        FechaPipe,
        DecimalPipe,
        DatePipe,
        ContieneElPermisoPipe
      ]
    }
  }
}
