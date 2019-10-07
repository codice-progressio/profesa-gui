import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core"
import { Requisicion } from "src/app/models/requisiciones/requisicion.model"
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms"
import { RequisicionService } from "../../../services/requisiciones/requisicion.service"
import { ValidacionesService } from "src/app/services/utilidades/validaciones.service"
import { ManejoDeMensajesService } from "src/app/services/utilidades/manejo-de-mensajes.service"
import { DataListComponent } from "src/app/shared/data-list/data-list.component"
import { Articulo } from "src/app/models/almacenDeMateriaPrimaYHerramientas/articulo.modelo"
import { Dato } from "src/app/shared/data-list/dato.model"
import { ArticuloService } from "../../../services/articulo/articulo.service"
import { EstatusRequisicion } from "src/app/models/requisiciones/estatusRequisicion.model"

@Component({
  selector: "app-requisicion-crear-modificar",
  templateUrl: "./requisicion-crear-modificar.component.html",
  styles: []
})
export class RequisicionCrearModificarComponent implements OnInit {
  @Input() requisicion: Requisicion = null
  @Output() guardar = new EventEmitter<null>()
  @Output() esteComponente = new EventEmitter<this>()

  dataListComponent: DataListComponent
  formulario: FormGroup
  articuloSeleccionadoParaInput: Articulo

  constructor(
    public fb: FormBuilder,
    public vs: ValidacionesService,
    public _msjService: ManejoDeMensajesService,
    public _requisicionService: RequisicionService,
    public _validacionesService: ValidacionesService,
    public _articuloService: ArticuloService
  ) {}

  ngOnInit() {
    this.esteComponente.emit(this)
    this.crearFormulario()
  }

  

  cargarDatos() {
    this.crearFormulario()
    this.asignarValores(this.requisicion)
  }

  asignarValores(req: Requisicion) {
    this.materiaPrima_FB.setValue(req.materiaPrima)
    this.consumibles_FB.setValue(req.consumibles)
    this.gastosYServicios_FB.setValue(req.gastosYServicios)
    this.cantidad_FB.setValue(req.cantidad)
    this.articulo_FB.setValue(req.articulo)
  }

  crear() {
    this.requisicion = null
    this.crearFormulario()
  }

  modificar(requisicion: Requisicion) {
    this.requisicion = requisicion
    this.crearFormulario()
    this.cargarDatos()

    this.dataListComponent.cargarElementoPorModificacion(
      this.crearDatoParaDataList(requisicion.articulo)
    )
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      // Esta comprobacion de que por lo menos
      // deben estar en false se hace en la operacion
      // de soloUnCheckBox() de manera rudimentaria
      materiaPrima: [null, [Validators.required]],
      consumibles: [null, [Validators.required]],
      gastosYServicios: [null, [Validators.required]],
      cantidad: [
        "",
        [
          this._validacionesService.numberValidator,
          Validators.min(0),
          Validators.required
        ]
      ],
      articulo: ["", [Validators.required]]
    })
  }

  public get materiaPrima_FB(): AbstractControl {
    return this.formulario.get("materiaPrima")
  }
  public get consumibles_FB(): AbstractControl {
    return this.formulario.get("consumibles")
  }
  public get gastosYServicios_FB(): AbstractControl {
    return this.formulario.get("gastosYServicios")
  }
  public get cantidad_FB(): AbstractControl {
    return this.formulario.get("cantidad")
  }
  public get articulo_FB(): AbstractControl {
    return this.formulario.get("articulo")
  }

  submit(modelo: Requisicion, valid: boolean, e) {
    e.preventDefault()
    if (valid) {
      let cb = () => {
        this.guardar.emit()
        this.limpiar()
      }
      let requi = <Requisicion>modelo
      if (this.requisicion) {
        requi._id = this.requisicion._id
        this._requisicionService.modificar(requi).subscribe(cb)
      } else {
        // Es una nueva requisicion y es necesario definir
        // su estatus.
        this.estatusRequisicion(requi)
        this._requisicionService.guardar(requi).subscribe(cb)
      }
    }
  }

  estatusRequisicion(requi: Requisicion) {
    requi.razonDeCambioTemp = "Se creo la requisicion"
    requi.estatus = new EstatusRequisicion()
    requi.estatus.esRequisicion = true
  }

  limpiar() {
    this.crearFormulario()
    this.requisicion = null
    this.dataListComponent.limpiarParaNuevo()
  }

  soloUnCheckBox(c: string) {
    // Solo un checkbox puede estar en true

    let cb = {
      materiaPrima: this.materiaPrima_FB,
      consumibles: this.consumibles_FB,
      gastosYServicios: this.gastosYServicios_FB
    }

    for (const box in cb) {
      if (cb.hasOwnProperty(box)) {
        const checkbox = cb[box]
        checkbox.setValue(false)
        if (c === box) checkbox.setValue(true)
      }
    }
  }

  // dataListComponent: DataListComponent
  ejecutarOperacionesDeBusquedaArticulos(evento) {
    let termino = <string>evento.termino
    this.dataListComponent = <DataListComponent>evento.dataList
    this._articuloService
      .search(termino, undefined, undefined, Articulo)
      .subscribe((articulos) => {
        let datos: Dato[] = []
        articulos.forEach((art: Articulo) => {
          datos.push(this.crearDatoParaDataList(art))
        })
        this.dataListComponent.terminoBusqueda(datos)
      })
  }
  articuloSeleccionado(dato: Dato) {
    let art: Articulo = <Articulo>dato ? dato.objeto : null
    this.articulo_FB.patchValue(art ? art._id : null)

    this.articuloSeleccionadoParaInput = art
    this.articulo_FB.markAsTouched()
    this.articulo_FB.updateValueAndValidity()
  }

  cancelar() {
    this.limpiar()
  }

  crearModificacionDeItem() {
    if (this.requisicion) {
      let a = this.requisicion.articulo
      return this.crearDatoParaDataList(a)
    }
  }

  private crearDatoParaDataList(art: Articulo): Dato {
    let d = new Dato()
    d.leyendaPrincipal = art.nombre
    d.leyendaSecundaria = `Existencia: ${art.existencia}`
    d.descripcionPrincipal = art.descripcion
    d.descripcionSecundaria = "Unidades de almacenamiento: " + art.presentacion
    d.objeto = art
    return d
  }
}
