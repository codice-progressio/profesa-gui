import { Pipe, PipeTransform } from "@angular/core"
import { EnvService } from "../services/env.service"

@Pipe({
  name: "imagen"
})
export class ImagenPipe implements PipeTransform {

  constructor (private envService: EnvService){}
  
  transform(img: string, tipo: string = "usuario"): string {
    let url = this.envService.URL_SERVICIOS + `/img`
    if (!img) {
      //No hay una imagen
      return url + "/noimg"
    }
    //Es una url compoleta
    if (img.indexOf("https") >= 0) {
      return img
    }

    if (!Object.keys(this.rutasValidas).includes(tipo))
      throw "No existe el tipo :" + tipo

    url += this.rutasValidas[tipo] + img

    return `${ url }?${ Math.floor(Math.random() * 1000000) }${ 1 }`
  }

  rutasValidas = {
    usuario: "/usuarios/",
    facturas: "/facturas/",
    organigramaPuesto: "/organigramaPuesto/",
    empleados: "/empleados/"
  }
}
