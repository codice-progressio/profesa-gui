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
import { ModeloCompletoComponent } from '../components/modelo-completo/modelo-completo.component';
import { QrScannerComponent } from '../components/qr-scanner/qr-scanner.component';
import { ValidacionInputsComponent } from '../components/validacion-inputs/validacion-inputs.component';
import {DndModule} from 'ng2-dnd';


@NgModule({
    imports: [
        RouterModule,
        // CommonModule trae el *ng-for
        CommonModule,
        PipesModule,
        DndModule
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
        ModeloCompletoComponent,
        QrScannerComponent,
        ValidacionInputsComponent,
        
        
        
        
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
        ModeloCompletoComponent,
        QrScannerComponent,
        ValidacionInputsComponent,
        
        DndModule,
        
        
        
    ]
})

export class SharedModule {}
