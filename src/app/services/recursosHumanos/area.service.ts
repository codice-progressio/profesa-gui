import { Injectable } from "@angular/core"
import { AreaRH } from '../../models/recursosHumanos/areas/areaRH.model'
import { AreaFiltros } from "../utilidades/filtrosParaConsultas/area.filtros"
import { CRUD } from "../crud"
import { ManejoDeMensajesService } from "../utilidades/manejo-de-mensajes.service"
import { UtilidadesService } from "../utilidades/utilidades.service"
import { PreLoaderService } from "src/app/components/pre-loader/pre-loader.service"
import { PaginadorService } from "src/app/components/paginador/paginador.service"
import { HttpClient } from "@angular/common/http"
import { URL_SERVICIOS } from "src/app/config/config"
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AreaService extends CRUD<
  AreaRH,
  AreaService,
  AreaFiltros<AreaService>
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
    this.base = URL_SERVICIOS + `/area`
    this.nombreDeDatos.plural = "areas"
    this.nombreDeDatos.singular = "area"
    this.urlBusqueda = "/buscar"
  }

  todo(): Observable<AreaRH[]> {
    return this.getAll(
      undefined,
      undefined,
      this.filtrosDelFolio.obtenerFiltros(),
      AreaRH,
      true
    )
  }
}
