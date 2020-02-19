import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  HostListener,
  ViewChild,
  Renderer2,
  ElementRef
} from '@angular/core'
import { Paginacion } from '../../utils/paginacion.util'

/**
 *Paginador autonomo que permite trabajar con dos paginadores sincronos.
 *
 *Para inicializar este paginador es necseario tener el total de elementos
 *existentes en la bd. La propiedad totalDeElementos hace las veces de
 *inicializador ya que ejecuta la operacion de cambiarElementosPorPagina()
 *que es la encargada de hacer los calculos del limite y desde para
 *la bd.
 *
 *
 * 1 - En el `component.ts` que se quiere agregar paginador se crea una
 * variable tipo `totalDeElementos` la cual se encargara de comunicar
 * el total que se recibe en el servicio con este componente. Se debe
 * dejar como `undefined` para que no se ejecute ninguna operacion.
 *
 * 2 - Se crea una operacion tio `cargarElementos()` que se ejecute
 * desde el `onInit` al abrir el componente. Debe tener esta estructura:
 *
 * ``` typescript
 * cargarEmpleados() {
 *   //Opcionalmente se puede pasar un estado de carga a la propieadad
 *   // de este componente `cargando` para que se muestre un spinner de
 *   // carga.
 *   this.cargando = true
 *   this._empleadoService.findAll(this.paginacion).subscribe(empleados => {
 *     this.empleados = empleados
 *     //Esta asingacion a `totalDeElementos` sirve para guardar
 *     // el valor recibido en el servicio hasta el momento en que
 *     // termine la ejecucion del observable.
 *     this.totalDeElementos = this._empleadoService.total
 *     // Termina la carga
 *     this.cargando = false
 *   })
 * }
 *
 * ```
 *    NOTA: En la primera ejecucion del paginador
 *    `paginador.totalDeElemento:EventEmmiter` por de defecto no se ejecuta
 *    el evento para prevenir dobles carga al iniciar `component.ts`. Si se
 *    quiere evitar esto se puede poner la propiedad
 *    `evitarPrimeraEjecucion = true` y este comportamiento se evitara.
 *    Notese que se habla del componente no clonado.
 *
 * 3 - Dentro del `component.html` agregamos las etiquetas correspondientes
 * a este paginador de esta manera:
 *
 * ```
 *
 *   <paginador
 *       // La referencia a este componente para clonarlo
 *       #paginadorOriginal
 *       class="pull-right"
 *       //La asignacioin a la variable global para
 *       // inicializar el componente. MUY IMPORTANTE.
 *       [totalDeElementos]='totalDeElementos'
 *       //Valores de paso para rellenar la clase
 *       //paginacion que se entrega en cada evento
 *       //emitido.
 *       [campoDeOrdenamiento]='nombre'
 *       [tipoDeOrden]='des'
 *
 *       //El paginador es capaz de trabajar en espejo si se le
 *       // pasa la referencia de otro paginador.
 *       [clonar]='paginadorSecundario'
 *       //La emision del evento.
 *       (actualizarConsulta)='actualizarConsulta($event)'
 *       //La opcion de muestra de spinner a travez de la
 *       // variable global.
 *       [cargando]='cargando'
 *       ></paginador>
 *
 * ```
 *
 * 3.1 - Opcionalmente se puede agregar un clon de este paginador:
 *
 *
 *
 * ```
 *   <paginador
 *       class="pull-right"
 *       //La referecia de este paginador.
 *       #paginadorSecundario
 *       // El paginador que queremos clonar.
 *       [clonar]='paginadorOriginal'
 *       // Es neceario hacer referencia a la misma operacion
 *       // que su clon
 *       (actualizarConsulta)='actualizarConsulta($event)'
 *       ></paginador>
 * ```
 *
 * 4 - Creamos una operacion para ejecutar al emitir `actualizarConsulta()`:
 *
 *
 * ```typescript
 * //Recibe la informacion generada por el componente
 * actualizarConsulta(data: iPaginadorData = null) {
 *   // Seteamos la carga
 *   this.cargando = true
 *   // Comprobamos si se le paso un dato a traves de el evento.
 *   // Si no se paso quiere decir que lo estamos llamando de manera
 *   // autonoma y tenemos que pasar un objeto paginacion global guardado
 *   // en el `component.ts`
 *   this.paginacion = data ? data.paginacion : this.paginacion
 *   this._empleadoService.findAll(data.paginacion).subscribe(empleados => {
 *     //No es necesario hacer ninguna actualizacion del componente paginador
 *     // puesto que ya a almacenado la referencia del total.
 *     this.empleados = empleados
 *     this.cargando = false
 *   })
 * }
 *
 * ````
 *
 * Los datos que se entregan son una interfaz con esta estructura:
 *
 *
 *``` typescript
 *   export interface iPaginadorData {
 *     paginacion: Paginacion
 *     componente: PaginadorComponent
 *   }
 *```
 *
 *
 *
 *
 * @export
 * @class PaginadorComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css']
})
export class PaginadorComponent implements OnInit {
  private usuarioQuierePrimeraEjecucion = false
  _epe: boolean = false

  /**
   *
   *
   * @memberof PaginadorComponent
   */
  @Input() set evitarPrimeraEjecucion(a: boolean) {
    this._epe = a
    this.usuarioQuierePrimeraEjecucion = !a
  }

  get evitarPrimeraEjecucion(): boolean {
    return this._epe
  }

  /**
   *La pagina actual donde se encuentra el paginador.
   *
   * @type {number}
   * @memberof PaginadorComponent
   */
  actual: number = 1
  /**
   *El total de paginas. Se calcula al setear el total
   de elementos
   *
   * @type {number}
   * @memberof PaginadorComponent
   */
  totalDePaginas: number = 1

  /**
   *Los elementos por pagina que se van a mostrar.
   *
   * @type {number}
   * @memberof PaginadorComponent
   */
  elementosPorPagina: number = 5

  /**
   *La lista de elementos por pagina por defecto que se quiere mostrar
   *
   * @memberof PaginadorComponent
   */
  @Input() cantidadesPorPagina = [5, 15, 50]

  /**
   *El total de elementos que se reciben de la base de datos
   *
   * @memberof PaginadorComponent
   */
  @Input() set totalDeElementos(x: number) {
    this._totalDeElementos = x ? x : 0

    if (!this.evitarPrimeraEjecucion) {
      this.usuarioQuierePrimeraEjecucion = false
    }

    if (x) this.cambiarElementosPorPagina(this.elementosPorPagina)
  }

  private _totalDeElementos: number
  /**
   *La cantidad de elementos que existe resultado 
   de la consulta en la bd por paginar. 
   *
   * @readonly
   * @type {number}
   * @memberof PaginadorComponent
   */
  get totalDeElementos(): number {
    return this._totalDeElementos
  }
  /**
   *Este dato solo es de paso para completar la paginacion. No se puede omitir
   pero tampoco afecta el desempeno del paginador. 
   *
   * @type {string}
   * @memberof PaginadorComponent
   */
  @Input() campoDeOrdenamiento: string
  /**
   *Este valor igualmente es de paso para completar la paginacion. No se puede 
   omitir pero tampoco afecta el desempeno del paginador. 
   *
   * @type {(1 | '-1)}
   * @memberof PaginadorComponent
   */
  @Input() tipoDeOrden: 1 | -1 = 1

  _clonar: this

  /**
   *Una bandera para mostrar una pequena precarga en el paginador.
   *
   * @type {boolean}
   * @memberof PaginadorComponent
   */
  @Input() cargando: boolean

  /**
   *El evento que debe actualizar los datos con los nuevos calculos echos por el paginador.
   *
   * @memberof PaginadorComponent
   */
  @Output() actualizarConsulta = new EventEmitter<iPaginadorData>()

  constructor(private renderer: Renderer2) {}

  ngOnInit() {}

  /**
   *Designa una nueva cantidad a mostrar de elementos por pagina y hace los calculos necesarios para actualizar la consulta. Emite actualizarConsulta.emit()
   *
   * @param {number} x
   * @memberof PaginadorComponent
   */
  cambiarElementosPorPagina(x: number) {
    this.elementosPorPagina = x
    this.totalDePaginas = Math.ceil(this.totalDeElementos / x)
    //La pagina actual no puede ser mayor que el calculo
    // que acabamos de realizar. Si ese fuera el caso
    // tenemos que reiniciar
    if (this.actual > this.totalDePaginas) this.actual = this.totalDePaginas
    if (this.usuarioQuierePrimeraEjecucion) {
      this.actualizarConsulta.emit(this.crearPaginacion())
    }
    this.usuarioQuierePrimeraEjecucion = true
  }

  /**
   *Cambia a la pagina siguiente y emite actualizarConsulta.emit()
   *
   * @memberof PaginadorComponent
   */
  siguiente() {
    if (this.cargando) return
    if (this.totalDePaginas > this.actual) {
      this.actual++
      this.actualizarConsulta.emit(this.crearPaginacion())
    }
  }

  /**
   *Cambia a la pagina anterior y emite actualizarConsulta.emit()
   *
   * @memberof PaginadorComponent
   */
  anterior() {
    if (this.cargando) return
    if (this.actual > 1) {
      this.actual--
      this.actualizarConsulta.emit(this.crearPaginacion())
    }
  }

  /**
   *Genera un elemento de paginacion lo emite junto con este 
   componente. 
   *
   * @returns {iPaginadorData}
   * @memberof PaginadorComponent
   */
  crearPaginacion(): iPaginadorData {
    let limite = this.elementosPorPagina

    let desde =
      this.actual <= 1 ? 0 : (this.actual - 1) * this.elementosPorPagina
    return {
      paginacion: new Paginacion(
        limite,
        desde,
        this.tipoDeOrden,
        this.campoDeOrdenamiento
      ),
      componente: this
    }
  }


  //Esta seccion es para crear el boton de scroll top

  @ViewChild('btnScroll') btnScroll: ElementRef

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    // https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
    const scrollActual = event.path[1].scrollY
    const nativeE = this.btnScroll.nativeElement
    if (scrollActual > 50) {
      this.renderer.setStyle(nativeE, 'display', 'block')
    } else {
      this.renderer.setStyle(nativeE, 'display', 'none')
    }
  }

  scrollTop(){
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
          window.clearInterval(scrollToTop);
      }
  }, 10);
  }
}

export interface iPaginadorData {
  paginacion: Paginacion
  componente: PaginadorComponent
}
