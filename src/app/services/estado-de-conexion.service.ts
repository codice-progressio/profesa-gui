import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { first } from 'rxjs/operators';
import { EnvService } from './env.service'


@Injectable({
  providedIn: 'root'
})
export class EstadoDeConexionService {
  public connected$ = new BehaviorSubject<boolean>(false)
  private config = ''
  public connState: boolean
  private source = timer(0, 3000)

  constructor(private _http: HttpClient, private envService: EnvService) {
    this.config = `${this.envService.URL_BASE('ping')}`
    
    this.source.subscribe(() => {
      this._http
        .get(this.config)
        .pipe(first())
        .subscribe((resp:any) => {
          if (resp.ok === true) {
            this.connected(true)
          } else {
            this.connected(false)
          }
        })
    })
  }

  connected(data: boolean) {
    this.connState = data
    this.connected$.next(this.connState)
  }
}
