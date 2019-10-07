import {
  Component,
  OnInit,
  Input,
  SimpleChange,
  OnChanges,
  Output
} from "@angular/core"
import { Requisicion } from "src/app/models/requisiciones/requisicion.model"
import { UsuarioService } from "../../../services/usuario/usuario.service"
import { Articulo } from "../../../models/almacenDeMateriaPrimaYHerramientas/articulo.modelo"
import { Proveedor } from "src/app/models/proveedores/proveedor.model"
import { ProveedorService } from "../../../services/proveedor.service"
import { EventEmitter } from "@angular/core"
import { Divisa } from "../../../models/divisas/divisa.model"
import { HistorialDeEstatusRequisicion } from "../../../models/requisiciones/historialDeEstatusRequisicion.model"
import { VisorDeImagenesService } from "src/app/services/visorDeImagenes/visor-de-imagenes.service"
import { ImagenPipe } from "../../../pipes/imagen.pipe"
import { ImagenesFacturas } from "../../../models/requisiciones/imagenesFacturas.model"

@Component({
  selector: "app-requisicion-detalle",
  templateUrl: "./requisicion-detalle.component.html",
  styles: []
})
export class RequisicionDetalleComponent implements OnInit, OnChanges {
  constructor(
    public _usuarioService: UsuarioService,
    public _proveedorService: ProveedorService,
    public _visorDeImagenesService: VisorDeImagenesService,
    private imagenPipe: ImagenPipe
  ) {}

  @Input() requisicion: Requisicion
  proveedores: Proveedor[] = []

  @Output() detalleProveedor = new EventEmitter<Proveedor>()
  @Output() detalleDivisa = new EventEmitter<Divisa>()

  ngOnInit() {}

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    let nombreDePropiedad = "requisicion"
    if (changes.hasOwnProperty(nombreDePropiedad)) {
      let cambio = changes[nombreDePropiedad]
      if (cambio.currentValue) {
        // Hay un cambio y ejecutamos lo que queremos.
        let requisicion: Requisicion = <Requisicion>cambio.currentValue
        this.obtenerProveedor(requisicion.articulo)
      }
    }
  }

  private obtenerProveedor(articulo: Articulo) {
    this._proveedorService
      .relacionadosAlArticulo(articulo)
      .subscribe((proveedores) => {
        this.proveedores = proveedores
      })
  }

  asignarDetalleProveedor(proveedor: Proveedor) {
    this.detalleProveedor.emit(proveedor)
  }
  asignarDetalleDivisa(divisa: Divisa) {
    this.detalleDivisa.emit(divisa)
  }

  obtenerEnPesos(proveedor: Proveedor, articulo: Articulo): number {
    let precioUnitario = proveedor.obtenerRelacionPorArticulo(articulo)
      .precioUnitario
    let tipoDeCambio = proveedor.obtenerRelacionPorArticulo(articulo).divisa
      .tipoDeCambio
    let r = precioUnitario * tipoDeCambio

    if (r === precioUnitario) {
      r = null
    }

    return r
  }

  obtenerUltimoHistorialDeEstatus(
    historial: HistorialDeEstatusRequisicion[]
  ): HistorialDeEstatusRequisicion {
    return historial[0]
  }

  imagenesConRutas(imgFact: string[]): string[] {
    let tipo = "articulos"
    let img: string[] = []
    imgFact.forEach((x) => img.push(this.imagenPipe.transform(x, tipo)))
    // Si no hay imagenes mostramos una vacia
    if (img.length === 0) img.push(this.imagenPipe.transform("", tipo))
    return img
  }

  
}
