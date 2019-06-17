import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
  OnDestroy
} from "@angular/core"
import {
  FormBuilder,
  Validators,
  FormGroup,
  ValidatorFn,
  FormArray,
  AbstractControl
} from "@angular/forms"
import { Cliente } from "src/app/models/cliente.models"
import { ModeloCompleto } from "src/app/models/modeloCompleto.modelo"
import { Laser } from "src/app/models/laser.models"
import { Folio } from "src/app/models/folio.models"
import { Usuario } from "src/app/models/usuario.model"
import { ValidacionesService } from "src/app/services/utilidades/validaciones.service"
import { FolioNewService } from "src/app/services/folio/folio-new.service"
import { ClienteService } from "src/app/services/cliente/cliente.service"
import { ModeloCompletoService } from "src/app/services/modelo/modelo-completo.service"
import { UsuarioService } from "src/app/services/usuario/usuario.service"
import { DEPARTAMENTOS } from "../../../../config/departamentos"
import { Subscription } from "rxjs"
import { ManejoDeMensajesService } from "src/app/services/utilidades/manejo-de-mensajes.service"

@Component({
  selector: "app-folios-crear-modificar-abstracto",
  templateUrl: "./folios-crear-modificar-abstracto.component.html",
  styles: []
})
export class FoliosCrearModificarAbstractoComponent
  implements OnInit, OnDestroy {
  /**
   * Escucha si input que se muestra cliente ha cambiado para asi asignar
   * el valor ( _id ) correspondiente al input que si pertenece al reactive form.
   *
   * @memberof FoliosCrearModificarComponent
   */
  @ViewChild("inputCliente") inputCliente

  /**
   *Los clientes que se van a listar en la busqueda.
   *
   * @type {Cliente[]}
   * @memberof FoliosCrearModificarComponent
   */
  clientes: Cliente[] = []
  /**
   *El cliente que esta actualmente seleccionado.
   *
   * @type {Cliente}
   * @memberof FoliosCrearModificarComponent
   */
  clienteSeleccionado: Cliente
  /**
   *Los vendedores que se van a enlistar en la busqueda.
   *
   * @type {Usuario[]}
   * @memberof FoliosCrearModificarComponent
   */
  vendedores: Usuario[] = []
  /**
   *Los modelos completos que se van a enlistar en la busqueda.
   *
   * @type {ModeloCompleto []}
   * @memberof FoliosCrearModificarComponent
   */
  modelosCompletos: ModeloCompleto[] = []
  /**
   *Version resumida para facilitar el ordenamiento en html
   *
   * @type {ValidacionesService}
   * @memberof FoliosCrearModificarAbstractoComponent
   */
  vs: ValidacionesService

  /**
   * El folio que se va a trabajar?
   *
   *
   * @type {Folio}
   * @memberof FoliosCrearModificarAbstractoComponent
   */
  folio: Folio

  /**
   *El formulario que emitimos para guardar los datos.
   *
   * @type {FormGroup}
   * @memberof FoliosCrearModificarAbstractoComponent
   */
  formulario: FormGroup

  /**
   *Desactiva el boton cuando se esta guardando.
   *
   * @type {false}
   * @memberof FoliosCrearModificarAbstractoComponent
   */
  desactivarBotonEnGuardado: boolean = false
  // lleva: any;

  modeloCompletoPorPedido: ModeloCompleto[] = []

  constructor(
    public _folioNewService: FolioNewService,
    public formBuilder: FormBuilder,
    public _validacionesService: ValidacionesService,
    public _clienteService: ClienteService,
    public _modelosCompletosService: ModeloCompletoService,
    public _usuarioService: UsuarioService,
    public _msjService: ManejoDeMensajesService
  ) {
    this.vs = this._validacionesService

    this.formularioCreacionYReinicio()
  }

  ngOnInit() {
    this.esteComponente.emit(this)
  }

  /**
   *Emite una notificacion de que el componete se destruyo
   para que la variable que escucha el emitter esteComponente
   sea borrada. De otra manera da error al cargar los folios.  
   *
   * @memberof FoliosCrearModificarAbstractoComponent
   */
  @Output() destruido = new EventEmitter<any>()
  ngOnDestroy(): void {
    this.destruido.emit()
  }

  formularioCreacionYReinicio() {
    // Cada vez que se crea el formulario limpiamos todo.
    this.marcasLaserNg = []
    this.inputClienteNg = ""
    this.inputModeloCompletoNg = []
    this.clientes = []
    this.modelosCompletos = []

    this.crearFormulario()
    // this.agregarPedido()
    this.inputClienteNg = ""
    this.inputModeloCompletoNg = []
  }

  comprobarClienteSeleccionado() {
    // Hay un cliente seleccionado y no hay pedidos agregados.
    if (this.cliente_FB.valid && this.folioLineas_FB.length === 0) {
      this.agregarPedido()
    } else {
      // Si el cliente no es valido entonces eliminamos todos los pedidos.
      if (this.cliente_FB.invalid) {
        for (let i = 0; i < this.folioLineas_FB.length; i++) {
          this.folioLineas_FB.removeAt(i)
          this.inputModeloCompletoNg = []
        }
      }
    }
  }

  /*Carga la lista de clientes en base al termino que se le pase.
   *
   * @param {string} termino
   * @memberof FoliosCrearModificarComponent
   */
  cargarClientes(termino: string) {
    if (termino.trim() === "") {
      this.clientes = []
    } else {
      this._clienteService.buscar(termino).subscribe((clientes) => {
        this.clientes = clientes
        this.inputCliente.nativeElement.focus()
      })
    }
    this.cliente_FB.markAsTouched()
  }

  _modelosCompletosServiceSubscription: Subscription

  /**
   *Carga la lista de modelos en base al termindo que se le pase.
   *
   * @param {string} termino
   * @param {number} iPed
   * @memberof FoliosCrearModificarComponent
   */
  cargarModelosCompletos(termino: string, iPed: number) {
    if (termino.trim() === "") {
      this.clientes = []
    } else {
      this._modelosCompletosServiceSubscription = this._modelosCompletosService
        .buscar(termino)
        .subscribe((mc) => {
          this.modelosCompletos = mc
        })
    }
    this.modeloCompleto_FB(iPed).markAsTouched()
  }

  /**
   *Obtiene el id del cliente comparando el value( el nombre del cliente)
   con los elementos cargados en la lista de clientes y retorna el id para
   asignarlo al input escondido que esta enlazado al formBuilder. 
   
   *
   * @param {string} nombre
   * @returns {string}
   * @memberof FoliosCrearModificarComponent
   */
  clienteObtenerId(nombre: string): string {
    if (nombre.trim() === "") return null

    let clienteSeleccionado: Cliente = this.clientes.filter((x) => {
      return x.nombre === nombre.trim()
    })[0]

    if (!clienteSeleccionado) return null
    this.clienteSeleccionado = clienteSeleccionado
    return clienteSeleccionado._id
  }

  /**
   **Obtiene el id del modeloComplelto comparando el value( el campo nombreCompleto)
   con los elementos cargados en la lista de clientes y retorna el id para
   asignarlo al input escondido que esta enlazado al formBuilder. 
   
   *
   * @param {string} nombre
   * @returns {string}
   * @memberof FoliosCrearModificarComponent
   */
  modeloCompletoObtenerId(nombre: string): string {
    if (nombre.trim() === "") return null

    let modeloCompletoSeleccionado: ModeloCompleto = this.modelosCompletos.filter(
      (x) => {
        return x.nombreCompleto === nombre.trim()
      }
    )[0]

    if (!modeloCompletoSeleccionado) return null
    return modeloCompletoSeleccionado._id
  }

  /**
 *Limpia todos los datos del cliente seleccionado en el input, el data list, la lista
 de clientes buscada, el input para la escucha del campo y el cliente seleccionado. 

 Generalmente la llamo cuando se aprieta el backspece en el input cliente. 
 *
 * @param {*} inputCliente El input con el #
 * @memberof FoliosCrearModificarComponent
 */
  limpiarCliente(inputCliente) {
    this.cliente_FB.setValue(null)
    this.clientes = []
    inputCliente.value = ""
    this.clienteSeleccionado = null
  }
  /**
*Limpia los datos del modelo completo seleccionado en el input, el data list, la lista
de modelosCompletos buscada, el input para la escucha del campo. 
*
* @param {*} inputModeloCompleto El input con el #
* @param {*} iPed El numero de pedido del cual se va a buscar el cliene. 
* @memberof FoliosCrearModificarComponent
*/
  limpiarModeloCompleto(inputModeloCompleto, iPed) {
    this.modeloCompleto_FB(iPed).setValue(null)
    this.modelosCompletos = []
    inputModeloCompleto.value = ""
  }

  /**
   *Crea el formulario de registro.
   *
   * @memberof MaquinasCrearModificarComponent
   */
  crearFormulario() {
    this.formulario = this.formBuilder.group({
      cliente: ["", [Validators.required]],
      vendedor: [this._usuarioService.usuario._id, [Validators.required]],
      terminado: [false],
      observacionesVendedor: ["", []],

      observaciones: [],

      folioLineas: this.formBuilder.array(
        [],
        [this._validacionesService.minSelectedCheckboxes()]
      )

      // fechaFolio:[],
    })
  }

  /**
   *Crea un grupo de pedidos con sus respectivas validaciones.
   *
   * @returns {FormGroup}
   * @memberof FoliosCrearModificarComponent
   */
  crearNuevoGrupoDePedidos(): FormGroup {
    return this.formBuilder.group({
      modeloCompleto: ["", [Validators.required]],
      cantidad: [
        "",
        [
          Validators.required,
          Validators.min(1),
          this._validacionesService.numberValidator,
          this._validacionesService.onlyIntegers
        ]
      ],

      laserCliente: [new Laser()],
      almacen: [false],
      coloresTenidos: this.formBuilder.array(
        [],
        this.validarTotalDeTenidoNoSupereTotalDePedido()
      ),
      observaciones: ["", []],

      pedido: "",
      // nivelDeUrgencia: '',
      // ordenes: '',
      // ordenesGeneradas: '',
      // trayectoGenerado: '',
      porcentajeAvance: "",
      // procesos: '',
      observacionesVendedor: ["", []],
      // terminado: '',
      fechaTerminado: "",
      cantidadProducida: ""
    })
  }

  /**
    *Valida que el total del boton que se va a tenir no 
    supere la cantidad del pedido. Como dato importante hay
    que tomar en cuenta que la valicion solo se dispara en los
    campos de coloresTenidos. La validacion del cambio de cantidad
    en el pedido la tenemos que detonar designando una accion directa
    sobre el input. Yo designe para esto un blur, keypress y mouseleave. 
    *
    * @returns {ValidatorFn}
    * @memberof FoliosCrearModificarComponent
    */
  validarTotalDeTenidoNoSupereTotalDePedido(): ValidatorFn {
    // Hacemos un lambda por que asi llamamos sin un callbak.

    let validator: ValidatorFn = (formArray: FormArray) => {
      // Creamos el objeto especial de validacion con la nueva estructura estandar.
      let objetoDeValidacion = {
        general: {
          mensaje: "Cantidad a tenir no valida.",
          textoSecundario:
            "Al parecer has definido un numero de piezas menor en el pedido que la suma total de piezas. Por favor corrige esto. "
        }
      }

      // Cuando creamos el formulario no existe el parent. Esta validacion
      // depente de que exista el parent, por que de otra menra da error.
      // Como las validaciones se disparan de manera continua por varios
      // Eventos nos limitamos a ejecutar nuestra validacion solo cuando
      // este disponible el parent.
      if (formArray.parent) {
        /**
         * La suma de las cantidades que se quieren tenir.
         */
        let totalTenido = 0
        /**
         * Desde el parent se extrae la cantidad que corresponde al pedido.
         */
        let cantidadDelPedido = formArray.parent.get("cantidad").value

        // Recorremos el arreglo sumadno la cantidad a tenir.
        formArray.controls.forEach((control) => {
          totalTenido += control.get("cantidad").value
        })
        /**
         * La cantidad del pedido debe ser mayor que la suma a tenir.
         */
        let esValido = cantidadDelPedido >= totalTenido
        // Si no es valido retornamos el objeto que informacion.
        return esValido ? null : objetoDeValidacion
      }

      // Si no hay padres y tampoco hay controles en el arreglo
      // no es necesario que validemos.
      if (formArray.controls.length === 0) return null
      // Si hay controles entonces se debe marcar un error.
      return objetoDeValidacion
    }

    return validator
  }

  /**
   *Crea un nuevo grupo de tenido para el formulario con 
   sus respectivas validaciones. 
   *
   * @returns {FormGroup}
   * @memberof FoliosCrearModificarComponent
   */
  crearNuevoGrupoDeTenido(): FormGroup {
    return this.formBuilder.group({
      color: [[], [Validators.required]],
      cantidad: [
        [],
        [
          Validators.required,
          Validators.min(1),
          this._validacionesService.numberValidator,
          this._validacionesService.onlyIntegers
        ]
      ],
      observaciones: [[], []]
    })
  }

  /**
   *Obiene el campo cliente.
   *
   * @readonly
   * @type {AbstractControl}
   * @memberof FoliosCrearModificarComponent
   */
  public get cliente_FB(): AbstractControl {
    return this.formulario.get("cliente")
  }
  /**
   *Obtiene el campoObservacioines vendedor.
   *
   * @readonly
   * @type {AbstractControl}
   * @memberof FoliosCrearModificarComponent
   */
  public get observacionesVendedor_FB(): AbstractControl {
    return this.formulario.get("observacionesVendedor")
  }
  /**
   *Obtiene el arreglo folioLlineas.
   *
   * @readonly
   * @type {FormArray}
   * @memberof FoliosCrearModificarComponent
   */
  public get folioLineas_FB(): FormArray {
    return <FormArray>this.formulario.get("folioLineas")
  }

  /**
   *Obtiene el pedido (folioLinea) que corresponda al parametro que se le pase.
   *
   * @param {number} iPed La posicion del pedido.
   * @returns {AbstractControl}
   * @memberof FoliosCrearModificarComponent
   */
  public pedido_FB(iPed: number): AbstractControl {
    return this.folioLineas_FB.at(iPed)
  }

  /**
   *Obtiene el modelo completo del pedido que corresponda al indice que se le pase como parametro.
   *
   * @param {*} iPed
   * @returns {AbstractControl}
   * @memberof FoliosCrearModificarComponent
   */
  public modeloCompleto_FB(iPed): AbstractControl {
    return this.pedido_FB(iPed).get("modeloCompleto")
  }
  /**
   *
   * *Obtiene cantidad  del pedido que corresponda al indice que se le pase como parametro.
   *
   * @param {*} iPed
   * @returns {AbstractControl}
   * @memberof FoliosCrearModificarComponent
   */
  public cantidad_FB(iPed): AbstractControl {
    return this.pedido_FB(iPed).get("cantidad")
  }
  /**
   *   *Obtiene el laser del pedido que corresponda al indice que se le pase como parametro. 

   *
   * @param {*} iPed
   * @returns {AbstractControl}
   * @memberof FoliosCrearModificarComponent
   */
  public laserCliente_FB(iPed): AbstractControl {
    return this.pedido_FB(iPed).get("laserCliente")
  }
  /**
   *   *Obtiene si se surte de almacen o no del pedido que corresponda al indice que se le pase como parametro. 

   *
   * @param {*} iPed
   * @returns {AbstractControl}
   * @memberof FoliosCrearModificarComponent
   */
  public almacen_FB(iPed): AbstractControl {
    return this.pedido_FB(iPed).get("almacen")
  }
  /**
   *   *Obtiene las observaciones del pedido que corresponda al indice que se le pase como parametro. 

   *
   * @param {*} iPed
   * @returns {AbstractControl}
   * @memberof FoliosCrearModificarComponent
   */
  public observacionesPed_FB(iPed): AbstractControl {
    return this.pedido_FB(iPed).get("observacionesVendedor")
  }

  /**
   *Obtiene el color de tenido que corresponda al pedido y coloresTenido que se le pase como 
   parametro. 
   *
   * @param {number} iPed
   * @param {number} iTenido
   * @returns {AbstractControl}
   * @memberof FoliosCrearModificarComponent
   */
  public colorTenido_FB(iPed: number, iTenido: number): AbstractControl {
    let campo = <FormArray>this.folioLineas_FB.at(iPed).get("coloresTenidos")
    return campo.at(iTenido).get("color")
  }
  /**
   * Obtiene la cantidad que corresponda al pedido y coloresTenido que se le pase como 
   parametro. 
   *
   * @param {number} iPed
   * @param {number} iTenido
   * @returns {AbstractControl}
   * @memberof FoliosCrearModificarComponent
   */
  public cantidadTenido_FB(iPed: number, iTenido: number): AbstractControl {
    let campo = <FormArray>this.folioLineas_FB.at(iPed).get("coloresTenidos")
    return campo.at(iTenido).get("cantidad")
  }
  /**
   *Obtiene las observaciones que corresponda al pedido y coloresTenido que se le pase como 
   parametro. 
   *
   * @param {number} iPed
   * @param {number} iTenido
   * @returns {AbstractControl}
   * @memberof FoliosCrearModificarComponent
   */
  public observacionesTenido_FB(
    iPed: number,
    iTenido: number
  ): AbstractControl {
    let campo = <FormArray>this.folioLineas_FB.at(iPed).get("coloresTenidos")
    return campo.at(iTenido).get("observaciones")
  }

  /**
   *Agrega un nuevo pedido al formulario.
   *
   * @memberof FoliosCrearModificarComponent
   */
  agregarPedido() {
    let grupoDePedidos: FormGroup = this.crearNuevoGrupoDePedidos()
    // Deshabilitamos el laser del cliente y la opcion de surtir
    // de almacen por defecto para que primero sea necesario hacer
    // la comprobacion.
    grupoDePedidos.get("laserCliente").disable()
    grupoDePedidos.get("almacen").disable()
    this.folioLineas_FB.push(grupoDePedidos)
    this.comprobarModeloLaseradoFun[this.folioLineas_FB.length - 1] = false
  }

  /**
   *Elimina un pedido del formulario.
   *
   * @param {number} iPed
   * @memberof FoliosCrearModificarComponent
   */
  eliminarPedido(iPed: number) {
    this.folioLineas_FB.removeAt(iPed)
    this.inputModeloCompletoNg.splice(iPed, 1)
  }

  /**
   *Ayuda a almacenar los input de los colores tenidos para
   que se pueda enfocar uno nuevo al crearse. Al parecer
   las reactive forms son asincronas. 
   *
   * @type {any []}
   * @memberof FoliosCrearModificarComponent
   */
  focus: any[] = []

  /**
   *Agrega un color tenido y pone el foco en el nuevo elemento creado.
   *
   * @param {number} iPed
   * @param {number} iTenido
   * @memberof FoliosCrearModificarComponent
   */
  agregarColorTenido(iPed: number) {
    new Promise((resolve) => {
      let campo = <FormArray>this.folioLineas_FB.at(iPed).get("coloresTenidos")
      campo.push(this.crearNuevoGrupoDeTenido())

      let interval = setInterval(() => {
        // Esperamos hasta que se cree el componente.
        // Si no hacemos esto el focus no da undefined.
        if (this.focus.length > 0) {
          clearInterval(interval)
          resolve()
        }
      }, 10)
    })
      .then(() => {
        // Cuando detectamos que el componente se creo
        // aplicamos el focus para el elemento.
        this.focus.pop().focus()
        this.calcularTenidos(iPed)
      })
      .catch((err) => {
        throw err
      })
  }

  /**
   *Agrega elementos existentes al arreglo focus para 
   poder itinerar sobre el . Esta funcion tiene que ver con agregarColorTenido
   por que se ejecuta desde el html y carga los nuevos inputs que se generan. El
   problema es que parese ser asincrono y si ejecuto el focus da undefined. Esto se 
   resolvio con una promesa. 
   *
   * @param {*} inp
   * @memberof FoliosCrearModificarComponent
   */
  agregar(inp) {
    let a: any[] = this.focus.filter((x) => {
      return inp.id === x.id
    })

    if (a.length === 0) this.focus.push(inp)
  }

  /**
   *Eliina un color tenido
   *
   * @param {number} iPedido Index del pedido.
   * @param {number} iTenido Index del color de tenido.
   * @memberof FoliosCrearModificarComponent
   */
  eliminarColorTenido(iPedido: number, iTenido: number) {
    /**
     * Obtenemos el formArray para despues quitar el campo.
     */
    let campo = <FormArray>this.folioLineas_FB.at(iPedido).get("coloresTenidos")
    campo.removeAt(iTenido)
    // Tambien eliminamos el itempo de los focus.
    this.focus.splice(iTenido, 1)

    // Volvemoms a hacer focus
    let iTenidoNew = iTenido - 1

    // No debe ser negativo. Si es negativo nos vamos a 0 para que el arreglo no de error.
    if (iTenidoNew < 0) iTenidoNew = 0

    // Si hay por lo menos un item para focus lo ejecutamos, si no
    // no se hace nada.
    if (this.focus.length > 0) {
      this.focus[iTenidoNew].focus()
    }

    // Calculamos los tenidos.
    this.calcularTenidos(iPedido)
  }

  /**
   *Este objeto adminsta la suma de colores por pedido y la diferencia.
   *
   * @type {{ [iPed:number]: { total: number, diferencia: number }}}
   * @memberof FoliosCrearModificarComponent
   */
  sumaDeTenidos: { [iPed: number]: { total: number; diferencia: number } } = {}

  /**
   *Esta funcion junto con el paramentro sumaDeTenidos calculan el 
   total de pz a tenir por pedido. 
   *
   * @param {*} iPed
   * @memberof FoliosCrearModificarComponent
   */
  calcularTenidos(iPed) {
    let arrayColores: FormArray = <FormArray>(
      this.folioLineas_FB.at(iPed).get("coloresTenidos")
    )
    this.sumaDeTenidos[iPed] = { total: 0, diferencia: 0 }
    arrayColores.controls.map((x) => {
      this.sumaDeTenidos[iPed].total += Number(x.get("cantidad").value)
    })

    // Calcumalos la diferencia con el pedido.
    this.sumaDeTenidos[iPed].diferencia =
      this.folioLineas_FB.at(iPed).get("cantidad").value -
      (this.sumaDeTenidos[iPed].total | 0)
  }

  /**
   *Esta funcion dispara la validacion de coloresTenidos cuando se modifica el 
   pedido que corresponda el indice.
   *
   * @param {number} i el indice el pedido que se quiere actualizar. 
   * @memberof FoliosCrearModificarComponent
   */
  validarCambioDePedido(i: number) {
    this.folioLineas_FB
      .at(i)
      .get("coloresTenidos")
      .updateValueAndValidity()
  }

  /**
   *El ngModel para cargar el cliente. Solo se usa para cargar
   el input del datalist. 
   *
   * @type {string}
   * @memberof FoliosCrearModificarComponent
   */
  inputClienteNg: string = ""

  /**
   *El ngModel para cargar el modeloCompleto. solo se usa para 
   cargar el input del datalist.
   *
   * @type {string}
   * @memberof FoliosCrearModificarComponent
   */
  inputModeloCompletoNg: string[] = []

  marcasLaserNg: Laser[] = []
  cargarDatosParaEditar(f: Folio) {
    // Cargamos todos los diferentes datos a
    // modificar del cliente.

    this.idEditando = f._id
    this.folio = f
    this.cliente_FB.setValue(f.cliente._id)
    this.clienteSeleccionado = f.cliente
    this.clientes.push(f.cliente)
    this.inputClienteNg = f.cliente.nombre
    // --------------------------------------------

    this.observacionesVendedor_FB.setValue(f.observacionesVendedor)
    // Recoreemos los pedidos
    this.folioLineas_FB.removeAt(
      this.folioLineas_FB.length === 0 ? 1 : this.folioLineas_FB.length - 1
    )

    for (let i = 0; i < f.folioLineas.length; i++) {
      const pedido = f.folioLineas[i]

      this.agregarPedido()
      // Agregamos el modelo completo
      this.modeloCompleto_FB(i).setValue(pedido.modeloCompleto._id)
      this.modelosCompletos.push(pedido.modeloCompleto)
      this.inputModeloCompletoNg.push(pedido.modeloCompleto.nombreCompleto)
      // ------------------------------------------

      // Agreegamos la marca laser
      this.laserCliente_FB(i).setValue(pedido.laserCliente)

      // ------------------------------------------

      this.cantidad_FB(i).setValue(pedido.cantidad)

      this.almacen_FB(i).setValue(pedido.almacen)
      this.observacionesPed_FB(i).setValue(pedido.observaciones)

      // Todo lo demas para que no se pierda

      this.folioLineas_FB
        .at(i)
        .get("pedido")
        .setValue(pedido.pedido)
      this.folioLineas_FB
        .at(i)
        .get("porcentajeAvance")
        .setValue(pedido.porcentajeAvance)
      this.folioLineas_FB
        .at(i)
        .get("observacionesVendedor")
        .setValue(pedido.observacionesVendedor)
      this.folioLineas_FB
        .at(i)
        .get("fechaTerminado")
        .setValue(pedido.fechaTerminado)
      this.folioLineas_FB
        .at(i)
        .get("cantidadProducida")
        .setValue(pedido.cantidadProducida)

      // Recorremos los colores para tenir

      for (let t = 0; t < pedido.coloresTenidos.length; t++) {
        const colorTenido = pedido.coloresTenidos[t]

        this.agregarColorTenido(i)

        this.colorTenido_FB(i, t).setValue(colorTenido.color)
        this.cantidadTenido_FB(i, t).setValue(colorTenido.cantidad)
        this.observacionesTenido_FB(i, t).setValue(colorTenido.observaciones)
      }

      // Comprobamos si el boton tiene marca laser propia, de manera que no se puede laser aun cuando le demos modifcar.
      this.llevaMarcaLaserDesdeElModelo(i)
    }
  }

  /**
   *Esta funcion se encarga de comparar los laserados para asi obtener 
   la marca guardada desde el folio. 
   
   *
   * @param {Laser} val1
   * @param {Laser} val2
   * @returns {boolean}
   * @memberof FoliosCrearModificarComponent
   */
  compararLaserados(val1: Laser, val2: Laser): boolean {
    if (!val1 || !val2) return false
    return val1.laser === val2.laser
  }

  /**
   *El id que se almacena cuando un objeto se va a editar.
   *
   * @type {string}
   * @memberof FoliosCrearModificarAbstractoComponent
   */
  idEditando: string = null

  /**
   *Guarda o modifica los datos.
   *
   * @param {boolean} isValid
   * @param {*} e
   * @returns
   * @memberof FoliosCrearModificarAbstractoComponent
   */
  onSubmit(formulario: FormGroup, isValid: boolean, e) {
    let model: Folio = <Folio>this.formulario.getRawValue()

    e.preventDefault()

    if (!isValid) return false

    this.desactivarBotonEnGuardado = true
    let call = () => {
      this.desactivarBotonEnGuardado = false
      this.seModifico.emit()
      this.cancelar()
    }

    // Si es una edicion agregamos el id.
    if (this.idEditando) {
      model["_id"] = this.idEditando
      this._folioNewService.modificar(model).subscribe(call)
      return
    }
    // Guardamos los datos.
    this._folioNewService.guardar(model).subscribe(call)
  }

  @Output() cancelado = new EventEmitter<any>()

  @Output() seModifico = new EventEmitter<any>()
  @Output() esteComponente = new EventEmitter<
    FoliosCrearModificarAbstractoComponent
  >()

  cancelar() {
    this.cancelado.emit()
    this.limpiar()
    this.idEditando = null
  }

  /**
   *Limpia los datos despues de cancelar, guardar o modifcar.
   *
   * @memberof
   */
  limpiar() {
    this.formulario.reset()
  }

  comprobandoModeloLaserado = {}

  llevaMarcaLaserDesdeElModelo(iPed: number) {
    //Obtenemos el modelo completo seleccionado

    this.laserCliente_FB(iPed).disable()
    this.almacen_FB(iPed).disable()

    this.comprobandoModeloLaserado[iPed] = true

    let id: string = this.modeloCompleto_FB(iPed).value
    if (!id) {
      this.comprobandoModeloLaserado[iPed] = false
      return
    }

    if (!id && id.trim().length !== 24) {
      this.comprobandoModeloLaserado[iPed] = false
      return
    }

    this._modelosCompletosService
      .findById(id, undefined, undefined, ModeloCompleto)
      .subscribe((mc) => {
        this.comprobandoModeloLaserado[iPed] = false

        if (!this.compruebaQueTieneUnaMarcaLaser(mc)) {
          this.laserCliente_FB(iPed).enable()
          this.almacen_FB(iPed).enable()
        } else {
          //Comprobamos que el cliente no tenga la marca laser actualmente.

          let existeMarcaLaser = this.clienteSeleccionado.laserados.find(
            (laserado) => laserado.laser === mc.laserAlmacen.laser
          )

          if (!existeMarcaLaser) {
            let titulo = "Marca laser invalida para el cliente"
            let msj =
              "El modelo que seleccionaste requiere laserar pero el cliente no tiene registrada la marca. Es necesario que control de produccion de de alta la marca para el cliente."

            this._msjService.invalido(msj, titulo, 10000)
            this.modeloCompleto_FB(iPed).setValue("")
            this.inputModeloCompletoNg[iPed] = ""
          } else {
            this.laserCliente_FB(iPed).setValue(mc.laserAlmacen)
          }
        }
        mc._servicio = this._modelosCompletosService
        mc.obtenerProduccionEnTransito()
        this.modeloCompletoPorPedido[iPed] = mc
      })
  }

  compruebaQueTieneUnaMarcaLaser(mc: ModeloCompleto) {
    let deptoLaser = DEPARTAMENTOS.LASER._n
    if (!mc) return false

    // El modelo completo tiene definida una marca laser
    if (mc.laserAlmacen.laser.trim().length > 0) return true

    // Existe por lo menos un departamento que senale a laser dentro de la familia de procesos.
    for (let i = 0; i < mc.familiaDeProcesos.procesos.length; i++) {
      const proceso = mc.familiaDeProcesos.procesos[i].proceso
      if (proceso.departamento.nombre === deptoLaser) return true
    }

    // Existe por lo menoss un departamento que senale a laser dentro de los procesos especiales.
    for (let i = 0; i < mc.procesosEspeciales.length; i++) {
      const proceso = mc.procesosEspeciales[i].proceso
      if (proceso.departamento.nombre === deptoLaser) return true
    }

    // No hay una marca laser definida para el modelo de manera puntual
    //en los procesos o en la familiaDeprocesos, incluso en el modelo mismo
    //por lo tanto podemos habilitar los controles
    return false
  }

  comprobarModeloLaseradoFun(i: number): boolean {
    return this.comprobarModeloLaseradoFun[i]
  }
}
