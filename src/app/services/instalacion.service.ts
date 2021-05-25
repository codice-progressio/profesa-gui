import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { URL_BASE } from '../config/config'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class InstalacionService {
  constructor(private http: HttpClient) {}

  base = URL_BASE('parametros')

  crearParametros() {
    return this.http.post(this.base, null)
  }

  reiniciarSuperAdmin() {
    let _id = localStorage.getItem('id')

    return this.http
      .put<any>(URL_BASE('usuario/restaurar-permisos-administrador'), { _id })
      .pipe(
        map(x => {
          localStorage.removeItem("token")
          localStorage.removeItem("menu")
          localStorage.removeItem("usuario")
          localStorage.removeItem("id")
          return x
        })
      )
  }
}
