import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { EnvService } from './env.service'

@Injectable({
  providedIn: 'root'
})
export class InstalacionService {
  base = ''
  constructor(private envService: EnvService, private http: HttpClient) {
    this.base = this.envService.URL_BASE('parametros')
  }

  crearParametros() {
    return this.http.post(this.base, null)
  }

  reiniciarSuperAdmin() {
    let _id = localStorage.getItem('id')

    return this.http
      .put<any>(
        this.envService.URL_BASE('usuario/restaurar-permisos-administrador'),
        { _id }
      )
      .pipe(
        map(x => {
          localStorage.removeItem('token')
          localStorage.removeItem('menu')
          localStorage.removeItem('usuario')
          localStorage.removeItem('id')
          return x
        })
      )
  }
}
