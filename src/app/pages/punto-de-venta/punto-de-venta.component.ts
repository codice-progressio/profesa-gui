import { DOCUMENT } from '@angular/common'
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core'
import { UtilidadesService } from '../../services/utilidades.service'
import { UsuarioService } from '../../services/usuario/usuario.service'
import { SKU } from '../../models/sku.model'
import { ManejoDeMensajesService } from '../../services/utilidades/manejo-de-mensajes.service'
import { SkuService } from '../../services/sku/sku.service'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-punto-de-venta',
  templateUrl: './punto-de-venta.component.html',
  styleUrls: ['./punto-de-venta.component.css']
})
export class PuntoDeVentaComponent implements OnInit, OnDestroy, AfterViewInit {
  nombreDeUsuario = this.usuarioService.usuario.nombre
  hora: string
  relojIntervalo
  nota: NotaLinea[] = []
  notaLocalStorage = 'nota-fullscreen'
  private _cargando = false
  public get cargando() {
    return this._cargando
  }
  public set cargando(value) {
    this.usuarioOcupado = value
    this._cargando = value
  }

  @ViewChild('inputScanner') inputScanner: ElementRef<HTMLInputElement>

  efectivoInput = new FormControl('')
  constructor(
    private skuService: SkuService,
    private msjService: ManejoDeMensajesService,
    public utilidadesService: UtilidadesService,
    private usuarioService: UsuarioService,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    this.retornarFoco()
  }

  usuarioOcupado = false
  intervaloDeFocoScanner
  retornarFoco() {
    this.inputScanner.nativeElement.focus()
    this.intervaloDeFocoScanner = setInterval(() => {
      // Si el usuario no esta ocupado, entonces devolvemos el foco al scanner
      if (!this.usuarioOcupado) this.inputScanner.nativeElement.focus()
    }, 100)
  }

  ngOnDestroy(): void {
    this.detenerReloj()
    this.estilos('removeClass')
    clearInterval(this.intervaloDeFocoScanner)
  }

  ngOnInit(): void {
    this.iniciarReloj()
    this.estilos('addClass')

    // Comprobamos si hay notas guardadas de fullscreen.
    let nota = localStorage.getItem(this.notaLocalStorage)
    if (nota) {
      this.nota = JSON.parse(nota)
      localStorage.removeItem(this.notaLocalStorage)
    }
  }

  elementosParaClase = [
    document.body,
    document.getElementsByTagName('app-root').item(0),
    document.getElementsByTagName('app-pages').item(0),
    document.getElementById('main-wrapper'),
    document.querySelector('#main-wrapper >.page-wrapper'),
    document.querySelector('#main-wrapper >.page-wrapper > .container-fluid')
  ]
  estilos(o: 'addClass' | 'removeClass') {
    this.elementosParaClase.forEach(x => this.renderer[o](x, 'h-100'))
  }

  iniciarReloj() {
    this.hora = new Date().toString()
    this.relojIntervalo = setInterval(
      () => (this.hora = new Date().toString()),
      1000 * 15
    )
  }
  detenerReloj() {
    clearInterval(this.relojIntervalo)
  }

  sinDistracciones() {
    // Esto reinicia el componente. Debemos guardar la nota.
    localStorage.setItem(this.notaLocalStorage, JSON.stringify(this.nota))
    this.utilidadesService.fullScreen.sinDistracciones(document)
  }

  buscarCodigo(codigo: string) {
    if (this.cargando) {
      this.msjService.toast.warning('El sistema esta ocupado.')
      return
    }

    if (!codigo.trim()) {
      return this.msjService.toast.error('El código no puede estar vacio')
    }

    this.cargando = true

    this.skuService.buscarCodigo(codigo.trim()).subscribe(
      r => {
        if (!r) {
          this.msjService.toast.error('No existe el código')
          this.limpiarInput()
          this.cargando = false
          return
        }
        let existe = this.nota.find(x => x.sku._id === r._id)
        if (existe) existe.cantidad++
        else
          this.nota.push({
            sku: r,
            cantidad: 1,
            precio: r.costoVenta
          })

        this.cargando = false
        this.limpiarInput()
      },
      () => (this.cargando = false)
    )
  }

  limpiarInput() {
    this.inputScanner.nativeElement.value = ''
    this.inputScanner.nativeElement.focus()
  }

  obtenerTotal() {
    return this.nota.map(x => x.cantidad * x.precio).reduce((a, b) => a + b, 0)
  }
}

interface NotaLinea {
  sku: SKU
  cantidad: number
  // Obtener primero desde el sku
  precio: number
}
