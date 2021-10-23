import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import { EnvService } from './env.service'

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {
  base = ''

  totalItems = 0
  costoInventario = 0

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
}
