import { Component, OnInit } from '@angular/core'
import { Location } from '@angular/common'
import { Usuario } from 'src/app/models/usuario.model'
import { Router, ActivatedRoute } from '@angular/router'
import { UsuarioService } from '../../../services/usuario/usuario.service'
import { ManejoDeMensajesService } from '../../../services/utilidades/manejo-de-mensajes.service'

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.css']
})
export class UsuarioDetalleComponent implements OnInit {
  detalle: Usuario
  cargando = {}
  keys = Object.keys

  
  constructor(
    public location: Location,
    public router: Router,
    public usuarioService: UsuarioService,
    public activatedRoute: ActivatedRoute,
    public msjService: ManejoDeMensajesService
  ) {
    let id = activatedRoute.snapshot.paramMap.get('id')

    if (id) {
      this.cargando['buscando'] = 'Buscando usuario para ver detalles'
      this.usuarioService.findById(id).subscribe(
        usuario => {
          this.detalle = usuario
          delete this.cargando['buscando']
        },
        err => location.back()
      )
    } else {
      msjService.toastErrorMensaje('No definiste un id')
      this.location.back()
    }
  }

  ngOnInit(): void {}
}
