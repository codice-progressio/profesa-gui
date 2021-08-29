import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import { URL_BASE } from '../config/config'
import { ListaDePrecios } from '../models/listaDePrecios.model'

@Injectable({
  providedIn: 'root'
})
export class ListaDePreciosService {
  constructor(private http: HttpClient) {}
  base = URL_BASE('lista-de-precios')

  buscar() {
    return this.http.get(this.base).pipe(
      map((res: any) => {
        return res.listaDePrecios
      })
    )
  }

  crear(modelo: ListaDePrecios) {
    return this.http.post(this.base, modelo)
  }

  modificar(modelo: ListaDePrecios, noCargarSkus = false) {
    return this.http.put(
      this.base.concat(`?noCargarSkus=${noCargarSkus}`),
      modelo
    )
  }

  buscarPorId(id: string, noCargarSkus = false) {
    let url = this.base
      .concat('/id/')
      .concat(id)
      .concat('?noCargarSkus=' + noCargarSkus)

    return this.http.get(url).pipe(
      map((res: any) => {
        return res.listaDePrecios
      })
    )
  }

  eliminar(id: string) {
    let url = this.base.concat('/' + id)
    return this.http.delete(url)
  }

  tamanoDeLista(id: string) {
    let url = this.base.concat(`/id/${id}/tamano-de-lista`)
    return this.http.get(url)
  }
}
