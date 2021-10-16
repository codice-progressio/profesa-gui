import { Component, OnInit } from '@angular/core'
import { ListaDePrecios } from 'src/app/models/listaDePrecios.model'
import { ExcelService } from 'src/app/services/excel.service'
import { ParametrosService } from 'src/app/services/parametros.service'
import { UtilidadesService } from 'src/app/services/utilidades.service'
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service'

@Component({
  selector: 'app-parametros-lista-de-precios-en-lotes',
  templateUrl: './parametros-lista-de-precios-en-lotes.component.html',
  styleUrls: ['./parametros-lista-de-precios-en-lotes.component.css']
})
export class ParametrosListaDePreciosEnLotesComponent implements OnInit {
  inputFile = ''
  cargando = false
  caracterDeSeparacion = ','
  datos: ListaDePrecios[]
  nombre = ''

  constructor(
    private parametrosService: ParametrosService,
    private excelService: ExcelService,
    private msjService: ManejoDeMensajesService,
    private utilidadesService: UtilidadesService
  ) {}

  ngOnInit(): void {}

  procesarArchivo(target) {
    this.cargando = true
    this.nombre = target.files[0].name

    this.utilidadesService.ficheros
      .procesarArchivo(target, this.caracterDeSeparacion)
      .then(
        (datos: any) => {
          this.cargando = false
          this.datos = datos
        },
        () => {
          this.datos = undefined
          this.cargando = false
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

    if (!this.nombre.trim()) {
      this.msjService.toast.error('El nombre no puede estar vacio')
      return
    }

    this.cargando = true
    this.parametrosService.listasDePrecio
      .cargarEnLote(this.datos, this.nombre)
      .subscribe(
        (respuesta: any) => {
          this.errores = respuesta.rechazados

          if (this.errores?.length > 0)
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

  errores: { error: string; dato: any }[] = undefined

  descargarErrores(datos: { error: string; dato: any }[]) {
    let preparados = datos.map(x => {
      x.dato['error'] = x.error
      return x.dato
    })

    this.excelService.exportAsExcelFile(
      preparados,
      'ERRORES_LIST_DE_PRECIOS_LOTES'
    )
  }
}
