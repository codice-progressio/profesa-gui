import { Component, OnInit, Renderer2 } from '@angular/core'
import { ContactoService } from '../../../../services/contacto.service'
import {
  AbstractControl,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
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
import { ListaDePrecios } from 'src/app/models/listaDePrecios.model'
import { ListaDePreciosService } from 'src/app/services/lista-de-precios.service'
import { UsuarioService } from 'src/app/services/usuario/usuario.service'
import { Usuario } from '../../../../models/usuario.model'
import { BehaviorSubject } from 'rxjs'
@Component({
  selector: 'app-contacto-crear-editar',
  templateUrl: './contacto-crear-editar.component.html',
  styleUrls: ['./contacto-crear-editar.component.css']
})
export class ContactoCrearEditarComponent implements OnInit {
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

  formulario: UntypedFormGroup
  id: string
  listasDePrecio: ListaDePrecios[] = []
  contacto: Contacto
  constructor(
    private rutasService: RutaDeEntregaService,
    private modalService: ModalService,
    private renderer: Renderer2,
    private notiService: ManejoDeMensajesService,
    public vs: ValidacionesService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private contactoService: ContactoService,
    private listaDePreciosService: ListaDePreciosService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.obtenerId()
  }

  listaSeleccionada: ListaDePrecios
  cargandoListas = false

  obtenerListas() {
    this.cargandoListas = true
    this.listaDePreciosService.todoLigero().subscribe(
      listas => {
        this.listasDePrecio = listas

        this.cargandoListas = false
      },
      () => (this.cargandoListas = false)
    )
  }

  cambiarLista(datos) {
    console.log(datos)
  }

  definirLista(valor: any) {
    console.log(valor.value)
  }

  activarProtocoloDetalle() {
    // Agregamos una clase a todos los input.
    document.querySelectorAll('input, select').forEach(x => {
      this.renderer.addClass(x, 'detalle')
    })
    ;['esProveedor', 'esCliente'].forEach(x => this.f(x).disable())
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
    this.contactoService.buscarId(id).subscribe(
      contacto => {
        this.crearFormulario(contacto)
        this.contacto = contacto
      },
      () => (this.cargando = false)
    )
  }

  crearFormulario(contacto: Partial<Contacto>) {
    this.contactoSeleccionado = contacto as Contacto
    this.formulario = new UntypedFormGroup({
      _id: new UntypedFormControl(contacto._id, []),
      codigo: new UntypedFormControl(contacto.codigo),
      nombre: new UntypedFormControl(contacto.nombre, [Validators.minLength(4)]),
      razonSocial: new UntypedFormControl(contacto.razonSocial, []),
      domicilios: new UntypedFormArray(
        contacto.domicilios?.map(x => this.creFormDomicilio(x)) ?? [
          this.creFormDomicilio({})
        ]
      ),
      contactos: new UntypedFormArray(
        contacto.contactos?.map(x => this.creFormContacto(x)) ?? [
          this.creFormContacto({})
        ]
      ),
      rfc: new UntypedFormControl(contacto.rfc, []),
      cuentas: new UntypedFormArray(
        contacto.cuentas?.map(x => this.creFormCuentas(x)) ?? [
          this.creFormCuentas({})
        ]
      ),

      esProveedor: new UntypedFormControl(contacto.esProveedor),
      esCliente: new UntypedFormControl(contacto.esCliente),
      listaDePrecios: new UntypedFormControl(contacto.listaDePrecios),
      usuariosAsignados: new UntypedFormArray(
        contacto.usuariosAsignados?.map(x => new UntypedFormControl(x._id))
      )
    })

    this.obtenerListas()

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

  creFormDomicilio(domicilios: Partial<ContactoDomicilio>): UntypedFormGroup {
    return new UntypedFormGroup({
      _id: new UntypedFormControl(domicilios._id),
      calle: new UntypedFormControl(domicilios.calle),
      numeroInterior: new UntypedFormControl(domicilios.numeroInterior),
      numeroExterior: new UntypedFormControl(domicilios.numeroExterior),
      colonia: new UntypedFormControl(domicilios.colonia),
      codigoPostal: new UntypedFormControl(domicilios.codigoPostal),
      estado: new UntypedFormControl(domicilios.estado ?? 'Jalisco'),
      pais: new UntypedFormControl(domicilios.pais ?? 'México'),
      ciudad: new UntypedFormControl(domicilios.ciudad),
      urlMaps: new UntypedFormControl(domicilios.urlMaps)
    })
  }

  creFormContacto(contactos: Partial<ContactoContacto>): UntypedFormGroup {
    return new UntypedFormGroup({
      _id: new UntypedFormControl(contactos._id),
      nombre: new UntypedFormControl(contactos.nombre),
      telefono: new UntypedFormArray(
        contactos.telefono?.map(x => new UntypedFormControl(x)) ?? [new UntypedFormControl()]
      ),
      correo: new UntypedFormArray(
        contactos.correo?.map(x => new UntypedFormControl(x, [Validators.email])) ?? [
          new UntypedFormControl('', [Validators.email])
        ]
      ),
      puesto: new UntypedFormArray(
        contactos.puesto?.map(x => new UntypedFormControl(x)) ?? [new UntypedFormControl()]
      )
    })
  }

  creFormCuentas(cuentas: Partial<ContactoCuenta> = {}): UntypedFormGroup {
    return new UntypedFormGroup({
      _id: new UntypedFormControl(cuentas._id),
      clabe: new UntypedFormControl(cuentas.clabe, [this.vs.numberValidator]),
      cuenta: new UntypedFormControl(cuentas.cuenta, [this.vs.numberValidator]),
      banco: new UntypedFormControl(cuentas.banco)
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
    this.contactoService.modificar(modelo).subscribe(
      modelo => this.location.back(),
      () => (this.cargando = false)
    )
  }

  guardar(modelo: Contacto) {
    this.cargando = true
    this.contactoService.crear(modelo).subscribe(
      pro => {
        this.cargando = false
        this.location.back()
      },
      () => (this.cargando = false)
    )
  }

  eliminar(i: number, arreglo: UntypedFormArray) {
    arreglo.removeAt(i)
  }

  f(campo: string) {
    return this.formulario.get(campo)
  }

  fa(campoArreglo: string | AbstractControl) {
    return (
      typeof campoArreglo === 'string' ? this.f(campoArreglo) : campoArreglo
    ) as UntypedFormArray
  }

  dfa(dummy: AbstractControl, campo: string): UntypedFormArray {
    return dummy.get(campo) as UntypedFormArray
  }

  addCampoSimple(campo: AbstractControl) {
    this.fa(campo).push(new UntypedFormControl())
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
    this.contactoService.rutas.agregarModificar(contacto).subscribe(
      () => {
        this.guardandoRutas = false
        this.permitirModificarRuta = false
        this.modalService.close(this.idModalRutas)
      },
      () => (this.guardandoRutas = false)
    )
  }

  compararLista(l1: ListaDePrecios, l2: ListaDePrecios): boolean {
    console.log({ l1, l2 })

    return l1 && l2 ? l1._id === l2._id : l1 === l2
  }

  usuarios: Usuario[] = []

  buscadorUsuario: BehaviorSubject<boolean>
  termino = ''
  buscarUsuarios(ter: string) {
    this.termino = ter.trim()
    if (!this.termino) {
      this.buscadorUsuario.next(false)
      this.usuarios = []
      return
    }

    this.buscadorUsuario.next(true)
    this.usuarioService.leer(this.termino).subscribe(
      u => {
        this.usuarios = u
        this.buscadorUsuario.next(false)
      },
      () => this.buscadorUsuario.next(false)
    )
  }

  usuarioSeleccionar(usuario: Usuario) {
    let usuarioYaEstaAgregado = this.contacto.usuariosAsignados
      .map(x => x._id)
      .includes(usuario._id)
    if (!usuarioYaEstaAgregado) {
      this.contacto.usuariosAsignados.push(usuario)
      this.fa('usuariosAsignados').push(new UntypedFormControl(usuario._id))
    }
  }

  usuarioEliminar(i: number) {
    this.contacto.usuariosAsignados.splice(i, 1)
    this.fa('usuariosAsignados').removeAt(i)
  }
}
