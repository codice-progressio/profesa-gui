import { Component, OnInit } from '@angular/core';
import { SKU } from '../../models/sku.model'

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.css']
})
export class AlmacenComponent implements OnInit {




  skus: SKU[] = []
  constructor() { }

  ngOnInit(): void {
  }


  

}
