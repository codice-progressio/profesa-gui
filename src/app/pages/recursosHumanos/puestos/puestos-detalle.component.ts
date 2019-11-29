import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core"
import { Puesto } from "../../../models/recursosHumanos/puestos/puesto.model"
import { HistorialDePuesto } from "src/app/models/recursosHumanos/puestos/historialDePuesto.model"
import { Empleado } from "src/app/models/recursosHumanos/empleados/empleado.model"
import { VisorDeImagenesService } from "../../../services/visorDeImagenes/visor-de-imagenes.service"
import { ImagenPipe } from "../../../pipes/imagen.pipe"
import { PuestoService } from "../../../services/recursosHumanos/puesto.service"
import { ManejoDeMensajesService } from "../../../services/utilidades/manejo-de-mensajes.service"

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
    public _puestoService: PuestoService,
    public _msjService: ManejoDeMensajesService
  ) {}

  ngOnInit() {}

  @Output() detalleEmpleado = new EventEmitter<Empleado>()

  @Input() puesto: Puesto = null



  mostrarImagen(i: string) {
    this._visorDeImagenesService.mostrarImagen(i)
  }

  subDetalle(id: string) {
    if( !id ) return 
    this._puestoService.findById(id, undefined, undefined, Puesto).subscribe(
      (puesto) => {
        this.puesto = puesto
        this._puestoService.autoPopulate([this.puesto])
      },
      (err) => {
        this._msjService.invalido(err, "Error en puesto", 10000)
      }
    )
  }
}
