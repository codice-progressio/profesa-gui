import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { RutasComponent } from './rutas.component'
import { RutaCrearEditarDetalleComponent } from './ruta-crear-editar-detalle/ruta-crear-editar-detalle.component'
import { SharedModule } from '../../../shared/shared.module'
import { ComponentsModule } from '../../../components/components.module'
import { ReactiveFormsModule } from '@angular/forms'

const routes: Routes = [
  { path: '', component: RutasComponent, data: { titulo: 'Rutas existentes' } },
  {
    path: 'crear',
    component: RutaCrearEditarDetalleComponent,
    data: { titulo: 'Crear ruta' }
  },
  {
    path: 'editar/:nombre/:id',
    component: RutaCrearEditarDetalleComponent,
    data: { titulo: 'Editar ruta' }
  },
  {
    path: 'detalle/:nombre/:id',
    component: RutaCrearEditarDetalleComponent,
    data: { titulo: 'Detalle de ruta' }
  }
]

@NgModule({
  declarations: [RutasComponent, RutaCrearEditarDetalleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ReactiveFormsModule
  ]
})
export class RutasModule {}
