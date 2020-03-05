import { Injectable } from '@angular/core'
import { CRUD } from '../crud'
import { Folio } from 'src/app/models/folio.models'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { URL_SERVICIOS } from 'src/app/config/config'
import { HttpClient } from '@angular/common/http'
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service'
import { UtilidadesService } from '../utilidades/utilidades.service'
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service'
import { UsuarioService } from '../usuario/usuario.service'
import { Usuario } from 'src/app/models/usuario.model'
import { FiltrosFolio } from '../utilidades/filtrosParaConsultas/FiltrosFolio'
import { Observable, throwError } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { Orden } from 'src/app/models/orden.models'
import { URL_BASE } from '../../config/config'
import { FolioLinea } from '../../models/folioLinea.models'

@Injectable({
  providedIn: 'root'
})
export class FolioNewService extends CRUD<
  Folio,
  FolioNewService,
  FiltrosFolio<FolioNewService>
> {
  constructor(
    public http: HttpClient,
    public msjService: ManejoDeMensajesService,
    public _utiliadesService: UtilidadesService,
    public _preLoaderService: PreLoaderService,
    public _paginadorService: PaginadorService,
    public _usuarioService: UsuarioService
  ) {
    super(
      http,
      msjService,
      _utiliadesService,
      _preLoaderService,
      _paginadorService
    )

    this.base = URL_SERVICIOS + `/folios`
    this.nombreDeDatos.plural = 'folios'
    this.nombreDeDatos.singular = 'folio'
    this.urlBusqueda = '/buscar'
  }

  errFun(err) {
    this.msjService.err(err)
    return throwError(err)
  }

  /**
   *Carga los elementos filtrados bajo los parametros de filtros.
   *
   * @param {boolean} [foliosTerminados=false] Bandera que define si se cargan los folios terminados.
   * @param {{[string:string]:string}} filtros El objeto que contenga la relacion parametro:valor como filtros aplicables.
   *
   * @returns {*}
   * @memberof FolioNewService
   */
  todo(): Observable<Folio[]> {
    return this.getAll(
      undefined,
      undefined,
      this.filtrosDelFolio.obtenerFiltros(),
      Folio
    )
  }

  /**
   *Entrega a produccion el folio que coincida con el id
   que se le pase como paramentro. Esto dispara el proceso de produccion o 
   hace lo inverso. Esto sirve para cuando control de produccion se da cuenta
   de algun error en el folio y es necesario devolverselo al vendedor.
   *
   * @param {string} _id El id del folio
   * @param {boolean} [entregarAProduccion=true] La bandera que se
   * @returns {Observable<Folio>}
   * @memberof FolioNewService
   */
  iniciarProduccion(
    _id: string,
    entregarAProduccion = true
  ): Observable<Folio> {
    let a = this._preLoaderService.loading(
      'Estableciendo paramentros de produccion de folio.'
    )

    return this.http
      .post(`${this.base}/enviarAProduccion`, { _id, entregarAProduccion })
      .pipe(
        map((resp: any) => {
          this.msjService.ok_(resp, null, a)
          return resp.folio
        }),
        catchError(err => {
          this.msjService.err(err)
          return throwError(err)
        })
      )
  }

  ordenesImpresas(id: string) {
    let a = this._preLoaderService.loading('Marcando folio como impreso.')
    return this.http.get(`${this.base}/folioImpreso/${id}`).pipe(
      map((resp: any) => {
        this.msjService.ok_(resp, null, a)
        // return ;
      }),
      catchError(err => {
        this.msjService.err(err)
        return throwError(err)
      })
    )
  }

  // <!--
  // =====================================
  //  Estas son las versiones ligeras de los detalles.
  // =====================================
  // -->

  detalleOrden(
    folio: string,
    pedido: string,
    orden: string
  ): Observable<Orden> {
    const a = this._preLoaderService.loading('Buscando detalles de orden')
    const url = this.base
      .concat('/detalle/orden')
      .concat(`/${folio}`)
      .concat(`/${pedido}`)
      .concat(`/${orden}`)

    return this.http.get(url).pipe(
      map((resp: any) => {
        this.msjService.ok_(resp, null, a)
        return resp.orden as Orden
      }),
      catchError(err => this.errFun(err))
    )
  }

  detallePedido(folio: string, pedido: string): Observable<FolioLinea> {
    const a = this._preLoaderService.loading('Buscando detalles de folio')
    const url = this.base
      .concat('/detalle/pedido')
      .concat(`/${folio}`)
      .concat(`/${pedido}`)

    return this.http.get(url).pipe(
      map((resp: any) => {
        this.msjService.ok_(resp, null, a)
        return new FolioLinea().deserialize(resp.pedido)
      }),
      catchError(err => this.errFun(err))
    )
  }
  detalleFolio(folio: string): Observable<Folio> {
    const a = this._preLoaderService.loading('Buscando detalles de orden')
    const url = this.base.concat('/detalle/folio').concat(`/${folio}`)

    return this.http.get(url).pipe(
      map((resp: any) => {
        this.msjService.ok_(resp, null, a)
        return new Folio().deserialize(resp.folio)
      }),
      catchError(err => this.errFun(err))
    )
  }

  // <!--
  // =====================================
  //  END Estas son las versiones ligeras de los detalles.
  // =====================================
  // -->
}
