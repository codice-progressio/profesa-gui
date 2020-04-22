import { Injectable } from '@angular/core'
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service'
import { UtilidadesService } from '../utilidades/utilidades.service'
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { UsuarioService } from '../usuario/usuario.service'
import { Lotes } from 'src/app/models/almacenProductoTerminado/lotes.model'
import { Observable, pipe, throwError } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators'
import { URL_SERVICIOS } from '../../config/config'
import { SalidasLotes } from '../../models/almacenProductoTerminado/salidasLote.model'

@Injectable({
  providedIn: 'root'
})
export class LoteService {
  urlBase = `${URL_SERVICIOS}/almacenDeProductoTerminado/lote`

  constructor(
    public http: HttpClient,
    public msjService: ManejoDeMensajesService,
    public _utiliadesService: UtilidadesService,
    public _preLoaderService: PreLoaderService,
    public _paginadorService: PaginadorService,
    public _usuarioService: UsuarioService
  ) {}

  msjError = err => {
    this.msjService.err(err)
    return throwError(err)
  }

  /**
   *Guarda un lote para el id del modelo completo que se le pase.
   *
   * @param {string} _id El id del modelo
   * @param {Lotes} lote El lote nuevo a guardar.
   * @returns {Observable<Lotes>} El lote guardardo.
   * @memberof LoteService
   */
  guardar(_id: string, lote: Lotes): Observable<Lotes> {
    // Creamos un objeto para el post.

    let l = { _id, lote }

    return this.http.post(this.urlBase, l).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        return resp.datos
      }),
      catchError(this.msjError)
    )
  }

  eliminar(_id: string, idLote: string): Observable<null> {
    let a = this._preLoaderService.loading('Eliminan el lote.')
    let url = `${this.urlBase}/${_id}/${idLote}`

    return this.http.delete(url).pipe(
      map((resp: any) => {
        this.msjService.ok_(resp, null, a)
        return null
      }),
      catchError(this.msjError)
    )
  }

  registrarSalida(
    lote: SalidasLotes,
    idLote: string,
    idModeloCompleto: string
  ): Observable<null> {
    let url = `${URL_SERVICIOS}/almacenDeProductoTerminado/salida`

    let o = {
      _id: idModeloCompleto,
      _idLote: idLote,
      salida: lote
    }
    return this.http.post(url, o).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        return null
      }),
      catchError(this.msjError)
    )
  }
}
