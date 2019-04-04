import { BrowserModule } from '@angular/platform-browser';

// FECHAS EN ESPAÑOL
import { NgModule, LOCALE_ID } from '@angular/core';
import localePy from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePy, 'es-MX');

// Rutas
import { APP_ROUTES } from './app.routes';



// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';

// temporal
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

// Servicios
import { ServiceModule } from './services/service.module';
import { SharedModule } from './shared/shared.module';
import {DndModule} from 'ng2-dnd';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';

import {NgxMaskModule} from 'ngx-mask';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent,
  
   
  ],
  // CUANDO MIREMOS UNA PALABRA MODULO SIEMPRE TIENEN QUE IR DENTRO DEL
  // IMPORT.
  imports: [
    BrowserModule,
    APP_ROUTES,
    // PagesModule, //Lo quitamos por que se esta cargando de forma dinámica con en lazyload.???
    FormsModule,
    ServiceModule,
    ReactiveFormsModule,
    SharedModule,
    DndModule.forRoot(),
    NgxMaskModule.forRoot()
    
  ],
  providers: [
   
    // Configuraciones de idioma. 
    { provide: LOCALE_ID, useValue: 'es-MX' },
    // Interceptor para agregar Bearer token. 
    {provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
