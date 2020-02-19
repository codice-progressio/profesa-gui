

// RouterModule sirve para para poderlos importar. Se define el modulo.
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';
import { PermisosGuard } from './services/guards/permisos.guard'
import { VerificaTokenGuard } from './services/guards/verifica-token.guard'


const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    
    
    // Esto es lo que hace el lazy load
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard, VerificaTokenGuard],
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
    },
    
    // Página de error cuando no encuentra una ruta.
    {path: '**', component: NopagefoundComponent}

];

// La palabra "export" es para poder importar la ruta desde
// otro lugar.

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: false});
