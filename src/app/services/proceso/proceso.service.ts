import { Injectable } from "@angular/core"
import { URL_SERVICIOS } from "../../config/config"
import { HttpClient } from "@angular/common/http"
import { ManejoDeMensajesService } from "../utilidades/manejo-de-mensajes.service"
import { Proceso } from "src/app/models/proceso.model"
import { PreLoaderService } from "src/app/components/pre-loader/pre-loader.service"
import { PaginadorService } from "src/app/components/paginador/paginador.service"
import { CRUD } from "../crud"
import { UtilidadesService } from "../utilidades/utilidades.service"
import { Observable } from "rxjs"
import { map, catchError } from "rxjs/operators"
import { throwError } from "rxjs/internal/observable/throwError"

@Injectable({
  providedIn: "root"
})
export class ProcesoService extends CRUD<Proceso, undefined, undefined> {
  total: number = 0

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
    this.base = URL_SERVICIOS + `/proceso`
    this.nombreDeDatos.plural = "procesos"
    this.nombreDeDatos.singular = "proceso"
    this.urlBusqueda = "/buscar"
  }

  findById_multiple(ids: string[]): Observable<Proceso[]> {
    let a = this._preLoaderService.loading("Buscando procesos por defecto")
    let i = { busqueda: ids }
    return this.http.post(`${this.base}/buscar_multiple`, i).pipe(
      map( (resp)=> this.findById_cb(resp, a) ),
      catchError(this.err)
    )
  }

  private findById_cb(resp, a){
    
    let p: Proceso[] = []
      resp.procesos.forEach((pp) => {
        let np = new Proceso().deserialize(pp)
        p.push(np)
      })
      this._msjService.ok_(resp, null, a)
  
      return p
  }

}
