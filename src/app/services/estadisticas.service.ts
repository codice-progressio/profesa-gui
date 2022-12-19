import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { of, OperatorFunction } from 'rxjs'
import { delay, map } from 'rxjs/operators'
import { Contacto } from '../models/contacto.model'
import { EnvService } from './env.service'

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {
  base = ''
  totalItems = 0
  costoInventario = 0
  totalContactos = 0

  constructor(private envService: EnvService, private http: HttpClient) {
    this.base = this.envService.URL_BASE('estadisticas')
  }

  totalSkus() {
    return this.http
      .get<{ total: number }>(this.base.concat('/total-skus'))
      .pipe(
        map(res => {
          this.totalItems = res.total
          return res
        })
      )
  }

  costoExistencias() {
    return this.http
      .get<{ total: number }>(this.base.concat('/total-costo-existencias'))
      .pipe(
        map(res => {
          this.costoInventario = res.total
          return res
        })
      )
  }

  contarContactos() {
    return this.http.get(this.base.concat('/total-contactos')).pipe(
      map((res: any) => {
        this.totalContactos = res.total
        return res
      })
    )
  }

  diezMasVendidos() {
    let m = map((res: any) => res.datos as iGraficoPie[])

    return this.http.get(this.base.concat('/diez-mas-vendidos')).pipe(m)
  }

  mejorCliente() {
    let m = map((res: any) => res as iMejorCliente)

    return this.http.get(this.base.concat('/mejor-cliente')).pipe(m)
  }

  hoy() {
    let m = map((res: any) => res as iHoy)
    return this.http.get(this.base.concat('/hoy')).pipe(m)
  }

  ventasPorVendedor() {
    let m = map((res: any) => res as iVentasPorVendedor)
    return this.http.get(this.base.concat('/ventas-por-vendedor')).pipe(m)
  }

  ventasTrimestre() {
    let m = map((res: any) => res as iVentasTrimestre)
    return this.http.get(this.base.concat('/ventas-trimestre')).pipe(m)
  }

  testVentasTrimestre(m: OperatorFunction<any, iVentasTrimestre>) {
    return of({
      graficos: {
        totales: Array.from(
          { length: 3 },
          (_, i) =>
            ({
              name: i + '-un total',
              value: Math.random() * 100000
            } as iGraficoPie)
        ),
        meses: Array.from({ length: 3 }, (_, i) => ({
          name: i + '-un total',
          value: Math.random() * 100000,
          series: Array.from({ length: 30 }, (_, i) => ({
            name: i + '-un dia',
            value: Math.random() * 100000
          }))
        })) as iLineChart[]
      }
    }).pipe(m)
  }

  test(m: OperatorFunction<any, iGraficoPie[]>) {
    return of({
      datos: Array.from(
        { length: 10 },
        (_, i) =>
          ({
            name: i + '-un pais',
            value: Math.random() * 100000
          } as iGraficoPie)
      )
    }).pipe(m)
  }

  testVentasPorVendedor(m: OperatorFunction<any, iVentasPorVendedor>) {
    return of<iVentasPorVendedor>({
      grafico: Array.from({ length: 10 }, (_, i) => ({
        name: i + '-un vendedor',
        value: Math.random() * 100000
      }))
    }).pipe(m)
  }

  testHoy(m: OperatorFunction<any, iHoy>) {
    return of<iHoy>({
      vendido: 9990987,
      pedidos: 13,
      vendedores: 3,
      masVendido: 'EL PRODUCTO MÁS VENDIDO',
      grafico: Array.from(
        { length: 10 },
        (_, i) =>
          ({
            name: i + '-un VENDEDOR',
            value: Math.random() * 100000
          } as iGraficoPie)
      )
    }).pipe(m)
  }

  testMejorCliente(m: OperatorFunction<any, iMejorCliente>) {
    return of({
      nombre: 'Este es el cliente',
      comprado: 99999,
      pedidos: 30,
      grafico: [
        {
          name: 'Nombre serie',
          series: Array.from({ length: 30 }, (_, i) => ({
            name: i + '-ped',
            value: Math.random() * 100000
          }))
        }
      ]
    }).pipe(m)
  }
}

export interface iGraficoPie {
  name: string
  value: number
}

export interface iLineChart {
  /**
   *El nombre de la serie
   *
   * @type {string}
   * @memberof iLineChart
   */
  name: string

  /**
   *Los valores que llevaran las series
   *
   * @type {{value:number, name:string}[]}
   * @memberof iLineChart
   */
  series: { value: number; name: string; datosAgrupados?: number }[]
}

export interface iMejorCliente {
  nombre: string
  comprado: number
  pedidos: number
  grafico: iLineChart[]
}

export interface iHoy {
  vendido: number
  pedidos: number
  vendedores: number
  masVendido: string
  grafico: iGraficoPie[]
}

export interface iVentasPorVendedor {
  grafico: iGraficoPie[]
}

export interface iVentasTrimestre {
  graficos: {
    totales: iGraficoPie[]
    meses: iLineChart[]
  }
}
