import { Component, OnInit, Renderer2 } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PedidoService } from '../../../../services/pedido.service'
import { ValidacionesService } from '../../../../services/utilidades/validaciones.service'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { ArticuloPedido, Pedido } from '../../../../models/pedido.model'
import { Location } from '@angular/common'
import { Contacto } from '../../../../models/contacto.model'
import { ModalService } from '@codice-progressio/modal'
import { BehaviorSubject } from 'rxjs'
import { ContactoService } from '../../../../services/contacto.service'
import { SkuService } from '../../../../services/sku/sku.service'
import { SKU } from '../../../../models/sku.model'
import { ManejoDeMensajesService } from '../../../../services/utilidades/manejo-de-mensajes.service'
import { OfflineService } from '../../../../services/offline.service'
import { UsuarioService } from 'src/app/services/usuario/usuario.service'

@Component({
  selector: 'app-pedido-crear-editar-detalle',
  templateUrl: './pedido-crear-editar-detalle.component.html',
  styleUrls: ['./pedido-crear-editar-detalle.component.css']
})
export class PedidoCrearEditarDetalleComponent implements OnInit {
  constructor(
    private usuarioService: UsuarioService,
    private notiService: ManejoDeMensajesService,
    private skuService: SkuService,
    private contactoService: ContactoService,
    private pedidoService: PedidoService,
    private activatedRoute: ActivatedRoute,
    public vs: ValidacionesService,
    private location: Location,
    private renderer: Renderer2,
    public modalService: ModalService
  ) {}

  comprobarIndice() {
    let pedidoI = this.pedidoService.offline.indice.length
    let contactoI = this.contactoService.offline.indice.length
    if (!pedidoI && !contactoI) this.location.back()
    else this.obtenerId()
  }

  idModalContacto = 'modalPedido'
  idModalSku = 'modakSku'
  pedido: Partial<Pedido> = {}

  private _cargando = false
  public get cargando() {
    return this._cargando
  }
  public set cargando(value) {
    this._cargando = value
    if (value) this.formulario?.disable()
    else this.formulario?.enable()
  }
  formulario: FormGroup
  id: string
  esDetalle: boolean

  ngOnInit(): void {
    this.comprobarIndice()
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
      else this.obtenerPedido(+this.id)
    })
  }

  obtenerPedido(id: number) {
    this.pedidoService.offline.findById(id).subscribe(
      pedido => this.crearFormulario(pedido),
      err => {
        console.log(err)
        this.notiService.toastError('No existe el pedido')
        this.location.back()
      }
    )
  }

  crearFormulario(pedido: Partial<Pedido>) {
    this.pedido = pedido
    this.formulario = new FormGroup({
      contacto: new FormControl(pedido.contacto, [Validators.required]),
      observaciones: new FormControl(pedido.observaciones),
      articulos: new FormArray(
        pedido.articulos?.map(x => {
          // Cargamos los articulos en la lista para su descripcion
          this.articulosSeleccionados.push(x.sku)
          return this.crearArticulo(x, false)
        }) ?? [],
        [this.vs.minSelectedCheckboxes(1)]
      )
    })

    this.cargando = false

    let intervalo = setInterval(() => {
      if (this.contactoService.offline.indice.length) {
        clearInterval(intervalo)
        if (!pedido.contacto) {
          setTimeout(() => {
            this.modalService.open(this.idModalContacto)
          }, 1000)
        }
      }
    }, 100)

    if (this.esRutaDetalle()) {
      setTimeout(() => {
        this.activarProtocoloDetalle()
        this.esDetalle = true
      }, 50)
    }
  }

  f(campo: string) {
    return this.formulario.get(campo)
  }

  fa(campo: string) {
    return this.f(campo) as FormArray
  }

  crearArticulo(articulo: Partial<ArticuloPedido>, editar = true) {
    return new FormGroup({
      cantidad: new FormControl(articulo.cantidad, [
        Validators.required,
        Validators.min(0.01)
      ]),
      sku: new FormControl(articulo.sku, [Validators.required]),
      observaciones: new FormControl(articulo.observaciones),
      editando: new FormControl(editar, [])
    })
  }

  terminoContacto: string
  estaCargandoBuscadorContacto: BehaviorSubject<boolean>
  contactos: Contacto[] = []

  buscarContacto(ter: string) {
    let termino = ter.trim()
    if (!termino) {
      this.contactos = []
      this.estaCargandoBuscadorContacto.next(false)
      return
    }
    this.estaCargandoBuscadorContacto.next(true)
    this.contactoService.offline
      .find(termino)
      .then(datos => {
        this.estaCargandoBuscadorContacto.next(false)
        this.contactos = datos
      })
      .catch(_ => this.estaCargandoBuscadorContacto.next(false))
  }

  seleccionarContacto(contacto: Contacto) {
    this.pedido.contacto = contacto
    this.formulario.get('contacto').setValue({
      nombre: contacto.nombre,
      razonSocial: contacto.razonSocial,
      _id: contacto._id
    })
    this.modalService.close(this.idModalContacto)
    this.estaCargandoBuscadorContacto.next(false)
    this.contactos = []
  }

  terminoSku: string
  estaCargandoBuscadorSku: BehaviorSubject<boolean>
  grupo: FormGroup

  skus: SKU[] = []
  buscarSku(ter) {
    let termino = ter.trim()
    if (!termino) {
      this.skus = []
      this.estaCargandoBuscadorSku.next(false)
      return
    }
    this.estaCargandoBuscadorSku.next(true)

    this.skuService.offline
      .find(termino)
      .then(skus => {
        this.estaCargandoBuscadorSku.next(false)
        this.skus = skus
      })
      .catch(_ => this.estaCargandoBuscadorSku.next(false))
  }

  articulosSeleccionados: SKU[] = []
  indexSeleccionado: number
  seleccionarSku(item: SKU) {
    this.estaCargandoBuscadorSku.next(false)
    if (this.articulosSeleccionados.find(x => x._id === item._id)) {
      this.notiService.invalido(
        `Este pedido ya contiene ${item.nombreCompleto}`,
        'Item repetido'
      )
      return
    }
    this.skus = []
    this.fa('articulos').at(this.indexSeleccionado).get('sku').setValue(item)
    this.articulosSeleccionados.push(item)
    this.modalService.close(this.idModalSku)
  }

  eliminar(i: number) {
    let msj = `¿Quieres eliminar "${this.articulosSeleccionados[i].nombreCompleto} ?`
    this.notiService.confirmarAccion(msj, () => {
      this.fa('articulos').removeAt(i)
      this.articulosSeleccionados.splice(i, 1)
    })
  }

  agregarArticulo() {
    this.fa('articulos').push(this.crearArticulo({}))
    this.indexSeleccionado = this.fa('articulos').controls.length - 1
    this.modalService.open(this.idModalSku)
  }

  skuModalCerrado() {
    let sku = this.fa('articulos').at(this.indexSeleccionado).get('sku').value
    if (!sku) {
      // Eliminamos el articulo si no seleeccion ningún sku
      this.fa('articulos').removeAt(this.indexSeleccionado)
    }
  }

  async submit(modelo: Pedido, invalid: boolean) {
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()
    if (invalid) {
      this.notiService.toast.error('Hay errores en el formulario')
      return
    }

    this.cargando = true
    //Total
    let id: number

    if (this.id) id = +this.id
    else id = await this.obtenerUltimoId()

    modelo.total = this.total()
    modelo.folio = this.crearFolio()
    modelo.createdAt = new Date()
    modelo._id = id

    this.pedidoService.offline.guardar(modelo).subscribe(
      () => this.location.back(),
      () => (this.cargando = false)
    )
  }

  crearFolio(): String {
    let nombre = this.usuarioService.usuario.nombre.replace(' ', '-')
    let fecha = new Date().toISOString()
    return `${nombre}-${fecha}`
  }

  async obtenerUltimoId() {
    let ultimoId = await this.pedidoService.offline_indice
      .findById(0)
      .toPromise()

    let ultimo = 0

    if (!ultimoId) ultimo++
    else ultimo = ultimoId.ultimo + 1

    await this.pedidoService.offline_indice
      .guardar({ _id: 0, ultimo })
      .toPromise()
    console.log(ultimo)
    return ultimo
  }

  total() {
    let total = 0
    for (let i = 0; i < this.fa('articulos').controls.length; i++) {
      const cantidad =
        this.fa('articulos').controls[i].get('cantidad').value ?? 0
      const precio = this.articulosSeleccionados[i]?.costoVenta ?? 0
      total += Math.round((cantidad * precio + Number.EPSILON) * 100) / 100
    }

    return total
  }

  editar(i: number) {
    //Quitamos los que esten marcados como editandose.

    this.fa('articulos').controls.forEach(x =>
      x.get('editando').setValue(false)
    )

    //Quitamos los filtros
    this.noMostrarArticulos = []

    // Encendemos el otro.
    this.fa('articulos').at(i).get('editando').setValue(true)
  }

  hayUnArticuloEditandose() {
    for (const iterator of this.fa('articulos').controls) {
      if (iterator.get('editando').value) return true
    }

    return false
  }

  dejarDeEditar(i: number) {
    // La cantidad no puede estar en 0

    let control = this.fa('articulos').at(i)
    let controlCantidad = control.get('cantidad')
    controlCantidad.markAsTouched()
    controlCantidad.updateValueAndValidity()
    if (controlCantidad.invalid) {
      this.notiService.toast.warning('La cantidad no es valida')
      return
    }

    control.get('editando').setValue(false)
  }

  agregar(i: number, valor: number) {
    let control = this.fa('articulos').at(i).get('cantidad')
    control.setValue(+control.value + valor)
    control.markAsTouched()
    control.updateValueAndValidity()
  }

  noMostrarArticulos: string[] = []
  mostrar(i: number) {
    if (this.noMostrarArticulos.length === 0) return true
    let id = this.articulosSeleccionados[i]._id
    return !this.noMostrarArticulos.includes(id)
  }

  estaCargandoBuscadorFolio: BehaviorSubject<boolean>
  filtrarFoliosPorArticulo(ter: string) {
    let termino = ter.trim()
    if (!termino) {
      this.estaCargandoBuscadorFolio.next(false)
      this.noMostrarArticulos = []
      return
    }
    termino = termino.toLowerCase()
    this.estaCargandoBuscadorFolio.next(true)
    this.noMostrarArticulos = []
    this.noMostrarArticulos = this.articulosSeleccionados
      .map(x => {
        return {
          _id: x._id,
          campo: x.nombreCompleto.toLowerCase()
        }
      })
      .filter(x => {
        return !x.campo.includes(termino)
      })
      .map(x => x._id)

    this.estaCargandoBuscadorFolio.next(false)
  }
}
