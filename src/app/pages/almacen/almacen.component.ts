import { Component, OnInit } from '@angular/core'
import { SKU } from '../../models/sku.model'
import { SkuService } from '../../services/sku/sku.service'
import { BehaviorSubject } from 'rxjs'
import { ExcelService } from '../../services/excel.service'

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.css']
})
export class AlmacenComponent implements OnInit {
  private _cargando = false
  public get cargando() {
    return this._cargando
  }
  public set cargando(value) {
    this._cargando = value
    this.estaCargandoBuscador.next(false)
  }
  termino: string
  estaCargandoBuscador: BehaviorSubject<boolean>

  etiquetasFiltrandose: string[] = []
  skus: SKU[] = []

  constructor(private excelService: ExcelService) {}

  ngOnInit(): void {}

  eliminarEtiqueta(tag: string) {
    return (event: any) =>
      (this.etiquetasFiltrandose = this.etiquetasFiltrandose.filter(
        x => x !== tag
      ))
  }

  generarExcel(skus: SKU[]) {
    this.excelService.exportAsExcelFile(skus, 'ALMACEN')
  }
}
