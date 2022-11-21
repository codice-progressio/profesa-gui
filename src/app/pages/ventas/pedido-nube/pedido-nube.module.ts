import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PedidoNubeCrearEditarDetalleComponent } from './pedido-nube-crear-editar-detalle/pedido-nube-crear-editar-detalle.component'
import { PedidoNubeListaComponent } from './pedido-nube-lista/pedido-nube-lista.component'
import { RouterModule, Routes } from '@angular/router'
import { UxModule } from 'src/app/ux/ux.module'
import { ComponentsModule } from 'src/app/components/components.module'

const routes: Routes = [
  {
    path: '',
    component: PedidoNubeListaComponent
  },

  {
    path: ':pedido',
    component: PedidoNubeCrearEditarDetalleComponent
  }
]

@NgModule({
  declarations: [
    PedidoNubeCrearEditarDetalleComponent,
    PedidoNubeListaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UxModule,
    ComponentsModule
  ]
})
export class PedidoNubeModule {}
