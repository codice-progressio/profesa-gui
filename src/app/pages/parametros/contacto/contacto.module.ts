import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { ProveedorComponent } from './contacto.component'

import { ComponentsModule } from 'src/app/components/components.module'
import { DirectivesModule } from 'src/app/directives/directives.module'
import { UxModule } from 'src/app/ux/ux.module'
import { ContactoCrearEditarComponent } from './contacto-crear-editar/contacto-crear-editar.component'
import { ReactiveFormsModule } from '@angular/forms'
import { ModalModule } from '@codice-progressio/modal'
import { PipesModule } from '../../../pipes/pipes.module'

const routes: Routes = [
  { path: '', component: ProveedorComponent, data: { titulo: 'Contactos' } },
  {
    path: 'crear',
    component: ContactoCrearEditarComponent,
    data: { titulo: 'Crear contacto' }
  },
  {
    path: 'modificar/:nombre/:id',
    component: ContactoCrearEditarComponent,
    data: { titulo: 'Modificar contacto' }
  },
  {
    path: 'detalle/:nombre/:id',
    component: ContactoCrearEditarComponent,
    data: { titulo: 'Detalle contacto' }
  }
]

@NgModule({
  declarations: [
    ProveedorComponent,
    ContactoCrearEditarComponent,
    ContactoCrearEditarComponent
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
export class ContactoModule {}
