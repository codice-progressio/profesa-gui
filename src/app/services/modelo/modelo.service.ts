import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICIOS } from 'src/app/config/config';
import { Modelo } from 'src/app/models/modelo.models';
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service';
import { UtilidadesService } from '../utilidades/utilidades.service';
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service';
import { PaginadorService } from 'src/app/components/paginador/paginador.service';
import { CRUD } from '../crud';
import { Tamano } from 'src/app/models/tamano.models';

@Injectable({
  providedIn: 'root'
})
export class ModeloService extends CRUD<Modelo, undefined, undefined> {
  // total: number;
  // base: string = URL_SERVICIOS + `/modelo`
  constructor(
    public http: HttpClient,
    public msjService: ManejoDeMensajesService,
    public _utiliadesService: UtilidadesService,
    public _preLoaderService: PreLoaderService,
    public _paginadorService: PaginadorService
  ) {
    super(http, msjService, _utiliadesService, _preLoaderService, _paginadorService);
    this.base =  URL_SERVICIOS + `/modelo`;
    this.nombreDeDatos.plural = 'modelos';
    this.nombreDeDatos.singular = 'modelo';

  }



}
