import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import { URL_BASE } from '../config/config'
import { ListaDePrecios } from '../models/listaDePrecios.model'

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {
  etiquetas: EtiquetasService
  listasDePrecio: ListaDePrecioService
  base = URL_BASE('parametros')

  constructor(public http: HttpClient) {
    this.etiquetas = new EtiquetasService(this)
    this.listasDePrecio = new ListaDePrecioService(this)
  }
}

class EtiquetasService {
  constructor(private root: ParametrosService) {}

  base = this.root.base.concat('/etiquetas')

  obtenerTodo() {
    return this.root.http.get<string[]>(this.base.concat())
  }

  eliminar(etiqueta: string) {
    return this.root.http.put<string>(this.base.concat('/eliminar'), {
      etiqueta
    })
  }
}

class ListaDePrecioService {
  base = this.root.base.concat('/lista-de-precios')
  constructor(private root: ParametrosService) {}

  cargar() {
    return this.root.http
      .get<string>(this.base)
      .pipe(map((res: any) => {
        return res.parametros.listaDePreciosDefault}))
  }

  leerTodoLigero() {
    return this.root.http
      .get<ListaDePrecios[]>(this.base.concat('/ligth'))
      .pipe(map((resp: any) => resp.listasDePrecios))
  }

  guardar(_id: string) {
    return this.root.http.post(this.base, { _id })
  }
}
