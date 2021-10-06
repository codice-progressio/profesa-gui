import { Injectable } from '@angular/core'
import { GpsService, PosicionDeGeolocalizacion } from '@codice-progressio/gps'
import { BehaviorSubject, ReplaySubject } from 'rxjs'
import { ManejoDeMensajesService } from './utilidades/manejo-de-mensajes.service'

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  _geo: PosicionDeGeolocalizacion
  geo = new ReplaySubject<PosicionDeGeolocalizacion>(null)

  constructor(
    private gps: GpsService,
    private notiService: ManejoDeMensajesService
  ) {
    this.inicializar()
  }

  inicializar() {
    this.gps.posicionActual.subscribe(
      ubicacion => {
        console.log({ ubicacion })
        this.geo.next(ubicacion)
      },
      err => {
        this.notiService.toastError('No se pudo acceder a la ubicación')
      }
    )
  }
}
