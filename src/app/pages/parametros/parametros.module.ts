import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { ParametrosComponent } from './parametros.component'
import { ComponentsModule } from '../../components/components.module'
import permisosKeysConfig from 'src/app/config/permisosKeys.config'
import { PermisosGuard } from 'src/app/services/guards/permisos.guard'
import { VerificaTokenGuard } from 'src/app/services/guards/verifica-token.guard'
import { ParametrosListaDePreciosComponent } from './parametros-lista-de-precios/parametros-lista-de-precios.component'
import { FormsModule } from '@angular/forms';
import { ParametrosSkuEnLotesComponent } from './parametros-sku-en-lotes/parametros-sku-en-lotes.component';
import { ParametrosListaDePreciosEnLotesComponent } from './parametros-lista-de-precios-en-lotes/parametros-lista-de-precios-en-lotes.component'

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
  declarations: [ParametrosComponent, ParametrosListaDePreciosComponent, ParametrosSkuEnLotesComponent, ParametrosListaDePreciosEnLotesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    FormsModule
  ]
})
export class ParametrosModule {}
