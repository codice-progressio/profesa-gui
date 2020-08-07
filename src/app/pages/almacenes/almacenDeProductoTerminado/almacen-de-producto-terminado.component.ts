import { Component, OnInit } from '@angular/core'
import { ModeloCompleto } from '../../../models/modeloCompleto.modelo'
import { AlmacenProductoTerminadoService } from '../../../services/almacenDeProductoTerminado/almacen-producto-terminado.service'
import {
  ModeloCompletoService,
  ModeloCompletoLigero
} from '../../../services/modelo/modelo-completo.service'
import { Lotes } from '../../../models/almacenProductoTerminado/lotes.model'
import { ManejoDeMensajesService } from '../../../services/utilidades/manejo-de-mensajes.service'
import { Paginacion } from '../../../utils/paginacion.util'
import { iPaginadorData } from 'src/app/shared/paginador/paginador.component'
import permisosKeysConfig from 'src/app/config/permisosKeys.config'
import { ExcelService } from '../../../services/excel.service'
import { ReportesProduccionService } from '../../../services/reportes/reportes-produccion.service'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-almacen-de-producto-terminado',
  templateUrl: './almacen-de-producto-terminado.component.html',
  styles: []
})
export class AlmacenDeProductoTerminadoComponent implements OnInit {
  /**
   *El modeloCompleto al que se le va a agregar una entrada o salida.
   *
   * @type {ModeloCompleto}
   * @memberof AlmacenDeProductoTerminadoComponent
   */
  modeloCompletoES: ModeloCompleto = null
  /**
   *Define si es entrada o salida lo que se le va agregar al modelo completo
   *
   * @type {boolean}
   * @memberof AlmacenDeProductoTerminadoComponent
   */
  esEntrada: boolean = null
  detalleLote: Lotes
  termino: string = ''
  paginacion: Paginacion = new Paginacion(5, 0, 1, 'nombreCompleto')
  cargando = {}
  totalDeElementos = 0

  keys = Object.keys

  p = permisosKeysConfig

  inferiorSalidas: Date
  superiorSalidas: Date
  generandoReporteSalidas = false

  constructor(
    public almacenProdTerSer: AlmacenProductoTerminadoService,
    public modComService: ModeloCompletoService,
    public _msjService: ManejoDeMensajesService,
    public excelService: ExcelService,
    public reporteService: ReportesProduccionService,
    private dateTime: DatePipe
  ) {}

  ngOnInit() {
    this.cargarModelos()
  }

  modelosCompletos: ModeloCompletoLigero[] = []
  modeloCompletoDetalle: ModeloCompleto = null

  cargarModelos() {
    this.cargando['cargando'] = 'Cargando la lista sku'
    this.modComService.findAll(this.paginacion).subscribe(
      mod => {
        this.modelosCompletos = mod
        delete this.cargando['cargando']
        this.totalDeElementos = this.modComService.total
      },
      () => delete this.cargando['cargando']
    )
  }

  cbObservable = termino => {
    this.cargando['byTerm'] = `Buscando por el termino "${termino}" `
    this.termino = termino
    return this.modComService.findByTerm(
      termino,
      new Paginacion(
        this.paginacion.limite,
        0,
        this.paginacion.orden,
        this.paginacion.campoDeOrdenamiento
      )
    )
  }

  resultadoDeBusqueda(datos) {
    this.modelosCompletos = datos
    this.totalDeElementos = this.modComService.total
    delete this.cargando['byTerm']
  }

  cancelado() {
    this.termino = ''
    this.cargarModelos()
  }
  error() {
    this.termino = ''
    this.cargarModelos
  }

  actualizarConsulta(data: iPaginadorData = null) {
    this.paginacion = data.paginacion

    this.cargando['paginador'] = 'Actualizando consulta'

    const cb = modelos => {
      this.modelosCompletos = modelos
      this.totalDeElementos = this.modComService.total
      delete this.cargando['paginador']
    }
    const error = () => {
      delete this.cargando['paginador']
      this.cargarModelos()
    }

    if (this.termino) {
      this.modComService
        .findByTerm(this.termino, this.paginacion)
        .subscribe(cb, error)
    } else {
      this.modComService.findAll(data.paginacion).subscribe(cb, error)
    }
  }

  /**
   *Comprueba las existencias y devuelve el valor que corresponda.
   *
   * `-1` => La existencia esta debajo del minimo.
   * ` 0` => No hay existencia.
   * ` 1` => La existencia supera el maximo.
   * ` 2` => Todo esta dentro de l parametros.
   *
   *
   * @returns {(-1 | 0 | 1 | 2)} El valor segun la evaluacion.
   * @memberof AlmacenDeProductoTerminadoComponent
   */
  comprobarExistencias(mc: ModeloCompleto) {
    let valor: number = 2

    if (mc.existencia === 0) return 2

    if (mc.existencia > mc.stockMaximo) valor = 1
    if (mc.existencia < mc.stockMinimo) valor = -1
    if (mc.existencia == 0) valor = 0

    return valor
  }

  modeloAConsolidar: ModeloCompleto = null

  consolidarLotes() {
    this.almacenProdTerSer
      .consolidar(this.modeloAConsolidar._id)
      .subscribe(() => {
        this.modeloAConsolidar = null
        if (this.termino) {
          this.cbObservable(this.termino).subscribe(modelos => {
            this.modelosCompletos = modelos
          })
        } else {
          this.cargarModelos()
        }
      })
  }

  exportarTodoAExcel() {
    this.cargando['excel'] = 'Obteniendo datos para exportar a excel'

    this.modComService.todoParaExcel().subscribe(
      datos => {
        delete this.cargando['excel']

        this.excelService.exportAsExcelFile(datos, 'ALMACEN_PRODUCTO_TERMINADO')
      },
      _ => delete this.cargando['excel']
    )
  }

  setearParte(parte: string, sku: ModeloCompletoLigero) {
    let parteAnterior = sku.parte
    this.modComService.definirParte(parte, sku._id).subscribe(
      _ => {
        sku.parte = parte
      },
      _ => (sku.parte = parteAnterior)
    )
  }

  generarReporteSalidas() {
    if (this.generandoReporteSalidas) return
    if (!this.inferiorSalidas || !this.superiorSalidas) {
      this._msjService.toastErrorMensaje('Debes definir un rango valido')
      return
    }

    this.generandoReporteSalidas = true

    this.reporteService
      .salidasAlmacenProductoTerminado(
        this.inferiorSalidas,
        this.superiorSalidas
      )
      .subscribe(
        datos => {
          let arreglado = datos.map(x => {
            try {
              x.fechaSalida = new Date(x.fechaSalida)
              x.horaSalida = this.dateTime.transform(x.fechaSalida, 'HH:MM:ss')
              x.fechaSalida = this.dateTime.transform(
                x.fechaSalida,
                'yyyy-MM-dd'
              )
            } catch (error) {
              console.log(error)
            }

            return x
          })
          this.excelService.exportAsExcelFile(arreglado, 'SALIDAS_ALMACEN')

          this.generandoReporteSalidas = false
        },
        _ => (this.generandoReporteSalidas = false)
      )
  }
}
