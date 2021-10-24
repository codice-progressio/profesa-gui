import { Component, OnInit } from '@angular/core'
import { Usuario } from 'src/app/models/usuario.model'
import { ExcelService } from 'src/app/services/excel.service'
import { ParametrosService } from 'src/app/services/parametros.service'
import { UtilidadesService } from 'src/app/services/utilidades.service'
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service'

@Component({
  selector: 'app-parametros-usuarios-en-lotes',
  templateUrl: './parametros-usuarios-en-lotes.component.html',
  styleUrls: ['./parametros-usuarios-en-lotes.component.css']
})
export class ParametrosUsuariosEnLotesComponent implements OnInit {
  fichero: any
  caracterDeSeparcion = ','
  datos: Usuario[] = undefined
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
    this.parametrosService.usuarios.cargarEnLote(this.datos).subscribe(
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

  errores: { error: string; datos: Usuario }[] = undefined

  descargarErrores(datos: { error: string; datos: Usuario }[]) {
    let preparados = datos.map(x => {
      x.datos['error'] = x.error
      return x.datos
    })

    this.excelService.exportAsExcelFile(preparados, 'ERRORES_USUARIO_LOTES')
  }
}
