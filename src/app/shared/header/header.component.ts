import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;
  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

  // Para el loguot solo ocupamos llamar el servicio de usuario que lo contiene
  // y poner la llamada directamente en el html.

  buscar( termino: string ) {
    this.router.navigate(['/busqueda', termino]);
  }

}
