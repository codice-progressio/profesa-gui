import { Injectable } from '@angular/core'
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service'
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service'
import { Observable, throwError } from 'rxjs'
import { HttpClient, HttpEventType } from '@angular/common/http'

import { catchError, map } from 'rxjs/operators'
import { EnvService } from '../env.service'

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {
  constructor(
    private envService: EnvService,
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
  subirArchivo(archivo: File, tipo: string, id: string) {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, reject) => {
      // Vanilla JS
      const formData = new FormData()
      const xhr = new XMLHttpRequest()

      formData.append('imagen', archivo, archivo.name)
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response))
          } else {
            reject(JSON.parse(xhr.response))
          }
        }
      }

      const url = this.envService.URL_SERVICIOS + `/upload/${tipo}/${id}`
      xhr.open('PUT', url, true)
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
    return this.subirImagenes(archivos, id, 'facturas', 'Cargando facturas')
  }

  organigramaPuesto(archivo: File, id: string): Observable<string[]> {
    return this.subirImagenes(
      [archivo],
      id,
      'organigramaPuesto',
      'Cargando organigrama'
    )
  }

  /**
   *Carga las imagenes
   *
   * @param {File[]} archivos
   * @param {string} id el
   * @param {string} tipo El tipo corresponde a su funcion. Todas son imagenes
   * pero pueden ser facturas, usuarios, empleados, etc. La api valida esto.
   * @param {string} msj El mensaje de carga
   * @returns {Observable<string[]>}
   * @memberof SubirArchivoService
   */
  private subirImagenes(
    archivos: File[],
    id: string,
    tipo: string,
    msj: string
  ): Observable<string[]> {
    this.soloImagenes(archivos)

    let a = this._preLoaderService.loading(msj)

    // Creamos el formulario
    const formData = new FormData()
    // Agregamos todas las tipo al formData para mandar los archivos.
    archivos.forEach(f => formData.append('imagenes', f, f.name))

    const url = this.envService.URL_SERVICIOS + `/upload/${tipo}/${id}`
    return this.http
      .put(url, formData, {
        //Reporte el progreso de la carga
        reportProgress: true,
        // Esta atengo a los eventos.
        observe: 'events'
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
                'Espera mientras terminamos de cargar las imagenes'
              )
              return null

            case HttpEventType.Response:
              this._msjService.ok_(event.body, null, a)

              return event.body
            default:
              return `Evento no manejado: ${event.type}`
          }
        }),
        catchError(err => {
          this._msjService.err(err)
          throw throwError(err)
        })
      )
  }

  private soloImagenes(files: File[]) {
    files.forEach(f => {
      let mimeType = f.type
      if (mimeType.match(/image\/*/) == null) {
        throw `${f.name} no es una imagen`
      }
    })
  }
}
