import { Component, OnInit } from '@angular/core'
import { Paginacion } from 'src/app/utils/paginacion.util'
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service'
import { Router } from '@angular/router'
import { iPaginadorData } from 'src/app/shared/paginador/paginador.component'
import { Usuario } from '../../../models/usuario.model'
import { UsuarioService } from '../../../services/usuario/usuario.service'

@Component({
  selector: 'app-usuario-leer',
  templateUrl: './usuario-leer.component.html',
  styleUrls: ['./usuario-leer.component.css']
})
export class UsuarioLeerComponent implements OnInit {
  cargando  = {}
  paginacion = new Paginacion(5, 0, 1, 'nombre')
  termino: string
  usuarios: Usuario[] = []
  totalDeElementos = 0

  keys = Object.keys

  constructor(
    private usuarioService: UsuarioService,
    private msjService: ManejoDeMensajesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarUsuarios()
  }

  cargarUsuarios() {
    this.cargando['usuarios'] = 'Cargando usuarios'
    this.usuarioService.findAll(this.paginacion).subscribe(us => {
      this.usuarios = us
      this.totalDeElementos = this.usuarioService.total
      delete this.cargando['usuarios']
    })
  }

  cbObservable = termino =>
    this.usuarioService.findByTerm(termino, new Paginacion(5, 0, 1, 'nombre'))

  resultadoDeBusqueda(datos) {
    this.usuarios = datos
    this.totalDeElementos = this.usuarioService.total
  }

  guardado() {
    this.cargarUsuarios()
  }
  cancelado() {
    this.cargarUsuarios()
  }
  error(evento) {
    this.cargarUsuarios()
  }

  crear() {
    this.router.navigate(['usuario', 'crear'])
  }

  actualizarConsulta(data: iPaginadorData = null) {
    this.cargando = true
    this.paginacion = data ? data.paginacion : this.paginacion

    const cb = usuarios => {
      this.usuarios = usuarios
      this.cargando = false
    }
    const cancelado = err => (this.cargando = false)

    if (this.termino) {
      this.usuarioService
        .findByTerm(this.termino, this.paginacion)
        .subscribe(cb, cancelado)
    } else {
      this.usuarioService.findAll(data.paginacion).subscribe(cb, cancelado)
    }
  }

  modificar(id: string) {
    this.router.navigate(['usuario', 'modificar', id])
  }

  eliminar(id: string) {
    this.msjService.confirmacionDeEliminacion(
      'Esta accion no se puede deshacer',
      () => {
        this.cargando = true
        this.usuarioService.delete(id).subscribe(
          repoEli => {
            this.cargarUsuarios()
            this.cargando = false
          },
          err => (this.cargando = false)
        )
      }
    )
  }

  detalle(id) {
    this.router.navigate(['usuario', 'detalle', id])
  }
}
