import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service';
import { _ROLES } from '../../config/roles.const';



@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  constructor (
    public _usuarioService: UsuarioService,
    public _msj: ManejoDeMensajesService,
    public router: Router
  ) {}

  canActivate() {

    if ( 
      this._usuarioService.usuario.role.includes(_ROLES.ADMIN_ROLE) ||
      this._usuarioService.usuario.role.includes(_ROLES.SUPER_ADMIN) 
      ) {
      return true;
    }
    this._msj.invalido('No estas autorizado para entrar a este contenido.', 'No tienes los permisos necesarios.', 5000);
    return false;
  }


}
