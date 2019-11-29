import { Pipe, PipeTransform } from "@angular/core"
import { URL_SERVICIOS } from "../config/config"

@Pipe({
  name: "imagen"
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: string = "usuario"): string {
    let url = URL_SERVICIOS + `/img`
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

    return url
  }

  rutasValidas = {
    usuario: "/usuarios/",
    facturas: "/facturas/",
    organigramaPuesto: "/organigramaPuesto/",
    empleados: "/empleados/"
  }
}
