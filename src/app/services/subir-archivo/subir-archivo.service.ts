import { Injectable } from "@angular/core"
import { URL_SERVICIOS } from "../../config/config"
import { PreLoaderService } from "src/app/components/pre-loader/pre-loader.service"
import { ManejoDeMensajesService } from "../utilidades/manejo-de-mensajes.service"
import { Requisicion } from "../../models/requisiciones/requisicion.model"
import { Observable, throwError } from "rxjs"
import {
  HttpClient,
  HttpEvent,
  HttpErrorResponse,
  HttpEventType
} from "@angular/common/http"

import { catchError, map } from "rxjs/operators"

@Injectable({
  providedIn: "root"
})
export class SubirArchivoService {
  constructor(
    public _preLoaderService: PreLoaderService,
    public _msjService: ManejoDeMensajesService,
    public http: HttpClient
  ) {}

  // Sirve para guardar cualquier fichero
  /**
   *
   *
   * @param {File} archivo El archivo a subir
   * @param {string} tipo El tipo de archivo
   * @param {string} id
   * @returns
   * @memberof SubirArchivoService
   * @deprecated
   */
  subirArchivo(archivo: File, tipo: string, id: string, a: number = null) {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, reject) => {
      // Vanilla JS
      const formData = new FormData()
      const xhr = new XMLHttpRequest()

      formData.append("imagen", archivo, archivo.name)
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // console.log('imagen subida');
            resolve(JSON.parse(xhr.response))
          } else {
            // console.log('Fallo la subida.');
            reject(JSON.parse(xhr.response))
          }
        }
      }

      const url = URL_SERVICIOS + `/upload/${tipo}/${id}`
      xhr.open("PUT", url, true)
      xhr.send(formData)
    })
  }

  /**
   *Las facturas no se eliminan, por que se guarda un historial.
   * Solo lo modificamos
   *
   * @param {File} archivo
   * @memberof SubirArchivoService
   */
  facturasRequisicion(archivos: File[], id: string): Observable<string[]> {
    let a = this._preLoaderService.loading("Cargando facturas")

    // Creamos el formulario
    const formData = new FormData()
    // Agregamos todas las facturas al formData para mandar los archivos.
    archivos.forEach((f) => formData.append("facturas[]", f, f.name))

    const url = URL_SERVICIOS + `/upload/facturas/${id}`
    return this.http
      .put(url, formData, {
        //Reporte el progreso de la carga
        reportProgress: true,
        // Esta atengo a los eventos.
        observe: "events"
      })
      .pipe(
        map((event: any) => {
          // Buscamos cada tipo de evento.
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round((100 * event.loaded) / event.total)

              this._preLoaderService.progreso(
                a,
                progress,
                "Espera mientras terminamos de subir las imagenes de las facturas"
              )
              return null

            case HttpEventType.Response:
              this._msjService.ok_(event.body, null, a)

              return event.body
            default:
              return `Unhandled event: ${event.type}`
          }
        }),
        catchError((err) => {
          console.log(`err`, err)
          this._msjService.err(err)
          throw throwError(err)
        })
      )
  }
}
