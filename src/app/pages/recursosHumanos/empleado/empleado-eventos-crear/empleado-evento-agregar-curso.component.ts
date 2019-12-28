import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { Empleado } from '../../../../models/recursosHumanos/empleados/empleado.model'
import { CursoService } from '../../../../services/recursosHumanos/curso.service'
import { DataListComponent } from '../../../../shared/data-list/data-list.component'
import { Curso } from '../../../../models/recursosHumanos/cursos/curso.model'
import { Dato } from '../../../../shared/data-list/dato.model'
import { EmpleadoService } from '../../../../services/recursosHumanos/empleado.service'
import { ManejoDeMensajesService } from '../../../../services/utilidades/manejo-de-mensajes.service'
import { FormBuilder, Validators } from '@angular/forms'
import { ValidacionesService } from '../../../../services/utilidades/validaciones.service'
import * as moment from 'moment/moment'
import {
  EmpleadoAgregarEventosGeneral,
  iEmpleadoAgregarEventosGeneral
} from './EmpleadoAgregarEventosGeneral'

@Component({
  selector: 'app-empleado-evento-agregar-curso',
  templateUrl: './empleado-evento-agregar-curso.component.html',
  styles: []
})
export class EmpleadoEventoAgregarCursoComponent
  extends EmpleadoAgregarEventosGeneral<Empleado>
  implements OnInit, iEmpleadoAgregarEventosGeneral {
  dataList: DataListComponent

  constructor(
    public _cursoService: CursoService,
    public _empleadoService: EmpleadoService,
    public _msjService: ManejoDeMensajesService,
    public fb: FormBuilder,
    public vs: ValidacionesService
  ) {
    super(_empleadoService, _msjService, fb, vs)
  }

  ngOnInit() {
    this.crearFormulario()
  }

  buscar(data: { termino: string; dataList: DataListComponent }) {
    this._cursoService
      .buscar(data.termino)

      .subscribe(cursos => {
        const datos: Dato[] = []

        cursos.forEach(curso => {
          let dato = new Dato()
          dato.descripcionPrincipal = curso.nombre
          dato.leyendaPrincipal = curso.descripcionDeCurso
          dato.objeto = curso

          datos.push(dato)
        })

        data.dataList.terminoBusqueda(datos)
      })
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      curso: [null, [Validators.required]],
    })
  }

  seleccionado(dato: Dato) {
    const campo = this.f('curso')
    if (!dato) {
      campo.setValue(null)
    } else {
      campo.setValue((<Curso>dato.objeto)._id)
    }
    campo.markAsTouched()
    campo.updateValueAndValidity()
  }

  submit(e, invalid: boolean, model: { curso: string }) {
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()
    if (invalid) {
      e.preventDefault()
      e.stopPropagation()
      return
    }

    this._empleadoService
      .registrarCurso(this.empleado._id, new Date(), model.curso)
      .subscribe(
        respuesta => {
          this.guardado.emit()
          this.limpiar()
        },
        err => this.cancelar()
      )
  }

  cancelar() {
    this.limpiar()
  }

  limpiar() {
    this.dataList.limpiarParaNuevo()
    this.crearFormulario()
  }
}
