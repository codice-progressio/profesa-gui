import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { VentasComponent } from './ventas.component'

const routes: Routes = [
  { path: '', component: VentasComponent },
  {
    path: 'misPedidos',
    loadChildren: () =>
      import('./pedido/pedido.module').then(m => m.PedidoModule)
  }
]

@NgModule({
  declarations: [VentasComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class VentasModule {}
