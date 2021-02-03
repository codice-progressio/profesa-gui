import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { ProveedorComponent } from './proveedor.component'

import { ComponentsModule } from 'src/app/components/components.module'
import { DirectivesModule } from 'src/app/directives/directives.module'
import { UxModule } from 'src/app/ux/ux.module'
import { ProveedorCrearEditarComponent } from './proveedor-crear-editar/proveedor-crear-editar.component'
import { ProveedorDetalleComponent } from './proveedor-detalle/proveedor-detalle.component'
import { ReactiveFormsModule } from '@angular/forms'

const routes: Routes = [
  { path: '', component: ProveedorComponent, data: { titulo: 'Proveedores' } },
  {
    path: 'crear',
    component: ProveedorCrearEditarComponent,
    data: { titulo: 'Proveedores' }
  },
  {
    path: 'modificar/:nombre/:id',
    component: ProveedorCrearEditarComponent,
    data: { titulo: 'Modificar proveedoor' }
  }
]

@NgModule({
  declarations: [
    ProveedorComponent,
    ProveedorCrearEditarComponent,
    ProveedorCrearEditarComponent,
    ProveedorDetalleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DirectivesModule,
    ComponentsModule,
    UxModule,
    ReactiveFormsModule
  ]
})
export class ProveedorModule {}
