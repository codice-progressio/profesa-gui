import { Component, OnInit } from '@angular/core'
import { UsuarioService } from '../../services/usuario/usuario.service'
import { Usuario } from '../../models/usuario.model'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  constructor(private usuarioService: UsuarioService) {}
  
  usuarios: Usuario[] = []
  
  private _termino: string
  public get termino(): string {
    return this._termino
  }
  public set termino(value: string) {
    this._termino = value
    this.buscar(value)
  }

  ngOnInit(): void {}

  buscar(termino: string) {
    if (!termino) return this.cargar()
    throw new Error('Method not implemented.')
  }
  cargar() {
    throw new Error('Method not implemented.')
  }
}
