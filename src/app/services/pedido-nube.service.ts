import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Pedido } from '../models/pedido.model'
import { EnvService } from './env.service'

@Injectable({
  providedIn: 'root'
})
export class PedidoNubeService {
  base = ''

  constructor(public http: HttpClient, private envService: EnvService) {
    this.base = this.envService.URL_BASE('pedido')
  }

  todo() {
    return this.http.get(this.base)
  }

  buscar_por_id(id: string) {
    return this.http.get(this.base.concat(`/id/${id}`))
  }

  guardar(modelo: Pedido) {
    return this.http.post(this.base, modelo)
  }

  eliminar(id: string) {
    return this.http.delete(this.base.concat(`/id/${id}`))
  }

  modificar(modelo: Pedido) {
    return this.http.put(this.base, modelo)
  }
}
