import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Proveedor } from '../models/proveedor.model'
import { URL_BASE } from '../config/config'
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs'
import { URLQuery } from './utilidades/URLQuery'

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  constructor(public http: HttpClient) {}
  base = URL_BASE('proveedor')
  etiquetas = new ProveedorEtiquetas(this)

  crear(proveedor: Proveedor) {
    return this.http
      .post<Proveedor>(this.base, proveedor)
      .pipe(catchError(err => throwError(err)))
  }

  leerTodo(filtros: URLQuery = new URLQuery()) {
    let url = this.base.concat(filtros.obtenerQuery())
    return this.http.get<Proveedor[]>(url).pipe(catchError(x => throwError(x)))
  }

  eliminar(id: string) {
    return this.http
      .delete<Proveedor>(this.base.concat(`/${id}`))
      .pipe(catchError(x => throwError(x)))
  }

  buscarId(id: string) {
    return this.http
      .get<Proveedor>(this.base.concat(`/buscar/id/${id}`))
      .pipe(catchError(x => throwError(x)))
  }

  buscarTermino(termino: string) {
    return this.http
      .get<Proveedor[]>(this.base.concat(`/buscar/termino/${termino}`))
      .pipe(catchError(x => throwError(x)))
  }

  modificar(proveedor: Proveedor) {
    return this.http
      .put<Proveedor>(this.base, proveedor)
      .pipe(catchError(x => throwError(x)))
  }

  buscarRelacionados(id: string) {
    return this.http
      .get(this.base.concat(`/relacionados/${id}`))
      .pipe(catchError(x => throwError(x)))
  }
}

export class ProveedorEtiquetas {
  constructor(private root: ProveedorService) {}
  base = this.root.base.concat('/etiquetas')

  agregar(_id: string, etiqueta: string) {
    return this.root.http.put<string[]>(this.base.concat('/agregar'), {
      _id,
      etiqueta
    })
  }

  eliminar(_id: string, etiqueta: string) {
    return this.root.http.put(this.base.concat('/eliminar'), { _id, etiqueta })
  }

  filtrarPorEtiquetas(etiquetas: string[]) {
    return this.root.http.get<Proveedor[]>(
      this.base
        .concat('/buscar/etiquetas?etiquetas=')
        .concat(encodeURIComponent(etiquetas.join(',')))
    )
  }
}
