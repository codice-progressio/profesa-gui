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
  constructor(private notiSerivce: ManejoDeMensajesService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        console.log(error)
        let errorMessage = ''
        if (error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `${error.error.message}`
        } else {
          // backend error
          errorMessage = `${error.error}`
        }

        // aquí podrías agregar código que muestre el error en alguna parte fija de la pantalla.
        this.notiSerivce.toast.error(errorMessage)
        return throwError(errorMessage)
      })
    )
  }
}
