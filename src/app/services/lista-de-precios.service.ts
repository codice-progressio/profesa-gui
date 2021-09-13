import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  IDBOpciones,
  IDBOpcionesObjectStore,
  IndexedDBService
} from '@codice-progressio/indexed-db'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { URL_BASE } from '../config/config'
import { ListaDePrecios } from '../models/listaDePrecios.model'
import { Offline, OfflineBasico, OfflineService } from './offline.service'

@Injectable({
  providedIn: 'root'
})
export class ListaDePreciosService {
  base = URL_BASE('lista-de-precios')
  offline: ListaDePreciosOfflineService
  constructor(public http: HttpClient, public offlineService: OfflineService) {
    this.offline = new ListaDePreciosOfflineService(this)
  }

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

  todoLigero() {
    let url = this.base.concat('/todo-ligero')
    return this.http.get<ListaDePrecios[]>(url).pipe(
      map((res: any) => {
        return res.listaDePrecios
      })
    )
  }
}

class ListaDePreciosOfflineService
  extends OfflineBasico
  implements Offline<ListaDePrecios>
{
  constructor(private root: ListaDePreciosService) {
    super(root.offlineService)
    this.tabla = this.offlineService.tablas.listasDePrecios
    // this.offlineService.db.subscribe(x => (this.db = x))
  }

  sincronizarDatos(datos: ListaDePrecios[]): Promise<number> {
    let PROMESAS = datos.map(x =>
      this.offlineService.idb
        .save<ListaDePrecios>(x, this.tabla, this.db)
        .toPromise()
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

  obtenerDatos(): Observable<ListaDePrecios[]> {
    return this.root.http
      .get<ListaDePrecios[]>(this.rutaBase(['sincronizar']))
      .pipe(
        map((resp: any) => {
          return resp.listasDePrecios as ListaDePrecios[]
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
