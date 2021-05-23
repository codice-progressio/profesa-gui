import { Component, OnInit } from '@angular/core'
import { Usuario } from '../../models/usuario.model'
import { SidebarService } from 'src/app/services/shared/sidebar.service'
import { UsuarioService } from 'src/app/services/usuario/usuario.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  usuario: Usuario
  constructor(
    public _sideBar: SidebarService,
    public _usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.usuario = this._usuarioService.usuario
    this._sideBar.cargarMenu()
  }

  // Estos servicios los aplicamos directamente en el html.
}
