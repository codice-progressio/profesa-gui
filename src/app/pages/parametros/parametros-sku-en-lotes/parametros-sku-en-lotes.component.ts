import { Component, OnInit } from '@angular/core'
import { SKU } from 'src/app/models/sku.model'
import { ParametrosService } from 'src/app/services/parametros.service'
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service'
import { UtilidadesService } from 'src/app/services/utilidades.service'
import { ExcelService } from 'src/app/services/excel.service'

@Component({
  selector: 'app-parametros-sku-en-lotes',
  templateUrl: './parametros-sku-en-lotes.component.html',
  styleUrls: ['./parametros-sku-en-lotes.component.css']
})
export class ParametrosSkuEnLotesComponent implements OnInit {
  fichero: any
  caracterDeSeparcion = '+'
  datos: SKU[] = undefined
  // Solo para borrar
  inputFile: any
  cargando = false

  constructor(
    private excelService: ExcelService,
    private utilidadesService: UtilidadesService,
    private parametrosService: ParametrosService,
    private msjService: ManejoDeMensajesService
  ) {}

  ngOnInit(): void {}

  procesarArchivo(target) {
    this.cargando = true
    this.utilidadesService.ficheros
      .procesarArchivo(target, this.caracterDeSeparcion)
      .then(
        (x: any[]) => {
          this.errores = undefined
          this.cargando = false
          this.datos = x
        },
        () => {
          this.errores = undefined
          this.cargando = false
          this.datos = undefined
          this.msjService.toast.error('No hay datos para procesar')
        }
      )
  }

  submit() {
    if (this.cargando) return
    if (!this.datos) {
      this.msjService.toast.warning('No se han seleccionado datos para cargar')
      return
    }

    this.cargando = true
    this.parametrosService.sku.cargarEnLote(this.datos).subscribe(
      (respuesta: any) => {
        this.errores = respuesta.rechazados

        if (this.errores.length > 0)
          this.msjService.toast.warning(
            `Hubo ${this.errores.length} errores al procesar los datos. `
          )
        this.cargando = false
        this.inputFile = ''
      },
      error => {
        this.cargando = false
      }
    )
  }

  errores: { error: string; datos: SKU }[] = undefined

  descargarErrores(datos: { error: string; datos: SKU }[]) {
    let preparados = datos.map(x => {
      x.datos['error'] = x.error
      return x.datos
    })

    this.excelService.exportAsExcelFile(preparados, 'ERRORES_SKU_LOTES')
  }
}
