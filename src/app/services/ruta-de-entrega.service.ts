import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { RutaDeEntrega } from '../models/rutaDeEntrega.model'
import { Contacto } from '../models/contacto.model'
import { EnvService } from './env.service'

@Injectable({
  providedIn: 'root'
})
export class RutaDeEntregaService {
  base = ''
  constructor(private http: HttpClient, private envService: EnvService) {
    this.base = this.envService.URL_BASE('ruta-de-entrega')
  }

  guardarModificar(model: RutaDeEntrega) {
    return this.http.put<RutaDeEntrega>(this.base, model)
  }

  leerTodo() {
    return this.http.get<RutaDeEntrega[]>(this.base)
  }

  buscarId(id: string) {
    return this.http.get<RutaDeEntrega>(this.base.concat(`/buscar/id/${id}`))
  }

  buscarContactosDeRuta(id: string) {
    return this.http.get<Contacto>(
      this.base.concat(`/buscar/contactos-de-ruta/${id}`)
    )
  }

  eliminar(id: string) {
    return this.http.delete<RutaDeEntrega>(
      this.base.concat(`/eliminar/id/${id}`)
    )
  }
}
