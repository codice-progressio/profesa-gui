import { Component, OnInit, Input } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedores/proveedor.model';

@Component({
  selector: 'app-proveedor-detalle',
  templateUrl: './proveedor-detalle.component.html',
  styles: []
})
export class ProveedorDetalleComponent implements OnInit {

  @Input() proveedor: Proveedor = null
  constructor() { }

  ngOnInit() {
  }

}
