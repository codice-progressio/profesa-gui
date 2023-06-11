import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { ListaDePreciosComponent } from './lista-de-precios.component'
import { ListaDePreciosCrearModificarDetalleComponent } from './lista-de-precios-crear-modificar-detalle/lista-de-precios-crear-modificar-detalle.component'
import { ReactiveFormsModule } from '@angular/forms'
import { InputValidacionesModule } from '@codice-progressio/input-validaciones'
import { ModalModule } from '@codice-progressio/modal'
import { ComponentsModule } from 'src/app/components/components.module'
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask'
import { NgModule } from '@angular/core'
import { from } from 'rxjs'
import permisosKeysConfig from 'src/app/config/permisosKeys.config'
import { PermisosGuard } from 'src/app/services/guards/permisos.guard'
import { VerificaTokenGuard } from 'src/app/services/guards/verifica-token.guard'

const routes: Routes = [
  {
    data: {
      titulo: 'Listas de precios',
      permissions: permisosKeysConfig['lista-de-precios:leer:todo']
    },
    path: '',
    component: ListaDePreciosComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard]
  },
  {
    data: {
      titulo: 'Crear lista de precio',
      permissions: permisosKeysConfig['lista-de-precios:crear']
    },
    path: 'crear',
    component: ListaDePreciosCrearModificarDetalleComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard]
  },
  {
    data: {
      titulo: 'Modificar lista de precio',
      permissions: permisosKeysConfig['lista-de-precios:modificar:id']
    },
    path: 'modificar/:id',
    component: ListaDePreciosCrearModificarDetalleComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard]
  },
  {
    data: {
      titulo: 'Detalle lista de precio',
      permissions: permisosKeysConfig['lista-de-precios:leer:id']
    },
    path: 'detalle/:id',
    component: ListaDePreciosCrearModificarDetalleComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard]
  }
]

@NgModule({
  declarations: [
    ListaDePreciosComponent,
    ListaDePreciosCrearModificarDetalleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    InputValidacionesModule,
    ModalModule,
    ComponentsModule,
    NgxMaskDirective, NgxMaskPipe
  ],
  providers: [provideNgxMask()]

})
export class ListaDePreciosModule {}
