import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core"
import { Puesto } from "../../../models/recursosHumanos/puestos/puesto.model"
import { HistorialDePuesto } from "src/app/models/recursosHumanos/puestos/historialDePuesto.model"
import { Empleado } from "src/app/models/recursosHumanos/empleados/empleado.model"
import { VisorDeImagenesService } from "../../../services/visorDeImagenes/visor-de-imagenes.service"
import { ImagenPipe } from "../../../pipes/imagen.pipe"
import { PuestoService } from "../../../services/recursosHumanos/puesto.service"

@Component({
  selector: "app-puestos-detalle",
  templateUrl: "./puestos-detalle.component.html",
  styles: []
})
export class PuestosDetalleComponent implements OnInit {
  historialSeleccionado: HistorialDePuesto = null
  indiceSeleccionado: number = 0
  puestoPadre: Puesto = null
  puestoSeleccionado: Puesto = null

  constructor(
    public _visorDeImagenesService: VisorDeImagenesService,
    public imganPipe: ImagenPipe,
  ) {}

  ngOnInit() {}

  @Output() detalleEmpleado = new EventEmitter<Empleado>()

  @Input() set puesto(value: Puesto) {
    //Establecemos el ultimo historial como el mas
    //reciente.

    this.reiniciarDatos()
    if (value !== null) {
      this.puestoPadre = value
      this.cambiarHistorial(0, this.puestoPadre)
    }
  }

  get puesto() {
    return this.puestoPadre
  }

  reiniciarDatos() {}

  cambiarHistorial(i: number, value: Puesto) {
    this.indiceSeleccionado = i
    this.historialSeleccionado = value.historial[i]
    this.puestoSeleccionado = this.historialSeleccionado.cambioAnterior
  }

  mostrarDetalleDeEmpleado(emp: Empleado) {
    this.detalleEmpleado.emit(emp)
  }

  mostrarImagen(i: string) {
    this._visorDeImagenesService.mostrarImagen(i)
  }


}
