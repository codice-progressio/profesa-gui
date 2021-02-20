import { Component, OnInit, Renderer2 } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { PedidoService } from '../../../services/pedido.service'
import { ValidacionesService } from '../../../services/utilidades/validaciones.service'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { ArticuloPedido, Pedido } from '../../../models/pedido.model'
import { Location } from '@angular/common'
import { Proveedor } from '../../../models/proveedor.model'
import { ModalService } from '@codice-progressio/modal'
import { BehaviorSubject } from 'rxjs'
import { ProveedorService } from '../../../services/proveedor.service'
import { SkuService } from '../../../services/sku/sku.service'
import { SKU } from '../../../models/sku.model'
import { ManejoDeMensajesService } from '../../../services/utilidades/manejo-de-mensajes.service'

@Component({
  selector: 'app-pedido-crear-editar-detalle',
  templateUrl: './pedido-crear-editar-detalle.component.html',
  styleUrls: ['./pedido-crear-editar-detalle.component.css']
})
export class PedidoCrearEditarDetalleComponent implements OnInit {
  constructor(
    private notiService: ManejoDeMensajesService,
    private skuService: SkuService,
    private contactoService: ProveedorService,
    private pedidoService: PedidoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public vs: ValidacionesService,
    private location: Location,
    private renderer: Renderer2,
    public modalService: ModalService
  ) {}

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
      else this.obtenerPedido(this.id)
    })
  }

  obtenerPedido(id: string) {
    this.pedidoService.buscarId(id).subscribe(
      pedido => {
        this.crearFormulario(pedido)
      },
      () => this.location.back()
    )
  }

  crearFormulario(pedido: Partial<Pedido>) {
    this.pedido = pedido
    this.formulario = new FormGroup({
      contacto: new FormControl(pedido.contacto?._id, [Validators.required]),
      observaciones: new FormControl(pedido.observaciones),
      articulos: new FormArray(
        pedido.articulos?.map(x => {
          // Cargamos los articulos en la lista para su descripcion
          this.articulosSeleccionados.push(x.sku)
          return this.crearArticulo(x)
        }) ?? [],
        [this.vs.minSelectedCheckboxes(1)]
      )
    })

    this.cargando = false
    if (!pedido.contacto) {
      setTimeout(() => {
        this.modalService.open(this.idModalContacto)
      }, 1000)
    }

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

  crearArticulo(articulo: Partial<ArticuloPedido>) {
    return new FormGroup({
      cantidad: new FormControl(articulo.cantidad, [
        Validators.required,
        Validators.min(0.001)
      ]),
      sku: new FormControl(articulo.sku, [Validators.required]),
      observaciones: new FormControl(articulo.observaciones)
    })
  }

  terminoContacto: string
  estaCargandoBuscadorContacto: BehaviorSubject<boolean>
  contactos: Proveedor[] = []

  buscarContacto(termino) {
    if (!termino.trim()) {
      this.contactos = []
      this.estaCargandoBuscadorContacto.next(false)
      return
    }
    this.estaCargandoBuscadorContacto.next(true)
    this.contactoService.buscarTermino(termino).subscribe(
      contactos => {
        this.contactos = contactos
        this.estaCargandoBuscadorContacto.next(false)
      },
      () => {
        this.estaCargandoBuscadorContacto.next(false)
      }
    )
  }

  seleccionarContacto(contacto: Proveedor) {
    this.pedido.contacto = contacto
    this.formulario.get('contacto').setValue(contacto._id)
    this.modalService.close(this.idModalContacto)
    this.estaCargandoBuscadorContacto.next(false)
    this.contactos = []
  }

  terminoSku: string
  estaCargandoBuscadorSku: BehaviorSubject<boolean>
  grupo: FormGroup

  skus: SKU[] = []
  buscarSku(termino) {
    if (!termino.trim()) {
      this.skus = []
      this.estaCargandoBuscadorSku.next(false)
      return
    }
    this.estaCargandoBuscadorSku.next(true)
    this.skuService.buscarTermino(termino).subscribe(
      skus => {
        this.estaCargandoBuscadorSku.next(false)
        this.skus = skus
      },
      () => {
        this.estaCargandoBuscadorSku.next(false)
      }
    )
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
    this.fa('articulos')
      .at(this.indexSeleccionado)
      .get('sku')
      .setValue(item._id)
    this.articulosSeleccionados.push(item)
    this.modalService.close(this.idModalSku)
  }

  eliminar(i: number) {
    this.fa('articulos').removeAt(i)
    this.articulosSeleccionados.splice(i, 1)
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

  submit(modelo: Pedido, invalid: boolean) {
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()
    if (invalid) {
      this.notiService.toast.error('Hay errores en el formulario')
      return
    }

    this.cargando = true

    this.pedidoService.crear(modelo).subscribe(
      () => {
        this.location.back()
      },
      () => (this.cargando = false)
    )
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
}
