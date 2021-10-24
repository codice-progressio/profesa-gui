import { Injectable } from '@angular/core';
import { ModalService } from '@codice-progressio/modal'
import { ContactoService } from './contacto.service'
import { OfflineService } from './offline.service'
import { SkuService } from './sku/sku.service'
import { ManejoDeMensajesService } from './utilidades/manejo-de-mensajes.service'

@Injectable({
  providedIn: 'root'
})
export class IndicesIndexedDbService {
  constructor(
    private offlineService: OfflineService,
    private skuService: SkuService,
    private contactoService: ContactoService,
    private modalService: ModalService,
    private notiService: ManejoDeMensajesService
  ) {}

  cargarIndicesEnMemoria(idModal = "cargaEnMemoria") {
    if (
      this.skuService.offline.indice.length === 0 ||
      this.contactoService.offline.indice.length === 0
    ) {
      this.modalService.open(idModal)
      this.offlineService.db.subscribe(() => {
        let sku = false
        let contacto = false
        let comprobarModal = () => {
          if (sku && contacto) this.modalService.close(idModal)
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
            'credito',
            'codigo'
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
