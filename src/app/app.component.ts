import { Component, OnInit } from '@angular/core'
import { ModalService } from '@codice-progressio/modal'
import { ContactoService } from './services/contacto.service'
import { OfflineService } from './services/offline.service'
import { IndicesIndexedDbService } from './services/indices-indexed-db.service'
import { SkuService } from './services/sku/sku.service'
import { ManejoDeMensajesService } from './services/utilidades/manejo-de-mensajes.service'
import { SettingsService } from './services/settings/settings.service'
import { EstadoDeConexionService } from './services/estado-de-conexion.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  esta_offline = false


  constructor(
    public _ajustes: SettingsService,
    //Inicializamos los servicios de indexed-db
    private indicesService: IndicesIndexedDbService,
    private estadoDeConexion: EstadoDeConexionService,
  ) {


    this.estadoDeConexion.connected$.subscribe(connected => {
      this.esta_offline = !connected
    })



  }

  idModal = 'cargaEnMemoria'
  ngOnInit() {
    setTimeout(
      () =>
        //Es neceario esperar a que se construya el modal.
        this.indicesService.cargarIndicesEnMemoria(),
      1000
    )
  }
}
