import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { URL_BASE } from '../config/config'

@Injectable({
  providedIn: 'root'
})
export class InstalacionService {
  constructor(private http: HttpClient) {}

  base = URL_BASE('parametros')

  crearParametros() {
    return this.http.post(this.base, null)
  }

  crearAdmin(nombre: string, password: string, email) {
    let url = this.base.concat('/super-admin/crear')

    return this.http.post(url, { nombre, password, email })
  }

  reiniciarSuperAdmin() {
    return this.http.put<any>(
      this.base.concat('/configurar-super-admin/permisos/reiniciar'),
      {}
    )
  }
}
