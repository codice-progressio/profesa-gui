import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment'
import { UsuarioService } from '../services/usuario/usuario.service'
// declare function init_plugins();


declare function init_plugins();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})

export class PagesComponent implements OnInit {

  guiVersion: string = environment.VERSION
  apiVersion: string
  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.apiVersion = this._usuarioService.apiVersion
   }
  
  ngOnInit() {
    init_plugins();
  }

}
