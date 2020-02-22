import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef
} from "@angular/core"
import { Proveedor } from "src/app/models/proveedores/proveedor.model"
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormArray,
  FormControl
} from "@angular/forms"
import { ValidacionesService } from "src/app/services/utilidades/validaciones.service"
import { DivisaService } from "src/app/services/divisa.service"
import { Divisa } from "src/app/models/divisas/divisa.model"
import { ProveedorService } from "../../services/proveedor.service"
import { ArticuloService } from "src/app/services/articulo/articulo.service"
import { DataListComponent } from "../../shared/data-list/data-list.component"
import { Articulo } from "../../models/almacenDeMateriaPrimaYHerramientas/articulo.modelo"
import { Dato } from "src/app/shared/data-list/dato.model"
import { ManejoDeMensajesService } from "../../services/utilidades/manejo-de-mensajes.service"
import { Domicilio } from "src/app/models/proveedores/domicilio.model"
import { Contacto } from "../../models/proveedores/contacto.model"
import { RelacionArticulo } from "../../models/proveedores/relacionArticulo.model"
import { Cuenta } from "../../models/proveedores/cuenta.model"

@Component({
  selector: "app-proveedor-crear-modificar",
  templateUrl: "./proveedor-crear-modificar.component.html",
  styles: []
})
export class ProveedorCrearModificarComponent implements OnInit {
  @Input() proveedor: Proveedor = null
  @Output() guardar = new EventEmitter<null>()
  @Output() esteComponente = new EventEmitter<this>()

  formulario: FormGroup

  divisas: Divisa[] = []

  constructor(
    public fb: FormBuilder,
    public vs: ValidacionesService,
    public _proveedorService: ProveedorService,
    public _divisaService: DivisaService,
    public _articuloService: ArticuloService,
    public _msjService: ManejoDeMensajesService
  ) {}

  ngOnInit() {
    this._divisaService.todo().subscribe((d) => (this.divisas = d))
    this.esteComponente.emit(this)
    this.crearFormulario()
  }

  cargarDatos() {
    this.crearFormulario()
    this.asignarValores(this.proveedor)
  }

  asignarValores(proveedor: Proveedor) {
    this.nombre_FB.setValue(this.proveedor.nombre)
    this.razonSocial_FB.setValue(this.proveedor.razonSocial)

    this.proveedor.domicilios.forEach((x) => {
      this.domicilios_FB.push(this.asginarDomiclios(x))
    })

    this.proveedor.contactos.forEach((x) =>
      this.contactos_FB.push(this.asignarContacto(x))
    )

    this.tiempoDeEntregaEstimadoEnDias_FB.setValue(
      this.proveedor.tiempoDeEntregaEstimadoEnDias
    )

    this.proveedor.relacionArticulos.forEach((r) =>
      this.relacionArticulos_FB.push(this.asignarArticulo(r))
    )

    this.rfc_FB.setValue(this.proveedor.rfc)

    this.proveedor.metodosDePagoAceptados.forEach((m) =>
      this.metodosDePagoAceptados_FB.push(new FormControl(m))
    )

    this.proveedor.condicionesDePago.forEach((c) =>
      this.condicionesDePago_FB.push(new FormControl(c))
    )

    this.proveedor.formasDePago.forEach((f) =>
      this.formasDePago_FB.push(new FormControl(f))
    )

    this.proveedor.cuentas.forEach((c) =>
      this.cuentas_FB.push(this.asingarCuentas(c))
    )
  }

  private asginarDomiclios(domicilio: Domicilio): FormGroup {
    let grupo = this.crearGrupo_domicilio()

    grupo.get("calle").setValue(domicilio.calle)
    grupo.get("numeroInterior").setValue(domicilio.numeroInterior)
    grupo.get("numeroExterior").setValue(domicilio.numeroExterior)
    grupo.get("colonia").setValue(domicilio.colonia)
    grupo.get("codigoPostal").setValue(domicilio.codigoPostal)
    grupo.get("estado").setValue(domicilio.estado)
    grupo.get("estado").setValue(domicilio.estado)
    grupo.get("pais").setValue(domicilio.pais)
    grupo.get("urlMaps").setValue(domicilio.urlMaps)

    return grupo
  }

  private asignarContacto(contacto: Contacto): FormGroup {
    let grupo = this.crearGrupo_contacto()
    grupo.get("nombre").setValue(contacto.nombre)
    grupo.get("telefono").setValue(contacto.telefono)
    grupo.get("correo").setValue(contacto.correo)
    grupo.get("puesto").setValue(contacto.puesto)
    return grupo
  }

  private asignarArticulo(relacionArticiulo: RelacionArticulo): FormGroup {
    let grupo = this.crearGrupo_relacionArticulo()

    grupo.get("precioUnitario").setValue(relacionArticiulo.precioUnitario)
    grupo.get("divisa").setValue(relacionArticiulo.divisa?relacionArticiulo.divisa._id : '' )
    grupo.get("item").setValue(relacionArticiulo.item._id)
    grupo
      .get("tiempoDeEntregaEnDias")
      .setValue(relacionArticiulo.tiempoDeEntregaEnDias)
    grupo.get("prioridad").setValue(relacionArticiulo.prioridad)

    return grupo
  }

  /**
   *Esta operacion la jala el Input cargarModificacion 
   * del componente data-list
   *
   * @param {number} i El indice del cual queremos obtener el id
   * @returns {Dato} El dato estrucutrado
   * @memberof ProveedorCrearModificarComponent
   */
  cargarModificacionDeItem(i: number): Dato {
    let id = this.relacionArticulo_FB_item(i).value
    if (this.proveedor) {
      let a = this.proveedor.relacionArticulos.find((a) => a.item._id === id)
        if( a ) return this.crearDatoParaDataList(a.item)
    }
  }

  private asingarCuentas(cuenta: Cuenta): FormGroup {
    let grupo = this.crearGrupo_cuenta()
    grupo.get("clabe").setValue(cuenta.clabe)
    grupo.get("banco").setValue(cuenta.banco)

    return grupo
  }

  crear() {
    this.proveedor = null
    this.crearFormulario()
  }

  modificar(proveedor: Proveedor) {
    this.proveedor = proveedor
    this.crearFormulario()
    this.cargarDatos()
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      
      nombre: ["", []],
      razonSocial: ["", []],
      domicilios: this.fb.array([]),
      contactos: this.fb.array([]),
      tiempoDeEntregaEstimadoEnDias: ["", []],
      relacionArticulos: this.fb.array([]),
      rfc: ["", []],
      metodosDePagoAceptados: this.fb.array([]),
      condicionesDePago: this.fb.array([]),
      formasDePago: this.fb.array([]),
      cuentas: this.fb.array([])
    })
  }

  private crearGrupo_domicilio(): FormGroup {
    return this.fb.group({
      calle: ["", []],
      numeroInterior: ["", []],
      numeroExterior: ["", []],
      colonia: ["", []],
      codigoPostal: ["", []],
      ciudad: ["", []],
      estado: ["", []],
      pais: ["", []],
      urlMaps: ["", []]
    })
  }

  private crearGrupo_contacto(): FormGroup {
    return this.fb.group({
      nombre: ["", []],
      telefono: ["", []],
      correo: ["", []],
      puesto: ["", []]
    })
  }
  private crearGrupo_relacionArticulo(): FormGroup {
    return this.fb.group({
      precioUnitario: ["", [this.vs.numberValidator, Validators.min(1)]],
      divisa: ["", []],
      item: ["", [Validators.required]],
      tiempoDeEntregaEnDias: ["", [Validators.min(1), this.vs.numberValidator]],
      prioridad: [
        "",
        [Validators.required, Validators.min(1), Validators.max(3)]
      ]
    })
  }
  private crearGrupo_cuenta(): FormGroup {
    return this.fb.group({
      clabe: ["", [Validators.required]],
      banco: ["", [Validators.required]]
    })
  }

  submit(modelo: Proveedor, valid: boolean, e) {
    e.preventDefault()
    if (valid) {
      let cb = () => {
        this.guardar.emit()
        this.limpiar()
      }
      if (this.proveedor) {
        modelo._id = this.proveedor._id
        this._proveedorService.modificar(modelo).subscribe(cb)
      } else {
        this._proveedorService.guardar(modelo).subscribe(cb)
      }
    }
  }

  limpiar() {
    this.crearFormulario()
    this.proveedor = null
  }

  cancelar() {
    this.limpiar()
  }

  public get nombre_FB(): AbstractControl {
    return this.formulario.get("nombre")
  }
  public get razonSocial_FB(): AbstractControl {
    return this.formulario.get("razonSocial")
  }

  public get domicilios_FB(): FormArray {
    return <FormArray>this.formulario.get("domicilios")
  }

  domicilio_FB_calle(i: number): AbstractControl {
    return this.domicilios_FB.at(i).get("calle")
  }
  domicilio_FB_numeroInterior(i: number): AbstractControl {
    return this.domicilios_FB.at(i).get("numeroInterior")
  }
  domicilio_FB_numeroExterior(i: number): AbstractControl {
    return this.domicilios_FB.at(i).get("numeroExterior")
  }
  domicilio_FB_colonia(i: number): AbstractControl {
    return this.domicilios_FB.at(i).get("colonia")
  }
  domicilio_FB_codigoPostal(i: number): AbstractControl {
    return this.domicilios_FB.at(i).get("codigoPostal")
  }
  domicilio_FB_ciudad(i: number): AbstractControl {
    return this.domicilios_FB.at(i).get("ciudad")
  }
  domicilio_FB_estado(i: number): AbstractControl {
    return this.domicilios_FB.at(i).get("estado")
  }
  domicilio_FB_pais(i: number): AbstractControl {
    return this.domicilios_FB.at(i).get("pais")
  }
  domicilio_FB_urlMaps(i: number): AbstractControl {
    return this.domicilios_FB.at(i).get("urlMaps")
  }

  public get contactos_FB(): FormArray {
    return <FormArray>this.formulario.get("contactos")
  }

  contacto_FB_nombre(i: number): AbstractControl {
    return this.contactos_FB.at(i).get("nombre")
  }
  contacto_FB_telefono(i: number): AbstractControl {
    return this.contactos_FB.at(i).get("telefono")
  }
  contacto_FB_correo(i: number): AbstractControl {
    return this.contactos_FB.at(i).get("correo")
  }
  contacto_FB_puesto(i: number): AbstractControl {
    return this.contactos_FB.at(i).get("puesto")
  }

  public get tiempoDeEntregaEstimadoEnDias_FB(): AbstractControl {
    return this.formulario.get("tiempoDeEntregaEstimadoEnDias")
  }

  public get relacionArticulos_FB(): FormArray {
    return <FormArray>this.formulario.get("relacionArticulos")
  }

  relacionArticulo_FB_precioUnitario(i: number): AbstractControl {
    return this.relacionArticulos_FB.at(i).get("precioUnitario")
  }

  relacionArticulo_FB_divisa(i: number): AbstractControl {
    return this.relacionArticulos_FB.at(i).get("divisa")
  }

  relacionArticulo_FB_item(i: number): AbstractControl {
    return this.relacionArticulos_FB.at(i).get("item")
  }

  relacionArticulo_FB_tiempoDeEntregaEnDias(i: number): AbstractControl {
    return this.relacionArticulos_FB.at(i).get("tiempoDeEntregaEnDias")
  }

  relacionArticulo_FB_prioridad(i: number): AbstractControl {
    return this.relacionArticulos_FB.at(i).get("prioridad")
  }

  public get rfc_FB(): AbstractControl {
    return this.formulario.get("rfc")
  }

  public get metodosDePagoAceptados_FB(): FormArray {
    return <FormArray>this.formulario.get("metodosDePagoAceptados")
  }

  public get condicionesDePago_FB(): FormArray {
    return <FormArray>this.formulario.get("condicionesDePago")
  }
  public get formasDePago_FB(): FormArray {
    return <FormArray>this.formulario.get("formasDePago")
  }

  public get cuentas_FB(): FormArray {
    return <FormArray>this.formulario.get("cuentas")
  }

  cuentas_FB_clabe(i: number): AbstractControl {
    return this.cuentas_FB.at(i).get("clabe")
  }
  cuentas_FB_banco(i: number): AbstractControl {
    return this.cuentas_FB.at(i).get("banco")
  }

  addDomicilio() {
    this.domicilios_FB.push(this.crearGrupo_domicilio())
  }

  eliminarDomicilio(i: number) {
    this.domicilios_FB.removeAt(i)
  }

  addContacto() {
    this.contactos_FB.push(this.crearGrupo_contacto())
  }

  eliminarContacto(i: number) {
    this.contactos_FB.removeAt(i)
  }

  addRelacionArticulo() {
    this.relacionArticulos_FB.push(this.crearGrupo_relacionArticulo())
  }

  eliminarRelacioniArticulo(i: number) {
    this.relacionArticulos_FB.removeAt(i)
  }

  addRelacionCuenta() {
    this.cuentas_FB.push(this.crearGrupo_cuenta())
  }

  eliminarRelacionCuenta(i: number) {
    this.cuentas_FB.removeAt(i)
  }

  ejecutarOperacionesDeBusquedaArticulos(evento) {
    let termino = <string>evento.termino
    let dataList = <DataListComponent>evento.dataList

    this._articuloService
      .search(termino, undefined, undefined, Articulo)
      .subscribe((articulos) => {
        let datos: Dato[] = []
        articulos.forEach((art: Articulo) => {
          datos.push(this.crearDatoParaDataList(art))
        })

        dataList.terminoBusqueda(datos)
      })
  }

  private crearDatoParaDataList(art: Articulo): Dato {
    let d = new Dato()
    d.leyendaPrincipal = art.nombre
    d.leyendaSecundaria = art.existenciaEnKg() + " kg "
    d.descripcionPrincipal = art.descripcion
    d.descripcionSecundaria = "Unidades de almacenamiento en: " + art.unidad
    d.objeto = art
    return d
  }

  articuloSeleccionado(dato: Dato, i: number) {
    let articulo: Articulo = dato ? <Articulo>dato.objeto : null
    this.relacionArticulo_FB_item(i).patchValue(articulo ? articulo._id : null)

    this.relacionArticulo_FB_item(i).markAsTouched()
    this.relacionArticulo_FB_item(i).updateValueAndValidity()
  }

  @ViewChild("inputMetodoDePago")
  inputMetodoDePago: ElementRef

  agregarMetodoDePago(txt: string) {
    this.agregarArrayString(
      txt,
      this.inputMetodoDePago,
      this.metodosDePagoAceptados_FB
    )
  }

  eliminarMetodoDePago(i: number) {
    this.eliminarDelArrayString(
      i,
      this.inputMetodoDePago,
      this.metodosDePagoAceptados_FB
    )
  }

  @ViewChild("inputCondicionesDePago")
  inputCondicionesDePago: ElementRef

  agregarCondicionesDePago(txt: string) {
    this.agregarArrayString(
      txt,
      this.inputCondicionesDePago,
      this.condicionesDePago_FB
    )
  }

  eliminarCondicionesDePago(i: number) {
    this.eliminarDelArrayString(
      i,
      this.inputCondicionesDePago,
      this.condicionesDePago_FB
    )
  }

  @ViewChild("inputFormasDePago")
  inputFormasDePago: ElementRef

  agregarFormasDePago(txt: string) {
    this.agregarArrayString(txt, this.inputFormasDePago, this.formasDePago_FB)
  }

  eliminarFormasDePago(i: number) {
    this.eliminarDelArrayString(i, this.inputFormasDePago, this.formasDePago_FB)
  }

  private agregarArrayString(txt: string, input: ElementRef, array: FormArray) {
    let txtClean = txt.trim()

    if (txtClean && this.validarDatosDeInput(txtClean, array)) {
      array.push(new FormControl(txtClean))
      input.nativeElement.value = ""
    }
    input.nativeElement.focus()
  }

  private eliminarDelArrayString(
    i: number,
    input: ElementRef,
    array: FormArray
  ) {
    array.removeAt(i)
    input.nativeElement.focus()
  }

  private validarDatosDeInput(txt: string, array: FormArray): boolean {
    let a = array.controls.find((x) => x.value === txt)
    let b = true
    if (a) {
      let msj = `Ya agregaste '${txt}' a la lista.`
      let titulo = "Valor repetido"
      this._msjService.invalido(msj, titulo)
      b = false
    }

    return b
  }
}
