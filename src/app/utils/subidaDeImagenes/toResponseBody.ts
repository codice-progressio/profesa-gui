import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http'
import { filter, map } from 'rxjs/operators'
import { pipe } from 'rxjs'

export function toResponseBody<T>(cbFinalizar, a) {
  return pipe(
    filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
    map((res: HttpResponse<T>) => {
      return cbFinalizar(res.body, null, a) as T
    })
  )
}
