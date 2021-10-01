import { Component, OnInit } from '@angular/core'
import { Usuario } from '../../models/usuario.model'
import { Router } from '@angular/router'
import { UsuarioService } from 'src/app/services/usuario/usuario.service'
import { VersionAppService } from 'src/app/services/version-app.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  anio = new Date()
  usuario: Usuario

  gui: string
  api: string
  constructor(
    private versionAppService: VersionAppService,
    public _usuarioService: UsuarioService,
    public router: Router
  ) {}

  ngOnInit() {
    this.usuario = this._usuarioService.usuario
    this.versionAppService.ui.subscribe(v=>this.gui = v)
  }

  // Para el loguot solo ocupamos llamar el servicio de usuario que lo contiene
  // y poner la llamada directamente en el html.

  buscar(termino: string) {
    this.router.navigate(['/busqueda', termino])
  }
}
