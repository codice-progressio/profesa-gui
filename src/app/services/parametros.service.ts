import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { URL_BASE } from '../config/config'

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {
  etiquetas: EtiquetasService

  constructor(public http: HttpClient) {
    this.etiquetas = new EtiquetasService(this)
  }
  
  base = URL_BASE('parametros')
}

class EtiquetasService {
  constructor(private root: ParametrosService) {}

  base = this.root.base.concat('/etiquetas')

  obtenerTodo() {
    return this.root.http.get<string[]>(this.base)
  }
}
