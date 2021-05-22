import { Injectable } from '@angular/core'
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router'
import { UsuarioService } from '../usuario/usuario.service'
import { JwtHelperService } from '@auth0/angular-jwt'
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service'
const jwtHelper = new JwtHelperService()

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {
  constructor(
    public _usuarioService: UsuarioService,
    public router: Router,
    public msjSErvice: ManejoDeMensajesService
  ) {}
  canActivate(): Promise<boolean> | boolean {
    const token = localStorage.getItem('token')
    if (!token) {
      this.msjSErvice.toast.info('No hay un token. Necesitas loguearte')
      this.navegarAlLogin()
      return false
    }
    // Recuperar la fecha de expiración del token.
    if (jwtHelper.isTokenExpired(token)) {
      this.navegarAlLogin()
      this._usuarioService.msjService.informar('Sesion caduca')
      return false
    }

    return true
  }

  navegarAlLogin() {
    this._usuarioService.logout()
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
