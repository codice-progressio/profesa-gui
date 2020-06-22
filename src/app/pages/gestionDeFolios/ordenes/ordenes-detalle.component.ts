import { Component, OnInit, Input } from '@angular/core'
import { Folio } from 'src/app/models/folio.models'
import { FolioLinea } from '../../../models/folioLinea.models'
import { Orden } from 'src/app/models/orden.models'
import { ImpresionService } from '../../../services/impresion.service'
import { DepartamentoService } from '../../../services/departamento/departamento.service'

declare var $: any

@Component({
  selector: 'app-ordenes-detalle',
  templateUrl: './ordenes-detalle.component.html',
  styleUrls: ['./ordenes-detalle.component.css']
})
export class OrdenesDetalleComponent implements OnInit {
  constructor(
    public impresionService: ImpresionService,
    public departamentoService: DepartamentoService
  ) {}

  cargando = {}
  keys = Object.keys

  @Input() folio: Folio
  @Input() linea: FolioLinea
  @Input() orden: Orden

  ordenTexto: string

  ngOnInit() {
    this.ordenTexto = JSON.stringify(this.orden)
  }

  obtenerJson(): string {
    return JSON.stringify(this.orden)
  }

  obtenerDatosParaOrden(): string {
    let datos = {}

    datos['idFolio'] = this.folio._id
    datos['idPedido'] = this.linea._id
    datos['idOrden'] = this.orden._id
    datos['cliente'] = this.folio.cliente.nombre

    return JSON.stringify(datos)
  }

  imprimir() {
    if (this.departamentoService.pool.length === 0) {
      this.departamentoService.findAllPoolObservable().subscribe(() => {
        this.orden.ruta.forEach(
          r =>
            (r.departamento = this.departamentoService.pool.find(
              d => d._id === r.idDepartamento
            ).nombre)
        )

        this.print()
      })
    } else {
      this.print()
    }
  }

  private print() {
    $('.modal').modal('hide')
    setTimeout(() => {
      this.impresionService
        .ordenes([this.orden._id])
        .seleccionarFolio(this.folio)
        .imprimir()
    }, 400)
  }
}
