import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { ComponentsModule } from '../../../components/components.module'
import { UxModule } from '../../../ux/ux.module'
import { PedidoCrearEditarDetalleComponent } from '../../../components/pedidos/pedido-crear-editar-detalle/pedido-crear-editar-detalle.component'

const routes: Routes = [
  // { path: '', component: PedidoComponent, data: { titulo: 'Mis pedidos' } },

  {
    path: 'crear',
    component: PedidoCrearEditarDetalleComponent,
    data: { titulo: 'Crear pedido' }
  },
  {
    path: 'modificar/:id',
    component: PedidoCrearEditarDetalleComponent,
    data: { titulo: 'Modificar pedido' }
  },
  {
    path: 'detalle/:id',
    component: PedidoCrearEditarDetalleComponent,
    data: { titulo: 'Detalle pedido' }
  }
]

@NgModule({
  declarations: [
    // PedidoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    UxModule
  ]
})
export class PedidoModule {}
