import { Component, OnInit } from '@angular/core'
import {
  FolioNewService,
  FolioEnRevision
} from '../../../../services/folio/folio-new.service'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service'
import { DefaultModelData } from '../../../../config/defaultModelData'
import { DefaultsService } from '../../../../services/configDefualts/defaults.service'
import { Paginacion } from '../../../../utils/paginacion.util'

@Component({
  selector: 'app-revision-de-folios',
  templateUrl: './revision-de-folios.component.html',
  styles: [],
  providers: [{ provide: 'paginadorFolios', useClass: PaginadorService }]
})
export class RevisionDeFoliosComponent implements OnInit {
  defaultData: DefaultModelData
  cargando: {} = {}
  keys = Object.keys

  folios: FolioEnRevision[] = []
  paginacion: Paginacion = new Paginacion(5, 0, 1, 'fechaDeEntregaAProduccion')
  folioParaDetalle
  constructor(
    public folioService: FolioNewService,
    public msjService: ManejoDeMensajesService,
    public defaultService: DefaultsService
  ) {}

  ngOnInit() {
    this.cargarFolios()
  }

  cargarFolios() {
    this.cargando['inicial'] = 'Consultando folios'
    this.folioService.obtenerFoliosParaRevision().subscribe(folios => {
      delete this.cargando['inicial']
      this.folios = folios
    })
  }

  cargarDetalle(id: string) {
    this.folioParaDetalle = null
    this.folioService.detalleFolio(id).subscribe(folio => {
      this.folioParaDetalle = folio
    })
  }

  retornarAVendedor(id: string) {
    this.msjService.confirmarAccion(
      'Esto devolvera el control del folio al vendedor y se perderan los cambios que hayas echo.',
      () => {
        this.cargando['retornar'] = 'Aplicando cambios a folio'
        this.folioService.revision_retornarAlVendedor(id).subscribe(
          () => {
            delete this.cargando['retornar']
            this.cargarFolios()
          },
          () => {
            delete this.cargando['retornar']
          }
        )
      }
    )
  }
}
