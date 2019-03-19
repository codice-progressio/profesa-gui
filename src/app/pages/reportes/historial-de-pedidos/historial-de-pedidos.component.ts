import { Component, OnInit, Input } from '@angular/core';
import { Folio } from 'src/app/models/folio.models';
import { ClienteService, UsuarioService, ModeloService, TamanoService, ColorService, TerminadoService } from 'src/app/services/service.index';
import { Cliente } from 'src/app/models/cliente.models';
import { Usuario } from 'src/app/models/usuario.model';
import { Modelo } from 'src/app/models/modelo.models';
import { Tamano } from 'src/app/models/tamano.models';
import { Color } from 'src/app/models/color.models';
import { Terminado } from 'src/app/models/terminado.models';

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
  campoDeOrdenacion: string
  desde: Date
  hasta: Date
  orden: number


  camposDeOrdenacion: string [] = [
    'Folio',
    'Pedido',
    'Modelo',
    'Cliente',
    'Vendedor',
    'Fecha de folio',
    'Fecha de termino de pedido',
    'Tiempo de produccion',
    'Cantidad Producida',
    'Entregado',
  ]
  



  


  constructor(
    public _clienteService: ClienteService,
    public _usuarioService: UsuarioService,
    public _modeloService: ModeloService,
    public _tamanoService: TamanoService,
    public _colorService: ColorService,
    public _terminadoService: TerminadoService
  ) { 

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

  objetoParaLimpieza = {}
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
    this.campoDeOrdenacion = null
    this.desde = null
    this.hasta = null
    this.orden = null
  }

  filtrar( ) {

  }


  

}
