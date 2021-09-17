import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { URL_BASE } from '../config/config'
import { Pedido } from '../models/pedido.model'

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  base = URL_BASE('pedido')

  constructor(private http: HttpClient) {}
  buscarUsuario() {
    return this.http.get<Pedido[]>(this.base.concat('/buscar/usuario'))
  }

  eliminar(_id: Number) {
    return this.http.delete<null>(this.base.concat(`/id/${_id}`))
  }

  buscarTermino(termino: string) {
    return this.http.get<Pedido[]>(this.base.concat(`/buscar/${termino}`))
  }

  modificar(pedido: Pedido) {
    return this.http.put<Pedido[]>(this.base, pedido)
  }

  buscarId(id: string) {
    return this.http.get<Pedido>(this.base.concat(`/buscar/id/${id}`))
  }

  crear(modelo: Pedido) {
    return this.http.post<Pedido>(this.base, modelo)
  }
}

