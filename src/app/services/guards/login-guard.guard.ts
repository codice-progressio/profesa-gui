import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
// Este import tiene que ser así por que si llamamos a service directamente
// nos da un error extraño en la consola.
import { UsuarioService } from '../usuario/usuario.service'

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(public _usuarioService: UsuarioService, public router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token')
    if (token) {
      if (token.length > 5) return true
    }
    // Si el usuario ya no esta logueado nos manda al login.
    this.router.navigate(['/login'])
    return false
  }
}
