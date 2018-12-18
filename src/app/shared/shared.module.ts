import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Pipes
import { PipesModule } from '../pipes/pipes.module';

import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { BuscadorRapidoComponent } from '../components/buscador-rapido/buscador-rapido.component';
import { PreLoaderComponent } from '../components/pre-loader/pre-loader.component';
import { NivelUrgenciaComponent } from '../components/nivel-urgencia/nivel-urgencia.component';
import { PaginadorComponent } from '../components/paginador/paginador.component';
import { ListaDeOrdenesComponent } from '../components/lista-de-ordenes/lista-de-ordenes.component';
import { QrScannerComponent } from '../components/qr-scanner/qr-scanner.component';
import { ValidacionInputsComponent } from '../components/validacion-inputs/validacion-inputs.component';
import {DndModule} from 'ng2-dnd';
import { OrdenadorVisualComponent } from '../components/ordenador-visual/ordenador-visual.component';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar.component';
import { ModeloCompletoPipe } from '../pipes/modelo-completo.pipe';
import {NgxMaskModule} from 'ngx-mask'





@NgModule({
    imports: [
        RouterModule,
        // CommonModule trae el *ng-for
        CommonModule,
        PipesModule,
        DndModule,
        NgxMaskModule
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
        ProgressBarComponent
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
        ProgressBarComponent,
        NgxMaskModule
    ],
    providers:[ModeloCompletoPipe]
})

export class SharedModule {}
