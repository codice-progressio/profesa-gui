import { Injectable } from '@angular/core'
import { URL_BASE } from '../config/config'
import { HttpClient } from '@angular/common/http'
import { SKU } from '../models/sku.model'
import { Usuario } from '../models/usuario.model'

@Injectable({
  providedIn: 'root'
})
export class ContabilidadService {
  remision: RemisionService
  facturas: FacturaService

  base = URL_BASE('contabilidad/')
  constructor(public http: HttpClient) {
    this.remision = new RemisionService(this)
    this.facturas = new FacturaService(this)
  }
}

class RemisionService {
  constructor(private root: ContabilidadService) {}

  base = this.root.base.concat('remision')
  cobrar(nota: Partial<Productos>[]) {
    return this.root.http.post<Remision>(
      this.base,
      nota.map((x: any) => {
        x.idSku = x.sku._id
        return x
      })
    )
  }
}
class FacturaService {
  constructor(private root: ContabilidadService) {}
}

export interface Productos {
  idSku: string
  sku: SKU
  cantidad: number
  // Obtener primero desde el sku
  precio: number
  precioActual: number
}

export interface Remision {
  consecutivo: number
  usuario: string | Usuario
  articulos: Productos[]
  total: number
  create_at: Date
}

export interface RemisionLigera {
  consecutivo: number
  usuario: string | Usuario
  total: number
  create_at: Date
}
