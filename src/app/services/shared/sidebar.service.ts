import { Injectable } from '@angular/core'
import { UsuarioService } from '../usuario/usuario.service'
import { APP_ROUTES } from '../../app.routes'

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public menu: any[] = []

  constructor(public _usuarioService: UsuarioService) {}

  cargarMenu() {
    this.menu = this._usuarioService.menu
  }
}
