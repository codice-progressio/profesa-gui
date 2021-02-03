import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { ComprasComponent } from './compras.component'

const routes: Routes = [
  {
    path: '',
    component: ComprasComponent,
    data: { title: 'Tablero de compras' }
  },
  {
    path: 'contactos',
    loadChildren: () =>
      import('./proveedor/proveedor.module').then(m => m.ProveedorModule)
  }
]

@NgModule({
  declarations: [ComprasComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ComprasModule {}
