import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { ComprasComponent } from './compras.component'
import { ProveedoresComponent } from './proveedores/proveedores.component'
import { DirectivesModule } from '../../directives/directives.module'
import { ComponentsModule } from '../../components/components.module'
import { UxModule } from '../../ux/ux.module'

const routes: Routes = [
  {
    path: '',
    component: ComprasComponent,
    data: { title: 'Tablero de compras' }
  },
  {
    path: 'proveedores',
    loadChildren: () =>
      import('./proveedor/proveedor.module').then(m => m.ProveedorModule)
  }
]

@NgModule({
  declarations: [ComprasComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ComprasModule {}
