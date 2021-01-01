import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { AlmacenComponent } from './almacen.component'
import { UxModule } from '../../ux/ux.module'
import { ComponentsModule } from '../../components/components.module'
import { AlmacenCrearModificarComponent } from './almacen-crear-modificar/almacen-crear-modificar.component'
import { AlmacenDetalleComponent } from './almacen-detalle/almacen-detalle.component'

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
    path: 'modificar/:nombre',
    component: AlmacenCrearModificarComponent,
    data: {
      titulo: 'Modificar SKU'
    }
  },
  {
    path: 'detalle/:nombre/:id',
    component: AlmacenDetalleComponent,
    data: {
      titulo: 'Detalle SKU'
    }
  }
]

@NgModule({
  declarations: [
    AlmacenComponent,
    AlmacenCrearModificarComponent,
    AlmacenDetalleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UxModule,
    ComponentsModule
  ]
})
export class AlmacenModule {}
