import { Component, OnInit, Renderer2 } from '@angular/core'
import { ContactoService } from '../../../../services/contacto.service'
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms'
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import { ValidacionesService } from '../../../../services/utilidades/validaciones.service'
import { ManejoDeMensajesService } from '../../../../services/utilidades/manejo-de-mensajes.service'
import {
  Contacto,
  ContactoDomicilio,
  ContactoContacto,
  ContactoCuenta
} from '../../../../models/contacto.model'
import { RutaDeEntrega } from 'src/app/models/rutaDeEntrega.model'
import { RutaDeEntregaService } from '../../../../services/ruta-de-entrega.service'
import { ModalService } from '@codice-progressio/modal'

@Component({
  selector: 'app-proveedor-crear-editar',
  templateUrl: './proveedor-crear-editar.component.html',
  styleUrls: ['./proveedor-crear-editar.component.css']
})
export class ProveedorCrearEditarComponent implements OnInit {
  private _cargando = false
  public get cargando() {
    return this._cargando
  }
  public set cargando(value) {
    this._cargando = value
    if (value) this.formulario?.disable()
    else this.formulario?.enable()
  }

  esDetalle = false

  formulario: FormGroup
  id: string
  constructor(
    private rutasService: RutaDeEntregaService,
    private modalService: ModalService,
    private renderer: Renderer2,
    private notiService: ManejoDeMensajesService,
    public vs: ValidacionesService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private proveedorService: ContactoService
  ) {}

  ngOnInit(): void {
    this.obtenerId()
  }
  activarProtocoloDetalle() {
    // Agregamos una clase a todos los input.
    document.querySelectorAll('input').forEach(x => {
      this.renderer.addClass(x, 'detalle')
    })
  }

  esRutaDetalle() {
    let url = this.activatedRoute.snapshot['_routerState'].url
    return url.includes('detalle')
  }

  editando = false
  esRutaEdicion() {
    let url = this.activatedRoute.snapshot['_routerState'].url
    return url.includes('modificar')
  }

  obtenerId() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id')
      this.cargando = true
      if (!this.id) this.crearFormulario({})
      else this.obtenerProveedor(this.id)
    })
  }

  obtenerProveedor(id: string) {
    this.proveedorService.buscarId(id).subscribe(
      proveedor => {
        this.crearFormulario(proveedor)
      },
      () => (this.cargando = false)
    )
  }

  crearFormulario(proveedor: Partial<Contacto>) {
    this.contactoSeleccionado = proveedor as Contacto
    this.formulario = new FormGroup({
      _id: new FormControl(proveedor._id, []),
      nombre: new FormControl(proveedor.nombre, [
        Validators.required,
        Validators.minLength(4)
      ]),
      razonSocial: new FormControl(proveedor.razonSocial, []),
      domicilios: new FormArray(
        proveedor.domicilios?.map(x => this.creFormDomicilio(x)) ?? [
          this.creFormDomicilio({})
        ]
      ),
      contactos: new FormArray(
        proveedor.contactos?.map(x => this.creFormContacto(x)) ?? [
          this.creFormContacto({})
        ]
      ),
      rfc: new FormControl(proveedor.rfc, []),
      cuentas: new FormArray(
        proveedor.cuentas?.map(x => this.creFormCuentas(x)) ?? [
          this.creFormCuentas({})
        ]
      ),

      esProveedor: new FormControl(proveedor.esProveedor),
      esCliente: new FormControl(proveedor.esCliente)
    })
    this.cargando = false
    if (this.esRutaDetalle()) {
      setTimeout(() => {
        this.activarProtocoloDetalle()
        this.esDetalle = true
      }, 50)
    } else if (this.esRutaEdicion()) {
      this.editando = true
    }
  }

  creFormDomicilio(domicilios: Partial<ContactoDomicilio>): FormGroup {
    return new FormGroup({
      _id: new FormControl(domicilios._id),
      calle: new FormControl(domicilios.calle),
      numeroInterior: new FormControl(domicilios.numeroInterior),
      numeroExterior: new FormControl(domicilios.numeroExterior),
      colonia: new FormControl(domicilios.colonia),
      codigoPostal: new FormControl(domicilios.codigoPostal),
      estado: new FormControl(domicilios.estado ?? 'Jalisco'),
      pais: new FormControl(domicilios.pais ?? 'México'),
      ciudad: new FormControl(domicilios.ciudad),
      urlMaps: new FormControl(domicilios.urlMaps)
    })
  }

  creFormContacto(contactos: Partial<ContactoContacto>): FormGroup {
    return new FormGroup({
      _id: new FormControl(contactos._id),
      nombre: new FormControl(contactos.nombre),
      telefono: new FormArray(
        contactos.telefono?.map(x => new FormControl(x)) ?? [new FormControl()]
      ),
      correo: new FormArray(
        contactos.correo?.map(x => new FormControl(x, [Validators.email])) ?? [
          new FormControl('', [Validators.email])
        ]
      ),
      puesto: new FormArray(
        contactos.puesto?.map(x => new FormControl(x)) ?? [new FormControl()]
      )
    })
  }

  creFormCuentas(cuentas: Partial<ContactoCuenta> = {}): FormGroup {
    return new FormGroup({
      _id: new FormControl(cuentas._id),
      clabe: new FormControl(cuentas.clabe, [this.vs.numberValidator]),
      cuenta: new FormControl(cuentas.cuenta, [this.vs.numberValidator]),
      banco: new FormControl(cuentas.banco)
    })
  }

  submit(modelo: Contacto, invalid: boolean) {
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()

    if (invalid) {
      this.notiService.toast.error(
        'El formulario contiene errores. Revisalo para poder continuar'
      )
      return
    }

    if (modelo._id) this.modificar(modelo)
    else this.guardar(modelo)
  }

  modificar(modelo: Contacto) {
    this.cargando = true
    this.proveedorService.modificar(modelo).subscribe(
      modelo => this.location.back(),
      () => (this.cargando = false)
    )
  }

  guardar(modelo: Contacto) {
    this.cargando = true
    this.proveedorService.crear(modelo).subscribe(
      pro => {
        this.cargando = false
        this.location.back()
      },
      () => (this.cargando = false)
    )
  }

  eliminar(i: number, arreglo: FormArray) {
    arreglo.removeAt(i)
  }

  f(campo: string) {
    return this.formulario.get(campo)
  }

  fa(campoArreglo: string | AbstractControl) {
    return (typeof campoArreglo === 'string'
      ? this.f(campoArreglo)
      : campoArreglo) as FormArray
  }

  dfa(dummy: AbstractControl, campo: string): FormArray {
    return dummy.get(campo) as FormArray
  }

  addCampoSimple(campo: AbstractControl) {
    this.fa(campo).push(new FormControl())
  }

  idModalRutas = Math.random() * 100000 + 'rutas'
  cargandoRutas = false
  rutas: RutaDeEntrega[] = []
  contactoSeleccionado: Contacto

  abrirModalRutas(contacto: Contacto) {
    this.cargarRutas()
    this.permitirModificarRuta = true
    this.modalService.open(this.idModalRutas)
  }

  cargarRutas() {
    this.cargandoRutas = true
    this.rutasService.leerTodo().subscribe(
      rutas => {
        this.cargandoRutas = false
        this.rutas = rutas
      },
      () => (this.cargandoRutas = false)
    )
  }

  permitirModificarRuta = false
  agregarEliminarRuta(ruta: RutaDeEntrega, contacto: Contacto) {
    if (!this.permitirModificarRuta) return
    if (!contacto.rutas.find(x => x._id === ruta._id)) contacto.rutas.push(ruta)
    else {
      contacto.rutas = contacto.rutas.filter(x => x._id !== ruta._id)
    }
  }

  guardandoRutas = false

  guardarRutas(contacto: Contacto) {
    if (this.guardandoRutas) return
    this.guardandoRutas = true
    this.proveedorService.rutas.agregarModificar(contacto).subscribe(
      () => {
        this.guardandoRutas = false
        this.permitirModificarRuta = false
        this.modalService.close(this.idModalRutas)
      },
      () => (this.guardandoRutas = false)
    )
  }
}
