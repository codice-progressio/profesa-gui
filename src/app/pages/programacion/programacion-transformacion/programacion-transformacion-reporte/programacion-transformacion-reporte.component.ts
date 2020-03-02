import { Component, OnInit } from '@angular/core'
import { MaquinaService } from '../../../../services/maquina/maquina.service'
import { DefaultsService } from '../../../../services/configDefualts/defaults.service'
import { Maquina } from 'src/app/models/maquina.model'
import { ImpresionService } from '../../../../services/impresion.service'
import { ProgramacionTransformacionService } from '../../../../services/programacion-transformacion.service'

@Component({
  selector: 'app-programacion-transformacion-reporte',
  templateUrl: './programacion-transformacion-reporte.component.html',
  styleUrls: ['./programacion-transformacion-reporte.component.css']
})
export class ProgramacionTransformacionReporteComponent implements OnInit {
  cargando = false
  fecha: Date = new Date()
  ultimaActualizacion: Date

  maquinas: Maquina[] = []

  constructor(
    private defaulService: DefaultsService,
    private maquinaService: MaquinaService,
    private impresionService: ImpresionService,
    private programacionService: ProgramacionTransformacionService
  ) {}

  ngOnInit(): void {
    this.cargarDatos()
  }

  cargarDatos() {
    this.ultimaActualizacion = new Date()
    this.cargando = true

    this.defaulService.cargarDefaults().subscribe(def => {
      this.programacionService
        .actualizarUbicacion(def.DEPARTAMENTOS.TRANSFORMACION)
        .subscribe(() => {
          this.maquinaService
            .buscarMaquinasPorDepartamento(def.DEPARTAMENTOS.TRANSFORMACION)
            .subscribe(
              maquinas => {
                this.maquinas = maquinas
                this.cargando = false
              },
              err => (this.cargando = false)
            )
        })
    })
  }

  imprimir() {
    this.impresionService
      .programacionTransformacion(this.maquinas, 'Pila de trabajo')
      .imprimir()
  }
}
