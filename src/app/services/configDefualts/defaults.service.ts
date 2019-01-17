import { Injectable } from '@angular/core';
import { DefaultModelData } from '../../config/defaultModelData';
import { HttpClient } from '@angular/common/http';
import { ManejoDeMensajesService } from '../service.index';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 *Gestiona la carga de los id por defaults. s
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
