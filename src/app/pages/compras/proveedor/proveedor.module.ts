import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { ProveedorComponent } from './proveedor.component'

import { ComponentsModule } from 'src/app/components/components.module'
import { DirectivesModule } from 'src/app/directives/directives.module'
import { UxModule } from 'src/app/ux/ux.module'
import { ProveedorCrearEditarComponent } from './proveedor-crear-editar/proveedor-crear-editar.component'
import { ReactiveFormsModule } from '@angular/forms'
import { ModalModule } from '@codice-progressio/modal'
import { PipesModule } from '../../../pipes/pipes.module'

const routes: Routes = [
  { path: '', component: ProveedorComponent, data: { titulo: 'Contactos' } },
  {
    path: 'crear',
    component: ProveedorCrearEditarComponent,
    data: { titulo: 'Crear contacto' }
  },
  {
    path: 'modificar/:nombre/:id',
    component: ProveedorCrearEditarComponent,
    data: { titulo: 'Modificar contacto' }
  },
  {
    path: 'detalle/:nombre/:id',
    component: ProveedorCrearEditarComponent,
    data: { titulo: 'Detalle contacto' }
  }
]

@NgModule({
  declarations: [
    ProveedorComponent,
    ProveedorCrearEditarComponent,
    ProveedorCrearEditarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DirectivesModule,
    ComponentsModule,
    UxModule,
    ReactiveFormsModule,
    ModalModule,
    PipesModule

  ]
})
export class ProveedorModule {}
