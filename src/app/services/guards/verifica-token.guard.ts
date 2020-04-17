import { Injectable } from '@angular/core'
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router'
import { UsuarioService } from '../usuario/usuario.service'
import { JwtHelperService } from '@auth0/angular-jwt'
const jwtHelper = new JwtHelperService()

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {
  constructor(public _usuarioService: UsuarioService, public router: Router) {}
  canActivate(): Promise<boolean> | boolean {
    const token = localStorage.getItem('token')
    if (!token) {
      this.navegarAlLogin()
      return false
    }
    // Recuperar la fecha de expiración del token.
    if (jwtHelper.isTokenExpired(token)) {
      this.navegarAlLogin()
      this._usuarioService.msjService.informar('Sesion caduca')
      return false
    }

    // return this.verificaRenueva(jwtHelper.getTokenExpirationDate(token))
  }

  verificaRenueva(fechaExp: Date): Promise<boolean> {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, reject) => {
      const ahora = new Date()

      ahora.setTime(ahora.getTime() + 1 * 60 * 60 * 1000)

      if (fechaExp.getTime() > ahora.getTime()) {
        resolve(true)
      } else {
        this._usuarioService.renuevaToken().subscribe(
          () => {
            resolve(true)
          },
          () => {
            this.router.navigate(['/login'])
            reject(false)
          }
        )
      }
    })
  }

  navegarAlLogin() {
    this._usuarioService.logout()
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
