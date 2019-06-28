import { Injectable } from "@angular/core"
import { CRUD } from "../crud"
import { Articulo } from "src/app/models/almacenDeMateriaPrimaYHerramientas/articulo.modelo"
import { AlmacenDeMateriaPrimaYHerramientasService } from "../almacenDeMateriaPrimaYHerramientas/almacen-de-materia-prima-yherramientas.service"
import { FiltrosArticulos } from "../utilidades/filtrosParaConsultas/FiltrosArticulos"
import { ManejoDeMensajesService } from "../utilidades/manejo-de-mensajes.service"
import { UtilidadesService } from "../utilidades/utilidades.service"
import { PreLoaderService } from "src/app/components/pre-loader/pre-loader.service"
import { PaginadorService } from "src/app/components/paginador/paginador.service"
import { URL_SERVICIOS } from "src/app/config/config"
import { HttpClient } from "@angular/common/http"
import { Observable, throwError } from "rxjs"
import { SalidaArticulo } from "../../models/almacenDeMateriaPrimaYHerramientas/salidaArticulo.model"
import { map, catchError } from "rxjs/operators"
import { EntradaArticulo } from "../../models/almacenDeMateriaPrimaYHerramientas/entradaArticulo.model"
import { Deserializable } from "../../models/deserealizable.model"

@Injectable({
  providedIn: "root"
})
export class ArticuloService extends CRUD<
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
    this.base = URL_SERVICIOS + `/articulo`
    this.nombreDeDatos.plural = "articulos"
    this.nombreDeDatos.singular = "articulo"
    this.urlBusqueda = "/buscar"
  }

  todo(): Observable<Articulo[]> {
    return this.getAll(
      undefined,
      undefined,
      this.filtrosDelFolio.obtenerFiltros(),
      Articulo
    )
  }

  buscar(
    termino: string,
    urlAlternativa: string = "",
    msjLoading: string = `Buscando ${this.nombreDeDatos.plural}`
  ): Observable<Articulo[]> {
    return this.search(termino, urlAlternativa, msjLoading, Articulo)
  }

  respuesta = (resp: any) => {
    this._msjService.ok_(resp, null, this.aSE)
    let articulo: Articulo = new Articulo().deserialize(resp.articulo)
    return articulo
  }

  aSE = null
  salida(id: string, salida: SalidaArticulo): Observable<Articulo> {
    this.aSE = this._preLoaderService.loading("Almacenando salida")
    return this.http.put(`${this.base}/salida/${id}`, salida).pipe(
      map(this.respuesta),
      catchError(this.err)
    )
  }
  entrada(id: string, entrada: EntradaArticulo): Observable<Articulo> {
    this.aSE = this._preLoaderService.loading("Almacenando entrada")
    return this.http.put(`${this.base}/entrada/${id}`, entrada).pipe(
      map(this.respuesta),
      catchError(this.err)
    )
  }
}
