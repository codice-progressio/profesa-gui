import { Component, OnInit, Input } from '@angular/core';
import { Folio } from 'src/app/models/folio.models';
import { FolioLinea } from '../../../models/folioLinea.models'
import { Orden } from 'src/app/models/orden.models';

@Component({
  selector: 'app-ordenes-detalle',
  templateUrl: './ordenes-detalle.component.html',
  styles: []
})
export class OrdenesDetalleComponent implements OnInit {

  constructor() { }

  @Input() folio: Folio
  @Input() linea: FolioLinea
  @Input() orden: Orden

  ordenTexto: string

  ngOnInit() {

    
      this.ordenTexto = JSON.stringify( this.orden )

  
  }


  obtenerJson(): string {
    return JSON.stringify(this.orden)
  }

}
