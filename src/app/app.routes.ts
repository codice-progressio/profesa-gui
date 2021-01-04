// RouterModule sirve para para poderlos importar. Se define el modulo.
import { RouterModule, Routes } from '@angular/router'

import { LoginComponent } from './login/login.component'
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component'
import { PagesComponent } from './pages/pages.component'
import { LoginGuardGuard } from './services/guards/login-guard.guard'
import { PermisosGuard } from './services/guards/permisos.guard'
import { VerificaTokenGuard } from './services/guards/verifica-token.guard'
import { ImperiumSicComponent } from './imperium-sic/imperium-sic.component'



// La palabra "export" es para poder importar la ruta desde
// otro lugar.

export const APP_ROUTES = "appRoutes"
