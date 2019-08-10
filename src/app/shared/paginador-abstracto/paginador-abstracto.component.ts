import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core"

/**
 * Este paginador se encarga de controlar la numeracion para (valga la  
 *  redundancia) la paginacion.  
 *
 *  Metodo de uso:
 *  
 * Esta es una plantilla de uso basico para los elementos que tienen que ir 
 * en el html dentro del componente.  
 * ``` html
 *<!-- Plantilla de uso en el html -->
 * <app-paginador-abstracto
 [debug]="true"
 (actualizacion)="cambiarPagina($event)"
 (esteComponente)="paginador = $event"
>
</app-paginador-abstracto>
 * ```

 ``` typescript

 //Codigo para cargar datos al iniciar. 
  //La primera carga debe de definirse el limite y desde de manera 
  // manual por que no se ha cargado el componente.
   this._datosService.todo(20,1).subscribe((datos) => {
      this.datos = datos
      let intervaloDeEsperaPaginador = setInterval(() => {
        if (this.paginador) {
          this.paginador.totalDeElementos = this._datosService.total
          this.paginador.inciarPaginador()
          this.paginador.cargandoDatos = false
          clearInterval(intervaloDeEsperaPaginador)
        }
      }, 100)
    })


  //Codigo para cambiar de pagina.
  cambiarPagina(e) {
    this._datosService.todo(e.limite, e.desde).subscribe((datos) => {
      this.datos = datos
      this.paginador.totalDeElementos = this._datosService.total
      this.paginador.cargaDePaginador(false)
    })
  }

 ``` 

 * 
 * @export
 * @class PaginadorAbstractoComponent
 * @implements {OnInit}
 */
@Component({
  selector: "app-paginador-abstracto",
  templateUrl: "./paginador-abstracto.component.html"
})
export class PaginadorAbstractoComponent implements OnInit {
  @Output() esteComponente = new EventEmitter<this>()
  /**
   * Muestra la informacion de debugueo.
   *
   * @type {boolean}
   * @memberof PaginadorAbstractoComponent
   */
  @Input() public debug: boolean = false
  /**
   *El total de elementos registrados en la BD para gestionar la paginacion.
   * de este valor se sacan el total de paginas.
   *
   * @type {number}
   * @memberof PaginadorAbstractoComponent
   */
  totalDeElementos: number = 0
  /**
   * Desactiva la interaccion del paginador con los botones de cambio de pagina y de seleccion de elementos por pagina.
   *
   * @type {boolean}
   * @memberof PaginadorAbstractoComponent
   */
  activarPaginador: boolean = false
  /**
   * Muestra el icono de carga de datos y oculta la cantidad de paginas.
   *
   * @type {boolean}
   * @memberof PaginadorAbstractoComponent
   */
  cargandoDatos: boolean = true

  /**
   *La pagina en la que se encuentra trabajando el paginador.
   *
   * @type {number}
   * @memberof PaginadorAbstractoComponent
   */
  paginaActual: number = 1
  /**
   *El calculo de paginas en base al totalDeElementos/elementosPorPaginaSeleccionado
   *
   * @type {number}
   * @memberof PaginadorAbstractoComponent
   */
  totalDePaginas: number = 1

  /**
   *Define si se esta o no en la primera pagina
   *
   * @type {boolean}
   * @memberof PaginadorAbstractoComponent
   */
  esPrimeraPagina: boolean = true
  /**
   *Define si se esta o no en la ultima pagina.
   *
   * @type {boolean}
   * @memberof PaginadorAbstractoComponent
   */
  esUltimaPagina: boolean = false

  /**
   *La cantidad de elementos seleccionados para mostrar.
   *
   * @type {number}
   * @memberof PaginadorAbstractoComponent
   */
  elementosPorPaginaSeleccionado: number
  /**
   *Los elementos por pagina que se pueden seleccionar para mostrar.
   *
   * @type {number[]}
   * @memberof PaginadorAbstractoComponent
   */
  @Input() elementosPorPagina: number[] = [5, 15, 50]

  /**
   *Evento que se emite cuando hubo algun cambio en el paginador como lo son pagina siguiente y anterior, cantidad de elementos a mostrarse.
   *
   * @memberof PaginadorAbstractoComponent
   */
  @Output() actualizacion = new EventEmitter<{
    ["limite"]: number,
    ["desde"]: number
  }>()

  constructor() {
    // this.comprobarYSetearElementosPorPagina(this.elementosPorPagina)
    // this.calcularTotalDePaginas()
    // this.comprobarPaginaActual()
  }

  ngOnInit() {
    // setTimeout( ()=>this.inciarPaginador() , 3000)
    this.esteComponente.emit(this)
  }

  inciarPaginador() {
    this.comprobarYSetearElementosPorPagina(this.elementosPorPagina)
    this.calcularTotalDePaginas()
    this.comprobarPaginaActual()
    this.cargaDePaginador(false)
  }

  /**
   *Modifica y actuliza el total de paginas en base a los elementosPorPaginaSeleccionados y el total de elementos. 
   Comprueba la pagina actual y emite un cambio de propiedades actualizadas.
   *
   * @memberof PaginadorAbstractoComponent
   */
  calcularTotalDePaginas() {
    this.totalDePaginas = Math.ceil(
      this.totalDeElementos / this.elementosPorPaginaSeleccionado
    )
    this.comprobarPaginaActual()
  }

  /**
   *Comprueba si es que se estan mostrando todos los elementos existentes para mostrar la leyenda "Mostrando todos los elementos existentes.".
   *
   * @returns {boolean}
   * @memberof PaginadorAbstractoComponent
   */
  seMuestranTodosLosElementosExistentes(): boolean {
    return this.totalDeElementos <= this.elementosPorPaginaSeleccionado
  }

  comprobarYSetearElementosPorPagina(elementos: number[]) {
    // Comprobamos que haya elementos por pagina definidos y mayores a 0.
    this.error_noHayElementosPorPagina(elementos)
    this.error_elementoPorPaginaMenorA1(elementos)

    this.elementosPorPaginaSeleccionado = elementos[0]
  }

  error_noHayElementosPorPagina(elementos: number[]) {
    if (elementos.length === 0)
      throw "No hay elementos por pagina para mostrar. "
  }

  error_elementoPorPaginaMenorA1(elementos: number[]) {
    elementos.forEach((x) => {
      if (x < 1) throw "No puedes definir un elemento de pagina menor que 1"
    })
  }

  seleccionarElementosPorPagina(n: number) {
    if (!this.activarPaginador) return

    this.cargaDePaginador()
    this.elementosPorPaginaSeleccionado = this.elementosPorPagina[n]
    this.calcularTotalDePaginas()
    this.propiedadesActualizadas()
  }

  avanzarPagina() {
    if (!this.activarPaginador) return
    if (this.totalDePaginas > this.paginaActual) {
      this.cargaDePaginador()
      this.paginaActual += 1
      this.comprobarPaginaActual()
      this.propiedadesActualizadas()
    }
  }
  retrocederPagina() {
    if (!this.activarPaginador) return

    if (this.paginaActual > 1) {
      this.cargaDePaginador()
      this.paginaActual -= 1
      this.comprobarPaginaActual()
      this.propiedadesActualizadas()
    }
  }

  comprobarPaginaActual() {
    this.esPrimeraPagina = this.paginaActual == 1
    this.esUltimaPagina = this.totalDePaginas === this.paginaActual
  }

  propiedadesActualizadas() {
    this.recalcularPaginaActual()
    this.actualizacion.emit({ limite: this.limite(), desde: this.desde() })
  }

  recalcularPaginaActual() {
    // Si el cambio de elementos por pagina nos produce
    // que estemos en la pagina 2 de 1 esta funcion se encarga
    // de corregir eso y mandarnos a 1 de 1.

    if (this.paginaActual > this.totalDePaginas)
      this.paginaActual = this.totalDePaginas
  }

  limite(): number {
    return this.elementosPorPaginaSeleccionado
  }

  desde(): number {
    let desde = 0
    if (this.paginaActual === 1) {
      desde = 1
    } else {
      //La pagina tiene que ser menos 1 para tomar los primeros elementos y
      // no los ultimos. Por ejemplo. La pagina 2 por 50 elementos pediria
      // desde el elemento 100 y no queremos eso. Queremos desde el elemento
      // 50
      desde = (this.paginaActual - 1) * this.elementosPorPaginaSeleccionado + 1
    }
    return desde
  }

  cargaDePaginador(b: boolean = true) {
    this.activarPaginador = !b
    this.cargandoDatos = b
  }

}
