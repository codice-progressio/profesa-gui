import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { UsuarioService } from '../usuario/usuario.service'
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service'
import permisosKeysConfig from 'src/app/config/permisosKeys.config'

@Injectable({
  providedIn: 'root'
})
export class AdminGuard  {
  constructor(
    public _usuarioService: UsuarioService,
    public _msj: ManejoDeMensajesService,
    public router: Router
  ) {}

  canActivate() {
    let administrador = permisosKeysConfig.administrador
    let permisosUsuario = this._usuarioService.usuario.permissions
    if (permisosUsuario.includes(administrador)) return true

    this._msj.invalido(
      'No estas autorizado para entrar a este contenido.',
      'No tienes los permisos necesarios.',
      5000
    )
    return false
  }
}
