import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { URL_BASE } from '../config/config'
import { catchError, map } from 'rxjs/operators'
import { throwError } from 'rxjs'
import { ManejoDeMensajesService } from './utilidades/manejo-de-mensajes.service'

@Injectable({
  providedIn: 'root'
})
export class ChangelogService {
  base = URL_BASE('changelogs')

  constructor(
    private http: HttpClient,
    private msjService: ManejoDeMensajesService
  ) {}

  guardando = false
  editando = false

  guardar(s: string) {
    this.guardando = true
    this.editando = false
    return this.http.put(this.base, {changelog:s}).pipe(
      map(res => {
        this.msjService.toastCorrecto('Se guardaron los cambios')
        this.guardando = false
        return res as string
      }),
      catchError(err => {
        this.guardando = false
        this.msjService.toastError(err)
        return throwError(err)
      })
    )
  }

  leer() {
    return this.http.get(this.base).pipe(
      catchError(err => {
        this.msjService.toastError(err)
        return throwError(err)
      })
    )
  }
}
