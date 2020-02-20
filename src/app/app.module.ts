import { BrowserModule } from "@angular/platform-browser"

// FECHAS EN ESPAÑOL
import { NgModule, LOCALE_ID } from "@angular/core"
import localePy from "@angular/common/locales/es-MX"
import { registerLocaleData, APP_BASE_HREF, CommonModule } from '@angular/common'
registerLocaleData(localePy, "es-MX")

// Rutas
import { APP_ROUTES } from "./app.routes"

// Componentes
import { AppComponent } from "./app.component"
import { LoginComponent } from "./login/login.component"
import { RegisterComponent } from "./login/register.component"
import { PagesComponent } from "./pages/pages.component"

import { SharedModule } from "./shared/shared.module"

import { NgxMaskModule } from "ngx-mask";
import { HTTP_INTERCEPTORS } from "@angular/common/http"
import { TokenInterceptor } from "./interceptors/token.interceptor"

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent,
  ],
  
  imports: [
    CommonModule,
    BrowserModule,
    APP_ROUTES,
    SharedModule.forRoot(),
  ],
  providers: [
    // Configuraciones de idioma.
    {provide: APP_BASE_HREF, useValue : '/' },
    { provide: LOCALE_ID, useValue: "es-MX" },
    // Interceptor para agregar Bearer token.
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
