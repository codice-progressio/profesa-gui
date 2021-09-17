import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service'
import { SKU } from '../../models/sku.model'
import { Imagen } from '../../models/Imagen'
import { URL_BASE } from '../../config/config'
import { catchError, map } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs'
import { SkuLote, SkuLoteMovimiento } from '../../models/lote.model'
import { URLQuery } from '../utilidades/URLQuery'
import {
  indexOffline,
  Offline,
  OfflineBasico,
  OfflineService
} from '../offline.service'

@Injectable({
  providedIn: 'root'
})
export class SkuService {
  lote: LoteService
  imagen: ImagenService
  etiqueta: EtiquetaService
  offline: SkuOfflineService

  base = URL_BASE('sku')
  constructor(
    public http: HttpClient,
    public msjService: ManejoDeMensajesService,
    public offlineService: OfflineService
  ) {
    this.lote = new LoteService(this)
    this.imagen = new ImagenService(this)
    this.etiqueta = new EtiquetaService(this)
    this.offline = new SkuOfflineService(this)
  }

  crear(sku: SKU) {
    return this.http
      .post<SKU>(this.base, sku)
      .pipe(catchError(x => throwError(x)))
  }

  eliminar(id: string) {
    return this.http
      .delete<SKU>(this.base.concat(`/${id}`))
      .pipe(catchError(x => throwError(x)))
  }

  leerTodo(filtros: URLQuery = new URLQuery()) {
    let url = this.base.concat(filtros.obtenerQuery())
    return this.http.get<SKU[]>(url).pipe(catchError(x => throwError(x)))
  }

  leerTodo_listaDePrecios() {
    let url = this.base.concat('/todo')
    return this.http.get<SKU[]>(url).pipe(map((res: any) => res.skus as SKU[]))
  }

  buscarId(id: string) {
    return this.http
      .get<SKU>(this.base.concat(`/buscar/id/${id}`))
      .pipe(catchError(x => throwError(x)))
  }

  buscarTermino(termino: string) {
    return this.http
      .get<SKU[]>(this.base.concat(`/buscar/termino/${termino}`))
      .pipe(catchError(x => throwError(x)))
  }

  buscarCodigo(codigo: string) {
    return this.http.get<SKU>(
      this.base.concat(`/buscar/codigo/${encodeURIComponent(codigo)}`)
    )
  }

  modificar(sku: SKU) {
    return this.http
      .put<SKU>(this.base, sku)
      .pipe(catchError(x => throwError(x)))
  }

  modificarStock(
    _id: string,
    stock: { stockMinimo: number; stockMaximo: number }
  ) {
    return this.http
      .put<{ stockMinimo: number; stockMaximo: number }>(
        this.base.concat('/minimo-maximo'),
        {
          _id,
          ...stock
        }
      )
      .pipe(catchError(x => throwError(x)))
  }
}

class ImagenService {
  constructor(private root: SkuService) {}

  base = this.root.base.concat('/imagen')
  agregar(id: string, img: File) {
    let formData: FormData = new FormData()
    formData.append('img', img, img.name)
    formData.append('_id', id)

    return this.root.http
      .put<Imagen>(this.base, formData)
      .pipe(catchError(x => throwError(x)))
  }

  elimiar(id: string, idImagen: string) {
    return this.root.http
      .delete<SKU>(this.base.concat(`/${id}/${idImagen}`))
      .pipe(catchError(x => throwError(x)))
  }
}

class LoteService {
  constructor(private root: SkuService) {}
  base = this.root.base.concat('/lote')
  movimiento = new MovimientoService(this.root)

  /**
   *Crea un lote.
   *
   * @param {string} id
   * @param {Partial<SkuLote>} lote
   * @returns Retona el id y lotes unicamente.
   * @memberof LoteService
   */
  crear(id: string, lote: Partial<SkuLote>) {
    return this.root.http
      .post<SKU>(this.base.concat(`/crear/${id}`), lote)
      .pipe(catchError(x => throwError(x)))
  }

  eliminar(id: string, idLote: string) {
    return this.root.http
      .delete<SKU>(this.base.concat(`/eliminar/${id}/${idLote}`))
      .pipe(catchError(x => throwError(x)))
  }

  modificar(id: string, idLote, lote: SkuLote) {
    return this.root.http
      .put<SKU>(this.base.concat(`/modificar/${id}/${idLote}`), lote)
      .pipe(catchError(x => throwError(x)))
  }

  /**
   *Obtiene solo el id y los lotes dentro de un SKU
   *
   * @param {string} id El id del lote.
   * @returns
   * @memberof LoteService
   */
  obtenerTodo(id: string, mostrarSinExistencia = false) {
    return this.root.http
      .get<SKU>(
        this.base.concat(`/${id}?sinExistencia=${mostrarSinExistencia}`)
      )
      .pipe(catchError(x => throwError(x)))
  }
  /**
   *Obtiene todos los movimientos del sku
   *
   * @param {string} id El id del lote.
   * @returns
   * @memberof LoteService
   */
  obtenerMovimientos(id: string, mostrarSinExistencia = false) {
    return this.root.http.get<any[]>(
      this.base.concat(
        `/movimientos/${id}?sinExistencia=${mostrarSinExistencia}`
      )
    )
  }
}

class MovimientoService {
  constructor(private root: SkuService) {}

  base = this.root.base.concat('/lote/movimiento')

  transferirEntreAlmacenes(
    id: string,
    idLote: string,
    movimiento: SkuLoteMovimiento,
    almacenObjetivo: string,
    cantidad: number,
    observaciones: number
  ) {
    //Se debe mandar un movimiento de salida
    movimiento.esEntrada = false

    let objeto = {
      salida: movimiento,
      almacenObjetivo,
      cantidad,
      observaciones
    }

    return this.root.http
      .put<SKU>(
        this.base.concat(`/transferir-entre-almacenes/${id}/${idLote}`),
        objeto
      )
      .pipe(catchError(x => throwError(x)))
  }

  modificar(
    id: string,
    idLote: string,
    idMovimiento: string,
    movimiento: SkuLoteMovimiento
  ) {
    return this.root.http
      .put<SKU>(
        this.base.concat(`/modificar/${id}/${idLote}/${idMovimiento}`),
        movimiento
      )
      .pipe(catchError(x => throwError(x)))
  }

  agregar(id: string, idLote: string, movimiento: Partial<SkuLoteMovimiento>) {
    let url = this.base.concat(`/agregar/${id}/${idLote}`)
    return this.root.http
      .put<SKU>(url, movimiento)
      .pipe(catchError(x => throwError(x)))
  }

  eliminar(id: string, idLote: string, idMovimiento) {
    let url = this.base.concat(`/eliminar/${id}/${idLote}/${idMovimiento}`)
    return this.root.http.delete<SKU>(url).pipe(catchError(x => throwError(x)))
  }
}

class EtiquetaService {
  constructor(private root: SkuService) {}
  // No requiere modifacion
  base = this.root.base
  agregar(_id: string, etiqueta: string) {
    return this.root.http
      .put<SKU>(this.base.concat('/agregar-etiqueta'), {
        _id,
        etiqueta
      })
      .pipe(catchError(x => throwError(x)))
  }

  eliminar(_id: string, idEtiqueta: string) {
    return this.root.http
      .delete<SKU>(this.base.concat(`/${_id}/etiqueta/${idEtiqueta}`))
      .pipe(catchError(x => throwError(x)))
  }

  buscar(etiquetas: string[]) {
    return this.root.http
      .get<SKU[]>(
        this.base.concat(`/buscar/etiquetas?etiquetas=${etiquetas.join(',')}`)
      )
      .pipe(catchError(x => throwError(x)))
  }
}

class SkuOfflineService extends OfflineBasico implements Offline<SKU> {
  constructor(private root: SkuService) {
    super(root.offlineService)
    this.tabla = this.offlineService.tablas.skus
    // this.offlineService.db.subscribe(x => (this.db = x))
  }


  sincronizarDatos(datos: SKU[]): Promise<number> {
    let PROMESAS = datos.map(x =>
      this.offlineService.idb.save<SKU>(x, this.tabla, this.db).toPromise()
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

  obtenerDatos(): Observable<SKU[]> {
    return this.root.http.get<SKU[]>(this.rutaBase(['sincronizar'])).pipe(
      map((resp: any) => {
        return resp.skus as SKU[]
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
