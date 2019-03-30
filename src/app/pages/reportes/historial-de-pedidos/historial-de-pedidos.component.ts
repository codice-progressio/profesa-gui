import { Component, OnInit, Input } from '@angular/core';
import { Folio } from 'src/app/models/folio.models';
import { ClienteService, UsuarioService, ModeloService, TamanoService, ColorService, TerminadoService } from 'src/app/services/service.index';
import { Cliente } from 'src/app/models/cliente.models';
import { Usuario } from 'src/app/models/usuario.model';
import { Modelo } from 'src/app/models/modelo.models';
import { Tamano } from 'src/app/models/tamano.models';
import { Color } from 'src/app/models/color.models';
import { Terminado } from 'src/app/models/terminado.models';
import { DatePipe } from '@angular/common';
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


  clientes: Cliente [] = []
  clienteSeleccionado: Cliente

  vendedores: Usuario [] = []
  vendedorSeleccionado: Usuario 
  
  modelos: Modelo [] = []
  modeloSeleccionado: Modelo 
  
  tamanos: Tamano [] = []
  tamanoSeleccionado: Tamano 
  
  colores: Color [] = []
  colorSeleccionado: Color

  terminados: Terminado [] = []
  terminadoSeleccionado: Terminado 


  folio: string
  pedido: string

  fechaDeCreacionDesdeEl: Date 
  fechaDeCreacionHasta: Date 
  
  fechaEntregaEstimadaDesdeEl: Date 
  fechaEntregaEstimadaHasta: Date 
  
  fechaFinalizacionFolioDesdeEl: Date 
  fechaFinalizacionFolioHasta: Date 



  sortCampos: string[] = []


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

  seleccionarCliente( cli: any ){
    this.clienteSeleccionado = this.clientes.find( (cliente)=>{return cliente.nombre === cli.value} )
    this.agregarParaLimpiar(  cli )
  }

  seleccionarVendedor( vend: any ){
    this.vendedorSeleccionado = this.vendedores.find( (vendedor)=>{return vendedor.nombre === vend.value} )
    this.agregarParaLimpiar(  vend )
  }

  seleccionarModelo( mod: any ){
    this.modeloSeleccionado = this.modelos.find((modelo)=>{return modelo.modelo === mod.value} )
    this.agregarParaLimpiar(  mod )
  }

  seleccionarTamano( tam: any ) {
    this.tamanoSeleccionado = this.tamanos.find((tamano)=>{return tamano.tamano === tam.value} )
    this.agregarParaLimpiar(  tam )
  }

  seleccionarColor( col: any ){
    this.colorSeleccionado = this.colores.find( (color)=>{return color.color === col.value} )
    this.agregarParaLimpiar(  col )
  }
  
  seleccionarTerminado( term: any ){
    this.terminadoSeleccionado = this.terminados.find( (terminado)=>{return terminado.terminado === term .value} )
    this.agregarParaLimpiar(  term )
  }

  agregarParaLimpiar( input: any ){
    if( !this.objetoParaLimpieza.hasOwnProperty( input.list.id )){
      this.objetoParaLimpieza[input.list.id] = input
    }
  }

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
    this.fechaDeCreacionDesdeEl = null 
    this.fechaDeCreacionHasta = null 
    this.fechaEntregaEstimadaDesdeEl = null 
    this.fechaEntregaEstimadaHasta = null 
    this.fechaFinalizacionFolioDesdeEl = null 
    this.fechaFinalizacionFolioHasta = null 
  }

  campoSort: string = ''
  onSorted ( e: any ) {
    let campo: string = Object.keys(e)[0]
    this.campoSort = `${ campo }>${e[campo]}`
  }

  obtenerCamposDeFiltracion(): string {

    let objetoDeCampos = {
      clienteSeleccionado: this.clienteSeleccionado ,
      vendedorSeleccionado: this.vendedorSeleccionado ,
      modeloSeleccionado: this.modeloSeleccionado ,
      tamanoSeleccionado: this.tamanoSeleccionado ,
      colorSeleccionado: this.colorSeleccionado ,
      terminadoSeleccionado: this.terminadoSeleccionado ,
      folio: this.folio ,
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



  filtrar( ) {
    this.cargarFolios( this.obtenerCamposDeFiltracion() )
  }


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
   * @returns {string} La diferencia entre fechas formateadas para contar dias, semanas, etc. 
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
