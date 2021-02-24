import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { RutaDeEntrega } from '../models/rutaDeEntrega.model'
import { URL_BASE } from '../config/config'
import { Proveedor } from '../models/proveedor.model'

@Injectable({
  providedIn: 'root'
})
export class RutaDeEntregaService {
  constructor(private http: HttpClient) {}
  base = URL_BASE('ruta-de-entrega')

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
    return this.http.get<Proveedor>(
      this.base.concat(`/buscar/contactos-de-ruta/${id}`)
    )
  }
  
  eliminar(id: string) {
    return this.http.delete<RutaDeEntrega>(
      this.base.concat(`/eliminar/id/${id}`)
    )
  }
}
