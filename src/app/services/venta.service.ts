import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { URL_BASE } from '../config/config'
import { SKU } from '../models/sku.model'
import { Usuario } from '../models/usuario.model'

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  nota: NotaService
  http: HttpClient
  base = URL_BASE('venta-al-publico/')

  constructor(httpClient: HttpClient) {
    this.http = httpClient
    this.nota = new NotaService(this)
  }
}

class NotaService {
  constructor(private root: VentaService) {}

  base = this.root.base.concat('nota')
  cobrar(nota: Partial<Productos>[]) {
    return this.root.http.post(
      this.base,
      nota.map(x => {
        x.idSku = x.sku._id
        return x
      })
    )
  }
}

export interface Productos {
  idSku: string
  sku: SKU
  cantidad: number
  // Obtener primero desde el sku
  precio: number
  precioActual: number
}

export interface Nota {
  consecutivo: number
  usuario: string | Usuario
  articulos: Productos[]
  total: number
}
