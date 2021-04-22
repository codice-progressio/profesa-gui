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
import { URL_DOMINIO } from './config/config'
import { MarkdownModule } from 'ngx-markdown'
import { ImperiumSicComponent } from './imperium-sic/imperium-sic.component'
import { RouterModule, Routes } from '@angular/router'
import { LoginGuardGuard } from './services/guards/login-guard.guard'
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component'
import { ErrorInterceptor } from './interceptors/error.interceptor'
import { ToastrModule } from 'ngx-toastr'

export function tokenGetter() {
  localStorage.getItem('token')
  let token = localStorage.getItem('token')
  console.log({ token })
  return token
}

export function allowedDomains(): string[] {
  let d = [URL_DOMINIO.concat(''), 'herokuapp.com']
  console.log(d)
  return d
}

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'IMPERIUMsic', component: ImperiumSicComponent },

  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },

  // Página de error cuando no encuentra una ruta.
  { path: '**', component: NopagefoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagesComponent,
    ImperiumSicComponent
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
    MarkdownModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        // allowedDomains: allowedDomains(),
        // disallowedRoutes: disallowedRoutes(),
        throwNoTokenError: true
      }
    })
  ],
  providers: [
    // Configuraciones de idioma.
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LOCALE_ID, useValue: 'es-MX' },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

function disallowedRoutes(): (string | RegExp)[] {
  let a = [URL_DOMINIO.concat('/login')].map(x => 'https://'.concat(x))

  console.log(a)
  return a
}
