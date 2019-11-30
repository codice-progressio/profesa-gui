import { Injectable } from '@angular/core'
import { CRUD } from '../crud'
import { Empleado } from 'src/app/models/recursosHumanos/empleados/empleado.model'
import { EmpleadoFiltros } from '../utilidades/filtrosParaConsultas/empleado.filtros'
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service'
import { UtilidadesService } from '../utilidades/utilidades.service'
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { URL_SERVICIOS } from 'src/app/config/config'
import { Observable, pipe, throwError } from 'rxjs'
import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpResponse
} from '@angular/common/http'
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service'
import { filter, map, tap, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService extends CRUD<
  Empleado,
  EmpleadoService,
  EmpleadoFiltros<EmpleadoService>
> {
  constructor(
    public http: HttpClient,
    public _msjService: ManejoDeMensajesService,
    public _utiliadesService: UtilidadesService,
    public _preLoaderService: PreLoaderService,
    public _paginadorService: PaginadorService,
    public _subirArchivo: SubirArchivoService
  ) {
    super(
      http,
      _msjService,
      _utiliadesService,
      _preLoaderService,
      _paginadorService
    )
    this.base = URL_SERVICIOS + `/empleado`
    this.nombreDeDatos.plural = 'empleados'
    this.nombreDeDatos.singular = 'empleado'
    this.urlBusqueda = '/buscar'
  }

  todo(): Observable<Empleado[]> {
    return this.getAll(
      undefined,
      undefined,
      this.filtrosDelFolio.obtenerFiltros(),
      Empleado,
      false
    )
  }

  /**
   *Guarda el empleado con todo y foto.
   *
   * @param {Empleado} empleado
   * @param {File} foto
   * @returns {Observable<null>}
   * @memberof EmpleadoService
   */
  guardarOModificarConFoto(empleado: Empleado): Observable<any> {
    let a = this._preLoaderService.loading('Haciendo algo con el empleado')

    let url = this.base + '/guardarConFoto'
    return this.http
      .post(url, toFormData(empleado), {
        reportProgress: true,
        observe: 'events'
      })
      .pipe(
        uploadProgress(progress =>
          this._preLoaderService.progreso(
            a,
            progress,
            'Cargando fotografia del empledo'
          )
        ),
        toResponseBody((respuesta, nada, a) => {
          this._msjService.ok_(respuesta, nada, a)
        }, a),
        catchError(err => {
          this._msjService.err(err)

          return throwError(err)
        })
      )
  }
}

// ).subscribe(response => {
//   this.progress = 0;
//   this.signup.reset();
//   // do something with the response
// });
export function toFormData<T>(formValue: T) {
  const formData = new FormData()

  for (const key of Object.keys(formValue)) {
    const value = formValue[key]

    if (Array.isArray(value)) {
      value.forEach(valor => {
        formData.append(key, valor)
      })
    } else {
      formData.append(key, value)
    }
  }

  return formData
}

export function toResponseBody<T>(cbFinalizar, a) {
  return pipe(
    filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
    map((res: HttpResponse<T>) => {
      cbFinalizar(res.body, null, a)
      res.body
    })
  )
}

export function uploadProgress<T>(cb: (progress: number) => void) {
  return tap((event: HttpEvent<T>) => {
    if (event.type === HttpEventType.UploadProgress) {
      cb(Math.round((100 * event.loaded) / event.total))
    }
  })
}
