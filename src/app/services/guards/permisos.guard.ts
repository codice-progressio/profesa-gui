import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service';
import { Usuario } from 'src/app/models/usuario.model';
import { _ROLES } from 'src/app/config/roles.const';
import swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class PermisosGuard implements CanActivate {

  constructor (
    public _usuarioservice: UsuarioService,
    public _msjService: ManejoDeMensajesService
   ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // Obtenemos los roles que son necesarios. 
      const rolesNecesarios = next.data['roles'] as Array<string>;

      // Siendo super admin puede entrar a donde sea. s
      if ( this._usuarioservice.usuario.role.includes(_ROLES.SUPER_ADMIN)) {
        return true;
      }
      // Si no hay roles entonces solo el super admin puede entrar.
      if( rolesNecesarios.length === 0 ) {
        rolesNecesarios.push(_ROLES.SUPER_ADMIN);
      }
      
      // El usuario debe contener todos los roles que se enlistan
      for (let i = 0; i < rolesNecesarios.length; i++) {
        const rol = rolesNecesarios[i];
        if ( !this._usuarioservice.usuario.role.includes(rol)) {
          // Si no incluye uno de los roles entonces lo mandamos a volar. 
          let msj = 'Es necesario que un administrador del sistema te de los permisos que no tienes para poder continuar. <br> <br>';
          msj += 'Los siguientes permisos son necesarios: <br> <hr>';
          for (let a = 0; a < rolesNecesarios.length; a++) {
            const role = rolesNecesarios[a];
            const fa = this._usuarioservice.usuario.role.includes(role) ? 'fa-check text-success' : 'fa-times text-danger';
            msj += `<i class="fa ${fa}"></i> ${role} <hr>`;
          }
          msj += '<h3><strong>Si es un error por favor reportalo al administrador.<strong></h3>';
          swal({
            title: '<strong>NO AUTORIZADO</strong>',
            type: 'error',
            html: msj,
            focusConfirm: false,
            
          });
          return false;
        }
      }
    // Si pasa quiere decir que si tiene todos los permisos necesarios. 
    return true;
  }
}