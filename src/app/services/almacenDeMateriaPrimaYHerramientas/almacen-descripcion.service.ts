import { Injectable } from "@angular/core"
import { AlmacenDescripcion } from "../../models/almacenDeMateriaPrimaYHerramientas/almacen-descripcion.model"
import { CRUD } from "../crud"
import {} from "../utilidades/filtrosParaConsultas/FiltrosArticulos"
import { FilstrosAlmacenDescripcion } from "../utilidades/filtrosParaConsultas/FilstrosAlmacenDescripcion"
import { HttpClient } from "@angular/common/http"
import { ManejoDeMensajesService } from "../utilidades/manejo-de-mensajes.service"
import { UtilidadesService } from "../utilidades/utilidades.service"
import { PreLoaderService } from "src/app/components/pre-loader/pre-loader.service"
import { PaginadorService } from "src/app/components/paginador/paginador.service"
import { URL_SERVICIOS } from "src/app/config/config"
import { Observable } from "rxjs"

@Injectable({
  providedIn: "root"
})
export class AlmacenDescripcionService extends CRUD<
  AlmacenDescripcion,
  AlmacenDescripcionService,
  FilstrosAlmacenDescripcion<AlmacenDescripcionService>
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
    this.base = URL_SERVICIOS + `/almacenDescripcion`
    this.nombreDeDatos.plural = "almacenesDescripcion"
    this.nombreDeDatos.singular = "almacenDescripcion"
    this.urlBusqueda = "/buscar"
  }

  todo(): Observable<AlmacenDescripcion[]> {
    return this.getAll(
      undefined,
      undefined,
      undefined,
      AlmacenDescripcion
    )
  }
}
