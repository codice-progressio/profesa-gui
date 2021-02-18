import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { SKU } from '../../../models/sku.model'
import { SkuService } from '../../../services/sku/sku.service'
import { SkuLote } from '../../../models/lote.model'
import { ExcelService } from '../../../services/excel.service'
import { UtilidadesService } from '../../../services/utilidades/utilidades.service'

@Component({
  selector: 'app-sku-lotes',
  templateUrl: './sku-lotes.component.html',
  styleUrls: ['./sku-lotes.component.css']
})
export class SkuLotesComponent implements OnInit {
  cargando = false

  observaciones: string
  caducidad: Date | null

  idCollapsable = 'COLLAPSABLE' + Math.trunc(Math.random() * 100000) + this.id
  mostrarSinExistencia = false
  private _id: string
  public get id(): string {
    return this._id
  }
  @Input()
  public set id(value: string) {
    this._id = value
    this.obtenerLotes(value)
  }

  sku: SKU
  @Input() crearLote: boolean = false

  private _loteSeleccionado: SkuLote
  public get loteSeleccionado(): SkuLote {
    return this._loteSeleccionado
  }
  public set loteSeleccionado(value: SkuLote) {
    this._loteSeleccionado = value
    this.lote.emit(value)
  }

  @Output('lote') lote = new EventEmitter<SkuLote>()

  constructor(
    private utilidadesService: UtilidadesService,
    private skuService: SkuService,
    private excelService: ExcelService
  ) {}

  ngOnInit(): void {}

  obtenerLotes(id: string) {
    this.cargando = true

    this.skuService.lote.obtenerTodo(id).subscribe(
      sku => {
        this.cargando = false
        this.sku = sku
      },
      () => (this.cargando = false)
    )
  }

  guardar() {
    this.cargando = true
    this.skuService.lote
      .crear(this.sku._id, {
        observaciones: this.observaciones,
        caducidad: this.caducidad
      })
      .subscribe(
        value => {
          this.sku.lotes.unshift(value.lotes.shift())
          this.cargando = false
          this.observaciones = ''
          this.caducidad = new Date()
        },
        () => (this.cargando = false)
      )
  }

  lotesOcultos() {
    return this.sku.lotes.reduce((a, b) => {
      return (a += b.existencia > 0 ? 1 : 0)
    }, 0)
  }

  cargandoExcel = false
  exportarMovimientosExcel() {
    if (this.cargandoExcel) return
    this.cargandoExcel = true

    this.skuService.lote.obtenerMovimientos(this.sku._id).subscribe(
      r => {
        this.cargandoExcel = false
        this.excelService.exportAsExcelFile(r, this.sku.nombreCompleto)
      },
      () => (this.cargandoExcel = false)
    )
  }
}
