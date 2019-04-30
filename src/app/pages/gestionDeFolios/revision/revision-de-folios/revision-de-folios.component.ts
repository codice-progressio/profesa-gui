import { Component, OnInit, Inject } from '@angular/core';
import { Folio } from 'src/app/models/folio.models';
import { GrupoDeFiltroComponent } from '../../folios/grupo-de-filtro.component';
import { FolioNewService } from '../../../../services/folio/folio-new.service';
import { PaginadorService } from 'src/app/components/paginador/paginador.service';
import { FiltrosFolio } from 'src/app/services/utilidades/filtrosParaConsultas/FiltrosFolio';
import { FolioLinea } from '../../../../models/folioLinea.models';
import { Orden } from 'src/app/models/orden.models';
import { FoliosCrearModificarAbstractoComponent } from '../../folios/abstractos/folios-crear-modificar-abstracto.component';
import { ManejoDeMensajesService } from 'src/app/services/service.index';
import { RevisionDeOrdenesAbstractoComponent } from '../revision-de-ordenes-abstracto/revision-de-ordenes-abstracto.component';

@Component({
  selector: 'app-revision-de-folios',
  templateUrl: './revision-de-folios.component.html',
  styles: [],
  providers: [{ provide: "paginadorFolios", useClass: PaginadorService }]
})
export class RevisionDeFoliosComponent implements OnInit {

  

  folios: Folio [ ]
  componenteFiltrador: GrupoDeFiltroComponent
  verComoPedidos: boolean = false
  folioParaDetalle: Folio
  pedidoParaDetalle: FolioLinea
  ordenParaDetalle: Orden
  

  componenteRevisionDeOrdenes: RevisionDeOrdenesAbstractoComponent


  constructor(
    public _folioService: FolioNewService,
    @Inject("paginadorFolios") public _paginadorService: PaginadorService,
    public _msjService: ManejoDeMensajesService
  ) {
    this._paginadorService.callback = () => {
      if( this.esNecesarioReinciarPaginador ) {
        this.cargarFolios();

      }else{
        this.aplicarFiltros(this.componenteFiltrador)
      }
    };
    
    

    this.cargarFolios( );

   }

  ngOnInit() {


  }



  esNecesarioReinciarPaginador: boolean

    reiniciarPaginador( ) {
      this._paginadorService.limite = 5
      this._paginadorService.desde = 0
      this._paginadorService.actual = 1
    }

  aplicarFiltros( componente: GrupoDeFiltroComponent ){

    if( this.esNecesarioReinciarPaginador ){
      this.reiniciarPaginador()
      this.esNecesarioReinciarPaginador = false;
    } 


    this._folioService
      .filtros(new FiltrosFolio(this._folioService))
      .setVendedor(componente.vendedorSeleccionado._id)

      .setFolio(componente.folio ?componente.folio: null) 
      .setCliente(componente.clienteSeleccionado ?componente.clienteSeleccionado._id : null)
      
      // Estos solo se aplican cuando la opcion de este 
      .setModelo(componente.modeloSeleccionado ?componente.modeloSeleccionado._id : null)
      .setTamano(componente.tamanoSeleccionado ?componente.tamanoSeleccionado._id : null)
      .setColor(componente.colorSeleccionado ?componente.colorSeleccionado._id : null)
      .setTerminado(componente.terminadoSeleccionado ?componente.terminadoSeleccionado._id : null)

      // Aqui este siempre debe ser true
      .setEntregarAProduccion( true )


      .setFechaCreacionDesdeEl(componente.fechaDeCreacionDesdeEl ? new Date(componente.fechaDeCreacionDesdeEl).toISOString() : null)
      .setFechaCreacionHasta(componente.fechaDeCreacionHasta ? new Date(componente.fechaDeCreacionHasta).toISOString(): null)
      
      // Paginador
      .setDesde(this._paginadorService.desde)
      .setLimite(this._paginadorService.limite)
      .setSortCampos([["fechaEntregaAProduccion", -1]])
      .servicio.todo()
      .subscribe(
        folios => {
          this.folios = folios;
          this._paginadorService.activarPaginador(this._folioService.total);
        },
       
      );
    
    
  }



  actualizarVista: boolean = false
  /**
   *Filtra por los folios que ya se han mandado a producir. Hace la diferencia con los
   que todavia estan registrandose. 
   *
   * @memberof FoliosComponent
   */
  cargarFolios(
  ) {

    this.actualizarVista = true
    
    this.esNecesarioReinciarPaginador = true

    this._folioService
      .filtros(new FiltrosFolio(this._folioService))

      .setEntregarAProduccion(  true )
      .setOrdenesGeneradas( false )
      
      // Paginador
      .setDesde(this._paginadorService.desde)
      .setLimite(this._paginadorService.limite)
      .setSortCampos([["fechaFolio", 1]])
      .servicio
      .todo()
      .subscribe(
        folios => {
          this.folios = folios;
          this._paginadorService.activarPaginador(this._folioService.total);
          this.actualizarVista = false
        }
      );
  }

  
  calcularTotalDePiezas( folio: Folio ): number{
    let total = 0;
    folio.folioLineas.map( (ped)=>{total+= ped.cantidad} )
    return total
  }
  
  
  /**
   *Retorna el control del folio al vendedor eliminando
   la fecha de producccion y la bandera de entregar a produccion. 
   *
   * @param {Folio} folio
   * @memberof RevisionDeFoliosComponent
   */
  retornarControlDeFolioAVendedor( folio: Folio ) {
    let msj = `Vas a retornar el folio a ${folio.vendedor.nombre}. 
    Esto significa que la fecha para produccion se eliminara y 
    el vendedor tendra disponible el folio para editarlo. Quieres continuar?`
    
    this._msjService.confirmarAccion(msj, 
      ()=>{
        this._folioService.iniciarProduccion( folio._id, false)
        .subscribe( (folio)=>{
          this.cargarFolios()
        } )
      }
    )

    
  }
  
  
  /**
   *El folio del cual se generaran ordenes. 
   *
   * @type {Folio}
   * @memberof RevisionDeFoliosComponent
   */
  folioParaGenerarOrdenes: Folio = null
  generarOrdenesDelFolio( folio: Folio ) {
    this.folioParaGenerarOrdenes = folio
    folio.popularOrdenesDeTodosLosPedidos()
    
    
  }


  generarOrdenes( folio: Folio ){
    folio.ordenesGeneradas = true
    folio.limpiarParaOrdenesGeneradas()
    this._folioService.modificar( folio ).subscribe( (folio)=>{
      this.cargarFolios()
    } )

  }

  revisionDeOrdenesCargarComponente( com: RevisionDeOrdenesAbstractoComponent ){
    this.componenteRevisionDeOrdenes = com
  }


  
  





}
