import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Folio } from '../../../../models/folio.models';
import { FolioLinea } from 'src/app/models/folioLinea.models';
import { Orden } from 'src/app/models/orden.models';
import { ModeloCompletoGestorDeProcesosEspecialesComponent } from '../../../../shared/modelo-completo-gestor-de-procesos-especiales/modelo-completo-gestor-de-procesos-especiales.component'

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
  @Input() folio: Folio = null
  /**
   *Emitimos este componente para cuando este listo
   las ordenes se generen. 
   *
   * @memberof RevisionDeOrdenesAbstractoComponent
   */
  @Output() esteComponente = new  EventEmitter<RevisionDeOrdenesAbstractoComponent> ()

  @Output() guardar = new EventEmitter<Folio>()
  @Output() pedidoASurtirOLaserar = new EventEmitter<FolioLinea>()

  constructor() { }


  ngOnInit() {
    this.esteComponente.emit( this )
  }



  /**
   *Emite un evento que contiene el folio 
   modificado para que se generen las ordenes 
   desde el componenete externo. 
   *
   * @memberof RevisionDeOrdenesAbstractoComponent
   */
  guardarCambios(  ){
    this.guardar.emit( this.folio )
  }


  surtirOLaserar( pedido: FolioLinea ){
    console.log(`surtirOLaserar`,pedido)
    this.pedidoASurtirOLaserar.emit(pedido)
  }




}
