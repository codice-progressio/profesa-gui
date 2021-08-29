import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core'
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ModalService } from '@codice-progressio/modal'
import { BehaviorSubject } from 'rxjs'
import {
  ListaDePrecios,
  SKUListaDePrecios
} from 'src/app/models/listaDePrecios.model'
import { SKU } from 'src/app/models/sku.model'
import { ListaDePreciosService } from 'src/app/services/lista-de-precios.service'
import { SkuService } from 'src/app/services/sku/sku.service'
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service'

@Component({
  selector: 'app-lista-de-precios-crear-modificar-detalle',
  templateUrl: './lista-de-precios-crear-modificar-detalle.component.html',
  styleUrls: ['./lista-de-precios-crear-modificar-detalle.component.css']
})
export class ListaDePreciosCrearModificarDetalleComponent implements OnInit {
  esCrear: boolean = false
  esDetalle: boolean = false
  esModificar: boolean = false

  lista: ListaDePrecios
  formulario: FormGroup

  etiquetasFiltrandose: string[] = []
  termino: string = ''

  modal = 'modal_lista_precios'

  paginacion = new Paginacion()

  buscador = new FormControl()
  estaCargandoBuscador: BehaviorSubject<boolean>

  corte = { inicio: 0, fin: 0 }

  private _cargando = false
  public get cargando() {
    return this._cargando
  }
  public set cargando(value) {
    this._cargando = value

    if (this.esDetalle) return
    if (value) this.formulario?.disable()
    else this.formulario?.enable()
  }

  constructor(
    private renderer: Renderer2,
    private listaDePreciosService: ListaDePreciosService,
    private skuService: SkuService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public vs: ValidacionesService,
    public modalService: ModalService,
    private el: ElementRef
  ) {
    this.crearFormulario()
  }

  ngOnInit(): void {
    this.obtenerEstado()
    this.escucharCambioDePagina()
    this.escucharBuscardor()
  }

  escucharBuscardor() {
    let interval = setInterval(() => {
      if (this.estaCargandoBuscador) {
        this.estaCargandoBuscador.subscribe(x => {
          this.cargando = x
        })
        clearInterval(interval)
      }
    }, 100)
  }

  escucharCambioDePagina() {
    this.paginacion.cambioDePagina.subscribe(corte => (this.corte = corte))
  }

  obtenerEstado() {
    this.activatedRoute.paramMap.subscribe(x => {
      let url = this.router.url
      let id = x.get('id')
      this.reiniciarEstados()
      if (url.includes('crear')) this.crear()
      if (url.includes('detalle')) this.detalle(id)
      if (url.includes('modificar')) this.modificar(id)
    })
  }

  crear() {
    this.esCrear = true
    this.crearFormulario()
  }

  detalle(id: string) {
    this.esDetalle = this.cargando = true
    this.listaDePreciosService.buscarPorId(id).subscribe(
      lista => {
        this.cargando = false
        this.crearFormulario(lista)
        this.formulario.disable()

        setTimeout(() => {
          this.protocoloDetalle()
        }, 100)
      },
      () => (this.cargando = false)
    )
  }

  protocoloDetalle() {
    let campos = [
      ...this.el.nativeElement.querySelectorAll('input'),
      ...this.el.nativeElement.querySelectorAll('textarea')
    ]

    campos.forEach(x => {
      this.renderer.setStyle(x, 'border', 'none')
      this.renderer.setStyle(x, 'border-bottom-style', 'solid')
      this.renderer.setStyle(x, 'border-bottom-width', '1px')
      this.renderer.setStyle(x, 'background-color', 'transparent')
      this.renderer.setStyle(x, 'color', '#000')
    })
  }

  noCargarSkus = false

  async modificar(id: string) {
    this.esModificar = this.cargando = true

    let resp: any = await this.listaDePreciosService
      .tamanoDeLista(id)
      .toPromise()
    if (resp.tamano * 1 > 500) this.noCargarSkus = true

    this.listaDePreciosService.buscarPorId(id, this.noCargarSkus).subscribe(
      lista => {
        this.cargando = false
        this.crearFormulario(lista)
      },
      () => (this.cargando = false)
    )
  }

  crearFormulario(datos: Partial<ListaDePrecios> = {}) {
    this.formulario = new FormGroup({
      _id: new FormControl(datos._id),
      nombre: new FormControl(datos.nombre ?? '', [
        Validators.required,
        Validators.minLength(1)
      ]),
      iva: new FormControl(datos.iva ?? 0, [
        Validators.required,
        Validators.min(0),
        Validators.max(100)
      ]),
      descripcion: new FormControl(datos.descripcion ?? '', []),
      skus: new FormArray(datos?.skus?.map(x => this.crearSku(x)) ?? [])
    })
  }

  f(c: string) {
    return this.formulario.get(c)
  }
  fa(c: string) {
    return this.formulario.get(c) as FormArray
  }

  crearSku(x: Partial<SKUListaDePrecios> = {}): any {
    return new FormGroup({
      sku: new FormControl(x.sku ?? '', [Validators.required]),
      precio: new FormControl(x.precio ?? 0, [Validators.required])
    })
  }

  agregarSku(sku: SKU) {
    if (this.esSkuRepetido(sku._id)) return

    let skus = this.fa('skus')
    skus.push(
      this.crearSku({
        sku: sku,
        precio: sku.costoVenta
      })
    )

    this.paginacion.calcularPaginas(skus.length)
  }

  esSkuRepetido(_id: string) {
    let ids = this.fa('skus').value.map(x => x.sku._id)
    return ids.includes(_id)
  }

  reiniciarEstados() {
    this.esCrear = false
    this.esDetalle = false
    this.esModificar = false
  }

  limpiarTodosLosProductos() {
    this.fa('skus').clear()
    this.paginacion.calcularPaginas(this.fa('skus').length)
  }
  agregarTodosLosProductos() {
    this.cargando = true
    this.skuService.leerTodo_listaDePrecios().subscribe(
      skus => {
        this.paginacion.calcularPaginas(skus.length)

        this.fa('skus').clear()

        skus.forEach(x => this.agregarSku(x))

        this.cargando = false
      },
      () => (this.cargando = false)
    )
  }

  submit(modelo: ListaDePrecios, invalid: boolean) {
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()

    if (invalid) return

    this.cargando = true

    let cb = () => {
      this.cargando = false
      this.router.navigate(['/ventas', 'listas-de-precios'])
    }

    let cbError = () => (this.cargando = false)

    if (this.esCrear)
      this.listaDePreciosService.crear(modelo).subscribe(cb, cbError)
    if (this.esModificar)
      this.listaDePreciosService
        .modificar(modelo, this.noCargarSkus)
        .subscribe(cb, cbError)
  }
}

export class Paginacion {
  paginas: number[] = [1]
  totalDePaginas = 1
  paginaActual = 1
  elementosPorPagina = 100
  corteDePaginas = {
    inicio: 0,
    fin: this.elementosPorPagina
  }

  cambioDePagina = new BehaviorSubject(this.corteDePaginas)

  irAPagina(pagina: number) {
    if (pagina < 1) this.paginaActual = 1
    else if (pagina > this.totalDePaginas)
      this.paginaActual = this.totalDePaginas
    else this.paginaActual = pagina

    this.calcularCorteDePaginas(this.paginaActual, this.elementosPorPagina)
  }

  calcularPaginas(totalDeElementos: number) {
    this.totalDePaginas = Math.ceil(totalDeElementos / this.elementosPorPagina)

    if (this.totalDePaginas < 1) this.totalDePaginas = 1

    this.paginas = []

    for (let i = 1; i <= this.totalDePaginas; i++) this.paginas.push(i)

    this.calcularCorteDePaginas(this.paginaActual, this.elementosPorPagina)
  }

  calcularCorteDePaginas(paginaActual: number, elementosPorPagina: number) {
    this.corteDePaginas.inicio = (paginaActual - 1) * elementosPorPagina
    this.corteDePaginas.fin = this.corteDePaginas.inicio + elementosPorPagina
    this.cambioDePagina.next(this.corteDePaginas)
  }
}
