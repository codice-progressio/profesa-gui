import { Pipe, PipeTransform } from '@angular/core'
import { Usuario } from '../models/usuario.model'
import { UsuarioService } from '../services/usuario/usuario.service'

@Pipe({
  name: 'contieneElPermiso'
})
export class ContieneElPermisoPipe implements PipeTransform {
  constructor(public usuarioService: UsuarioService) {}

  transform(permiso: string): boolean {
    return this.usuarioService.usuario.permissions.includes(permiso)
  }
}
