import { Component, Input, OnInit } from '@angular/core'
import { SKU } from '../../../models/sku.model'

@Component({
  selector: 'app-sku-entrada',
  templateUrl: './sku-entrada.component.html',
  styleUrls: ['./sku-entrada.component.css']
})
export class SkuEntradaComponent implements OnInit {


  @Input() sku: SKU
  constructor() {}
  ngOnInit(): void {}


  



  
}
