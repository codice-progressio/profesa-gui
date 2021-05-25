import { Component, OnInit } from '@angular/core'
import { environment } from '../../environments/environment'
import { UsuarioService } from '../services/usuario/usuario.service'
import { ChangelogService } from '../services/changelog.service'
import { ManejoDeMensajesService } from '../services/utilidades/manejo-de-mensajes.service'
import { UtilidadesService } from '../services/utilidades.service'
// declare function init_plugins();

declare function init_plugins()
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  guiVersion: string = environment.VERSION
  apiVersion: string

  changelogData: string

  constructor(
    public utilidadesService: UtilidadesService,
    public _usuarioService: UsuarioService,
    public changelogService: ChangelogService,
    public msjService: ManejoDeMensajesService
  ) {
    this.apiVersion = this._usuarioService.apiVersion
  }

  ngOnInit() {
    init_plugins()
    this.changelogService.leer().subscribe((r: any) => {
      this.apiVersion = r.apiVersion
      this.changelogData = r.changelog
    })
  }

  guardarChangeLog(s) {
    if (!s) {
      this.msjService.toastErrorMensaje('No puede estar vacio')
      return
    }
    this.changelogService.guardar(s).subscribe((r: any) => {
      this.apiVersion = r.apiVersion
      this.changelogData = r.changelog
    })
  }
}
