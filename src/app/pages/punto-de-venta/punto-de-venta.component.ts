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
import { ImpresionService, articulo } from '../../services/impresion.service'
import * as moment from 'moment'
import {
  ContabilidadService,
  Productos
} from '../../services/contabilidad.service'

@Component({
  selector: 'app-punto-de-venta',
  templateUrl: './punto-de-venta.component.html',
  styleUrls: ['./punto-de-venta.component.css']
})
export class PuntoDeVentaComponent implements OnInit, OnDestroy, AfterViewInit {
  nombreDeUsuario: string = ''
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
    private contabilidadService: ContabilidadService,
    private skuService: SkuService,
    private msjService: ManejoDeMensajesService,
    public utilidadesService: UtilidadesService,
    private usuarioService: UsuarioService,
    private renderer: Renderer2,
    private impresionService: ImpresionService
  ) {
    this.nombreDeUsuario = this.usuarioService.usuario.nombre
  }

  ngAfterViewInit(): void {
    this.retornarFoco()
  }

  usuarioOcupado = false
  intervaloDeFocoScanner
  /**
   *Solo se llama una vez.
   *
   * @memberof PuntoDeVentaComponent
   */
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

    this.contabilidadService.remision.cobrar(this.nota).subscribe(
      r => {
        this.impresionService
          .imprimir({
            nombre_empresa: 'IMPERIUMsic',
            consecutivo: r.consecutivo + '',
            create_at: this.crearFecha(r.create_at),
            usuario: this.usuarioService.usuario.nombre,
            articulos: this.nota.map(x => {
              console.log(x)
              let articulo: articulo = {
                cantidad: x.cantidad,
                producto: x.sku.nombreCompleto,
                precio_unitario: x.precio + '',
                importe: x.cantidad * x.precio + ''
              }

              return articulo
            }),
            total: this.obtenerTotal() + '',
            efectivo: totalDineroRecibido + '',
            cambio: this.cambio + ''
          })
          .subscribe(respuestaImprecion => {
            this.reiniciar()
          })
      },
      () => this.reiniciar()
    )
  }

  crearFecha(fecha: string | Date) {
    moment.locale('es')
    return moment(fecha).format('DD/MM/YYYY hh:mm').toString()
  }

  reiniciar() {
    this.cargando = false
    this.nota = []
    this.cambio = 0
    this.inpScanner.nativeElement.focus()
    this.inputEfectivoFC.setValue('')
    console.log('Debe reiniicar')
  }

  matris = {
    x: 0,
    y: 0
  }
  editando = false
  modoEdicion(x: number, y: number, esInputScanner = false) {
    // Validaciones
    // x no puede ser menor que 0 ni mayor que 1
    // y no puede superar la cantidad de elementos
    // que hay en nota

    if (x > 1 || x < 0 || y < 0 || y > this.nota.length - 1) {
      this.salirModoEdicion()
      return
    }

    // Si las validaciones salen bien, entonces
    // guardamos las nuevas coordenadas
    this.matris = { x, y }
    this.editando = this.usuarioOcupado = true
    // Esperamos un momento para enfocar
    let id = 'xy' + x + y
    console.log(this.matris, id)
    setTimeout(() => {
      let input: HTMLInputElement = document.getElementById(
        id
      ) as HTMLInputElement
      input.focus()
      input.select()
    }, 10)
  }

  salirModoEdicion() {
    this.editando = this.usuarioOcupado = false
    console.log('salirModoEdicion')
  }

  soloNumeros(input: HTMLInputElement, evt) {
    // Backspace = 8, Enter = 13, ‘0′ = 48, ‘9′ = 57, ‘.’ = 46, ‘-’ = 43
    var key = window.Event ? evt.which : evt.keyCode
    var chark = String.fromCharCode(key)
    var tempValue = input.value + chark
    var isNumber = key >= 48 && key <= 57
    var isSpecial = key == 8 || key == 13 || key == 0 || key == 46
    if (isNumber || isSpecial) {
      return this.filter(tempValue)
    }

    return false
  }
  filter(__val__) {
    var preg = /^([0-9]+\.?[0-9]{0,2})$/
    return preg.test(__val__) === true
  }

  eliminarLinea(x: number, y: number) {
    this.modoEdicion(x, y - 1)

    this.nota.splice(y, 1)
  }
}
