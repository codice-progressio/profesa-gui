import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Contacto } from '../models/contacto.model'
import { URL_BASE } from '../config/config'
import { catchError, map } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs'
import { URLQuery } from './utilidades/URLQuery'
import { Offline, OfflineBasico, OfflineService } from './offline.service'

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  base = URL_BASE('contacto')
  etiquetas = new ProveedorEtiquetas(this)
  rutas = new ProveedorRutas(this)
  offline: ContactoOfflineService
  constructor(public http: HttpClient, public offlineService: OfflineService) {
    this.offline = new ContactoOfflineService(this)
  }

  crear(contacto: Contacto) {
    return this.http
      .post<Contacto>(this.base, contacto)
      .pipe(catchError(err => throwError(err)))
  }

  leerTodo(filtros: URLQuery = new URLQuery()) {
    let url = this.base.concat(filtros.obtenerQuery())
    return this.http.get<Contacto[]>(url).pipe(catchError(x => throwError(x)))
  }

  eliminar(id: string) {
    return this.http
      .delete<Contacto>(this.base.concat(`/${id}`))
      .pipe(catchError(x => throwError(x)))
  }

  buscarId(id: string) {
    return this.http
      .get<Contacto>(this.base.concat(`/buscar/id/${id}`))
      .pipe(catchError(x => throwError(x)))
  }

  buscarTermino(termino: string) {
    return this.http
      .get<Contacto[]>(this.base.concat(`/buscar/termino/${termino}`))
      .pipe(catchError(x => throwError(x)))
  }

  modificar(proveedor: Contacto) {
    return this.http
      .put<Contacto>(this.base, proveedor)
      .pipe(catchError(x => throwError(x)))
  }

  buscarRelacionados(id: string) {
    return this.http
      .get(this.base.concat(`/relacionados/${id}`))
      .pipe(catchError(x => throwError(x)))
  }
}

export class ProveedorEtiquetas {
  constructor(private root: ContactoService) {}
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
    return this.root.http.get<Contacto[]>(
      this.base
        .concat('/buscar/etiquetas?etiquetas=')
        .concat(encodeURIComponent(etiquetas.join(',')))
    )
  }
}

export class ProveedorRutas {
  constructor(private root: ContactoService) {}
  base = this.root.base.concat('/rutas')

  agregarModificar(contacto: Contacto) {
    return this.root.http.put<string[]>(this.base.concat('/agregar'), {
      _id: contacto._id,
      rutas: contacto.rutas.map(x => x._id)
    })
  }
}

class ContactoOfflineService
  extends OfflineBasico
  implements Offline<Contacto>
{
  constructor(private root: ContactoService) {
    super(root.offlineService)
    this.tabla = this.offlineService.tablas.contactos
  }

  sincronizarDatos(datos: Contacto[]): Promise<number> {
    let PROMESAS = datos.map(x =>
      this.offlineService.idb.save<Contacto>(x, this.tabla, this.db).toPromise()
    )

    return Promise.all(PROMESAS).then(x => {
      return this.contarDatos()
    })
  }

  rutaBase(ruta: string[] = []): string {
    let r = this.root.base.concat('/' + this.urlBase)
    if (ruta.length > 0) r = r.concat('/').concat(ruta.join('/'))
    return r
  }

  obtenerDatos(): Observable<Contacto[]> {
    return this.root.http.get<Contacto[]>(this.rutaBase(['sincronizar'])).pipe(
      map((resp: any) => {
        return resp.contactos as Contacto[]
      })
    )
  }

  eliminarDatos(): Observable<any> {
    return this.offlineService.idb.deleteAll(this.tabla, this.db)
  }

  contarDatos(): Promise<number> {
    return this.offlineService.idb.contarDatosEnTabla(this.tabla, this.db)
  }
}
