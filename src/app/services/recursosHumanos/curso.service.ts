import { Injectable } from "@angular/core"
import { CRUD } from "../crud"
import { Curso } from "src/app/models/recursosHumanos/cursos/curso.model"
import { CursoFiltros } from "../utilidades/filtrosParaConsultas/curso.filtros"
import { ManejoDeMensajesService } from "../utilidades/manejo-de-mensajes.service"
import { UtilidadesService } from "../utilidades/utilidades.service"
import { PreLoaderService } from "src/app/components/pre-loader/pre-loader.service"
import { PaginadorService } from "src/app/components/paginador/paginador.service"
import { URL_SERVICIOS } from "src/app/config/config"
import { Observable } from "rxjs"
import { HttpClient } from "@angular/common/http"
import { catchError, map } from "rxjs/operators"

@Injectable({
  providedIn: "root"
})
export class CursoService extends CRUD<
  Curso,
  CursoService,
  CursoFiltros<CursoService>
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
    this.base = URL_SERVICIOS + `/curso`
    this.nombreDeDatos.plural = "cursos"
    this.nombreDeDatos.singular = "curso"
    this.urlBusqueda = "/buscar"
  }

  todo(): Observable<Curso[]> {
    return this.getAll(
      undefined,
      undefined,
      this.filtrosDelFolio.obtenerFiltros(),
      Curso,
      true
    )
  }

  /**
   *Busca todos los cursos marcados como tronco comun
   *
   * @memberof CursoService
   */
  todosTroncoComun(): Observable<Curso[]> {
    let a = this._preLoaderService.loading("Buscando cursos de tronco comun")
    let url = `${this.base}/tipoDeCurso/troncoComun`
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.cursos.map((curso) => {
          this._msjService.ok_(resp, null, a)
          return new Curso().deserialize(curso)
        })
      }),
      catchError(this.err)
    )
  }
}
