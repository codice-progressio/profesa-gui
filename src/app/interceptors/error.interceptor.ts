import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { ManejoDeMensajesService } from '../services/utilidades/manejo-de-mensajes.service'
import { EstadoDeConexionService } from '../services/estado-de-conexion.service'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private msjService: ManejoDeMensajesService,

    private estadoconexion: EstadoDeConexionService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        console.log(error)
        let errorMessage: string | undefined = undefined
        // client-side error
        error?.error?.message
          ? (errorMessage += error?.error?.message)
          : undefined
        // backend error
        if (!errorMessage)
          error?.error?.error ? (errorMessage = error?.error?.error) : undefined

        if (errorMessage) this.msjService.toast.error(errorMessage)

        if (error.status === 0) {
          this.estadoconexion.connected(false)
          return throwError('No hay conexion')
        }

        return throwError(errorMessage ?? 'Error no capturado')
      })
    )
  }
}
