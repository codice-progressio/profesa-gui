import { DOCUMENT } from '@angular/common'
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener
} from '@angular/core'
import { UtilidadesService } from '../../services/utilidades.service'
import { UsuarioService } from '../../services/usuario/usuario.service'
import { SKU } from '../../models/sku.model'
import { ManejoDeMensajesService } from '../../services/utilidades/manejo-de-mensajes.service'
import { SkuService } from '../../services/sku/sku.service'
import { FormControl } from '@angular/forms'
import { Productos, VentaService } from '../../services/venta.service'

@Component({
  selector: 'app-punto-de-venta',
  templateUrl: './punto-de-venta.component.html',
  styleUrls: ['./punto-de-venta.component.css']
})
export class PuntoDeVentaComponent implements OnInit, OnDestroy, AfterViewInit {
  nombreDeUsuario = this.usuarioService.usuario.nombre
  hora: string
  relojIntervalo
  nota: Partial<Productos>[] = []
  notaLocalStorage = 'nota-fullscreen'
  private _cargando = false
  public get cargando() {
    return this._cargando
  }
  public set cargando(value) {
    this.usuarioOcupado = value
    if (value) this.inputEfectivoFC.disable()
    else this.inputEfectivoFC.enable()
    this._cargando = value
  }

  @ViewChild('inputScanner') inpScanner: ElementRef<HTMLInputElement>
  @ViewChild('inputEfectivo') inpEfectivo: ElementRef<HTMLInputElement>

  campoEfectivoSeleccionado = false
  @HostListener('window:keydown.space', ['$event'])
  spaceEvent(event: any) {
    console.log(event)
    // En caso de que el input de efectivo sea visible y este seleccionado
    if (
      document.activeElement === this.inpEfectivo?.nativeElement &&
      this.obtenerTotal() > 0
    ) {
      // pues ejecutamos la operacion de corbro
      this.cobrar(this.inputEfectivoFC.value)
    }
    // Si el input scanner no tiene ningún codigo,
    else if (!this.inpScanner.nativeElement.value) {
      // entonces podemos pasar el foco al input de efectivo
      this.inpEfectivo?.nativeElement.focus()
    }
  }

  constructor(
    private ventaService: VentaService,
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
    this.inpScanner.nativeElement.focus()
    this.intervaloDeFocoScanner = setInterval(() => {
      // Si el usuario no esta ocupado, entonces devolvemos el foco al scanner
      if (!this.usuarioOcupado) this.inpScanner.nativeElement.focus()
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
      // this.msjService.toast.error('El código no puede estar vacio')
      this.inputEfectivoFC.setValue('')
      return
    }

    this.cargando = true

    this.skuService.buscarCodigo(codigo.trim()).subscribe(
      r => {
        if (!r) {
          this.msjService.toast.error('No existe el código: ' + codigo.trim())
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
    this.inpScanner.nativeElement.value = ''
    this.inpScanner.nativeElement.focus()
  }

  obtenerTotal(): number {
    return this.nota.map(x => x.cantidad * x.precio).reduce((a, b) => a + b, 0)
  }

  cambio = 0
  dineroRecibido: number[] = []
  inputEfectivoFC = new FormControl('')

  cobrar(valor: string) {
    if (this.cargando) {
      // No permitimos que se ingresen mas datos.
      return
    }

    let valorN = +parseFloat(valor).toFixed(2)

    if (!valorN) valorN = this.obtenerTotal()
    this.dineroRecibido.push(valorN)
    let totalDineroRecibido = this.dineroRecibido.reduce((a, b) => a + b, 0)
    this.cambio = totalDineroRecibido - this.obtenerTotal()
    // Si hay pendiente por cobrar
    // no podemos continuar.
    if (this.cambio < 0) {
      this.msjService.toast.warning(
        'Faltan cubrir: $' + this.cambio * -1,
        undefined,
        {
          timeOut: 3000
        }
      )
      this.inpEfectivo.nativeElement.value = ''
      this.inpEfectivo.nativeElement.focus()

      return
    }

    //Si se completa la cuota desactivamos el campo de efectivo
    this.cargando = true

    this.ventaService.nota.cobrar(this.nota).subscribe(
      r => {
        this.reiniciar()
      },
      () => this.reiniciar()
    )
  }

  reiniciar() {
    this.cargando = false
    this.nota = []
    this.cambio = 0
    this.inpScanner.nativeElement.focus()
    this.inputEfectivoFC.setValue('')
    console.log('Debe reiniicar')
  }
}
