import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { ContabilidadComponent } from './contabilidad.component'
import { ComponentsModule } from '../../components/components.module'
import { ControlRemisionesComponent } from '../../components/control-remisiones/control-remisiones.component'
import permisosKeysConfig from 'src/app/config/permisosKeys.config'

const routes: Routes = [
  {
    path: '',
    component: ContabilidadComponent,
    data: {
      titulo: 'Tablero contable',
      permissions: permisosKeysConfig['menu:contabilidad:tablero-contable']
    }
  },
  {
    path: 'remisiones',
    component: ControlRemisionesComponent,
    data: {
      titulo: 'Remisiones',
      permissions: permisosKeysConfig['menu:contabilidad:remisiones']
    }
  },
  {
    path: 'facturas',
    component: undefined,
    data: {
      titulo: 'Facturas',
      permissions: permisosKeysConfig['menu:contabilidad:facturas']
    }
  }
]

@NgModule({
  declarations: [ContabilidadComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ComponentsModule]
})
export class ContabilidadModule {}
