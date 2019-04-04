import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service';
import { UtilidadesService } from '../utilidades/utilidades.service';
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Tamano } from 'src/app/models/tamano.models';
import { PaginadorService } from 'src/app/components/paginador/paginador.service';
import { CRUD } from '../crud';



@Injectable({
  providedIn: 'root'
})
export class TamanoService  extends CRUD<Tamano, undefined, undefined> {
  constructor(
    public http: HttpClient,
    public _msjService: ManejoDeMensajesService,
    public _utiliadesService: UtilidadesService,
    public _preLoaderService: PreLoaderService,
    public _paginadorService: PaginadorService
  ) {
    super(http, _msjService, _utiliadesService, _preLoaderService, _paginadorService);
    this.base =  URL_SERVICIOS + `/tamano`;
    this.nombreDeDatos.plural = 'tamanos';
    this.nombreDeDatos.singular = 'tamano';

  }

}
