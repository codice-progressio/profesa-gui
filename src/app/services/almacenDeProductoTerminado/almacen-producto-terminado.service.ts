import { Injectable } from '@angular/core'
import { CRUD } from '../crud'
import { ModeloCompleto } from 'src/app/models/modeloCompleto.modelo'
import { HttpClient } from '@angular/common/http'
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service'
import { UtilidadesService } from '../utilidades/utilidades.service'
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { URL_SERVICIOS } from 'src/app/config/config'
import { Observable, throwError } from 'rxjs'
import { FiltrosModelosCompletos } from '../utilidades/filtrosParaConsultas/FiltrosModelosCompletos'
import { catchError, map } from 'rxjs/operators'
import { URL_BASE } from '../../config/config'

@Injectable({
  providedIn: 'root'
})
export class AlmacenProductoTerminadoService extends CRUD<
  ModeloCompleto,
  AlmacenProductoTerminadoService,
  FiltrosModelosCompletos<AlmacenProductoTerminadoService>
> {
  // base: string = `${URL_SERVICIOS}/modeloCompleto`;
  // total: number;
  constructor(
    public http: HttpClient,
    public _msjService: ManejoDeMensajesService,
    public _utiliadesService: UtilidadesService,
    public _preLoaderService: PreLoaderService,
    public _paginadorService: PaginadorService
  ) {
    super(
      http,
      _msjService,
      _utiliadesService,
      _preLoaderService,
      _paginadorService
    )
    this.base = URL_SERVICIOS + `/modeloCompleto`
    this.nombreDeDatos.plural = 'modelosCompletos'
    this.nombreDeDatos.singular = 'modeloCompleto'
    this.urlBusqueda = '/buscar'
  }

  todo(): Observable<ModeloCompleto[]> {
    return this.getAll(
      undefined,
      undefined,
      this.filtrosDelFolio.obtenerFiltros(),
      ModeloCompleto
    )
  }

  errFun(err) {
    this._msjService.err(err)
    return throwError(err)
  }
  consolidar(id: string): Observable<ModeloCompleto> {
    const a = this._preLoaderService.loading('Consolidando lotes')
    const url = URL_BASE('almacenDeProductoTerminado').concat(`/consolidar/${id}`)
    return this.http.get<ModeloCompleto>(url).pipe(
      map((res: any) => {
        this._msjService.ok_(res, null, a)
        return new ModeloCompleto().deserialize(res.modeloCompleto)
      }),
      catchError(err => this.errFun(err))
    )
  }
}
