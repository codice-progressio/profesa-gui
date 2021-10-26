import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Pedido } from '../models/pedido.model'
import { Offline, OfflineBasico, OfflineService } from './offline.service'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { EnvService } from './env.service'

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  base = ''
  offline: PedidoOfflineService<Pedido>
  offline_indice: PedidoIndiceOfflineService<{ _id: number; ultimo: number }>

  constructor(
    public http: HttpClient,
    public offlineService: OfflineService,
    private envService: EnvService
  ) {
    this.base = this.envService.URL_BASE('pedido')
    this.offline = new PedidoOfflineService(this, this.base)
    this.offline_indice = new PedidoIndiceOfflineService(this, 'no se ocupa')
  }
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

class PedidoOfflineService<T> extends OfflineBasico<T> implements Offline<T> {
  constructor(private root: PedidoService, base: string) {
    super(
      root.offlineService,
      root.http,
      base,
      root.offlineService.tablas.pedidos,
      'pedidos'
    )
  }
}
class PedidoIndiceOfflineService<T>
  extends OfflineBasico<T>
  implements Offline<T>
{
  constructor(private root: PedidoService, base: string) {
    super(
      root.offlineService,
      root.http,
      base,
      root.offlineService.tablas.pedidos_indice,
      'pedidos_indice'
    )
  }
}
