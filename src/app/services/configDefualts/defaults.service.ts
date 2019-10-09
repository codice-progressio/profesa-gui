import { Injectable } from '@angular/core';
import { DefaultModelData } from '../../config/defaultModelData';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service';

/**
 *Gestiona la carga de los id por defaults. Se usa bastante
 en generales component y ya vienen cargalos los valores por defaults
 cuando se gestionan las tareas de configuracion. Revisar su propiedad
 metodo tareasDeConfiguracione() en GeneralesComponent
 *
 * @export
 * @class DefaultsService
 */
@Injectable({
  providedIn: 'root'
})
export class DefaultsService  {

;


  constructor(
    public http: HttpClient,
    public _msjService: ManejoDeMensajesService,
  ) { 

    this.cargarDefaults();

    
  }

  /**
   *
   *Carga los id por defaults. 
   *
   * @returns
   * @memberof DefaultsService
   */
  cargarDefaults( ):Observable<DefaultModelData>{
    let url = URL_SERVICIOS+'/defaults';
    return this.http.get(url).pipe(
      map((resp:any)=>{
        return resp.defaults;
      }),
      catchError( err=>{
        this._msjService.err(err);
        return err;
      })
    );

  }

  
}
