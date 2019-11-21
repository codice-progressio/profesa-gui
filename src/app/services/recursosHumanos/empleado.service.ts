import { Injectable } from '@angular/core';
import { CRUD } from '../crud';
import { Empleado } from 'src/app/models/recursosHumanos/empleados/empleado.model';
import { EmpleadoFiltros } from '../utilidades/filtrosParaConsultas/empleado.filtros';
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service';
import { UtilidadesService } from '../utilidades/utilidades.service';
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service';
import { PaginadorService } from 'src/app/components/paginador/paginador.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService extends CRUD<
Empleado,
EmpleadoService,
EmpleadoFiltros<EmpleadoService>
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
  this.base = URL_SERVICIOS + `/empleado`
  this.nombreDeDatos.plural = "empleados"
  this.nombreDeDatos.singular = "empleado"
  this.urlBusqueda = "/buscar"
}

todo(): Observable<Empleado[]> {
  return this.getAll(
    undefined,
    undefined,
    this.filtrosDelFolio.obtenerFiltros(),
    Empleado,
    true
  )
}
}
