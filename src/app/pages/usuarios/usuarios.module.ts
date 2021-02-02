import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { UsuariosComponent } from './usuarios.component'
import { UsuarioDetalleComponent } from './usuario-detalle/usuario-detalle.component'
import { UsuarioCrearEditarComponent } from './usuario-crear-editar/usuario-crear-editar.component'
import permisosKeysConfig from 'src/app/config/permisosKeys.config'
import { VerificaTokenGuard } from '../../services/guards/verifica-token.guard'
import { PermisosGuard } from '../../services/guards/permisos.guard'
import { DirectivesModule } from '../../directives/directives.module'
import { PipesModule } from '../../pipes/pipes.module'
import { ComponentsModule } from '../../components/components.module'
import { UxModule } from '../../ux/ux.module'
import { ReactiveFormsModule } from '@angular/forms'

const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Usuarios',
      permissions: permisosKeysConfig['administrador:usuario:leer']
    }
  },
  {
    path: 'crear',
    component: UsuarioCrearEditarComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Crear usuario',
      permissions: permisosKeysConfig['administrador:usuario:leer']
    }
  },
  {
    path: 'modificar/:nombre/:id',
    component: UsuarioCrearEditarComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Modificar usuario',
      permissions: permisosKeysConfig['administrador:usuario:modificar']
    }
  },
  {
    path: 'detalle/:nombre/:id',
    component: UsuarioDetalleComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Modificar usuario',
      permissions: permisosKeysConfig['administrador:usuario:leer:id']
    }
  }
]

@NgModule({
  declarations: [
    UsuariosComponent,
    UsuarioDetalleComponent,
    UsuarioCrearEditarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DirectivesModule,
    PipesModule,
    ComponentsModule,
    UxModule,
    ReactiveFormsModule
  ]
})
export class UsuariosModule {}
