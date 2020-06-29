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
import { Observable, throwError, pipe, concat } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { Orden } from 'src/app/models/orden.models'
import { URL_BASE } from '../../config/config'
import { FolioLinea } from '../../models/folioLinea.models'
import { Paginacion } from '../../utils/paginacion.util'
import { Ruta } from '../../models/orden.models'

@Injectable({
  providedIn: 'root'
})
export class FolioNewService {
  base = URL_BASE('folios')
  constructor(
    public http: HttpClient,
    public msjService: ManejoDeMensajesService,
    public _utiliadesService: UtilidadesService,
    public _preLoaderService: PreLoaderService,
    public _paginadorService: PaginadorService,
    public _usuarioService: UsuarioService
  ) {
    this.base = URL_SERVICIOS + `/folios`
  }

  total

  errFun(err) {
    this.msjService.err(err)
    return throwError(err)
  }

  findAll(
    paginacion: Paginacion,
    filtros: string = null
  ): Observable<iPedidosConsulta[]> {
    const url = this.base
      .concat('/filtrar')
      .concat('?')
      .concat(`desde=${paginacion.desde}`)
      .concat(`&limite=${paginacion.limite}`)
      .concat(`&campo=${paginacion.campoDeOrdenamiento}`)
      .concat(`&sort=${paginacion.orden}`)
      .concat(`&${filtros}`)

    return this.http.get<iPedidosConsulta[]>(url).pipe(
      map(
        (resp: any) => {
          this.total = resp.total
          return resp.pedidos as iPedidosConsulta[]
        },
        catchError(err => this.errFun(err))
      )
    )
  }

  delete(id: string): Observable<Folio> {
    const url = this.base.concat(`/${id}`)
    return this.http.delete<Folio>(url).pipe(
      map(
        (resp: any) => {
          this.msjService.toastCorrecto(resp.mensaje)
          return resp.folio as Folio
        },
        catchError(err => this.errFun(err))
      )
    )
  }

  save(folio: Folio): Observable<Folio> {
    return this.http.post<Folio>(this.base, folio).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        return resp.folio as Folio
      }),
      catchError(err => this.errFun(err))
    )
  }

  findById(id: string): Observable<Folio> {
    const url = this.base.concat(`/buscar/id/${id}`)
    return this.http.get<Folio>(url).pipe(
      map((resp: any) => {
        return resp.folio as Folio
      }),
      catchError(err => this.errFun(err))
    )
  }

  update(folio: Folio): Observable<Folio> {
    const url = this.base

    return this.http.put<Folio>(url, folio).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        return resp.folio as Folio
      }),
      catchError(err => this.errFun(err))
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
        return resp.pedido as FolioLinea
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
        return resp.folio as Folio
      }),
      catchError(err => this.errFun(err))
    )
  }

  // <!--
  // =====================================
  //  END Estas son las versiones ligeras de los detalles.
  // =====================================
  // -->

  // <!--
  // =====================================
  //  Folios para revision
  // =====================================
  // -->

  obtenerFoliosParaRevision(): Observable<FolioEnRevision[]> {
    const url = this.base.concat('/reporte/paraRevision')
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.folios as FolioEnRevision[]
      }),
      catchError(err => this.errFun(err))
    )
  }

  // <!--
  // =====================================
  //  END Folios para revision
  // =====================================
  // -->

  // <!--
  // =====================================
  //  Folios pendientes de entregar a produccion
  // =====================================
  // -->

  foliosPendientesDeEntregarAProduccion(
    idVendedor: string
  ): Observable<FoliosPendientesDeEntregarAProduccion[]> {
    const url = this.base.concat('/porEntregarAProduccion/').concat(idVendedor)
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.folios as FoliosPendientesDeEntregarAProduccion[]
      }),
      catchError(err => this.errFun(err))
    )
  }

  // <!--
  // =====================================
  //  END Folios pendientes de entregar a produccion
  // =====================================
  // -->

  // <!--
  // =====================================
  //  Inicio o retorno de folio
  // =====================================
  // -->

  private mapInicioYRetorno = (res: any) => {
    this.msjService.toastCorrecto(res?.mensaje)
    return null
  }

  revision_retornarAlVendedor(id: string): Observable<null> {
    const url = this.base.concat('/retornarAlVendedor')
    return this.http.put(url, { id }).pipe(
      map(this.mapInicioYRetorno),
      catchError(err => this.errFun(err))
    )
  }

  revision_entregarARevision(_id: string): Observable<null> {
    const url = this.base.concat('/entregarARevision')
    return this.http.put(url, { _id }).pipe(
      map(this.mapInicioYRetorno),
      catchError(err => this.errFun(err))
    )
  }

  revision_liberarParaProduccion(folio: Folio): Observable<Folio> {
    const url = this.base.concat('/liberarParaProduccion')
    return this.http.put(url, folio).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        return resp.folio as Folio
      }),
      catchError(err => this.errFun(err))
    )
  }

  laserEnModeloOPedido(pedido: FolioLinea): string {
    if (pedido.laserCliente) return pedido.laserCliente.laser

    if (pedido.modeloCompleto.laserAlmacen)
      return pedido.modeloCompleto.laserAlmacen.laser

    return ''
  }

  findAllOrdenesPorDeparatmento(idDepartamento): Observable<OrdenLigera[]> {
    let url = this.base.concat('/ordenes/' + idDepartamento)
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.ordenes as OrdenLigera[]
      }),
      catchError(err => this.errFun(err))
    )
  }

  recibirOrden(escaneada, idDepartamento): Observable<null> {
    let url = this.base.concat(`/recibirOrden`)

    return this.http.put(url, { ...escaneada, idDepartamento }).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        return null
      }),
      catchError(err => {
        //Este es para que el escaneo sea mas rapido
        this.msjService.toastError(err)
        return throwError(err)
      })
    )
  }

  ponerATrabajar(escaneada, idDepartamento): Observable<null> {
    let url = this.base.concat('/ponerATrabajar')
    return this.http
      .put<OrdenLigera>(url, { ...escaneada, idDepartamento })
      .pipe(
        map((resp: any) => {
          this.msjService.toastCorrecto(resp.mensaje)
          return null
        }),
        catchError(err => {
          //Este es para que el escaneo sea mas rapido
          this.msjService.toastError(err)
          return throwError(err)
        })
      )
  }


  ponerATrabajarEnMaquinaA(
    escaneada,
    idDepartamento,
    idMaquina
  ): Observable<null> {
    let url = this.base.concat('/ponerATrabajarEnMaquina')
    return this.http
      .put<OrdenLigera>(url, { ...escaneada, idDepartamento, idMaquina })
      .pipe(
        map((resp: any) => {
          this.msjService.toastCorrecto(resp.mensaje)
          return null
        }),
        catchError(err => {
          //Este es para que el escaneo sea mas rapido
          this.msjService.toastError(err)
          return throwError(err)
        })
      )
  }

  registrar(escaneada, idDepartamento, datos): Observable<null> {
    let url = this.base.concat('/registrar')
    console.log('servicio', datos)
    return this.http
      .put<OrdenLigera>(url, { ...escaneada, idDepartamento, datos })
      .pipe(
        map((resp: any) => {
          this.msjService.toastCorrecto(resp.mensaje)
          return null
        }),
        catchError(err => {
          //Este es para que el escaneo sea mas rapido
          this.msjService.toastError(err)
          return throwError(err)
        })
      )
  }

  estatusDeLaOrdenParaRegistro(
    escaneada,
    idDepartamento
  ): Observable<{
    ponerATrabajar: boolean
    ponerATrabajarConMaquina: boolean
    yaEstaTrabajando: boolean
  }> {
    let url = this.base
      .concat('/estatusDeLaOrdenParaRegistro')
      .concat(`/${escaneada.idFolio}`)
      .concat(`/${escaneada.idPedido}`)
      .concat(`/${escaneada.idOrden}`)
      .concat(`/${idDepartamento}`)

    return this.http.get<boolean>(url).pipe(
      map((r: any) => {
        return {
          ponerATrabajar: r.ponerATrabajar,
          ponerATrabajarConMaquina: r.ponerATrabajarConMaquina,
          yaEstaTrabajando: r.yaEstaTrabajando
        }
      }),
      catchError(err => {
        //Este es para que el escaneo sea mas rapido
        this.msjService.toastError(err)
        return throwError(err)
      })
    )
  }
}
// <!--
// =====================================
//  END Inicio o retorno de folio
// =====================================
// -->

export interface FolioEnRevision {
  folio: number
  idFolio: string
  cliente: string
  idCliente: string
  vendedor: string
  idVendedor: string
  fechaDeEntregaAProduccion: string
  totalDePiezas: string
}

export interface iPedidosConsulta {
  folio: number
  idFolio: string
  cliente: string
  idCliente: string
  vendedor: string
  idVendedor: string
  fechaDeEntregaAProduccion: string
  fechaTerminadoFolio: string
  fechaTerminadoPedido: string
  cantidadProducidaFolio: number
  cantidadProducidaPedido: number

  pedido: string
  idPedido: string
  sku: string
  idSKU: string
  porcentajeAvanceFolio: number
  porcentajeAvancePedido: number

  laserCliente: string
  laserSKU: string

  cantidadSolicitadaPedido: number
}

export interface FoliosPendientesDeEntregarAProduccion {
  /**
   *Obtiene el id del folio
   *
   * @type {string}
   * @memberof FoliosPendientesEntregarAProduccion
   */
  _id: string
  folio: string
  cliente: string
  fechaDeCreacion: string
  idCliente: string
}

//Esto tiene que ir en el servicio

export interface OrdenLigera {
  recibida: boolean
  consecutivoRuta: number
  consecutivoOrden: number
  totalDeOrdenes: number
  procesoActual: string
  idProcesoActual: string

  numeroDeOrden: string
  sku: string //era modeloCompleto
  idSKU: string
  fechaDeEntregaAProduccion: Date //era fechaPedidoProduccion

  laser: string
  laserAlmacen: string
  // marcaLaser: string ///Revisar esto!!!

  cliente: string
  idCliente: string
  esBaston: boolean

  unidad: number
  piezas: number

  disponible: boolean
  folio: string
  pedido: string
  orden: string

  ubicacionActual: Ruta
  ruta: Ruta[]
  pasos: number
  numerosDeOrden: number[]
  paso: number
  // No siempre aparecen estos
  inicio: Date
  finalizacion: Date
  observacionesOrden: string
  observacionesPedido: string
  observacionesFolio: string
}
