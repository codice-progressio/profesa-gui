import { Injectable } from "@angular/core"
import { Proveedor } from "../models/proveedores/proveedor.model"
import { ProveedorFiltros } from "./utilidades/filtrosParaConsultas/proveedor.filtros"
import { CRUD } from "./crud"
import { ManejoDeMensajesService } from "./utilidades/manejo-de-mensajes.service"
import { UtilidadesService } from "./utilidades/utilidades.service"
import { PreLoaderService } from "../components/pre-loader/pre-loader.service"
import { PaginadorService } from "../components/paginador/paginador.service"
import { URL_SERVICIOS } from "../config/config"
import { HttpClient } from "@angular/common/http"
import { Observable, pipe, throwError } from "rxjs"
import { Articulo } from "../models/almacenDeMateriaPrimaYHerramientas/articulo.modelo"
import { map, catchError } from "rxjs/operators"

@Injectable({
  providedIn: "root"
})
export class ProveedorService extends CRUD<
  Proveedor,
  ProveedorService,
  ProveedorFiltros<ProveedorService>
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
    this.base = URL_SERVICIOS + `/proveedor`
    this.nombreDeDatos.plural = "proveedores"
    this.nombreDeDatos.singular = "proveedor"
    this.urlBusqueda = "/buscar"
  }

  todo(): Observable<Proveedor[]> {
    return this.getAll(
      undefined,
      undefined,
      this.filtrosDelFolio.obtenerFiltros(),
      Proveedor,
      true
    )
  }

  relacionadosAlArticulo(articulo: Articulo): Observable<Proveedor[]> {
    let url = `${this.base}/relacionadosAlArticulo/${articulo._id}`
    let a = this._preLoaderService.loading(
      "Cargando los proveedores relacionados al articulo"
    )
    return this.http.get(url).pipe(
      map((resp: any) => {
        this._msjService.ok_(resp, null, a)

        let proveedores: Proveedor[] = resp["proveedores"].map((x) => {
          return new Proveedor().deserialize(x)
        })

        return proveedores
      }),
      catchError((err) => {
        this._msjService.err(err)
        return throwError(err)
      })
    )
  }
}
