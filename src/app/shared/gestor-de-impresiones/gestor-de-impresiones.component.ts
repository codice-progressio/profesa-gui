import { Component, OnInit } from '@angular/core'
import { ImpresionService } from '../../services/impresion.service'
import { ReportesProduccionService } from '../../services/reportes/reportes-produccion.service'

@Component({
  selector: 'app-gestor-de-impresiones',
  templateUrl: './gestor-de-impresiones.component.html',
  styleUrls: ['./gestor-de-impresiones.component.css']
})
export class GestorDeImpresionesComponent implements OnInit {
  constructor(public s: ImpresionService) {}

  ngOnInit() {}
}
