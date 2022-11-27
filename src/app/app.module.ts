import { BrowserModule } from '@angular/platform-browser'

// FECHAS EN ESPAÑOL
import { NgModule, LOCALE_ID } from '@angular/core'
import localePy from '@angular/common/locales/es-MX'
import {
  registerLocaleData,
  APP_BASE_HREF,
  CommonModule
} from '@angular/common'
registerLocaleData(localePy, 'es-MX')

// Rutas
// Componentes
import { AppComponent } from './app.component'
import { LoginComponent } from './login/login.component'
import { PagesComponent } from './pages/pages.component'
import { SharedModule } from './shared/shared.module'
import { NgxMaskModule } from 'ngx-mask'
import { JwtModule } from '@auth0/angular-jwt'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ImperiumSicComponent } from './imperium-sic/imperium-sic.component'
import { RouterModule, Routes } from '@angular/router'
import { LoginGuardGuard } from './services/guards/login-guard.guard'
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component'
import { ErrorInterceptor } from './interceptors/error.interceptor'
import { ToastrModule } from 'ngx-toastr'
import { ConfirmarUsuarioComponent } from './confirmar-usuario/confirmar-usuario.component'
import { environment } from '../environments/environment'
import { RecuperarContrasenaComponent } from './recuperar-contrasena/recuperar-contrasena.component'
import { ServiceWorkerModule } from '@angular/service-worker'
import { NgxCsvParserModule } from 'ngx-csv-parser'
import { ModalModule } from '@codice-progressio/modal'
import { PedidosEstructuraOfflineComponent } from './pedidos-estructura-offline/pedidos-estructura-offline.component'
import { EnvServiceProvider } from './services/env.service.provider'
import { ImpresionPlantillaGeneralComponent } from './componentes-modulares/impresion/impresion-plantilla-general/impresion-plantilla-general.component';

export function tokenGetter() {
  let token = localStorage.getItem('token')
  if(!token) token = localStorage.getItem('token_offline')
  return token
}

declare var window: any

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'IMPERIUMsic', component: ImperiumSicComponent },
  { path: 'usuario/confirmar', component: ConfirmarUsuarioComponent },

  {
    path: 'offline/pedidos',

    component: PedidosEstructuraOfflineComponent,
    loadChildren: () =>
      import('./pages/ventas/ventas.module').then(m => m.VentasModule)
  },
  {
    path: 'usuario/recuperar-contrasena',
    component: RecuperarContrasenaComponent
  },
  
  {
    path: 'imprimir',
    component: ImpresionPlantillaGeneralComponent,
    loadChildren: () => import('./componentes-modulares/impresion/impresion.module').then(m => m.ImpresionModule)
  },

  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Página de error cuando no encuentra una ruta.
  { path: '**', component: NopagefoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagesComponent,
    ImperiumSicComponent,
    ConfirmarUsuarioComponent,
    RecuperarContrasenaComponent,
    PedidosEstructuraOfflineComponent
  ],

  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {
      useHash: false,
      relativeLinkResolution: 'legacy'
    }),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      enableHtml: true,
      progressBar: true,
      progressAnimation: 'increasing'
    }),
    HttpClientModule,
    NgxMaskModule.forRoot(),
    SharedModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [
          //Importacion por fuerza
          window.__env.URL_DOMINIO,
          'http://localhost:9090',
          'http://127.0.0.1:9090'
        ]
      }
    }),
    ModalModule,
    NgxCsvParserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    // Configuraciones de idioma.
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LOCALE_ID, useValue: 'es-MX' },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    EnvServiceProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
