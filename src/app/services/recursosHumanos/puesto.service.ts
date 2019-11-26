import { Injectable } from '@angular/core'
import { CRUD } from '../crud'
import { Puesto } from 'src/app/models/recursosHumanos/puestos/puesto.model'
import { PuestoFiltros } from '../utilidades/filtrosParaConsultas/puesto.filtros'
import { HttpClient } from '@angular/common/http'
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service'
import { UtilidadesService } from '../utilidades/utilidades.service'
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { URL_SERVICIOS } from 'src/app/config/config'
import { Observable, pipe, throwError } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PuestoService extends CRUD<
  Puesto,
  PuestoService,
  PuestoFiltros<PuestoService>
> {
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
    this.base = URL_SERVICIOS + `/puesto`
    this.nombreDeDatos.plural = 'puestos'
    this.nombreDeDatos.singular = 'puesto'
    this.urlBusqueda = '/buscar'
  }

  todo(): Observable<Puesto[]> {
    return this.getAll(
      undefined,
      undefined,
      this.filtrosDelFolio.obtenerFiltros(),
      Puesto,
      true
    )
  }

  findMultiple(ids: string[]): Observable<Puesto[]> {
    let a = this._preLoaderService.loading(
      'Poblacion manual de puestos en proceso'
    )
    let url = this.base + '/multiple'
    return this.http.post<Puesto[]>(url, ids).pipe(
      map((resp: any) => {
        this._msjService.ok_(resp, null, a)
        return resp.puestos.map(puesto => new Puesto().deserialize(puesto))
      }),
      catchError(this.err)
    )
  }
}
