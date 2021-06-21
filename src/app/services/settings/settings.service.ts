import { Injectable, Inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import * as DarkReader from 'darkreader'

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  darkReader: any = DarkReader

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/blue.css',
    tema: 'blue'
  }

  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes()
  }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes))
  }

  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'))

      this.aplicarTema(this.ajustes.tema)
    } else {
      this.aplicarTema(this.ajustes.tema)
    }
  }

  aplicarTema(tema: string) {
    const url: string = `assets/css/colors/${tema}.css`
    this._document.getElementById('tema').setAttribute('href', url)
    this.ajustes.tema = tema
    this.ajustes.temaUrl = url
    
    this.temaOscuro(tema)
    this.guardarAjustes()
  }

  temaOscuro(tema: string) {
    
    if (tema.includes('dark')) {
      if (this.darkReader.isEnabled()) return
      this.darkReader.enable({
        brightness: 100,
        contrast: 90,
        sepia: 10
      })
    } else {
      this.darkReader.disable()
    }
  }
}

interface Ajustes {
  temaUrl: string
  tema: string
}
