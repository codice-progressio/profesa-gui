import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, URL_BASE } from 'src/app/config/config';

import { Departamento } from 'src/app/models/departamento.models';
import { CRUD } from '../crud';
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service';
import { UtilidadesService } from '../utilidades/utilidades.service';
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service';
import { PaginadorService } from 'src/app/components/paginador/paginador.service';
import { UsuarioService } from '../usuario/usuario.service';
import { throwError, Observable } from 'rxjs'
import { Paginacion } from 'src/app/utils/paginacion.util'
import { map, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService   {
  total: number = 0
  base = URL_BASE('departamento')
  pool: iDepartamentoPool[] = []

  constructor(
    public http: HttpClient,
    public msjService: ManejoDeMensajesService,
    public utiliadesService: UtilidadesService,
    public preLoaderService: PreLoaderService,
    public paginadorService: PaginadorService
  ) {}

  errFun(err) {
    this.msjService.err(err)
    return throwError(err)
  }

  findAll(paginacion: Paginacion, filtros: string = ''): Observable<Departamento[]> {
    const a = this.preLoaderService.loading('Cargando departamento')
    const url = this.base
      .concat('?')
      .concat(`desde=${paginacion.desde}`)
      .concat(`&limite=${paginacion.limite}`)
      .concat(`&campo=${paginacion.campoDeOrdenamiento}`)
      .concat(`&sort=${paginacion.orden}`)
      .concat(`&${filtros}`)

    return this.http.get(url).pipe(
      map((respuesta: any) => {
        this.msjService.ok_(respuesta, null, a)

        const departamentos: Departamento[] = []

        this.total = respuesta.total

        respuesta.departamentos.forEach(x =>
          departamentos.push(new Departamento().deserialize(x))
        )
        this.total = respuesta.total
        return departamentos
      }),
      catchError(err => this.errFun(err))
    )
  }

  findById(id: string): Observable<Departamento> {
    const a = this.preLoaderService.loading('Cargando departamentos')
    const url = this.base.concat(`/${id}`)
    return this.http.get(url).pipe(
      map((respuesta: any) => {
        this.msjService.ok_(respuesta, null, a)

        return new Departamento().deserialize(respuesta.departamento)
      }),
      catchError(err => this.errFun(err))
    )
  }

  findByTerm(
    termino: string,
    paginacion: Paginacion,
    filtros: string = ''
  ): Observable<Departamento[]> {
    const a = this.preLoaderService.loading(
      'Buscando departamentos con el termino: ' + termino
    )
    const url = this.base
      .concat(`/buscar/${termino}`)
      .concat('?')
      .concat(`&desde=${paginacion.desde}`)
      .concat(`&limite=${paginacion.limite}`)
      .concat(`&campo=${paginacion.campoDeOrdenamiento}`)
      .concat(`&sort=${paginacion.orden}`)
      .concat(`&${filtros}`)

    return this.http.get(url).pipe(
      map((respuesta: any) => {
        this.msjService.ok_(respuesta, null, a)
        const departamentos: Departamento[] = []

        respuesta.departamentos.forEach(x =>
          departamentos.push(new Departamento().deserialize(x))
        )

        this.total = respuesta.total

        return departamentos
      }),
      catchError(err => this.errFun(err))
    )
  }

  delete(id: string): Observable<Departamento> {
    const a = this.preLoaderService.loading('Eliminando departamento')
    const url = this.base.concat(`/${id}`)

    return this.http.delete(url).pipe(
      map((respuesta: any) => {
        this.msjService.ok_(respuesta, null, a)

        return new Departamento().deserialize(respuesta.departamento)
      }),
      catchError(err => this.errFun(err))
    )
  }

  update(departamento: Departamento): Observable<Departamento> {
    const a = this.preLoaderService.loading('Modificando departamento')
    let url = this.base

    return this.http.put<Departamento>(url, departamento).pipe(
      map((resp: any) => {
        this.msjService.ok_(resp, null, a)
        return resp.departamento as Departamento
      }),
      catchError(err => this.errFun(err))
    )
  }

  save(departamento: Departamento): Observable<Departamento> {
    const a = this.preLoaderService.loading('Guardando departamento')
    let url = this.base

    return this.http.post<Departamento>(url, departamento).pipe(
      map((resp: any) => {
        this.msjService.ok_(resp, null, a)
        return resp.departamento as Departamento
      }),
      catchError(err => this.errFun(err))
    )
  }
  
}
