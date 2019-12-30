import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core'
import { Folio } from '../../../../models/folio.models'
import { FolioLinea } from 'src/app/models/folioLinea.models'
import { Orden } from 'src/app/models/orden.models'
import { ModeloCompletoGestorDeProcesosEspecialesComponent } from '../../../../shared/modelo-completo-gestor-de-procesos-especiales/modelo-completo-gestor-de-procesos-especiales.component'
import { DefaultsService } from '../../../../services/configDefualts/defaults.service'
import { DefaultModelData } from '../../../../config/defaultModelData'
import { filter } from 'rxjs/operators'

declare var $: any
@Component({
  selector: 'app-revision-de-ordenes-abstracto',
  templateUrl: './revision-de-ordenes-abstracto.component.html',
  styles: []
})
export class RevisionDeOrdenesAbstractoComponent implements OnInit {
  /**
   *El folio del cual se van a generar las ordenes.
   *
   * @type {Folio}
   * @memberof RevisionDeOrdenesAbstractoComponent
   */
  @Input() set folio(folio: Folio) {
    this._folio = folio
    if (folio) {
      this._folio.folioLineas.forEach(
        x => (this.listaDeMuestra[x.pedido] = false)
      )
    }
  }

  _folio: Folio = null
  get folio(): Folio {
    return this._folio
  }

  /**
   *Emitimos este componente para cuando este listo
   las ordenes se generen. 
   *
   * @memberof RevisionDeOrdenesAbstractoComponent
   */
  @Output() esteComponente = new EventEmitter<
    RevisionDeOrdenesAbstractoComponent
  >()

  @Output() guardar = new EventEmitter<Folio>()
  @Output() pedidoASurtirOLaserar = new EventEmitter<FolioLinea>()

  defaultData: DefaultModelData
  constructor(public _defaultService: DefaultsService) {
    this._defaultService.cargarDefaults().subscribe(d => (this.defaultData = d))
  }

  ngOnInit() {
    this.esteComponente.emit(this)
  }

  /**
   *Emite un evento que contiene el folio 
   modificado para que se generen las ordenes 
   desde el componenete externo. 
   *
   * @memberof RevisionDeOrdenesAbstractoComponent
   */
  guardarCambios() {
    this.guardar.emit(this.folio)
  }

  surtirOLaserar(pedido: FolioLinea) {
    this.pedidoASurtirOLaserar.emit(pedido)
  }

  permitirEdicionDeProcesos(pedido: FolioLinea): boolean {
    return pedido.revisarSiRequiereRevisionExtraordinaria(
      this.defaultData.PROCESOS.LASER
    )
  }

  listaDeMuestra = []
  collapse(id: string) {
    this.listaDeMuestra[id] = !this.listaDeMuestra[id]
    $(`.${id}`).collapse('toggle')
  }

  collapsado: boolean = false
  collapseAll() {
    this.collapsado = !this.collapsado

    for (const key in this.listaDeMuestra) {
      if (this.listaDeMuestra.hasOwnProperty(key)) {
        this.listaDeMuestra[key] = this.collapsado
      }
    }

    $(`.collapse.revisionDeFolios`).collapse(this.collapsado ? 'hide' : 'show')
  }
}
