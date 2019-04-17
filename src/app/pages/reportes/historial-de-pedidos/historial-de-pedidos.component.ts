import { Component, OnInit, Input } from '@angular/core';
import { Folio } from 'src/app/models/folio.models';
import { ClienteService, UsuarioService, ModeloService, TamanoService, ColorService, TerminadoService } from 'src/app/services/service.index';
import { Cliente } from 'src/app/models/cliente.models';
import { Usuario } from 'src/app/models/usuario.model';
import { Modelo } from 'src/app/models/modelo.models';
import { Tamano } from 'src/app/models/tamano.models';
import { Color } from 'src/app/models/color.models';
import { Terminado } from 'src/app/models/terminado.models';
import { SortService } from 'src/app/directives/sortableComponent/sort.service';
import { ReportesProduccionService } from 'src/app/services/reportes/reportes-produccion.service';
import * as moment from 'moment/moment';
import 'moment-duration-format';


@Component({
  selector: 'app-historial-de-pedidos',
  templateUrl: './historial-de-pedidos.component.html',
  styles: []
})
export class HistorialDePedidosComponent implements OnInit {


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

    this.cargarFolios( );



  }

  ngOnInit() {

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

  campoSort: string = ''
  /**
   *Captura el campo de sort que se acciona con la directiva sort-table
   *
   * @param {*} e
   * @memberof HistorialDePedidosComponent
   */
  onSorted ( e: any ) {
    let campo: string = Object.keys(e)[0]
    this.campoSort = `${ campo }>${e[campo]}`
  }

  /**
   *Organiza y obtiene la lista de paramentros para filtrar los pedidos. 
   *
   * @returns {string} La lista de paramentros acomodados como una query para pasar por get. 
   * @memberof HistorialDePedidosComponent
   */
  obtenerCamposDeFiltracion(): string {

    let objetoDeCampos = {
      cliente: this.clienteSeleccionado ,
      vendedor: this.vendedorSeleccionado ,
      modelo: this.modeloSeleccionado ,
      tamano: this.tamanoSeleccionado ,
      color: this.colorSeleccionado ,
      terminado: this.terminadoSeleccionado ,
      folio: this.folio ,
      pedido: this.pedido ,
      fechaDeCreacionDesdeEl: this.fechaDeCreacionDesdeEl ? new Date(this.fechaDeCreacionDesdeEl ).toISOString(): null ,
      fechaDeCreacionHasta: this.fechaDeCreacionHasta ? new Date(this.fechaDeCreacionHasta ).toISOString(): null ,
      fechaEntregaEstimadaDesdeEl: this.fechaEntregaEstimadaDesdeEl ? new Date(this.fechaEntregaEstimadaDesdeEl ).toISOString(): null ,
      fechaEntregaEstimadaHasta: this.fechaEntregaEstimadaHasta ? new Date(this.fechaEntregaEstimadaHasta ).toISOString(): null ,
      fechaFinalizacionFolioDesdeEl: this.fechaFinalizacionFolioDesdeEl ? new Date(this.fechaFinalizacionFolioDesdeEl ).toISOString(): null ,
      fechaFinalizacionFolioHasta: this.fechaFinalizacionFolioHasta ? new Date(this.fechaFinalizacionFolioHasta ).toISOString(): null ,
    }

    let cadenaFinal: string = ''
    for (const key in objetoDeCampos) {
      if (objetoDeCampos.hasOwnProperty(key)) {
        const dato = objetoDeCampos[key];
        if( dato ){
            cadenaFinal+=`${key}=${dato._id ? dato._id : dato}&`
        }
      }
    }

    return cadenaFinal;

  }



  /**
   *Ejecuta la carga de folios con los filtros ( ejecuta obtenerCamposDeFiltracion() )
   *
   * @memberof HistorialDePedidosComponent
   */
  filtrar( ) {
    this.cargarFolios( this.obtenerCamposDeFiltracion() )
  }


  /**
   *Carga todos los folios sin restriccion. 
   *
   * @param {string} [filtros=null]
   * @memberof HistorialDePedidosComponent
   */
  cargarFolios( filtros: string = null ){
    this._reporteProduccionService.historialPedidos( filtros ).subscribe( (folios)=>{
      this.folios = folios;

    } )
  }


  /**
   *Obtiene la diferencia entre las fechas. 
   *
   * @param {Date} inicioDeFolio La fecha en la que inicio el folio. 
   * @param {Date} terminoPedido La fecha de termino del pedido. 
   * @returns {string} La diferencia entre fechas formateadas para contar dias, meses anios, etc.; 
   * @memberof HistorialDePedidosComponent
   */
  diferenciaEntreFechas( inicioDeFolio: Date,   terminoPedido: Date ): string {

    let inicio = moment( new Date(inicioDeFolio) )
    let finPedido =  moment( new Date(terminoPedido) )


    // ESTE SE TIENE QUE CALCULAR COMO <1 POR QUE AL PARECER CUENTA LOS DIAS DESDE 0
    let leyendaDias: string = moment.duration(inicio.diff(finPedido)).days() < 1 ? 'dia' : 'dias'
    // Estos son normales. 
    let leyendaMeses: string = moment.duration(inicio.diff(finPedido)).months() === 1 ? 'mes' : 'meses'
    let leyendaAnio: string = moment.duration(inicio.diff(finPedido)).years() === 1 ? 'año' : 'años'

    let duration:string = moment.duration(finPedido.diff(inicio)).format(`y [${leyendaAnio}], M [${leyendaMeses}], D [${leyendaDias}], HH:mm:ss`);



    return duration
  }


  

}
