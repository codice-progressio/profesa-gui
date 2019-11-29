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

  private pTemp: Puesto[]
  autoPopulate(puestos: Puesto[]) {
    {
      //Extraemos todos los ids que contengan los datos
      // de reportaA y personalACargo
      let ids: Set<string> = this.obtenerIds(puestos)

      this.findMultiple(Array.from(ids)).subscribe(pRemplazos =>
        this.operacionesDeRemplazo(pRemplazos, puestos)
      )
    }
  }

  private operacionesDeRemplazo(pRemplazos, puestos) {
    puestos.forEach(puesto => {
      if (puesto.reportaA)
        puesto.reportaA = this.filtrarPuesto(pRemplazos, puesto.reportaA._id)

      let operacion = x => this.filtrarPuesto(pRemplazos, x._id)
      puesto.personalACargo = puesto.personalACargo.map(x => operacion(x))
      puesto.elPuestoPuedeDesarrollarseEnLasSiguientesAreas = puesto.elPuestoPuedeDesarrollarseEnLasSiguientesAreas.map(
        x => operacion(x)
      )
    })
  }

  private obtenerIds(puestos: Puesto[]): Set<string> {
    let ids = new Set<string>()
    puestos.forEach(puesto => {
      if (puesto.reportaA) ids.add(puesto.reportaA._id)

      this.obtenerIds_arreglos(puesto.personalACargo, ids)
      this.obtenerIds_arreglos(
        puesto.elPuestoPuedeDesarrollarseEnLasSiguientesAreas,
        ids
      )
    })

    return ids
  }

  private obtenerIds_arreglos(arreglo: Puesto[], ids: Set<string>) {
    if (arreglo.length > 0) {
      arreglo.map(x => x._id).forEach(x => ids.add(x))
    }
  }

  filtrarPuesto(remplazos: Puesto[], id: string) {
    let filtrado = remplazos.find(p => p._id === id)
    return filtrado
  }
}
