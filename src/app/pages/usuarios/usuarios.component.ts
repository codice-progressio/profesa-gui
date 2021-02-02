import { Component, OnInit } from '@angular/core'
import { UsuarioService } from '../../services/usuario/usuario.service'
import { Usuario } from '../../models/usuario.model'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  constructor(private usuarioService: UsuarioService) {}

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
    this.usuarioService.buscarTermino(termino).subscribe(
      usuarios => {
        this.cargando = false
        this.usuarios = usuarios
      },
      () => (this.cargando = false)
    )
  }
  cargar() {
    this.cargando = true
    this.usuarioService.leerTodo().subscribe(
      usuarios => {
        this.usuarios = usuarios
        this.cargando = false
      },
      () => (this.cargando = false)
    )
  }
}
