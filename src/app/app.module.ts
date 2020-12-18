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
import { APP_ROUTES } from './app.routes'

// Componentes
import { AppComponent } from './app.component'
import { LoginComponent } from './login/login.component'
import { PagesComponent } from './pages/pages.component'
import { SharedModule } from './shared/shared.module'
import { NgxMaskModule } from 'ngx-mask'
import { JwtModule } from '@auth0/angular-jwt'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { URL_DOMINIO } from './config/config'
import { MarkdownModule } from 'ngx-markdown'
import { ImperiumSicComponent } from './imperium-sic/imperium-sic.component'

export function tokenGetter() {
  return localStorage.getItem('token')
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagesComponent,
    ImperiumSicComponent
  ],

  imports: [
    CommonModule,
    BrowserModule,
    APP_ROUTES,
    BrowserAnimationsModule, // required animations module
    HttpClientModule,
    NgxMaskModule.forRoot(),
    SharedModule.forRoot(),
    MarkdownModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [URL_DOMINIO],
        blacklistedRoutes: [URL_DOMINIO + '/login']
      }
    })
  ],
  providers: [
    // Configuraciones de idioma.
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LOCALE_ID, useValue: 'es-MX' }
    // Interceptor para agregar Bearer token.
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
