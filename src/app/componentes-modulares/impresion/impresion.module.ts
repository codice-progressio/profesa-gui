import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpresionPlantillaGeneralComponent } from './impresion-plantilla-general/impresion-plantilla-general.component';
import { Routes, RouterModule } from '@angular/router';
import { ImpresionPedidoNubeComponent } from './impresion-pedido-nube/impresion-pedido-nube.component';


const appRoutes: Routes = [
  { path: 'pedido-nube', component: ImpresionPedidoNubeComponent }
]

@NgModule({
  declarations: [
    ImpresionPlantillaGeneralComponent,
    ImpresionPedidoNubeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)
  ],
})
export class ImpresionModule { }
