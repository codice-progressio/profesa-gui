import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import { URL_BASE } from '../config/config'

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {
  base = URL_BASE('estadisticas')

  totalItems = 0
  costoInventario = 0

  constructor(private http: HttpClient) {}

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
}
