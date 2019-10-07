import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ElementRef,
  ViewChild,
  ChangeDetectorRef
} from "@angular/core"
import { FormControl } from "@angular/forms"
import { debounceTime, distinctUntilChanged, map, filter } from "rxjs/operators"
import { Dato } from "./dato.model"

/**
 * Gestiona un input un data-list que permite
 * la seleccion de elementos por medio de un click en la lista.
 *
 * Ejemplo de implementeacion:
 *
 * ```crear-modificar.componente.ts```
 * ``` typescript
 *  ejecutarOperacionesDeBusquedaArticulos(evento) {
 *    let termino = <string>evento.termino
 *    let dataList = <DataListComponent>evento.dataList
 *    this._articuloService
 *      .search(termino, undefined, undefined, Articulo)
 *      .subscribe((articulos) => {
 *        let datos: Dato[] = []
 *        articulos.forEach((art: Articulo) => {
 *          let d = new Dato()
 *          d.leyendaPrincipal = art.nombre
 *          d.leyendaSecundaria = art.existenciaEnKg() + " kg "
 *          d.descripcionPrincipal = art.descripcion
 *          d.descripcionSecundaria =
 *            "Unidades de almacenamiento en: " + art.unidad
 *          d.objeto = art
 *
 *          datos.push(d)
 *        })
 *
 *        dataList.terminoBusqueda(datos)
 *    })
 *  }
 *
 *
 * ```
 *
 * ```crear-modificar.component.html```
 *
 * ``` html
 *  <div class="">
 *    <div class="form-group">
 *
 *      // Esta es la parte que nos interesa
 *      <app-data-list
 *        (ejecutarBusquedaDeItems)="
 *          ejecutarOperacionesDeBusquedaArticulos($event)
 *        "
 *        (elementoSeleccionado)="articuloSeleccionado($event, i)"
 *        [valid]='vs.valid(relacionArticulo_FB_item(i))'
 *        [invalid]='vs.invalid(relacionArticulo_FB_item(i))'
 *        (touched)='relacionArticulo_FB_item(i).markAsTouched()'
 *
 *      ></app-data-list>
 *
 *      // Fin de la parte interesante
 *      <input
 *      [ngClass]="{
 *        'is-invalid': vs.invalid(relacionArticulo_FB_item(i)),
 *        'is-valid': vs.valid(relacionArticulo_FB_item(i))
 *      }"
 *        type="text"
 *        class="form-control"
 *        formControlName="item"
 *      />
 *      <small id="helpId" class="form-text text-muted">Articulo</small>
 *      <app-validacion-inputs
 *        [campo]="relacionArticulo_FB_item(i)"
 *      ></app-validacion-inputs>
 *    </div>
 *  </div>
 * ```
 *
 * @export
 * @class DataListComponent
 * @implements {OnInit}
 */
@Component({
  selector: "app-data-list",
  templateUrl: "./data-list.component.html",
  styleUrls: ["./data-list.component.css"]
})
export class DataListComponent implements OnInit {
  /**
   *Los datos que se van a mostrar en la lista de componentes
   *
   * @type {Dato[]}
   * @memberof DataListComponent
   */
  datosParaLista: Dato[] = []

  /**
   *El tiempo que se retrasara la busqueda mientras que el
   * siga escribiendo en el input.
   *
   * @type {number}
   * @memberof DataListComponent
   */
  @Input() tiempoDeEsperaParaBusqueda: number = 1000

  /**
   *Denota el estado actual del input. Si la ejecucion se esta llevando acabo
   * o no.
   *
   * @type {boolean}
   * @memberof DataListComponent
   */
  buscando: boolean = false

  /**
   *Define el estatus visible o no de la lista de items.
   *
   * @type {boolean}
   * @memberof DataListComponent
   */
  mostrarLista: boolean = false

  /**
   *Emite el item que se seleccione de la lista como un tipo ```Dato``
   *
   * @memberof DataListComponent
   */
  @Output() elementoSeleccionado = new EventEmitter<Dato>()

  /**
   *Define el estatus visible o no del boton para limpiar
   *
   * @type {boolean}
   * @memberof DataListComponent
   */
  mostrarBotonParaLimpiar: boolean = false

  /**
   *El input con el que trabajaremos.
   *
   * @memberof DataListComponent
   */
  inputBusqueda = new FormControl()

  @ViewChild("inputBuscarNativo", { static: false })
  inputBusquedaFocus: ElementRef

  /**
   * El texto que se muestra en el input deshabilitado
   * despues de que se selecciono un elemento. Corresponde
   * a la propiedad dato.leyendaPrincipal.
   *
   * @type {string}
   * @memberof DataListComponent
   */
  leyendaInputDeshabilitado: string = null

  /**
   *Recive el estatus de validacion del input.
   *
   * @type {boolean}
   * @memberof DataListComponent
   */
  @Input() valid: boolean
  /**
   *Recive el estatus de invalidacion del input
   *
   * @type {boolean}
   * @memberof DataListComponent
   */
  @Input() invalid: boolean
  /**
   *Cuando el input para buscar es tocado emite un evento
   * que permite la validacion del hidden input real fuera
   * de este componente.
   *
   * @memberof DataListComponent
   */
  @Output() touched = new EventEmitter<null>()

  /**
   *Emite el evento para que se ejecute la busqueda
   *
   * @memberof DataListComponent
   */
  @Output() ejecutarBusquedaDeItems = new EventEmitter<{
    termino: string
    dataList: DataListComponent
  }>()


  /**
   *Este evento se lanza cuando se cancela la busqueda o
   cuando se pulsa el boton limpiar. 
   *
   * @memberof DataListComponent
   */
  @Output() cancelado = new EventEmitter<null>()

  /**
   *    Carga el Dato que se le pase como parametro
   * para modificarlo sin alterar la propiedad touched.
   *
   * @type {Dato}
   * @memberof DataListComponent
   */
  @Input() cargarModifcacion: Dato

  @Output() esteComponente = new EventEmitter<this>()

  constructor(private cdRef: ChangeDetectorRef) {
    
  }

  ngOnInit(): void {
    this.esteComponente.emit(this)
    // PURA TECONOLOGIA. RXJS
    this.inputBusqueda.valueChanges
      .pipe(
        // Si es el mismo flujo no ejecuta el subscribe.
        distinctUntilChanged(),
        // Se espera this.tiempoDeEsperaParaBusqueda permitiendo digitar al usuario.
        debounceTime(this.tiempoDeEsperaParaBusqueda),
        // Eliminamos los flujos vacios para no ejecutar el subscribe.
        filter((result) => !!result),
        // Quitamos los espacios blancos al termino de busqueda.
        map((x) => {
          // Si hay espacios en blanco remplazamos el value del input
          // para que no se vea feo.
          return x.trim()
        })
      )
      .subscribe((termino) => {
        // Si no hay un termino no hacemos nada.
        if (termino) {
          this.ejecutarBusqueda(termino)
        } else {
          this.cancelarBusqueda()
        }
      })

    // Misma subscripcion pero ahora solo tomamos en cuenta
    // el flujo cuando no hay un termino.
    this.inputBusqueda.valueChanges
      .pipe(
        // Evitamos repeticiones.
        distinctUntilChanged(),
        // Solo filtramos el flujo cuando este vacio.
        filter((x) => !x)
      )
      // Cancelamos la busqueda.
      .subscribe(() => this.cancelarBusqueda())

    // Emitimos el evento de touched
    this.inputBusqueda.statusChanges.subscribe((e) => {
      this.touched.emit()
    })

    if (this.cargarModifcacion) {
      this.cargarElementoPorModificacion(this.cargarModifcacion)
    }
  }

  /**
   * Toma las acciones neceasrias para ejecutar la busqueda. La busqueda no
   * se hace desde este componentee. Solo se emite el evento para
   * que el componente padre ejecute la logica.
   *
   * @private
   * @param {*} termino El termino que proviene desde el flujo del input
   * @memberof DataListComponent
   */
  private ejecutarBusqueda(termino) {
    this.inputBusqueda.disable()
    // Estructuramos los datos para pasar en un solo evento
    // este componente y el termino.
    let a = { termino, dataList: this }
    this.ejecutarBusquedaDeItems.emit(a)
  }

  /**
   * Esta operacion se debe de llamar desde el componente padre cuando
   * este finalizo su promesa. Para eso se le paso como parametro este
   * componente dentro de ```this.ejecutarBusquedaDeItems.emit()```
   *
   *
   * Ejemplo de como se deben de crear los datos cuando la busqueda termino:
   * ```crear-modificar.componente.ts```
   *
   * ``` typescript
   *  ejecutarOperacionesDeBusquedaArticulos(evento) {
   *    let termino = <string>evento.termino
   *    let dataList = <DataListComponent>evento.dataList
   *    this._articuloService
   *      .search(termino, undefined, undefined, Articulo)
   *      .subscribe((articulos) => {
   *        let datos: Dato[] = []
   *        articulos.forEach((art: Articulo) => {
   *          let d = new Dato()
   *          d.leyendaPrincipal = art.nombre
   *          d.leyendaSecundaria = art.existenciaEnKg() + " kg "
   *          d.descripcionPrincipal = art.descripcion
   *          d.descripcionSecundaria =
   *            "Unidades de almacenamiento en: " + art.unidad
   *          d.objeto = art
   *
   *          datos.push(d)
   *        })
   *
   *        dataList.terminoBusqueda(datos)
   *    })
   *  }
   * ```
   *
   * @param {Dato[]} datos La estrucutura ya ordenada en tipo ```Dato[]```  que * el padre debio de generar.
   * @memberof DataListComponent
   */
  terminoBusqueda(datos: Dato[]) {
    // Cargamos los datos en la lista.
    this.datosParaLista = datos
    // Limpiamos
    this.limpiezaDespuesDeEjecutarBusqueda()
    // Enfocamos el input
    this.cdRef.detectChanges()
    this.inputBusquedaFocus.nativeElement.focus()
  }

  private limpiezaDespuesDeEjecutarBusqueda() {
    this.buscando = false
    this.mostrarBotonParaLimpiar = true
    this.mostrarLista = true
    this.inputBusqueda.enable()
  }

  seleccionarElemento(dato: Dato) {
    this.leyendaInputDeshabilitado = dato.leyendaPrincipal
    this.elementoSeleccionado.emit(dato)
    this.terminarBusquedaDespuesDeSeleccionarElemento()
  }

  cargarElementoPorModificacion(dato: Dato) {
    this.leyendaInputDeshabilitado = dato.leyendaPrincipal
    this.terminarBusquedaDespuesDeSeleccionarElemento()
  }

  private cancelarBusqueda() {
    this.buscando = false
    this.mostrarBotonParaLimpiar = false
    this.mostrarLista = false
    this.inputBusqueda.enable()
    this.inputBusqueda.reset()
    this.datosParaLista = []
    this.elementoSeleccionado.emit(null)
    this.leyendaInputDeshabilitado = null

    // Actualiza el cambio en el input para que se pueda hacer el focus.
    this.cdRef.detectChanges()
    this.inputBusquedaFocus.nativeElement.focus()
    this.cancelado.emit()
  }

  private terminarBusquedaDespuesDeSeleccionarElemento() {
    this.buscando = false
    this.mostrarLista = false
    this.mostrarBotonParaLimpiar = true
    this.datosParaLista = []
  }

  limpiarParaNuevo() {
    this.inputBusqueda.enable()
    this.inputBusqueda.reset()
    this.buscando = false
    this.mostrarBotonParaLimpiar = false
    this.mostrarLista = false
    this.datosParaLista = []
    this.elementoSeleccionado.emit(null)
    this.leyendaInputDeshabilitado = null
  }
}
