import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-pedidos-estructura-offline',
  templateUrl: './pedidos-estructura-offline.component.html',
  styleUrls: ['./pedidos-estructura-offline.component.css']
})
export class PedidosEstructuraOfflineComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}

  regresar() {
    this.location.back()
  }
}
