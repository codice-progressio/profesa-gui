import { Component, OnInit } from '@angular/core'
import { UsuarioService } from '../../services/usuario/usuario.service'
import { Usuario } from '../../models/usuario.model'
import { BehaviorSubject } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'
import { ManejoDeMensajesService } from '../../services/utilidades/manejo-de-mensajes.service'
import { UtilidadesService } from '../../services/utilidades.service'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  constructor(
    private utilidadesService: UtilidadesService,
    private notiService: ManejoDeMensajesService,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  usuarios: Usuario[] = []
  estaCargandoBuscador: BehaviorSubject<boolean>
  private _cargando = true
  public get cargando() {
    return this._cargando
  }
  public set cargando(value) {
    this._cargando = value
    this.estaCargandoBuscador?.next(value)
  }

  private _termino: string
  public get termino(): string {
    return this._termino
  }
  public set termino(value: string) {
    this._termino = value
    this.buscar(value)
  }

  ngOnInit(): void {
    this.cargar()
  }

  buscar(termino: string) {
    if (!termino) return this.cargar()
    this.cargando = true
    this.usuarioService.leer(termino).subscribe(
      usuarios => {
        this.cargando = false
        this.usuarios = usuarios
      },
      () => (this.cargando = false)
    )
  }
  cargar() {
    this.cargando = true
    this.usuarioService.leer().subscribe(
      usuarios => {
        this.usuarios = usuarios
        this.cargando = false
      },
      () => (this.cargando = false)
    )
  }

  verDetalle(usuario: Usuario) {
    this.router.navigate(
      ['detalle/', this.utilidadesService.niceUrl(usuario.nombre), usuario._id],
      { relativeTo: this.activatedRoute }
    )
  }

  modificar(usuario: Usuario) {
    this.router.navigate(
      [
        'modificar',
        this.utilidadesService.niceUrl(usuario.nombre),
        usuario._id
      ],
      { relativeTo: this.activatedRoute }
    )
  }

  eliminar(usuario: Usuario) {
    this.notiService.confirmacionDeEliminacion(
      'Este usuario ya no podra loguearse, pero aparecera en los registros he historicos.',
      () => {
        this.cargando = true

        this.usuarioService.eliminar(usuario._id).subscribe(
          () => {
            this.cargando = false
            this.usuarios = this.usuarios.filter(x => x._id !== usuario._id)
          },
          () => (this.cargando = false)
        )
      }
    )
  }
}
