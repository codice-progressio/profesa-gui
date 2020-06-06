import {
  Component,
  OnInit,
  Input,
  SimpleChange,
  OnChanges,
  Output
} from '@angular/core'
import { Requisicion } from 'src/app/models/requisiciones/requisicion.model'
import { UsuarioService } from '../../../services/usuario/usuario.service'
import { Articulo } from '../../../models/almacenDeMateriaPrimaYHerramientas/articulo.modelo'
import { Proveedor } from 'src/app/models/proveedores/proveedor.model'
import { ProveedorService } from '../../../services/proveedor.service'
import { EventEmitter } from '@angular/core'
import { Divisa } from '../../../models/divisas/divisa.model'
import { HistorialDeEstatusRequisicion } from '../../../models/requisiciones/historialDeEstatusRequisicion.model'
import { VisorDeImagenesService } from 'src/app/services/visorDeImagenes/visor-de-imagenes.service'
import { ImagenPipe } from '../../../pipes/imagen.pipe'
import { ImagenesFacturas } from '../../../models/requisiciones/imagenesFacturas.model'
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import { RequisicionService } from '../../../services/requisiciones/requisicion.service'

@Component({
  selector: 'app-requisicion-detalle',
  templateUrl: './requisicion-detalle.component.html',
  styles: []
})
export class RequisicionDetalleComponent implements OnInit, OnChanges {
  cargando = {}
  keys = Object.keys

  constructor(
    public usuarioService: UsuarioService,
    public proveedorService: ProveedorService,
    public visorDeImagenesService: VisorDeImagenesService,
    private imagenPipe: ImagenPipe,
    public location: Location,
    public activatedRoute: ActivatedRoute,
    public requiService: RequisicionService
  ) {}

  requisicion: Requisicion
  proveedores: Proveedor[] = []

  detalleProveedor = new EventEmitter<Proveedor>()
  detalleDivisa = new EventEmitter<Divisa>()

  ngOnInit() {
    this.cargando['requisicion'] = 'Cargando detalle de requisicion'
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    this.requiService.findById(id).subscribe(
      requisicion => {
        this.requisicion = requisicion

        delete this.cargando['requisicion']
      },
      () => delete this.cargando['requisicion']
    )
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    let nombreDePropiedad = 'requisicion'
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
    this.proveedorService
      .relacionadosAlArticulo(articulo)
      .subscribe(proveedores => {
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
    let tipo = 'articulos'
    let img: string[] = []

    if (!imgFact) return [this.imagenPipe.transform('', tipo)]

    imgFact.forEach(x => img.push(this.imagenPipe.transform(x, tipo)))
    if (img.length === 0) img.push(this.imagenPipe.transform('', tipo))
    return img
    // Si no hay imagenes mostramos una vacia
  }
}
