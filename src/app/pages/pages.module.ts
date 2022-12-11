import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import permisosKeysConfig from '../config/permisosKeys.config'
import { PermisosGuard } from '../services/guards/permisos.guard'
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard'

import { SharedModule } from '../shared/shared.module'
import { DashboardComponent } from './dashboard/dashboard.component'
import { AdministradorComponent } from './parametros/administrador/administrador.component'
import { ProfileComponent } from './profile/profile.component'
import { AccountsSettingsComponent } from './accounts-settings/accounts-settings.component'
import { TotalContactosComponent } from './dashboard/estadisticas/total-contactos/total-contactos.component'
import { TotalSkusComponent } from './dashboard/estadisticas/total-skus/total-skus.component'
import { CostoInventarioComponent } from './dashboard/estadisticas/costo-inventario/costo-inventario.component'
import { VentasUltimoMesComponent } from './dashboard/estadisticas/ventas-ultimo-mes/ventas-ultimo-mes.component'
import { DiezMasVendidosComponent } from './dashboard/estadisticas/diez-mas-vendidos/diez-mas-vendidos.component'
import { VentasPorVendedorComponent } from './dashboard/estadisticas/ventas-por-vendedor/ventas-por-vendedor.component'
import { MejorClienteComponent } from './dashboard/estadisticas/mejor-cliente/mejor-cliente.component'
import { PedidosHoyComponent } from './dashboard/estadisticas/pedidos-hoy/pedidos-hoy.component'

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { EstadisticaRecargarComponent } from './dashboard/estadisticas/estadistica-recargar/estadistica-recargar.component';
import { ModalModule } from '@codice-progressio/modal';
import { ModalWrapperModule } from '../componentes-modulares/modal-wrapper/modal-wrapper.module';

const pagesRoutes: Routes = [
  //  <!--
  //  =====================================
  //   Principal
  //  =====================================
  //  -->
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],
    data: {
      titulo: 'Dashboard',
      permissions: permisosKeysConfig.login
    }
  },

  //  <!--
  //  =====================================
  //   END Principal
  //  =====================================
  //  -->

  {
    path: 'perfil',
    component: ProfileComponent,
    data: { titulo: 'Perfil de usuario.' }
  },

  // Redirige al dashboard cuando no se ha puesto nada en la url.
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },

  {
    path: 'account-settings',
    component: AccountsSettingsComponent,
    canActivate: [VerificaTokenGuard, PermisosGuard],

    data: {
      titulo: 'Informaciónde la cuenta',
      permissions: permisosKeysConfig.login
    }
  },
  {
    path: 'almacen',
    loadChildren: () =>
      import('./almacen/almacen.module').then(m => m.AlmacenModule),
    canActivate: [VerificaTokenGuard]
  },
  {
    path: 'compras',
    loadChildren: () =>
      import('./compras/compras.module').then(m => m.ComprasModule),
    canActivate: [VerificaTokenGuard]
  },
  {
    path: 'usuario',
    loadChildren: () =>
      import('./usuarios/usuarios.module').then(m => m.UsuariosModule),
    canActivate: [VerificaTokenGuard]
  },
  {
    path: 'ventas',
    loadChildren: () =>
      import('./ventas/ventas.module').then(m => m.VentasModule)
  },
  {
    path: 'parametros',
    loadChildren: () =>
      import('./parametros/parametros.module').then(m => m.ParametrosModule)
  },
  {
    path: 'punto-de-venta',
    loadChildren: () =>
      import('./punto-de-venta/punto-de-venta.module').then(
        m => m.PuntoDeVentaModule
      )
  },
  {
    path: 'contabilidad',
    loadChildren: () =>
      import('./contabilidad/contabilidad.module').then(
        m => m.ContabilidadModule
      ),
    data: {
      permissions: permisosKeysConfig['menu:contabilidad']
    }
  }
]

@NgModule({
  declarations: [
    DashboardComponent,
    AccountsSettingsComponent,
    ProfileComponent,
    // sistema
    AdministradorComponent,
    TotalContactosComponent,
    TotalSkusComponent,
    CostoInventarioComponent,
    VentasUltimoMesComponent,
    DiezMasVendidosComponent,
    VentasPorVendedorComponent,
    MejorClienteComponent,
    PedidosHoyComponent,
    EstadisticaRecargarComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    RouterModule.forChild(pagesRoutes),
    NgxChartsModule,
    ModalModule,
    ModalWrapperModule
  ],
  providers: []
})
export class PagesModule {}
