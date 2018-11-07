import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[] = [];
  // public menu: any = [
  //   {
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Dashboard', url: '/dashboard' },
  //       { titulo: 'ProgressBar', url: '/progress' },
  //       { titulo: 'Gráficas', url: '/graficas1' },
  //       { titulo: 'Promesas', url: '/promesas' },
  //       { titulo: 'rxjs', url: '/rxjs' },
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: '/usuarios' },
  //       { titulo: 'Hospitales', url: '/hospitales' },
  //       { titulo: 'Médicos', url: '/medicos' },
  //     ]
  //   },
  //   {
  //     titulo: 'Control de Producción',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Registro de folios', url: '/folios' },
  //     ]
  //   }
  // ];
  constructor( public _usuarioService: UsuarioService) {
  }

  cargarMenu() {
    this.menu = this._usuarioService.menu;
  }
}
