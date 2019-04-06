import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.models';
import { Usuario } from 'src/app/models/usuario.model';
import { Modelo } from 'src/app/models/modelo.models';
import { Tamano } from 'src/app/models/tamano.models';
import { Color } from 'src/app/models/color.models';
import { Terminado } from 'src/app/models/terminado.models';
import { Folio } from 'src/app/models/folio.models';
import { ClienteService, UsuarioService, ModeloService, TamanoService, ColorService, TerminadoService, SortService } from 'src/app/services/service.index';
import { ReportesProduccionService } from 'src/app/services/reportes/reportes-produccion.service';

@Component({
  selector: 'app-grupo-de-filtro',
  templateUrl: './grupo-de-filtro.component.html',
  styles: []
})
export class GrupoDeFiltroComponent implements OnInit {

  /**
   *Emite los datos que se seleccionaron para filtrar cuando se pulsa el boton de filtro. 
   *
   * @memberof GrupoDeFiltroComponent
   */
  @Output() obtenerFiltros = new EventEmitter<GrupoDeFiltroComponent>()
  
  @Output() obtenerEsteComponente = new EventEmitter<GrupoDeFiltroComponent>()



  /**
   * Cuanto esta en true muestra los filtros que se pueden utilizar para
   * filtrar pedidos. Cuando esta en false los oculta. Usa un ngif. 
   *
   * @type {boolean}
   * @memberof GrupoDeFiltroComponent
   */
  @Input() filtrarParaPedido: boolean = false


  /**
   *La lista de clientes
   *
   * @type {Cliente []}
   * @memberof HistorialDePedidosComponent
   */
  clientes: Cliente [] = []
  /**
   *El cliente que se selecciono de la lista. 
   *
   * @type {Cliente}
   * @memberof HistorialDePedidosComponent
   */
  clienteSeleccionado: Cliente

  /**
   *La lista de vendedores. 
   *
   * @type {Usuario []}
   * @memberof HistorialDePedidosComponent
   */
  vendedores: Usuario [] = []
  /**
   *El vendedor que se elecciono de la lista. 
   *
   * @type {Usuario}
   * @memberof HistorialDePedidosComponent
   */
  vendedorSeleccionado: Usuario 
  
  /**
   *La lista de modelos. 
   *
   * @type {Modelo []}
   * @memberof HistorialDePedidosComponent
   */
  modelos: Modelo [] = []
  /**
   *El modelo que se selecciono de la lista. 
   *
   * @type {Modelo}
   * @memberof HistorialDePedidosComponent
   */
  modeloSeleccionado: Modelo 
  
  /**
   *La lista de tamanos. 
   *
   * @type {Tamano []}
   * @memberof HistorialDePedidosComponent
   */
  tamanos: Tamano [] = []
  /**
   *El tamano que se selecciono de la lista. 
   *
   * @type {Tamano}
   * @memberof HistorialDePedidosComponent
   */
  tamanoSeleccionado: Tamano 
  
  /**
   *La lista de colores.
   *
   * @type {Color []}
   * @memberof HistorialDePedidosComponent
   */
  colores: Color [] = []
  /**
   *El color que se selecciono de la lista. 
   *
   * @type {Color}
   * @memberof HistorialDePedidosComponent
   */
  colorSeleccionado: Color

  /**
   *La lista de terminados. 
   *
   * @type {Terminado []}
   * @memberof HistorialDePedidosComponent
   */
  terminados: Terminado [] = []
  /**
   *El terminado que se selecciono de la lista. 
   *
   * @type {Terminado}
   * @memberof HistorialDePedidosComponent
   */
  terminadoSeleccionado: Terminado 


  /**
   *El dato introducido para buscar por folio.numeroDeFolio
   *
   * @type {string}
   * @memberof HistorialDePedidosComponent
   */
  folio: string
  /**
   *El dato introducido para buscar por folio.folioLinea.pedido
   *
   * @type {string}
   * @memberof HistorialDePedidosComponent
   */
  pedido: string

  /**
   *La fecha de creacion desde la cual se van a empezar a filtrar los folios. 
   *
   * @type {Date}
   * @memberof HistorialDePedidosComponent
   */
  fechaDeCreacionDesdeEl: Date 
  /**
   *La fecha de creacion hasta la cual se va a filtrar los folios. 
   *
   * @type {Date}
   * @memberof HistorialDePedidosComponent
   */
  fechaDeCreacionHasta: Date 
  
  /**
   *La fecha de entrega estimada desde la cual se van a empezar a filtrar los folios.  
   *
   * @type {Date}
   * @memberof HistorialDePedidosComponent
   */
  fechaEntregaEstimadaDesdeEl: Date 
  /**
   *La fecha de entrega estimada hsta la cual se van a filtrar los folios. 
   *
   * @type {Date}
   * @memberof HistorialDePedidosComponent
   */
  fechaEntregaEstimadaHasta: Date 
  
  /**
   *La fecha de finializacion del folio desde la cual se van a empezar a filtrar los folios. 
   *
   * @type {Date}
   * @memberof HistorialDePedidosComponent
   */
  fechaFinalizacionFolioDesdeEl: Date 
  /**
   *La fecha de finalizacion del folio hasta la cal se van a filtrar los folios. 
   *
   * @type {Date}
   * @memberof HistorialDePedidosComponent
   */
  fechaFinalizacionFolioHasta: Date 



  /**
   *Los campos por los cuales se van a ordenar los folios. 
   *
   * @type {string[]}
   * @memberof HistorialDePedidosComponent
   */
  sortCampos: string[] = []


  /**
   *La lista de folios que coincidio contra los filtros que se aplicaron. 
   *
   * @type {Folio []}
   * @memberof HistorialDePedidosComponent
   */
  folios: Folio [] = []


  /**
   *Almacena los inputs list para limpiarlos. Es necesario esto por que
   con el ngmodelo no se limpia todo lo que necesitamos.
   *
   * @memberof HistorialDePedidosComponent
   */
  objetoParaLimpieza = {}

  constructor(
    public _clienteService: ClienteService,
    public _usuarioService: UsuarioService,
    public _modeloService: ModeloService,
    public _tamanoService: TamanoService,
    public _colorService: ColorService,
    public _terminadoService: TerminadoService,
    public _sortService : SortService,
    public _reporteProduccionService: ReportesProduccionService
  ) { 

    this.limpiar()

    this._clienteService.listarTodo = true;
    this._clienteService.todo( ).subscribe( (clientes)=>{this.clientes = clientes} )
    
    this._usuarioService.cargarVendedores().subscribe( (vendedores)=>{this.vendedores = vendedores} )
    
    this._modeloService.listarTodo = true
    this._modeloService.todo().subscribe( (modelos)=>{this.modelos = modelos} )

    this._tamanoService.listarTodo = true
    this._tamanoService.todo().subscribe( (tamanos)=>{this.tamanos = tamanos})

    this._colorService.listarTodo = true
    this._colorService.todo().subscribe((colores)=>{this.colores = colores} )
  
    this._terminadoService.listarTodo = true
    this._terminadoService.todo().subscribe((terminados)=>{this.terminados = terminados} )


  }

  ngOnInit() {

    this.obtenerEsteComponente.emit( this )
  }

  /**
   * Selecciona el cliente y lo agrega para limpiar. 
   *
   * @param {*} cli
   * @memberof HistorialDePedidosComponent
   */
  seleccionarCliente( cli: any ){
    this.clienteSeleccionado = this.clientes.find( (cliente)=>{return cliente.nombre === cli.value} )
    this.agregarParaLimpiar(  cli )
  }

  /**
   *Selecciona el vendedor y lo agrega limpiar
   *
   * @param {*} vend
   * @memberof HistorialDePedidosComponent
   */
  seleccionarVendedor( vend: any ){
    this.vendedorSeleccionado = this.vendedores.find( (vendedor)=>{return vendedor.nombre === vend.value} )
    this.agregarParaLimpiar(  vend )
  }

  /**
   *Selecciona el modelo y lo agrega para limpiar. 
   *
   * @param {*} mod
   * @memberof HistorialDePedidosComponent
   */
  seleccionarModelo( mod: any ){
    this.modeloSeleccionado = this.modelos.find((modelo)=>{return modelo.modelo === mod.value} )
    this.agregarParaLimpiar(  mod )
  }

  seleccionarTamano( tam: any ) {
    this.tamanoSeleccionado = this.tamanos.find((tamano)=>{return tamano.tamano === tam.value} )
    this.agregarParaLimpiar(  tam )
  }

  /**
   *Selecciona el colo y lo agrega para limpiar. 
   *
   * @param {*} col
   * @memberof HistorialDePedidosComponent
   */
  seleccionarColor( col: any ){
    this.colorSeleccionado = this.colores.find( (color)=>{return color.color === col.value} )
    this.agregarParaLimpiar(  col )
  }
  
  /**
   *Selecciona el terminado y lo agrega para limpiar. 
   *
   * @param {*} term
   * @memberof HistorialDePedidosComponent
   */
  seleccionarTerminado( term: any ){
    this.terminadoSeleccionado = this.terminados.find( (terminado)=>{return terminado.terminado === term .value} )
    this.agregarParaLimpiar(  term )
  }

  /**
   *Agrega el input que se le pase como parametro a una lista que se utiliza para limpiar
   el formulario. Es el input tal cual. 
   *
   * @param {*} input
   * @memberof HistorialDePedidosComponent
   */
  agregarParaLimpiar( input: any ){
    if( !this.objetoParaLimpieza.hasOwnProperty( input.list.id )){
      this.objetoParaLimpieza[input.list.id] = input
    }
  }

  /**
   *Limpia el formulario utilizando la lista que se crea con agregarParaLimpiar() y poniendo en null
   los campos del ngmodel
   *
   * @memberof HistorialDePedidosComponent
   */
  limpiar( ) {
    for (const key in this.objetoParaLimpieza) {
      if (this.objetoParaLimpieza.hasOwnProperty(key)) {
        const input = this.objetoParaLimpieza[key];
        input.value = ''
      }
    }

    this.clienteSeleccionado = null
    this.vendedorSeleccionado = null
    this.modeloSeleccionado = null
    this.tamanoSeleccionado = null
    this.colorSeleccionado = null
    this.terminadoSeleccionado = null

    this.folio = null
    this.pedido = null
    this.fechaDeCreacionDesdeEl = null 
    this.fechaDeCreacionHasta = null 
    this.fechaEntregaEstimadaDesdeEl = null 
    this.fechaEntregaEstimadaHasta = null 
    this.fechaFinalizacionFolioDesdeEl = null 
    this.fechaFinalizacionFolioHasta = null 
  }


  filtrar( ){
    this.obtenerFiltros.emit( this );
  }

}
