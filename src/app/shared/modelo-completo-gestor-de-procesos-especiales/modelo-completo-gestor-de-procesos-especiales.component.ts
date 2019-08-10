import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Self
} from "@angular/core"
import { ModeloCompleto } from "../../models/modeloCompleto.modelo"
import { ModeloCompletoService } from "../../services/modelo/modelo-completo.service"
import { OrganizadorDragAndDropService } from "../../components/organizador-drag-and-drop/organizador-drag-and-drop.service"
import { Proceso } from "src/app/models/proceso.model"
import { DndObject } from "src/app/components/organizador-drag-and-drop/models/dndObject.model"
import { FamiliaDeProcesosService } from "../../services/proceso/familia-de-procesos.service"
import { ProcesoService } from "../../services/proceso/proceso.service"
import { PaginadorAbstractoComponent } from "../paginador-abstracto/paginador-abstracto.component"
import { FolioLinea } from "../../models/folioLinea.models"
import { DefaultsService } from "../../services/configDefualts/defaults.service"
import { DefaultModelData } from "../../config/defaultModelData"
import { OrganizadorDragAndDrop } from "../../components/organizador-drag-and-drop/models/organizador-drag-and-drop.model"
import { Procesos } from "src/app/models/procesos.model"
import { filter } from "rxjs/operators"

@Component({
  selector: "app-modelo-completo-gestor-de-procesos-especiales",
  templateUrl: "./modelo-completo-gestor-de-procesos-especiales.component.html"
})
export class ModeloCompletoGestorDeProcesosEspecialesComponent
  implements OnInit {
  /**
   *Este modelo completo temporal no sirve para estructurar los procesos
   * y obtener el orden de los especiales. Es necesario definirlo.
   *
   * @type {ModeloCompleto}
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  @Input() mctemp: ModeloCompleto = null

  /**
   *Retorna este componente.
   *
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  @Output() esteComponente = new EventEmitter<this>()

  /**
   *La lista de procesos cargados desde la bd
   *
   * @type {Proceso[]}
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  procesos: Proceso[] = null

  /**
   *El paginador abstracto.
   *
   * @type {PaginadorAbstractoComponent}
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  paginador: PaginadorAbstractoComponent

  /**
   *Bandera para mostrar la informacion de debugueo.
   *
   * @type {boolean}
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  @Input() debug: boolean = false

  @Input() pedido: FolioLinea

  defaultModelData: DefaultModelData

  leyenda: string = " Arrastra procesos de la lista para agregarlos."

  procesosBasicos: {
    CONTROL_DE_PRODUCCION: Proceso
    LASER: Proceso
    ALMACEN_DE_BOTON: Proceso
    PRODUCTO_TERMINADO: Proceso
    EMPAQUE: Proceso
    SELECCION: Proceso
    LAVADO: Proceso
    TRANSFORMACION_1ER_PASO: Proceso
  } = {
    CONTROL_DE_PRODUCCION: null,
    LASER: null,
    ALMACEN_DE_BOTON: null,
    PRODUCTO_TERMINADO: null,
    EMPAQUE: null,
    SELECCION: null,
    LAVADO: null,
    TRANSFORMACION_1ER_PASO: null
  }

  procesosIniciales: Proceso[] = []
  procesosFinales: Proceso[] = []

  constructor(
    public _smc: ModeloCompletoService,
    public _dndService: OrganizadorDragAndDropService<Proceso>,
    public _familiaService: FamiliaDeProcesosService,
    public _procesoService: ProcesoService,
    public _defaultsService: DefaultsService
  ) {}

  ngOnInit() {
    this.esteComponente.emit(this)

    this._defaultsService.cargarDefaults().subscribe((d) => {
      this.defaultModelData = d
      this.obtenerProcesoBasicos()
    })
  }

  inicializar() {
    this._procesoService
      .todoAbstracto(1, 5, Proceso)
      .subscribe(this.primeraCargaDeProcesos)

    this._dndService.leyendaListaSeleccionable = this.leyenda
  }

  primeraCargaDeProcesos = (procesos) => {
    this.procesos = procesos

    this.cargarProcesos(this.procesos)

    // Preparando paginador.
    let intervaloDeEsperaPaginador = setInterval(() => {
      if (this.paginador) {
        clearInterval(intervaloDeEsperaPaginador)
        this.paginador.totalDeElementos = this._procesoService.total
        this.paginador.inciarPaginador()
        this.paginador.cargandoDatos = false
      }
    }, 100)

    // Necesitamos saber si este pedido tiene alguno de los siguientes trayectos.

    /**
     * x. Es de almacen y no va laserado.
     * x. Es de almacen y va laserado.
     * x. No es de almacen y va laserado.
     *
     *
     */

    this.comprobarProcesosACargar()
  }

  comprobarProcesosACargar() {
    let cb = null

    let surtir = !!this.pedido.almacen
    let laserar = !!this.pedido.laserCliente.laser

    if (surtir) {
      cb = this.comprobarSiSeLaseraCuandoSeSurte(laserar)
    } else {
      // No se surte, pero si se lasera.
      cb = laserar ? this.noSeSurteDeAlmacenYVaLaserado : null
    }

    // Si no se surte o no se lasera no se debe de mostrar
    // el componente.

    if (cb) {
      cb(this)
    }
  }

  comprobarSiSeLaseraCuandoSeSurte(laserado: boolean): any {
    // Se surte
    return laserado
      ? this.seSurteDeAlmacenYVaLaserado
      : this.seSurteDeAlmacenYNoVaLaserado
  }

  /**
   *Carga la estructura necesaria para la trayectoria que viene desde el 
   almacen y no requiere laserado. Deja un area dnd para que el usuario
   cargue los procesos que necesite. 
   *
   * @param {this} self Requerimos el self por que en el contexto 
   * que llamamos a esta funcion ( los callback para saber a donde va)
   * perdemos el this. Asi que lo paso como un parametro para el cb. 
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  seSurteDeAlmacenYNoVaLaserado(self: this) {
    // Limpiamos la lista dnd, pero no toda, solo los objetos que se
    // pueden modificar.
    self._dndService.limpiarListaDeObjetosSeleccionados_Destruir()
    // Los procesos que tienen que llevar todos las trayectorias.
    self.cargarProcesosPorDefault()

    // Generamos la nueva area. Dentro ira el padre fijo.
    let keyArea = "1"
    let organizador = self._dndService.nuevaArea(keyArea)

    // Creamos el padre fijo(azul) en el que vamos a poder
    // arrastrar los procesos.
    organizador
      .setPadre()
      .setEliminable(false)
      .setLeyenda("Procesos para este pedido")
      .setOrden("1")

    // Actualiamos el orden del proceso
    self._dndService.actualizarPropiedadOrden()

    // Si hay procesos ya cargados con anterioridad
    // esta linea se encarga de mostrarlos.
    if (self.pedido.procesos.length > 0) {
      self.cargarProcesosEnPedido(
        self,
        organizador,
        self.contadorOmisionProcesos,
        self.pedido.procesos.length,
        2,
        3
      )
    }

    // Actualizamos el drop success por que es el que
    // guarda la estructura de los procesos dentro
    // del pedido, si no lo ejectuamos no vamos a poder
    // tener la estructura correcta.
    self.dropSuccess()
  }

  /**
   *Contador para saber la posicion de los procesos dentro del array que
   estamos comprobando para saber si lo omitimos o no tomando como comparacion los procesos por defecto que agregamos y que deben ser los 2 primeros o los 2 o 3 ultimos.
   *
   * @private
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  private contadorOmisionProcesos = 0
  /**
   *Cuando un pedido ha sido modificado carga los procesos omitiendo
   .los que se cargan por defecto y que no son modificables. 
   *
   * @private
   * @param {this} self El contexto this que perdimos en los cb anteriores. 
   * @param {OrganizadorDragAndDrop<Proceso>} organizador El organizados para 
   * crear los dnd y poder modificarlos
   * @param {number} contador El contador global que da la posicion dentro
   * del arreglo para saber si son los 2 primeros, o 2 o3 ultimos. 
   * @param {number} total El tamano total del arreglo de procesos del pedido 
   * @param {number} procesosAlInicio La cantidad de procesos al inicio que 
   * vamos a omitir.
   *  @param {number} procesosAlFinal La cantidad de procesos al final que  
   * vamos a omitir. 
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  private cargarProcesosEnPedido(
    self: this,
    organizador: OrganizadorDragAndDrop<Proceso>,
    contador: number,
    total: number,
    procesosALInicio: number,
    procesosAlFinal: number
  ) {
    // Reiniciamos el contador.
    this.contadorOmisionProcesos = 0
    let pedido = self.pedido

    // Recorremos todos los procesos del pedido
    // para escoger los que no son por defecto.
    pedido.procesos.forEach((procesos) => {
      if (
        !self.omitirProcesos(contador, total, procesosAlFinal, procesosALInicio)
      ) {
        // Creamos el dnd para cada proceso que paso
        // el filtro.
        organizador.hijos
          .addOrdenable()
          .setEliminable(true)
          .setLeyenda(procesos.proceso.nombre)
          .setLeyendaOptativa(procesos.proceso.departamento.nombre)
          .setOrden(procesos.orden)
          .setObjeto(procesos.proceso)
      }
      // Aumentamos uno al contador.
      contador++
    })

    self._dndService.actualizarPropiedadOrden()
  }

  /**
   *Ejecuta las validaciones necesarias para filtrar los pedidos que esten
   * entre los valores por defecto que deben de ser los 2 primeros y los 2 o 3 * ultimos.
   *
   * @private
   * @param {number} contador El contador global que da la posicion dentro
   * del arreglo para saber si son los 2 primeros, o 2 o3 ultimos.
   * @param {number} total El tamano total del arreglo de procesos del pedido
   * que se esta analizando.
   * @param {number} procesosAlFinal La cantidad de procesos al final que vamos
   * a omitir.
   * @param {number} procesosAlInicio La cantidad de procesos al inicio que vamo a omitir.
   * @returns {boolean}
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  private omitirProcesos(
    contador: number,
    total: number,
    procesosAlFinal: number,
    procesosAlInicio: number
  ): boolean {
    // Los procesos por defecto siempre se van a almacenar por que no
    // podemos eliminarlos (en teoria el usuario no puede decidir si estos
    // aparecen o no) asi que si la cantidad de procesos por defectos ( al
    // inicio y al final) es igual al total de elementos que tiene el
    // arreglo entonces no debemos permitir que ningun procesos se muestre.
    if (procesosAlFinal + procesosAlInicio === total) return true

    // Hay mas procesos definidos que los que son por defecto, entonces
    // omitimos los procesosAlInicio:number si con mayorees al contador.
    if (contador < procesosAlInicio) return true

    // Omitimos los procesos al final pero aqui hay que hacer un ajuste con
    // -1 por que total:number no empieza desde 0, si no que empieza desde 1
    //  puesto que es el total de un arreglo (arreglo.lengt)
    if (contador > total - 1 - procesosAlFinal) return true

    // Si no retornamos nada entonces retorna false
  }

  /**
   *Carga los defectos por default para cuando un boton viene
   de el almacen.
   *
   * @private
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  private cargarProcesosPorDefault() {
    this.procesosIniciales = []
    this.procesosIniciales.push(this.procesosBasicos.CONTROL_DE_PRODUCCION)
    this.procesosIniciales.push(this.procesosBasicos.ALMACEN_DE_BOTON)

    this.procesosFinales = []
    this.procesosFinales.push(this.procesosBasicos.SELECCION)
    this.procesosFinales.push(this.procesosBasicos.EMPAQUE)
    this.procesosFinales.push(this.procesosBasicos.PRODUCTO_TERMINADO)
  }

  /**
   *Carga los procesos necesario para un pedido que se
   * surte desde almacen y va laserado
   *
   * @param {this} self
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  seSurteDeAlmacenYVaLaserado(self: this) {
    // Necesitamos conseguir los dos departamentos.

    self._dndService.limpiarListaDeObjetosSeleccionados_Destruir()
    self.cargarProcesosPorDefault()

    // Agregamos tambien lavado de manera fija al principio de
    // procesosFinales.
    self.procesosFinales.unshift(self.procesosBasicos.LAVADO)
    let organizador = self.crearAreaDnd("1", "Procesos para este pedido", 1)

    // Actualiamos el orden del proceso
    self._dndService.actualizarPropiedadOrden()

    // Si hay procesos ya cargados con anterioridad
    // esta linea se encarga de mostrarlos.
    if (self.pedido.procesos.length > 0) {
      self.cargarProcesosEnPedido(
        self,
        organizador,
        self.contadorOmisionProcesos,
        self.pedido.procesos.length,
        2,
        4
      )
    }

    // Agrega el proceso de laser, que debe de ser
    // ordenable pero no eliminable.

    self.agregarLaserOrdenable(self, organizador)

    // Actualizamos el drop success por que es el que
    // guarda la estructura de los procesos dentro
    // del pedido, si no lo ejectuamos no vamos a poder
    // tener la estructura correcta.
    self.dropSuccess()
  }

  /**
   *Esta funcion prevee si hay procesos existententes en el pedido
   y si los hay, revisa el laser y lo crea.
   *
   * @private
   * @param {this} self
   * @param {OrganizadorDragAndDrop<Proceso>} organizador
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  private agregarLaserOrdenable(
    self: this,
    organizador: OrganizadorDragAndDrop<Proceso>
  ) {
    // Debe existir por lo menos un laser.

    let laserPedido = self.pedido.procesos.find(
      (proc) => proc.proceso._id === self.procesosBasicos.LASER._id
    )

    if (laserPedido) {
      // Busca el proceso de laserado (el primero que se encuentre si hay
      // varios) y lo convierte en no eliminable, solo arrastrable.
      organizador.hijos.ordenables
        .find((hijo) => hijo.objeto._id === self.procesosBasicos.LASER._id)
        .setEliminable(false)
    } else {
      // No existe el prceso laser, entonces es necesario que lo creemos.

      organizador.hijos
        .addOrdenable()
        .setEliminable(false)
        .setLeyenda(self.procesosBasicos.LASER.nombre)
        .setLeyendaOptativa(self.procesosBasicos.LASER.departamento.nombre)
        .setObjeto(self.procesosBasicos.LASER)
    }
  }

  /**
   *Despues de que se cargan los id por defectos esta funcion se encarga
   * de organizar los procesoso por default y los carga en this.procesosBasicos
   *
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  obtenerProcesoBasicos() {
    let arregloDeBusqueda = []

    for (const key in this.defaultModelData.PROCESOS) {
      if (this.defaultModelData.PROCESOS.hasOwnProperty(key)) {
        const element = this.defaultModelData.PROCESOS[key]
        arregloDeBusqueda.push(element)
      }
    }

    this._procesoService
      .findById_multiple(arregloDeBusqueda)
      .subscribe((procesos) => {
        this.procesosBasicos.CONTROL_DE_PRODUCCION = this.buscarProceso(
          procesos,
          this.defaultModelData.PROCESOS.CONTROL_DE_PRODUCCION
        )

        this.procesosBasicos.LASER = this.buscarProceso(
          procesos,
          this.defaultModelData.PROCESOS.LASER
        )

        this.procesosBasicos.ALMACEN_DE_BOTON = this.buscarProceso(
          procesos,
          this.defaultModelData.PROCESOS.ALMACEN_DE_BOTON
        )

        this.procesosBasicos.PRODUCTO_TERMINADO = this.buscarProceso(
          procesos,
          this.defaultModelData.PROCESOS.PRODUCTO_TERMINADO
        )

        this.procesosBasicos.EMPAQUE = this.buscarProceso(
          procesos,
          this.defaultModelData.PROCESOS.EMPAQUE
        )
        this.procesosBasicos.SELECCION = this.buscarProceso(
          procesos,
          this.defaultModelData.PROCESOS.SELECCION
        )
        this.procesosBasicos.LAVADO = this.buscarProceso(
          procesos,
          this.defaultModelData.PROCESOS.LAVADO
        )
        this.procesosBasicos.TRANSFORMACION_1ER_PASO = this.buscarProceso(
          procesos,
          this.defaultModelData.PROCESOS.TRANSFORMACION_1ER_PASO
        )
      })
  }

  private buscarProceso(procesos: Proceso[], id: string): Proceso {
    if (!id) throw "No"

    return procesos.find((proceso) => proceso._id == id)
  }

  /**
   *Cuando el boton no se se surten de almacen y si va laserado hay
   *que asegurarse de que si esta el proceso de laserado.
   *
   * @param {this} self
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  noSeSurteDeAlmacenYVaLaserado(self: this) {
    /**
     * Lleva el control del orden de los procesos
     */
    let contador = 0
    //Limpiamos la lista de objetos.
    self._dndService.limpiarListaDeObjetosSeleccionados_Destruir()

    // Agregamos todos los pedidos que va
    let organizador: OrganizadorDragAndDrop<Proceso> = null
    self.pedido.modeloCompleto.familiaDeProcesos.procesos.forEach(
      (procesos) => {
        organizador = self.crearAreaDnd(
          procesos.proceso._id,
          procesos.proceso.nombre,
          contador,
          procesos.proceso.departamento.nombre
        )

        self._dndService.actualizarPropiedadOrden()

        contador++
      }
    )

    self.noSeSurteDeAlmacenYVaLaserado_pedidosExistentes(self)
    self.noSeSurteDeAlmacenYVaLaserado_cargarLaser(self)

    self.dropSuccess()
  }

  private noSeSurteDeAlmacenYVaLaserado_pedidosExistentes(self: this) {
    // Revisamos si el pedido ya tiene procesos especiales agregados.
    
    let yaHayUnLaserNoEliminable: boolean = false
    if (self.pedido.procesos.length > 0) {
      // Si hay pedidos tenemos que cargarlos en donde corresponde.

      /**
       * Obtenemos los procesos de la familia (modelo completo)
       * para itinerar sobre ellos. Es un facilitador que
       * viene desde ``` self.pedido.modeloCompleto.familiaDeProcesos.procesos```
       */
      let procesosDesdeFamilia =
        self.pedido.modeloCompleto.familiaDeProcesos.procesos
      //Itineramos sobre cada proceso para obtener padre ( en el dnd )
      // y asignar los hijos que le correspondan.
      procesosDesdeFamilia.forEach((procesos_Padre) => {

        /**
         * Los datos de este padre.
         */
        let estePadre = {
          /**
           * El id del padre que viene del `proceso` dentro de `procesos`
           */
          _id: procesos_Padre.proceso._id,
          /**
           * Obtenemos el orden del padre desde el objeto procesos
           * que estamos itinerando.
           *
           */
          orden: procesos_Padre.orden,
          
        }

        // Recorremos los pedidos que estan almacenados en los
        // procesos especiales para filtrar solo los que
        // perteneces al padre de los procesos
        self.pedido.procesos
          .filter((objetoProcesos) => {
            // Obtenemos el orden del proceso para saber
            // si a este padre se lo vamos a asignar.
            let padreInt = objetoProcesos.orden.split(".")[0]
           
            return estePadre.orden == padreInt
          })
          .forEach((procsPedidosEspeciales) => {

            // Debe de haber un laser que no sea eliminable
            // y solo una vez. Asi que lo comprobamos una 
            // unica ocasion
            let eliminable = true
            if( !yaHayUnLaserNoEliminable ){
              eliminable =
             !( procsPedidosEspeciales.proceso._id ===
              this.procesosBasicos.LASER._id)
              if( !eliminable ) yaHayUnLaserNoEliminable = true
            }

            this._dndService
              .obtenerObjetoPadre(estePadre._id)
              .hijos.addOrdenable()
              .setEliminable(eliminable)
              .setLeyenda(procsPedidosEspeciales.proceso.nombre)
              .setLeyendaOptativa(
                procsPedidosEspeciales.proceso.departamento.nombre
              )
              .setObjeto(procsPedidosEspeciales.proceso)
              .setOrden(procsPedidosEspeciales.orden)
          })
      })
    }
  }

  /**
   * Comprueba si existe por lo menos una vez el departamento de
   * laser en los pedidos
   *
   * @private
   * @param {this} self
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  private noSeSurteDeAlmacenYVaLaserado_cargarLaser(self: this) {
    // Existe laser en algun momento? Debemos revisar si existe
    // en los padres o en los hijos.

    // Lo mas comun es que exista en los padres

    let existeEnPadre = self._dndService
      .keys()
      .find((k) => self.procesosBasicos.LASER._id === k)

    // Si existe en el padre pues ya no ocupamos hacer nada, pero si no
    // existe entonces tenemos que asegurarnos que no existe en los hijos.
    if (!existeEnPadre) {
      //No existe. hay que buscar en los hijos.
      let existeEnHijo = self._dndService.existeObjectoPorCampo(
        self.procesosBasicos.LASER._id
      )
      
      if (!existeEnHijo) {
        // No existe en hijo. Hay que agregarlo.
        // Si no existe tenemos que agregarlo y de preferencia despues
        // del primer paso.

        //Hay transformacion primer paso? Siempre que se fabrica un boton
        // debe de haber primer paso.

        // Si hay transformacion. Obtenemos el padre para agregarle un hijo
        self._dndService
          .obtenerObjetoPadre(self.procesosBasicos.TRANSFORMACION_1ER_PASO._id)
          .hijos.addOrdenable()
          .setEliminable(false)
          .setLeyenda(self.procesosBasicos.LASER.nombre)
          .setLeyendaOptativa(self.procesosBasicos.LASER.departamento.nombre)
          .setObjeto(self.procesosBasicos.LASER)

        self._dndService.actualizarPropiedadOrden()
      }
    } 


  }

  private crearAreaDnd(
    nombreDeArea: string,
    leyenda: string,
    orden: number,
    optativa: string = "",
    eliminable: boolean = false
  ): OrganizadorDragAndDrop<Proceso> {
    let organizador = this._dndService
      .nuevaArea(nombreDeArea)
      .setPadre()
      .setEliminable(eliminable)
      .setLeyenda(leyenda)
      .setLeyendaOptativa(optativa)
      .setOrden(orden + "").dnd

    return organizador
  }

  /**
   *Genera los datos del paginador para el modelo seleccionado.
   *
   * @param {ModeloCompleto} mc
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  cargarLosProcesosPorDefault(mc: ModeloCompleto) {
    // Este es con fines de debugueo

    // this.mctemp = mc
    // ---------------------------
    this._dndService.leyendaListaSeleccionable =
      "Arrastra procesos de la lista para agregarlos."
    mc.familiaDeProcesos.procesos.forEach((procesos) => {
      let keyArea = procesos.orden.toString().split(".")[0]
      this._dndService
        .nuevaArea(keyArea)
        .setPadre()
        .setEliminable(false)
        .setLeyenda(procesos.proceso.nombre + " " + keyArea)
        .setLeyendaOptativa(procesos.proceso.departamento.nombre)
        .setOrden(procesos.orden)
        .setObjeto(procesos.proceso)
    })
    this._dndService.actualizarPropiedadOrden()
  }

  /**
   *Genera la lista del paginador para seleccionar.
   *
   * @param {Proceso[]} procesos
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  cargarProcesos(procesos: Proceso[]) {
    this._dndService.limpiarListaDeElementos()
    procesos.forEach((proceso) => {
      let a = new DndObject<Proceso>()
      a.setEliminable(true)
        .setLeyenda(proceso.nombre)
        .setLeyendaOptativa(proceso.departamento.nombre)
        .setObjeto(proceso)
      this._dndService.listaDeElementos.push(a)
    })
  }

  /**
   *Carga los dato de la lista a procesosEspecialesSeleccionados.
   *
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  dropSuccess() {
    if (this.pedido.almacen) {
      this.dropSuccess_vieneDeAlmacen()
    } else {
      this.dropSuccess_noVieneDeAlmacen()
    }
  }

  /**
   * Carga los pedidos para los procesos que se agregan a los
   * pedidos que no viene de almacen.
   *
   * @private
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  private dropSuccess_noVieneDeAlmacen() {
    // aqui estamos trabajando necesitamos
    // obtener los pedidos que no vienen desde
    // almacen!!! y guardar sus pedidos!

    this.pedido.procesos = []

    this._dndService.obtenerHijosOrdenables().forEach((dnd) => {
      let prcs = new Procesos()
      prcs.orden = dnd.orden
      prcs.proceso = dnd.objeto
      this.pedido.procesos.push(prcs)
    })
  }

  private dropSuccess_vieneDeAlmacen() {
    this._dndService.actualizarPropiedadOrden()
    let procesosEspecialesDePedido: Procesos[] = []

    // Cargamos los procesos de inicializacion al pedido
    let contador = 0
    this.procesosIniciales.forEach((proceso) => {
      procesosEspecialesDePedido.push(
        this.generarProcesos("0" + contador + "", proceso)
      )

      contador++
    })

    // Cargamos los procesos seleccionables al pedido.
    this._dndService.obtenerHijosOrdenables().forEach((dnd) => {
      procesosEspecialesDePedido.push(
        this.generarProcesos("1" + contador + "", dnd.objeto)
      )
    })

    // Cargamos los procesos finales al pedido.
    let contador2 = 0
    this.procesosFinales.forEach((proceso) => {
      procesosEspecialesDePedido.push(
        this.generarProcesos("2" + contador2 + "", proceso)
      )

      contador2++
    })

    this.pedido.procesos = procesosEspecialesDePedido

  }

  private generarProcesos(orden: string, objeto: Proceso): Procesos {
    let procesos = new Procesos()
    procesos.orden = orden
    procesos.proceso = objeto

    return procesos
  }
  /**
   *Ejecuta los procesos necesario y consultas para hacer el cambio de pagina
   en la lista de elementos del dnd.
   *
   * @param {{ ["limite"]: number; ["desde"]: number }} e
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  cambiarPagina(e: { ["limite"]: number; ["desde"]: number }) {
    this._procesoService
      .todoAbstracto(e.desde, e.limite, Proceso)
      .subscribe((datos) => {
        this.procesos = datos
        this._dndService.limpiarListaDeElementos()
        this.cargarProcesos(datos)
        this.paginador.totalDeElementos = this._procesoService.total
        this.paginador.cargaDePaginador(false)
      })
  }

  revisarPedido(pedido: FolioLinea) {
    pedido.requiereRevisionExtraordinaria = !pedido.requiereRevisionExtraordinaria
  }
}
