import { Component, Input, OnInit } from '@angular/core';
import { SKU } from '../../../models/sku.model'

@Component({
  selector: 'app-sku-salida',
  templateUrl: './sku-salida.component.html',
  styleUrls: ['./sku-salida.component.css']
})
export class SkuSalidaComponent implements OnInit {

  
  @Input() sku: SKU
  
  constructor() { }

  ngOnInit(): void {
  }

  sku
  

}
