import { Component, OnInit } from '@angular/core'
import { EstadisticasService } from 'src/app/services/estadisticas.service'

@Component({
  selector: 'app-total-contactos',
  templateUrl: './total-contactos.component.html',
  styleUrls: ['./total-contactos.component.css']
})
export class TotalContactosComponent implements OnInit {
  constructor(public eSer: EstadisticasService) {}

  ngOnInit(): void {}

  cargandoTotalContactos = false

  cargarTotalContactos() {
    this.cargandoTotalContactos = true
    this.eSer.contarContactos().subscribe(
      total => {
        this.cargandoTotalContactos = false
      },
      () => (this.cargandoTotalContactos = false)
    )
  }
}
