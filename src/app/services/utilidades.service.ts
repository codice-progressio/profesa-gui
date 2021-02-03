import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {
  constructor() {}

  niceUrl(str: string): string {
    return str
      .split(' ')
      .map(x => x.trim())
      .join('_')
  }
}
