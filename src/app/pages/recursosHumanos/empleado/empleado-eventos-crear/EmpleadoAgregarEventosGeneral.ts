import { Input, Output, EventEmitter, Directive } from '@angular/core'
import { EmpleadoService } from '../../../../services/recursosHumanos/empleado.service'
import { ManejoDeMensajesService } from '../../../../services/utilidades/manejo-de-mensajes.service'
import { FormGroup, FormBuilder, AbstractControl, FormControl } from '@angular/forms'
import { ValidacionesService } from '../../../../services/utilidades/validaciones.service'
import { Empleado } from '../../../../models/recursosHumanos/empleados/empleado.model'

@Directive()
export class EmpleadoAgregarEventosGeneral<T> {
  @Input() empleado: T
  @Input() idModal: string
  @Output() guardado = new EventEmitter<null>()
  @Output() cancelado = new EventEmitter<null>()

  formulario: FormGroup

  constructor(
    public _empleadoService: EmpleadoService,
    public _notiServices: ManejoDeMensajesService,
    public fb: FormBuilder,
    public vs: ValidacionesService
  ) {}

  f(campo: string): AbstractControl {
    return this.formulario.get(campo)
  }

  guardar() {
    this.guardado.emit()
  }
}

export interface iEmpleadoAgregarEventosGeneral {
  crearFormulario(): void
  submit(e, invalid: boolean, model: any): void
  cancelar(): void
}
