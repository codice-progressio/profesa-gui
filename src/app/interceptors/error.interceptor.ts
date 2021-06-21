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

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private msjService: ManejoDeMensajesService) {}

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
        return throwError(errorMessage ?? 'Error no capturado')
      })
    )
  }
}
