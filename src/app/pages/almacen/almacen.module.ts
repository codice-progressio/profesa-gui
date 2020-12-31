import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { AlmacenComponent } from './almacen.component'
import { UxModule } from '../../ux/ux.module'
import { ComponentsModule } from '../../components/components.module'
import { AlmacenCrearModificarComponent } from './almacen-crear-modificar/almacen-crear-modificar.component'

const routes: Routes = [
  {
    path: '',
    component: AlmacenComponent,
    data: {
      titulo: 'Almacen'
    }
  },
  {
    path: 'crear',
    component: AlmacenCrearModificarComponent,
    data: {
      titulo: 'Crear SKU'
    }
  },
  {
    path: 'Modificar',
    component: AlmacenCrearModificarComponent,
    data: {
      titulo: 'Modificar SKU'
    }
  }
]

@NgModule({
  declarations: [AlmacenComponent, AlmacenCrearModificarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UxModule,
    ComponentsModule
  ]
})
export class AlmacenModule {}
