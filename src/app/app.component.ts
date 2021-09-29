import { Component, OnInit } from '@angular/core'
import { ModalService } from '@codice-progressio/modal'
import { ContactoService } from './services/contacto.service'
import { OfflineService } from './services/offline.service'
import { SettingsService } from './services/settings/settings.service'
import { SkuService } from './services/sku/sku.service'
import { ManejoDeMensajesService } from './services/utilidades/manejo-de-mensajes.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    public _ajustes: SettingsService,
    //Inicializamos los servicios de indexed-db
    private offlineService: OfflineService,
    private skuService: SkuService,
    private contactoService: ContactoService,
    private modalService: ModalService,
    private notiService: ManejoDeMensajesService
  ) {}

  idModal = 'cargaEnMemoria'
  ngOnInit() {
    setTimeout(() => {
      this.cargarIndicesEnMemoria()
    }, 1000)
  }
  cargarIndicesEnMemoria() {
    if (
      this.skuService.offline.indice.length === 0 ||
      this.contactoService.offline.indice.length === 0
    ) {
      this.modalService.open(this.idModal)
      this.offlineService.db.subscribe(() => {
        let sku = false
        let contacto = false
        let comprobarModal = () => {
          if (sku && contacto) this.modalService.close(this.idModal)
        }

        let error = () => {
          this.notiService.invalido(
            'No se pudieron cargar los indices',
            'Error grave'
          )
        }

        this.skuService.offline
          .generarYCargarIndiceEnMemoria([
            'nombreCompleto',
            'descripcion',
            'credito'
          ])
          .then(() => {
            sku = true
            comprobarModal()
          })
          .catch(error)
        this.contactoService.offline
          .generarYCargarIndiceEnMemoria(['razonSocial', 'nombre', 'rfc'])
          .then(() => {
            contacto = true
            comprobarModal()
          })
          .catch(error)
      })
    }
  }
}
