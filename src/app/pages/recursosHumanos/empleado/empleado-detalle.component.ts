import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { Empleado } from 'src/app/models/recursosHumanos/empleados/empleado.model'
import { Puesto } from 'src/app/models/recursosHumanos/puestos/puesto.model'
import { VisorDeImagenesService } from '../../../services/visorDeImagenes/visor-de-imagenes.service'
import { Permiso } from 'src/app/models/recursosHumanos/empleados/eventos/permiso.model'
import { EmpleadoService } from '../../../services/recursosHumanos/empleado.service'

@Component({
  selector: 'app-empleado-detalle',
  templateUrl: './empleado-detalle.component.html',
  styles: []
})
export class EmpleadoDetalleComponent implements OnInit {
  @Input() empleado: Empleado = null
  @Output() detallePuesto = new EventEmitter<Puesto>()
  @Output() permisoActualizado= new EventEmitter<null>()
  constructor(
    private _visual: VisorDeImagenesService,
    public _empleadoService: EmpleadoService
  ) {}

  ngOnInit() {}
  asignarDetallePuesto(puesto: Puesto) {
    this.detallePuesto.emit(puesto)
  }

  visualizarImagen(src: string) {
    this._visual.mostrarImagen(src)
  }

  autorizarPermiso(permiso: Permiso) {
    this._empleadoService
    .registrarPermiso(this.empleado._id, permiso)
    .subscribe( x=> {
      this.permisoActualizado.emit()
    } )
  }
}
