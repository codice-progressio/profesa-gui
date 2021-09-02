import { DOCUMENT } from '@angular/common'
import { Inject, Injectable, OnInit } from '@angular/core'
import { NgxCsvParser } from 'ngx-csv-parser'
import { NgxCSVParserError } from 'ngx-csv-parser'
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {
  fullScreen: FullScreen
  ficheros: Ficheros

  constructor(public ngxCsvParser: NgxCsvParser) {
    this.fullScreen = new FullScreen(this)
    this.ficheros = new Ficheros(this)
  }

  niceUrl(str: string): string {
    return str
      .split(' ')
      .map(x => x.trim())
      .join('_')
  }
}

class Ficheros {
  constructor(private root: UtilidadesService) {}

  procesarArchivo(target, delimiter) {
    // Parse the file you want to select for the operation along with the configuration
    return this.root.ngxCsvParser
      .parse(target.files[0], { header: true, delimiter })
      .pipe(
        map(x => {
          console.log(x)
          return x
        })
      )
      .toPromise()

    // return new Promise((resolve, reject) => {
    //   let ficheros: FileList = target?.files as FileList
    //   if (ficheros && ficheros.length > 0) {
    //     let file: File = ficheros.item(0)
    //     let reader: FileReader = new FileReader()
    //     reader.readAsText(file)
    //     reader.onload = e => {
    //       let arreglo: string[][] = (reader.result as string)
    //         .split('\r\n')
    //         .map(x => x.split(caracterDeSeparacion))

    //       let encabezados = arreglo.shift().reduce((acumulador, actual) => {
    //         acumulador[actual.trim()] = ''

    //         return acumulador
    //       }, {})

    //       let acomodado = arreglo.map(actual => {
    //         let objeto = {}

    //         let contador = 0
    //         for (const key in encabezados) {
    //           objeto[key] = actual[contador]
    //           contador++
    //         }

    //         return objeto
    //       }, [])

    //       return resolve(acomodado as any[])
    //     }
    //   } else return reject()
    // })
  }
}

class FullScreen {
  constructor(private root: UtilidadesService) {}

  ocultarMarcoDeApp = false

  // Tomado de https://stackoverflow.com/a/51998854/4326551
  open(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen()
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen()
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen()
    }
  }

  /* Close fullscreen */
  close(document) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      /* Firefox */

      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */

      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen()
    }
  }

  sinDistracciones(document: Document) {
    this.ocultarMarcoDeApp = !this.ocultarMarcoDeApp
    if (this.ocultarMarcoDeApp) this.open(document.documentElement)
    else this.close(document)
  }
}
