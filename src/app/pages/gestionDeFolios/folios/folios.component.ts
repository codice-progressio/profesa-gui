import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { Folio } from "src/app/models/folio.models";
import { FoliosCrearModificarComponent } from "./folios-crear-modificar.component";
import { Generales_GUI_CRUD } from "../../utilidadesPages/utilidades-tipo-crud-para-GUI/Generales_GUI_CRUD";
import { PaginadorService } from "src/app/components/paginador/paginador.service";
import { FiltrosFolio } from "src/app/services/utilidades/filtrosParaConsultas/FiltrosFolio";
import * as moment from "moment/moment";
import "moment-duration-format";
import { GrupoDeFiltroComponent } from "./grupo-de-filtro.component";
import { FolioLinea } from "src/app/models/folioLinea.models";
import { Orden } from "src/app/models/orden.models";
import { FolioNewService } from "src/app/services/folio/folio-new.service";
import { ManejoDeMensajesService } from "src/app/services/utilidades/manejo-de-mensajes.service";
import { UsuarioService } from "src/app/services/usuario/usuario.service";

@Component({
  selector: "app-folios",
  templateUrl: "./folios.component.html",
  providers: [{ provide: "paginadorFolios", useClass: PaginadorService }]
})
export class FoliosComponent
  extends Generales_GUI_CRUD<
    Folio,
    FolioNewService,
    FoliosCrearModificarComponent
  >
  implements OnInit, OnDestroy
{
  

  pedidoParaDetalle: FolioLinea
  folioParaDetalle: Folio
  ordenParaDetalle: Orden

  
  /**
   *Almacena la opcion para mostrar o no los folios termiandos. Por defecto no los muestra.
   *
   * @type {boolean}
   * @memberof FoliosComponent
   */
  mostrarFoliosConOrdenes: boolean = true;

  /**
   *Los temporizadores para mostrar tiempo de produccion.
   *
   * @memberof FoliosComponent
   */
  contenedorDeTemporizadores = {};

  /**
   *El intervalo que refresca los tiempos de produccion.
   *
   * @type {*}
   * @memberof FoliosComponent
   */
  manejadorDeIntervalo: any;

  /**
   *Muestra u oculta los folios terminados de la lista de folios
   en produccion. 
   *
   * @type {boolean}
   * @memberof FoliosComponent
   */
  mostrarFoliosTerminados: boolean = false 

  activarBotonFoliosDeProduccion: boolean = true

  esNecesarioReinciarPaginador: boolean = false

  componenteFiltrador: GrupoDeFiltroComponent;

  enlistarComoPedidos: boolean =  false

  /**
   *Los folios que el vendedor ya entrego para produccion. 
   Este paramentro se aplica en un filtro. 
   *
   * @type {boolean}
   * @memberof FoliosComponent
   */
  cargarFoliosEntregadosAProduccion: boolean = true;
  


  constructor(
    public _folioNewService: FolioNewService,
    @Inject("paginadorFolios") public _paginadorService: PaginadorService,
    // public _paginadorService: PaginadorService,
    public _msjService: ManejoDeMensajesService,
    public _usuarioService: UsuarioService
  ) {
    super(_folioNewService, _paginadorService, _msjService, false);

    // Sobre escribimos el mensaje de eliminacion. 

    this.mensajeDeEliminacion = 'Si eliminas este elemento tendras que volver a registrar los datos.'


   
  }

  ngOnInit() {

  //  Esperamos a que se cargue el componenete
  // para que la carga no nos de error. 
    new Promise( (resolve, reject)=>{
      
      let int = setInterval( ()=>{
        if( this.componenteFiltrador ){
          clearInterval( int )
          resolve()
        }
      }, 10 )

      
    } ).then( ()=>{

      // Una vez que el componente filtrador se carga creamos 
      // los callbacks necesarios para el paginador. 
      this._paginadorService.callback = () => {
        // Si el paginador see necesita reiniciar quiere decir
        // que cambiamos entre la lista de folios que estan
        // sin entregar a produccion y los que ya estan
        // produccion.
        if( this.esNecesarioReinciarPaginador ) {
          
          this.cargarFoliosMandadosAproducir(this.cargarFoliosEntregadosAProduccion);
          
        }else{
          this.aplicarFiltros(this.componenteFiltrador)
        }
      };
      

      //Cargamos los datos desde el componente que se encarga se sincronizar las animaciones.
      this.cbCargarElementos = ()=>{
        this.cargarFoliosMandadosAproducir(this.cargarFoliosEntregadosAProduccion);
      } 


      console.log(`ngOnInit`)      
      this.cargarFoliosMandadosAproducir( this.cargarFoliosEntregadosAProduccion);


      // this.filtrosMostrarParaFolios( this.enlistarComoPedidos )
      
    } )

  }


  ngOnDestroy(): void {
    clearInterval(this.manejadorDeIntervalo);
  }

  /**
   * Cambioa entre enlistar los folios 
   * con ordenes y sin ordenes en base a 
   * multiples parametros. 
   *
   * @param {boolean} entregadosAProduccion
   * @returns {boolean} El valor segun la logica.
   * @memberof FoliosComponent
   */
  foliosSinOrdenes(entregadosAProduccion: boolean): boolean {
    // Si se van a filtrar folios entregados a produccion 
    // entonces no se pueden enlistar como pedidos. 
    if( entregadosAProduccion ) this.enlistarComoPedidos = false

    
    // Se reinicia el paginador para que no siga con el contador
    // de los folios entregados a produccion o los que se estan
    // trabajando. 
    this.reiniciarPaginador()
    // Cargamos los folios. 
    this.cargarFoliosMandadosAproducir(entregadosAProduccion);
    return entregadosAProduccion;
  }
  
  reiniciarPaginador( ) {
    this._paginadorService.limite = 5
    this._paginadorService.desde = 0
    this._paginadorService.actual = 1
  }

  /**
   *Filtra por los folios que ya se han mandado a producir. Hace la diferencia con los
   que todavia estan registrandose. 
   *
   * @param {boolean} [sinOrdenes=false] Define se muestran o no los folios con ordenes. 
   * @param {boolean} [entregadosAProduccion=true] Define si se muestran o no los folios que estan terminados. 
   * @memberof FoliosComponent
   */
  cargarFoliosMandadosAproducir(
    entregadosAProduccion: boolean,
  ) {

    // this.filtrosMostrarParaFolios (this.enlistarComoPedidos)

    console.log(`funcion cargarFoliosMandadosAProducir`)
    console.log(`entregadosAProduccion`,entregadosAProduccion)
    console.log(`this.mostrarFoliosConOrdenes`,this.mostrarFoliosConOrdenes)
    console.log(`this.mostrarFoliosTerminados`,this.mostrarFoliosTerminados)

    this.elementos = []
    // Ponemos una bandera de que es necesario reiniciar el paginador 
    // por que cuando cargamos esta cambiamos entre los folios ya 
    // entregados a produccion y los que estan trabajandose aun. 
    this.esNecesarioReinciarPaginador = true
    this.activarBotonFoliosDeProduccion = false;

    this._folioNewService
      .filtros(new FiltrosFolio(this._folioNewService))
      .setVendedor(this._usuarioService.usuario._id)

      // .setOrdenesGeneradas(this.mostrarFoliosConOrdenes)
      .setEntregarAProduccion( entregadosAProduccion )
      .setFoliosTerminados( this.mostrarFoliosTerminados )

      // Paginador
      .setDesde(this._paginadorService.desde)
      .setLimite(this._paginadorService.limite)
      .setSortCampos([["fechaFolio", 1]])
      // .setSort("-1")
      .servicio.todo()
      .subscribe(
        folios => {
          this.elementos = folios;
          this._paginadorService.activarPaginador(this._elementoService.total);
          // Calculamos los tiempos.
          this.elementos.map(fol => {
            this.agregarTemporizador(
              fol._id,
              fol.fechaFolio,
              fol.fechaTerminado
            );

            fol.folioLineas.map((ped)=>{
              this.agregarTemporizador(
                ped._id,
                fol.fechaFolio,
                ped.fechaTerminado
              )
            } )
          });

          

          if (!this.manejadorDeIntervalo) {
            this.manejadorDeIntervalo = setInterval(() => {
              this.calcularTiempos();
            }, 10000);
          }
        },
        () => {

          this.activarBotonFoliosDeProduccion = true;
        },

        () => {
          this.activarBotonFoliosDeProduccion = true;
        }
      );
  }

  agregarTemporizador(id: string, inicio: Date, terminado: Date) {
    this.contenedorDeTemporizadores[id] = {
      inicio: inicio,
      transcurrido: "",
      terminado: terminado
    };
  }

  tiempoTrasncurridoHastaFechaActual(inicio: Date, fin: Date): string {
    /**n
     * La fecha actual o fecha de termino
     */
    let fechaActual = fin ? moment(fin) : moment();
    /**
     * La fecha de la cual se quiere calcular el tiempo transcurrido.
     */
    let fechaDeInicio = moment(inicio);

    // ESTE SE TIENE QUE CALCULAR COMO <1 POR QUE AL PARECER CUENTA LOS DIAS DESDE 0
    let leyendaDias =
      moment.duration(fechaActual.diff(fechaDeInicio)).days() < 1
        ? "dia"
        : "dias";
    // Estos son normales.
    let leyendaMeses =
      moment.duration(fechaActual.diff(fechaDeInicio)).months() === 1
        ? "mes"
        : "meses";
    let leyendaAnio =
      moment.duration(fechaActual.diff(fechaDeInicio)).years() === 1
        ? "año"
        : "años";

    /**
     * Hacemos el calculo de la diferencia y formateamos la la salida a tipo 1 anio, 2 meses, 3 dias, 04:05:06
     */
    let duration: string = moment
      .duration(fechaActual.diff(fechaDeInicio))
      .format(
        `y [${leyendaAnio}], M [${leyendaMeses}], D [${leyendaDias}], HH:mm:ss`
      );

    return duration;
  }

  mostrarTiempos: boolean = false;
  calcularTiempos() {
    for (const key in this.contenedorDeTemporizadores) {
      if (this.contenedorDeTemporizadores.hasOwnProperty(key)) {
        const element = this.contenedorDeTemporizadores[key];

        this.contenedorDeTemporizadores[
          key
        ].transcurrido = this.tiempoTrasncurridoHastaFechaActual(
          element.inicio,
          element.terminado
        );
      }
    }

    this.mostrarTiempos = true;
  }

  sumarPiezasSolicitadas(fol: Folio): number {
    let total = 0;

    fol.folioLineas.forEach(ped => {
      total += ped.cantidad;
    });

    return total;
  }



  aplicarFiltros( componente: GrupoDeFiltroComponent ){
    console.log(`aplicarFiltros`,'Estamos en aplicar filtross')
    if( this.esNecesarioReinciarPaginador ){
      this.reiniciarPaginador()
      this.esNecesarioReinciarPaginador = false;
    } 

    this.activarBotonFoliosDeProduccion = false;

    this._folioNewService
      .filtros(new FiltrosFolio(this._folioNewService))
      .setVendedor(this._usuarioService.usuario._id)
      .setPedido(this.componenteFiltrador.pedido ? this.componenteFiltrador.pedido: null)

      .setFoliosTerminados(this.componenteFiltrador.folioTerminado)


      .setFolio(componente.folio ?componente.folio: null) 
      .setCliente(componente.clienteSeleccionado ?componente.clienteSeleccionado._id : null)
      
      // Estos solo se aplican cuando la opcion de este 
      .setModelo(componente.modeloSeleccionado ?componente.modeloSeleccionado._id : null)
      .setTamano(componente.tamanoSeleccionado ?componente.tamanoSeleccionado._id : null)
      .setColor(componente.colorSeleccionado ?componente.colorSeleccionado._id : null)
      .setTerminado(componente.terminadoSeleccionado ?componente.terminadoSeleccionado._id : null)


      .setEntregarAProduccion( this.cargarFoliosEntregadosAProduccion )


      .setFechaDeCreacionDesdeEl(componente.fechaDeCreacionDesdeEl ? new Date(componente.fechaDeCreacionDesdeEl).toISOString() : null)
      .setFechaDeCreacionHasta(componente.fechaDeCreacionHasta ? new Date(componente.fechaDeCreacionHasta).toISOString(): null)
      .setFechaFinalizacionFolioDesdeEl(componente.fechaFinalizacionFolioDesdeEl ? new Date(componente.fechaFinalizacionFolioDesdeEl).toISOString(): null)
      .setFechaFinalizacionFolioHasta(componente.fechaFinalizacionFolioHasta ? new Date(componente.fechaFinalizacionFolioHasta).toISOString(): null)
      
      // Paginador
      .setDesde(this._paginadorService.desde)
      .setLimite(this._paginadorService.limite)
      .setSortCampos([["fechaFolio", -1]])
      .servicio.todo()
      .subscribe(
        folios => {
          this.elementos = folios;
          this._paginadorService.activarPaginador(this._elementoService.total);
          // Calculamos los tiempos.
          this.elementos.map(fol => {
            this.agregarTemporizador(
              fol._id,
              fol.fechaFolio,
              fol.fechaTerminado
            );
          });

          if (!this.manejadorDeIntervalo) {
            this.manejadorDeIntervalo = setInterval(() => {
              this.calcularTiempos();
            }, 10000);
          }
        },
        () => {

          this.activarBotonFoliosDeProduccion = true;
        },

        () => {
          this.activarBotonFoliosDeProduccion = true;
        }
      );
    
    
  }

  
  verComoFolios( grupoDeFiltro: GrupoDeFiltroComponent ){
    grupoDeFiltro.limpiar()
    this.enlistarComoPedidos = !this.enlistarComoPedidos
    this.filtrosMostrarParaFolios (this.enlistarComoPedidos)
  }
    
    /**
     *Muestra los filtros necesarios del componente grupo de filtro
     para que coincidan con la filtracion del folio. 
   *
   * @memberof FoliosComponent
   */
  filtrosMostrarParaFolios( enlistarComoPedidos) {
    console.log(`filtros`,enlistarComoPedidos)
    this.componenteFiltrador.seleccionarCamposVisibles
      .mostrarTodo()
      .setVendedor(false)
      .setFechaDeEntregaEstimadaDesdeEl(false)
      .setFechaDeEntregaEstimadaHasta(false)
      .setPedido(false)
      .setModelo(false)
      .setTamano(false)
      .setColor(false)
      .setTerminado(false)

    if (enlistarComoPedidos) {
      this.componenteFiltrador.seleccionarCamposVisibles
        .mostrarTodo()
        .setVendedor(false)
        .setFechaDeEntregaEstimadaDesdeEl(false)
        .setFechaDeEntregaEstimadaHasta(false)
    }


    this.componenteFiltrador.seleccionarCamposVisibles
      .setEntregarAProduccion( false )
    
  }


  /**
   * Envia a producir el folio que corresponda al id 
   * que se pase como paramentro. 
   *
   * @param {string} id
   * @memberof FoliosComponent
   */
  enviarAProduccion( id: string ){
    let mensajeDeConfirmacion = `Una vez que envies el folio a producion
    no sera posible hacer ninguna modificacion. Tampoco podras
    eliminarlo directamente. Sera necesario que control de produccion
    elimine el folio. Aun asi quieres continuar?`
    let mensajeDeCancelacion = `No se mando produccion el folio.`
    this._msjService.confirmarAccion(mensajeDeConfirmacion,
      ()=>{
        this._folioNewService
        .iniciarProduccion( id )
        .subscribe(()=>{
          this.cargarFoliosMandadosAproducir(this.cargarFoliosEntregadosAProduccion)
        }),
      mensajeDeCancelacion
      }
    )
  }





}
