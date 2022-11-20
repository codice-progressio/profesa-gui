import { Injectable } from '@angular/core'
// import { GpsService, PosicionDeGeolocalizacion } from '@codice-progressio/gps'
import { BehaviorSubject, ReplaySubject } from 'rxjs'
import { ManejoDeMensajesService } from './utilidades/manejo-de-mensajes.service'

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  constructor(private notiService: ManejoDeMensajesService) {
    this.inicializar()
  }

  inicializar() {}
}
