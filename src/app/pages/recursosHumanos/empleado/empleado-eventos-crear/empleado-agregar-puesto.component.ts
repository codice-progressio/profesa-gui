import { Component, OnInit } from '@angular/core'
import {
  EmpleadoAgregarEventosGeneral,
  iEmpleadoAgregarEventosGeneral
} from './EmpleadoAgregarEventosGeneral'
import { Empleado } from 'src/app/models/recursosHumanos/empleados/empleado.model'
import { EmpleadoService } from 'src/app/services/recursosHumanos/empleado.service'
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service'
import { FormBuilder, Validators } from '@angular/forms'
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service'
import { Dato } from '../../../../shared/data-list/dato.model'
import { DataListComponent } from '../../../../shared/data-list/data-list.component'
import { PuestoService } from '../../../../services/recursosHumanos/puesto.service'
import { DecimalPipe } from '@angular/common'

@Component({
  selector: 'app-empleado-agregar-puesto',
  templateUrl: './empleado-agregar-puesto.component.html',
  styles: []
})
export class EmpleadoAgregarPuestoComponent
  extends EmpleadoAgregarEventosGeneral<Empleado>
  implements OnInit, iEmpleadoAgregarEventosGeneral {
  dataList: DataListComponent

  constructor(
    public _empleadoService: EmpleadoService,
    public _notiService: ManejoDeMensajesService,
    public fb: FormBuilder,
    public vs: ValidacionesService,
    public _puestoService: PuestoService,
    public decimalPipe: DecimalPipe
  ) {
    super(_empleadoService, _notiService, fb, vs)
  }

  ngOnInit() {
    this.crearFormulario()
  }

  crearFormulario(): void {
    this.formulario = this.fb.group({
      nuevo: ['', [Validators.required]],
      observaciones: ['', [Validators.required, Validators.minLength(10)]]
    })
  }

  buscar(dato: { termino: string; dataList: DataListComponent }) {
    const termino = dato.termino
    this.dataList = this.dataList

    this._puestoService.buscar(termino).subscribe(
      puestos => {
        const datos: Dato[] = []

        puestos.forEach(p => {
          const d = new Dato()
          d.leyendaPrincipal = p.puesto
          d.descripcionPrincipal = p.misionDelPuesto
          d.descripcionSecundaria = p.departamento.nombre
          d.objeto = p

          datos.push(d)
        })

        this.dataList.terminoBusqueda(datos)
      },

      err => {
        this.cancelar()
        console.error(err)
      }
    )
  }

  seleccionado(dato: Dato) {
    if (!dato) {
      this.f('nuevo').setValue(null)
      return
    }
    this.f('nuevo').setValue((<Empleado>dato.objeto)._id)
  }

  submit(e: any, invalid: boolean, model: any): void {
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()
    if (invalid) {
      e.preventDefault()
      e.stopPropagation()
      return
    }

    this._empleadoService
      .registrarPuesto(this.empleado._id, model.nuevo, model.observaciones)
      .subscribe(ok => {
        this.guardado.emit()
        this.limpiar()
        this.crearFormulario()
      })
  }
  cancelar(): void {
    this.limpiar()
    this.crearFormulario()
    this.cancelado.emit()
  }

  limpiar() {
    this.dataList.limpiarParaNuevo()
  }
}
