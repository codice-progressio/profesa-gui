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

  private _orden: Orden
  @Input() set orden(orden: Orden) {
    this._orden = orden

    this.departamentoService.findAllPoolObservable().subscribe(() => {
      this.orden.ruta.forEach(
        r =>
          (r.departamento = this.departamentoService.pool.find(
            d => d._id === r.idDepartamento
          ).nombre)
      )
    })
  }

  get orden(): Orden {
    return this._orden
  }

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
    this.print()
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
