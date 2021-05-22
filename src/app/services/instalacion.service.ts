import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { URL_BASE } from '../config/config'

@Injectable({
  providedIn: 'root'
})
export class InstalacionService {
  constructor(private http: HttpClient 
    ) {}

  base = URL_BASE('parametros')

  crearParametros() {
    return this.http.post(this.base, null)
  }


  reiniciarSuperAdmin() {
    return this.http.put<any>(
      this.base.concat('/configurar-super-admin/permisos/reiniciar'),
      {}
    )
  }
}
