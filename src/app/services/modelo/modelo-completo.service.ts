import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { URL_SERVICIOS } from "../../config/config"
import { map, catchError } from "rxjs/operators"
import { throwError, Observable } from "rxjs"
import { ModeloCompleto } from "../../models/modeloCompleto.modelo"
import { ManejoDeMensajesService } from "../utilidades/manejo-de-mensajes.service"
import { UtilidadesService } from "../utilidades/utilidades.service"
import { PreLoaderService } from "src/app/components/pre-loader/pre-loader.service"
import { PaginadorService } from "src/app/components/paginador/paginador.service"
import { CRUD } from "../crud"
import { Folio } from "src/app/models/folio.models"

@Injectable({
  providedIn: "root"
})
export class ModeloCompletoService extends CRUD<
  ModeloCompleto,
  undefined,
  undefined
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
    this.nombreDeDatos.plural = "modelosCompletos"
    this.nombreDeDatos.singular = "modeloCompleto"
    this.urlBusqueda = "/buscar"
  }

  err = (err) => {
    this._msjService.err(err)
    return throwError(err)
  }

  // todo(): Observable<ModeloCompleto[]> {
  //   return this.getAll(undefined, undefined, undefined, ModeloCompleto)
  // }

 

  /**
   *Obtiene el total del modelo completo en transito.
   *
   * @param {string} id El id del modeloCompleto del que se quiere obtener la informacion.
   * @returns {Observable< number >} El observable con los datos.
   * @memberof ModeloCompletoService
   */
  obtenerProduccionEnTransito(id: string): Observable<number> {
    let a = this._preLoaderService.loading(
      "Consultando produccion en transito."
    )
    return this.http.get(`${this.base}/transito/${id}`).pipe(
      map((resp: any) => {
        this._msjService.ok_(resp, null, a)
        return <number>resp.total
      }),
      catchError(this.err)
    )
  }

  modificarStock(mc: ModeloCompleto): Observable<ModeloCompleto> {
    // solo mandamos el stock.

    let a = this._preLoaderService.loading("Modificando stock")

    let m = {
      _id: mc._id,
      stockMinimo: mc.stockMinimo,
      stockMaximo: mc.stockMaximo
    }

    return this.http.post(`${this.base}/stock`, m).pipe(
      map((resp: any) => {
        this._msjService.ok_(resp, null, a)

        let mod = new ModeloCompleto()
        mod._servicio = this

        return mod.deserialize(resp.modeloCompleto)
      }),
      catchError(this.err)
    )
  }
}
