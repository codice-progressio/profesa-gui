import { Component, OnInit } from '@angular/core';
import { EmpleadoAgregarEventosGeneral, iEmpleadoAgregarEventosGeneral } from './EmpleadoAgregarEventosGeneral';
import { Empleado } from 'src/app/models/recursosHumanos/empleados/empleado.model';
import { EmpleadoService } from 'src/app/services/recursosHumanos/empleado.service';
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service';
import { FormBuilder } from '@angular/forms';
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service';

@Component({
  selector: 'app-empleado-agregar-estatus-laboral',
  templateUrl: './empleado-agregar-estatus-laboral.component.html',
  styles: []
})
export class EmpleadoAgregarEstatusLaboralComponent extends EmpleadoAgregarEventosGeneral<Empleado>
implements OnInit, iEmpleadoAgregarEventosGeneral {
constructor(
  public _empleadoService: EmpleadoService,
  public _notiService: ManejoDeMensajesService,
  public fb: FormBuilder,
  public vs: ValidacionesService
) {
  super(_empleadoService, _notiService, fb, vs)
}

ngOnInit() {}

crearFormulario(): void {
  throw new Error('Method not implemented.')
}
submit(e: any, invalid: boolean, model: any): void {
  throw new Error('Method not implemented.')
}
cancelar(): void {
  throw new Error('Method not implemented.')
}
}
