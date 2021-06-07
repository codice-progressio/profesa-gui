import { Injectable } from '@angular/core'
import { URL_BASE } from '../config/config.prod'
import { HttpClient } from '@angular/common/http'
import { SKU } from '../models/sku.model'
import { Usuario } from '../models/usuario.model'

@Injectable({
  providedIn: 'root'
})
export class ContabilidadService {
  remision: Remision
  facturas: Facturas

  base = URL_BASE('contabilidad/')
  constructor(public http: HttpClient) {
    this.remision = new Remision(this)
    this.facturas = new Facturas(this)
  }
}

class Remision {
  constructor(private root: ContabilidadService) {}

  base = this.root.base.concat('remision')
  cobrar(nota: Partial<Productos>[]) {
    return this.root.http.post<Nota>(
      this.base,
      nota.map((x: any) => {
        x.idSku = x.sku._id
        return x
      })
    )
  }
}
class Facturas {
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

export interface Nota {
  consecutivo: number
  usuario: string | Usuario
  articulos: Productos[]
  total: number
  create_at: Date
}
