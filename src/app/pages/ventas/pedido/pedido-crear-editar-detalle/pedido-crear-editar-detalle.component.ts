import { Component, OnInit, Renderer2 } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { PedidoService } from '../../../../services/pedido.service'
import { ValidacionesService } from '../../../../services/utilidades/validaciones.service'
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms'
import { ArticuloPedido, Pedido } from '../../../../models/pedido.model'
import { DatePipe, Location } from '@angular/common'
import { Contacto } from '../../../../models/contacto.model'
import { ModalService } from '@codice-progressio/modal'
import { BehaviorSubject } from 'rxjs'
import { ContactoService } from '../../../../services/contacto.service'
import { SkuService } from '../../../../services/sku/sku.service'
import { SKU } from '../../../../models/sku.model'
import { ManejoDeMensajesService } from '../../../../services/utilidades/manejo-de-mensajes.service'
import { UsuarioService } from 'src/app/services/usuario/usuario.service'
import { ListaDePreciosService } from '../../../../services/lista-de-precios.service'
import { ListaDePrecios } from 'src/app/models/listaDePrecios.model'
import { UbicacionService } from 'src/app/services/ubicacion.service'
import { PosicionDeGeolocalizacion } from '@codice-progressio/gps'

@Component({
  selector: 'app-pedido-crear-editar-detalle',
  templateUrl: './pedido-crear-editar-detalle.component.html',
  styleUrls: ['./pedido-crear-editar-detalle.component.css']
})
export class PedidoCrearEditarDetalleComponent implements OnInit {
  lista: ListaDePrecios

  constructor(
    private datePipe: DatePipe,
    private router: Router,
    private listaDePreciosService: ListaDePreciosService,
    private usuarioService: UsuarioService,
    private notiService: ManejoDeMensajesService,
    private skuService: SkuService,
    private contactoService: ContactoService,
    private pedidoService: PedidoService,
    private activatedRoute: ActivatedRoute,
    public vs: ValidacionesService,
    private location: Location,
    private renderer: Renderer2,
    public modalService: ModalService,
    public ubicacionService: UbicacionService
  ) {}

  comprobarIndice() {
    let pedidoI = this.pedidoService.offline.indice.length
    let contactoI = this.contactoService.offline.indice.length
    if (!pedidoI && !contactoI) {
      this.notiService.confirmarAccion(
        'Los indices no se han  cargado, ¿Quieres recargar la aplicación?',
        () => this.router.navigate(['/login']),
        ' No se pueden registrar pedidos',
        () => this.location.back()
      )
    } else this.obtenerId()
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
  geo: PosicionDeGeolocalizacion

  ngOnInit(): void {
    this.ubicacion()
    this.comprobarIndice()
  }

  ubicacion() {
    this.ubicacionService.geo.subscribe(
      p => (this.geo = p),
      err => console.log('error en componente')
    )
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
      pedido => {
        if (pedido.contacto.listaDePrecios)
          this.obtenerListaDePrecios(pedido.contacto, pedido)
        else this.crearFormulario(pedido)
      },
      err => {
        console.log(err)
        this.notiService.toastError('No existe el pedido')
        this.location.back()
      }
    )
  }

  obtenerListaDePrecios(contacto: Contacto, pedido: Pedido = null) {
    this.listaDePreciosService.offline
      .findById(
        contacto.listaDePrecios?._id
          ? contacto.listaDePrecios._id
          : contacto.listaDePrecios
      )
      .subscribe(
        lista => {
          this.lista = lista
          if (pedido) {
            this.crearFormulario(pedido)
          } else {
            this.f('contacto').value.listaDePrecios = {
              ...lista,
              skus: []
            }
          }
        },
        err => console.error(err)
      )
  }

  crearFormulario(pedido: Partial<Pedido>) {
    this.pedido = pedido
    this.formulario = new FormGroup({
      contacto: new FormControl(pedido.contacto, [Validators.required]),
      observaciones: new FormControl(pedido.observaciones),
      total: new FormControl(pedido.total),
      iva: new FormControl(pedido.iva),
      importe: new FormControl(pedido.importe),
      articulos: new FormArray(
        pedido.articulos?.map(x => {
          // Cargamos los articulos en la lista para su descripcion
          this.articulosSeleccionados.push(x.sku)
          return this.crearArticulo(x, false)
        }) ?? [],
        [this.vs.minSelectedCheckboxes(1)]
      ),

      ubicacion: new FormControl(pedido.ubicacion)
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

      //definimos el precio directo para calcularlo junto
      // con la lista en caso de que haya.

      precio: this.obtenerPrecioDeArticulo(articulo, this.lista),
      sku: new FormControl(articulo.sku, [Validators.required]),
      observaciones: new FormControl(articulo.observaciones),
      editando: new FormControl(editar, []),
      importe: new FormControl(articulo.importe)
    })
  }

  obtenerPrecioDeArticulo(
    articulo: Partial<ArticuloPedido>,
    lista: ListaDePrecios
  ): AbstractControl {
    if (lista && articulo.sku?._id) {
      let id = articulo.sku._id
      let dato = lista.skus.find(x => x.sku === id)
      if (dato) return new FormControl(dato.precio)
    }
    return new FormControl(articulo.precio)
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
      _id: contacto._id,
      listaDePrecios: contacto.listaDePrecios,
      rfc: contacto.rfc,
      domicilios: contacto.domicilios,
      codigo: contacto.codigo,
      contactos: contacto.contactos
    })

    this.obtenerListaDePrecios(contacto)
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

    let articulo = this.fa('articulos').at(this.indexSeleccionado)
    articulo.get('sku').setValue(item)
    articulo
      .get('precio')
      .setValue(this.obtenerPrecioDeArticulo(articulo.value, this.lista).value)

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
    else {
      if (!this.geo) {
        this.notiService.toast.error('La ubicación no esta disponible')
        return
      }
      modelo['ubicacion'] = {
        latitud: this.geo.coords.latitude,
        longitud: this.geo.coords.longitude
      }

      id = await this.obtenerUltimoId()
    }

    console.log({modelo})

    modelo.folio = this.crearFolio(id)
    modelo.createdAt = new Date().toISOString()
    modelo._id = id

    this.pedidoService.offline.guardar(modelo).subscribe(
      () => this.location.back(),
      () => (this.cargando = false)
    )
  }

  crearFolio(consecutivo: number): string {
    let nombre = this.usuarioService.usuarioOffline.nombre
      .replace(' ', '-')
      .toUpperCase()
    let fecha = this.datePipe.transform(new Date(), 'yyyy_MM_dd')
    return `${nombre}-${fecha}-${consecutivo}`
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
    return ultimo
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
    let articulo = this.fa('articulos').at(i)
    let cantidadF = articulo.get('cantidad')
    let cantidad = (cantidadF.value ?? 0) + valor
    let precio = articulo.get('precio').value ?? 0

    articulo.get('importe').setValue(this.redondear(precio * cantidad))
    cantidadF.setValue(cantidad)
    cantidadF.markAsTouched()
    cantidadF.updateValueAndValidity()
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

  reiniciarPedido() {
    this.notiService.confirmarAccion(
      'Esto borrara todos los datos que ya se han registrado.',
      () => {
        this.articulosSeleccionados = []
        this.lista = undefined
        this.crearFormulario({})
      },
      '',
      () => {}
    )
  }

  redondear(valor: number) {
    return Math.round((valor + Number.EPSILON) * 100) / 100
  }

  importe() {
    let total = 0
    for (let i = 0; i < this.fa('articulos').controls.length; i++) {
      let articulo = this.fa('articulos').controls[i]
      let cantidad = articulo.get('cantidad').value ?? 0
      let precio = articulo.get('precio').value ?? 0
      total += this.redondear(cantidad * precio)
    }

    this.f('importe').setValue(total)

    return total
  }

  iva() {
    let iva = 0
    if (this.lista) {
      iva = this.importe() * (this.lista?.iva / 100)
    }

    iva = this.redondear(iva)
    this.f('iva').setValue(iva)
    return iva
  }

  total() {
    let total = this.importe() + this.iva()
    total = this.redondear(total)
    this.f('total').setValue(total)
    return total
  }
}
