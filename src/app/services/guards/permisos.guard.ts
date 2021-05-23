import { Injectable } from '@angular/core'
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router'
import { Observable } from 'rxjs'
import { UsuarioService } from '../usuario/usuario.service'
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service'
import { Usuario } from 'src/app/models/usuario.model'
import swal from 'sweetalert2'
import { Location } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class PermisosGuard implements CanActivate {
  constructor(
    public _usuarioservice: UsuarioService,
    public msjService: ManejoDeMensajesService,
    public router: Router,
    public location: Location
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Obtenemos los permissions que son necesarios.
    let permiso = next.data['permissions']

    let jUsuario = localStorage.getItem('usuario')
    //No hay un usuario, mandamos al login
    if (!jUsuario) {
      this.msjService.toast.info(
        'Fuiste redirijido al login por que al parecer no has iniciado sesión'
      )
      this.router.navigate['/login']
      return
    }

    let usuario = JSON.parse(jUsuario) as Usuario
    // Siendo super admin puede entrar a donde sea. s
    if (usuario.permissions.includes('administrador')) return true

    // Si no hay permissions entonces solo el super admin puede entrar.
    if (!permiso) permiso = 'administrador'

    // El usuario debe contener el permiso

    if (!usuario.permissions.includes(permiso)) {
      // Si no incluye el permiso entonces lo mandamos a volar.
      let msj =
        'Es necesario que un administrador del sistema te de el permiso que no tienes para poder continuar. <br> <br>'
      msj += 'El siguiente permiso es necesario: <br> <hr>'

      msj += `<br />${permiso} `

      swal({
        title: '<strong>NO AUTORIZADO</strong>',
        type: 'error',
        html: msj,
        focusConfirm: false
      }).then(() => {
        this.location.back()
      })

      return false
    }

    // Si pasa quiere decir que si tiene todos los permisos necesarios.
    return true
  }
}
