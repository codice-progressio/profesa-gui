
import { Component, OnInit, Input } from '@angular/core';
import { Divisa } from 'src/app/models/divisas/divisa.model';

@Component({
  selector: 'app-divisa-detalle',
  templateUrl: './divisa-detalle.component.html',
  styles: []
})
export class DivisaDetalleComponent implements OnInit {


  @Input() divisa: Divisa = null
  constructor() { }

  ngOnInit() {
  }

}
