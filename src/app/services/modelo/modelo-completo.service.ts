import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ModeloCompleto } from '../../models/modeloCompleto.modelo';
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service';
import { UtilidadesService } from '../utilidades/utilidades.service';
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service';
import { PaginadorService } from 'src/app/components/paginador/paginador.service';
import { CRUD } from '../crud';

@Injectable({
  providedIn: 'root'
})
export class ModeloCompletoService extends CRUD<ModeloCompleto>{

  // base: string = `${URL_SERVICIOS}/modeloCompleto`;
  // total: number;
  constructor(
    public http: HttpClient,
    public _msjService: ManejoDeMensajesService,
    public _utiliadesService: UtilidadesService,
    public _preLoaderService: PreLoaderService,
    public _paginadorService: PaginadorService
  ) {
    super(http, _msjService, _utiliadesService, _preLoaderService, _paginadorService);
    this.base =  URL_SERVICIOS + `/modeloCompleto`;
    this.nombreDeDatos.plural = 'modelosCompletos';
    this.nombreDeDatos.singular = 'modeloCompleto';
    this.urlBusqueda = '/buscar';

  }

}
