import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { PedidoCrearEditarDetalleComponent } from './pedido-crear-editar-detalle/pedido-crear-editar-detalle.component'
import { PedidoComponent } from './pedido.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { InputValidacionesModule } from '@codice-progressio/input-validaciones'
import { ModalModule } from '@codice-progressio/modal'
import { ComponentsModule } from '../../../components/components.module'
import { NgxMaskModule } from 'ngx-mask'

const routes: Routes = [
  { path: '', component: PedidoComponent, data: { titulo: 'Mis pedidos' } },

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
  declarations: [PedidoComponent, PedidoCrearEditarDetalleComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputValidacionesModule,
    ModalModule,
    ComponentsModule,
    NgxMaskModule
  ]
})
export class PedidoModule {}
