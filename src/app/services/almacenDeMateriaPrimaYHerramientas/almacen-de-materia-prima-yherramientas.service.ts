import { Injectable } from "@angular/core"
import { CRUD } from "../crud"
import { Articulo } from "../../models/almacenDeMateriaPrimaYHerramientas/articulo.modelo"
import { FiltrosArticulos } from "../utilidades/filtrosParaConsultas/FiltrosArticulos"
import { ManejoDeMensajesService } from "../utilidades/manejo-de-mensajes.service"
import { UtilidadesService } from "../utilidades/utilidades.service"
import { PreLoaderService } from "src/app/components/pre-loader/pre-loader.service"
import { PaginadorService } from "src/app/components/paginador/paginador.service"
import { URL_SERVICIOS } from "src/app/config/config"
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: "root"
})
export class AlmacenDeMateriaPrimaYHerramientasService extends CRUD<
  Articulo,
  AlmacenDeMateriaPrimaYHerramientasService,
  FiltrosArticulos<AlmacenDeMateriaPrimaYHerramientasService>
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
    this.base = URL_SERVICIOS + `/almacenDeMateriaPrimaYHerramientas/articulo`
    this.nombreDeDatos.plural = "articulos"
    this.nombreDeDatos.singular = "articulo"
    this.urlBusqueda = "/buscar"
  }
}



