import { Component, OnInit } from '@angular/core'
import { MaquinaService } from '../../../../services/maquina/maquina.service'
import { DefaultsService } from '../../../../services/configDefualts/defaults.service'
import { Maquina } from 'src/app/models/maquina.model'
import { ImpresionService } from '../../../../services/impresion.service'
import { ProgramacionTransformacionService } from '../../../../services/programacion-transformacion.service'
import { ParametrosService } from 'src/app/services/parametros.service'

@Component({
  selector: 'app-programacion-transformacion-reporte',
  templateUrl: './programacion-transformacion-reporte.component.html',
  styleUrls: ['./programacion-transformacion-reporte.component.css']
})
export class ProgramacionTransformacionReporteComponent implements OnInit {
  cargando = {}
  keys = Object.keys
  fecha: Date = new Date()
  ultimaActualizacion: Date

  maquinas: Maquina[] = []

  constructor(
    private maquinaService: MaquinaService,
    private impresionService: ImpresionService,
    private parametrosService: ParametrosService,
    private programacionService: ProgramacionTransformacionService
  ) {}

  ngOnInit(): void {
    this.cargarDatos()
  }

  cargarDatos() {
    this.ultimaActualizacion = new Date()
    this.cargando['parametros'] = 'Obteniendo parametros'

    this.parametrosService.findDepartamentoTransformacion().subscribe(
      def => {
        delete this.cargando['parametros']
        this.cargando['ubicacion'] = 'Actualizando ubicacion de las ordenes'

        this.programacionService.actualizarUbicacion(def._id).subscribe(
          () => {
            delete this.cargando['ubicacion']
            this.cargando['maquinas'] = 'Obteniendo maquinas'

            this.maquinaService
              .buscarMaquinasPorDepartamento(def._id)
              .subscribe(
                maquinas => {
                  delete this.cargando['maquinas']
                  this.maquinas = maquinas
                },
                err => delete this.cargando['maquinas']
              )
          },
          _ => delete this.cargando['ubicacion']
        )
      },
      _ => delete this.cargando['parametros']
    )
  }

  imprimir() {
    this.impresionService
      .programacionTransformacion(this.maquinas, 'Pila de trabajo')
      .imprimir()
  }
}
