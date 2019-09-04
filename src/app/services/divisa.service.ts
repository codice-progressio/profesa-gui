import { Injectable } from '@angular/core';
import { Divisa } from '../models/divisas/divisa.model'
import { FiltrosDivisas } from './utilidades/filtrosParaConsultas/FiltrosDivisas'
import { CRUD } from './crud';
import { ManejoDeMensajesService } from './utilidades/manejo-de-mensajes.service';
import { UtilidadesService } from './utilidades/utilidades.service';
import { PreLoaderService } from '../components/pre-loader/pre-loader.service';
import { PaginadorService } from '../components/paginador/paginador.service';
import { URL_SERVICIOS } from '../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DivisaService extends CRUD<
Divisa,
DivisaService,
FiltrosDivisas<DivisaService>
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
  this.base = URL_SERVICIOS + `/divisa`
  this.nombreDeDatos.plural = "divisas"
  this.nombreDeDatos.singular = "divisa"
  this.urlBusqueda = "/buscar"
}
}
