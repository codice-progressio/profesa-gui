import { Injectable } from '@angular/core';
import { Proveedor } from '../models/proveedores/proveedor.model';
import { ProveedorFiltros } from './utilidades/filtrosParaConsultas/proveedor.filtros'
import { CRUD } from './crud';
import { ManejoDeMensajesService } from './utilidades/manejo-de-mensajes.service';
import { UtilidadesService } from './utilidades/utilidades.service';
import { PreLoaderService } from '../components/pre-loader/pre-loader.service';
import { PaginadorService } from '../components/paginador/paginador.service';
import { URL_SERVICIOS } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService extends CRUD<
Proveedor,
ProveedorService,
ProveedorFiltros<ProveedorService>
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
  this.base = URL_SERVICIOS + `/proveedor`
  this.nombreDeDatos.plural = "proveedores"
  this.nombreDeDatos.singular = "proveedor"
  this.urlBusqueda = "/buscar"
}


todo(): Observable<Proveedor[]> {
  return this.getAll(
    undefined,
    undefined,
    this.filtrosDelFolio.obtenerFiltros(),
    Proveedor, 
    true
  )
}




}
