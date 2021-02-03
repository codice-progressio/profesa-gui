import { Component, OnInit, Renderer2 } from '@angular/core'
import { ProveedorService } from '../../../../services/proveedor.service'
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
  Proveedor,
  ProveedorDomicilio,
  ProveedorContacto,
  ProveedorCuenta
} from '../../../../models/proveedor.model'

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
    private renderer: Renderer2,
    private notiService: ManejoDeMensajesService,
    public vs: ValidacionesService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private proveedorService: ProveedorService
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

  crearFormulario(proveedor: Partial<Proveedor>) {
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
      )
    })
    this.cargando = false
    if (this.esRutaDetalle()) {
      setTimeout(() => {
        this.activarProtocoloDetalle()
        this.esDetalle = true
      }, 50)
    }
  }

  creFormDomicilio(domicilios: Partial<ProveedorDomicilio>): FormGroup {
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

  creFormContacto(contactos: Partial<ProveedorContacto>): FormGroup {
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

  creFormCuentas(cuentas: Partial<ProveedorCuenta> = {}): FormGroup {
    return new FormGroup({
      _id: new FormControl(cuentas._id),
      clabe: new FormControl(cuentas.clabe, [this.vs.numberValidator]),
      cuenta: new FormControl(cuentas.cuenta, [this.vs.numberValidator]),
      banco: new FormControl(cuentas.banco)
    })
  }

  submit(modelo: Proveedor, invalid: boolean) {
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

  modificar(modelo: Proveedor) {
    this.cargando = true
    this.proveedorService.modificar(modelo).subscribe(
      modelo => this.location.back(),
      () => (this.cargando = false)
    )
  }

  guardar(modelo: Proveedor) {
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
}
