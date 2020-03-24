import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { URL_SERVICIOS, URL_BASE } from '../../config/config'
import { map, catchError } from 'rxjs/operators'
import { Laser } from '../../models/laser.models'
import { throwError, Observable } from '../../../../node_modules/rxjs'
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service'
import { Cliente } from 'src/app/models/cliente.models'
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service'
import { ModeloCompleto } from 'src/app/models/modeloCompleto.modelo'
import { CRUD } from '../crud'

import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { UtilidadesService } from '../utilidades/utilidades.service'
import { UsuarioService } from '../usuario/usuario.service'
import { Paginacion } from 'src/app/utils/paginacion.util'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  base = URL_BASE('cliente')
  constructor(
    public http: HttpClient,
    public msjService: ManejoDeMensajesService,
    public utilidadesService: UtilidadesService,
    public preLoaderService: PreLoaderService,
    public paginadorService: PaginadorService,
    public usuarioService: UsuarioService
  ) {}

  errFun(err) {
    this.msjService.err(err)
    return throwError(err)
  }

  findById(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(this.base.concat(`/${id}`)).pipe(
      map(
        (resp: any) => {
          return resp.cliente as Cliente
        },
        catchError(err => this.errFun(err))
      )
    )
  }

  findAll(
    paginacion: Paginacion = new Paginacion(30, 0, 1, 'nombre'),
    filtros: string
  ): Observable<Cliente[]> {
    const url = this.base
      .concat('?')
      .concat(`desde=${paginacion.desde}`)
      .concat(`&limite=${paginacion.limite}`)
      .concat(`&campo=${paginacion.campoDeOrdenamiento}`)
      .concat(`&sort=${paginacion.orden}`)
      .concat(`&${filtros}`)

    return this.http.get<Cliente[]>(url).pipe(
      map((resp: any) => {
        return resp.clientes as Cliente[]
      }),
      catchError(err => this.errFun(err))
    )
  }

  findByTermn(
    termino: string,
    paginacion: Paginacion = new Paginacion(30, 0, 1, 'nombre')
  ): Observable<Cliente[]> {
    const url = this.base
      .concat(`/buscar/${termino}?`)
      .concat(`desde=${paginacion.desde}`)
      .concat(`&limite=${paginacion.limite}`)
      .concat(`&campo=${paginacion.campoDeOrdenamiento}`)
      .concat(`&sort=${paginacion.orden}`)

    return this.http.get<Cliente[]>(url).pipe(
      map((resp: any) => {
        return resp.clientes as Cliente[]
      }),
      catchError(err => this.errFun(err))
    )
  }

  save(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.base, cliente).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        return resp.cliente as Cliente
      }),
      catchError(err => this.errFun(err))
    )
  }

  update(cliente: Cliente): Observable<null> {
    return this.http.put<Cliente>(this.base, cliente).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        return null
      }),
      catchError(err => this.errFun(err))
    )
  }

  delete(id: string): Observable<Cliente> {
    return this.http.delete<Cliente>(this.base).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        return resp.cliente
      }),
      catchError(err => this.errFun(err))
    )
  }

  guardarNuevaMarcaLaser(id: string, marca: string) {
    const a: number = this.preLoaderService.loading('Guardando marca laser.')

    const url = URL_SERVICIOS + `/cliente/laser/${id}`

    const laser = new Laser('', marca)

    return this.http.put(url, laser).pipe(
      map((resp: any) => {
        this.msjService.ok_(resp, null, a)
        return resp.cliente
      }),
      catchError(err => {
        console.log('Capturando error.')

        this.msjService.err(err)
        return throwError(err)
      })
    )
  }

  solicitarAutorizacionDeModeloCompleto(cliente: Cliente, mc: ModeloCompleto) {
    const a: number = this.preLoaderService.loading(
      'Guardando solicitud de modelo completo.'
    )
    const datos = {
      modeloCompleto: mc._id,
      usuarioQueSolicitaAutorizacion: this.usuarioService.usuario._id
    }
    const url = `${URL_SERVICIOS}/cliente/solicitarAutorizacion/modeloCompleto/${cliente._id}`
    return this.http.put(url, datos).pipe(
      map((resp: any) => {
        this.msjService.ok_(resp, null, a)
        return resp.clientes
      }),
      catchError(err => {
        this.msjService.err(err)
        return throwError(err)
      })
    )
  }
}
