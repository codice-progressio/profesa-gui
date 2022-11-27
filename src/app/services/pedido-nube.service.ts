import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
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

  todo(): Observable<PedidosTodos> {
    return this.http.get(this.base).pipe(
      map((resultado: PedidosTodos) => {
        resultado.pedidos.map(pedido => {
          // Agregamos 0 a folio display
          pedido.folio_interno_display = this.agregar0aFolio(
            pedido.folio_interno
          )

          // Agregamos 0 a folio usuario
          let folio_usuario =  parseInt(pedido.folio.split('-').pop())
          pedido.folio_usuario = this.agregar0aFolio(folio_usuario)

          return pedido
        })

        return resultado
      })
    ) as Observable<PedidosTodos>
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

  agregar0aFolio(folio: number) {
    let folioString = folio.toString()
    let folioStringConCeros = folioString.padStart(4, '0')
    return folioStringConCeros
  }
}

interface PedidosTodos {
  total: number
  pedidos: Pedido[]
}
