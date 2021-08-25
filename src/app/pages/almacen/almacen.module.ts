import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { AlmacenComponent } from './almacen.component'
import { UxModule } from '../../ux/ux.module'
import { ComponentsModule } from '../../components/components.module'
import { AlmacenCrearModificarComponent } from './almacen-crear-modificar/almacen-crear-modificar.component'
import { AlmacenDetalleComponent } from './almacen-detalle/almacen-detalle.component'
import { AlmacenImagenesComponent } from './almacen-imagenes/almacen-imagenes.component'
import { DirectivesModule } from '../../directives/directives.module'

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
    path: 'modificar/:nombre/:id',
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
  },
  {
    path: 'imagenes/:nombre/:id',
    component: AlmacenImagenesComponent,
    data: {
      titulo: 'Agregar imagenes'
    }
  }
]

@NgModule({
  declarations: [
    AlmacenComponent,
    AlmacenCrearModificarComponent,
    AlmacenDetalleComponent,
    AlmacenImagenesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UxModule,
    ComponentsModule,
    DirectivesModule
  ]
})
export class AlmacenModule {}
