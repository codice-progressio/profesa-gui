import { Injectable } from "@angular/core"

@Injectable({
  providedIn: "root"
})
export class VisorDeImagenesService {
  mostrar: "block" | "none" = "none"
  imagenParaMostrar: string =""

  constructor() {}

  mostrarImagen(src: string) {
    this.mostrar = "block"
    this.imagenParaMostrar = src
  }

  cerrar() {
    this.mostrar = "none"
  }
}
