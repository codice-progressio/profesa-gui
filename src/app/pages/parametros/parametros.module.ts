import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { ParametrosComponent } from './parametros.component'
import { ComponentsModule } from '../../components/components.module'
import permisosKeysConfig from 'src/app/config/permisosKeys.config'
import { PermisosGuard } from 'src/app/services/guards/permisos.guard'
import { VerificaTokenGuard } from 'src/app/services/guards/verifica-token.guard'

const routes: Routes = [
  {
    path: '',
    component: ParametrosComponent,

    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Parametros',
      permissions: permisosKeysConfig['menu:administrador:parametros']
    }
  },
  {
    path: 'rutas-de-entrega',
    loadChildren: () => import('./rutas/rutas.module').then(m => m.RutasModule),

    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Rutas de entrega',
      permissions: permisosKeysConfig['menu:administrador:parametros']
    }
  }
]

@NgModule({
  declarations: [ParametrosComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ComponentsModule]
})
export class ParametrosModule {}
