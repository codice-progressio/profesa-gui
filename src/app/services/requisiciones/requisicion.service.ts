import { Injectable } from "@angular/core"
import { Requisicion } from "../../models/requisiciones/requisicion.model"
import { RequisicionFiltros } from "../utilidades/filtrosParaConsultas/requisicion.filtro"
import { CRUD } from "../crud"
import { ManejoDeMensajesService } from "../utilidades/manejo-de-mensajes.service"
import { UtilidadesService } from "../utilidades/utilidades.service"
import { PreLoaderService } from "src/app/components/pre-loader/pre-loader.service"
import { PaginadorService } from "src/app/components/paginador/paginador.service"
import { UsuarioService } from "../usuario/usuario.service"
import { URL_SERVICIOS } from "src/app/config/config"
import { HttpClient } from "@angular/common/http"
import { Observable, throwError } from "rxjs"
import { EstatusRequisicion } from "../../models/requisiciones/estatusRequisicion.model"
import { catchError, map } from "rxjs/operators"

@Injectable({
  providedIn: "root"
})
export class RequisicionService extends CRUD<
  Requisicion,
  RequisicionService,
  RequisicionFiltros<RequisicionService>
> {
  constructor(
    public http: HttpClient,
    public _msjService: ManejoDeMensajesService,
    public _utiliadesService: UtilidadesService,
    public _preLoaderService: PreLoaderService,
    public _paginadorService: PaginadorService,
    public _usuarioService: UsuarioService
  ) {
    super(
      http,
      _msjService,
      _utiliadesService,
      _preLoaderService,
      _paginadorService
    )

    this.base = URL_SERVICIOS + `/requisicion`
    this.nombreDeDatos.plural = "requisiciones"
    this.nombreDeDatos.singular = "requisicion"
    this.urlBusqueda = "/buscar"
  }

  todo(): Observable<Requisicion[]> {


    return this.getAll(
      undefined,
      undefined,
      this.filtrosDelFolio.obtenerFiltros(),
      Requisicion
    )
  }

  actualizarEstatus(requisicion: Requisicion): Observable<Requisicion> {
    let a = this._preLoaderService.loading(
      "Actualizando estatus de requisicion"
    )

    let url = `${this.base}/estatus/actualizar/${requisicion._id}`

    return this.http.put(url, requisicion).pipe(
      map((resp: any) => {
        this._msjService.ok_(resp, null, a)

        return new Requisicion().deserialize(resp.requisicion)
      }),
      catchError(this.err)
    )
  }

  subirFacturasYActualizarEstatus(
    requisicion: Requisicion,
    facturas: File
  ) {
    let a = this._preLoaderService.loading(
      "Actualizando estatus de requisicion y subiendo facturas."
    )
  }
}
