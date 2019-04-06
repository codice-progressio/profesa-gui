import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { Folio } from "src/app/models/folio.models";
import {
  FolioNewService,
  ManejoDeMensajesService,
  UsuarioService
} from "src/app/services/service.index";
import { FoliosCrearModificarComponent } from "./folios-crear-modificar.component";
import { Generales_GUI_CRUD } from "../../utilidadesPages/utilidades-tipo-crud-para-GUI/Generales_GUI_CRUD";
import { PaginadorService } from "src/app/components/paginador/paginador.service";
import { FiltrosFolio } from "src/app/services/utilidades/filtrosParaConsultas/FiltrosFolio";
import * as moment from "moment/moment";
import "moment-duration-format";
import { GrupoDeFiltroComponent } from "./grupo-de-filtro.component";

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
  implements OnInit, OnDestroy {
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
  mostrarFoliosTerminados: boolean = true 

  activarBotonFoliosDeProduccion: boolean = true

  esNecesarioReinciarPaginador: boolean = false

  componenteFiltrador: GrupoDeFiltroComponent;

  enlistarComoPedidos: boolean =  false

  


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


    this._paginadorService.callback = () => {
      if( this.esNecesarioReinciarPaginador ) {
        this.cargarFoliosMandadosAproducir(this.mostrarFoliosConOrdenes, this.mostrarFoliosTerminados);

      }else{
        this.aplicarFiltros(this.componenteFiltrador)
      }
    };
    this.cargarFoliosMandadosAproducir(this.mostrarFoliosConOrdenes, this.mostrarFoliosTerminados);
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    clearInterval(this.manejadorDeIntervalo);
  }

  foliosSinOrdenes(mostrarFoliosSinOrdenes: boolean): boolean {
    
    if( mostrarFoliosSinOrdenes ) this.enlistarComoPedidos = false

    this.reiniciarPaginador()
    this.cargarFoliosMandadosAproducir(mostrarFoliosSinOrdenes, null);
    return mostrarFoliosSinOrdenes;
  }
  
  foliosTerminados(foliosTerminados: boolean): boolean {
    
    this.reiniciarPaginador()

    this.cargarFoliosMandadosAproducir(
      this.mostrarFoliosConOrdenes,
      foliosTerminados
    );
    return foliosTerminados;
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
   * @param {boolean} [terminados=true] Define si se muestran o no los folios que estan terminados. 
   * @memberof FoliosComponent
   */
  cargarFoliosMandadosAproducir(
    sinOrdenes: boolean = false,
    terminados: boolean = true
  ) {

    this.esNecesarioReinciarPaginador = true
    this.activarBotonFoliosDeProduccion = false;

    this._folioNewService
      .filtros(new FiltrosFolio(this._folioNewService))
      .setVendedor(this._usuarioService.usuario._id)

      .setOrdenesGeneradas(sinOrdenes)

      .setFoliosTerminados(terminados)
      
      // Paginador
      .setDesde(this._paginadorService.desde)
      .setLimite(this._paginadorService.limite)
      .setSortCampos([["fechaFolio", 1]])
      // .setSort("-1")
      .servicio.todoPorVendedor()
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

    if( this.esNecesarioReinciarPaginador ){
      this.reiniciarPaginador()
      this.esNecesarioReinciarPaginador = false;
    } 

    this.activarBotonFoliosDeProduccion = false;

    this._folioNewService
      .filtros(new FiltrosFolio(this._folioNewService))
      .setVendedor(this._usuarioService.usuario._id)


      .setOrdenesGeneradas(this.mostrarFoliosConOrdenes)
      .setFoliosTerminados(this.mostrarFoliosTerminados)


      .setFolio(componente.folio ?componente.folio: null) 
      .setCliente(componente.clienteSeleccionado ?componente.clienteSeleccionado._id : null)
      
      // Estos solo se aplican cuando la opcion de este 
      .setModelo(componente.modeloSeleccionado ?componente.modeloSeleccionado._id : null)
      .setTamano(componente.tamanoSeleccionado ?componente.tamanoSeleccionado._id : null)
      .setColor(componente.colorSeleccionado ?componente.colorSeleccionado._id : null)
      .setTerminado(componente.terminadoSeleccionado ?componente.terminadoSeleccionado._id : null)


      .setFechaCreacionDesdeEl(componente.fechaDeCreacionDesdeEl ? new Date(componente.fechaDeCreacionDesdeEl).toISOString() : null)
      .setFechaCreacionHasta(componente.fechaDeCreacionHasta ? new Date(componente.fechaDeCreacionHasta).toISOString(): null)
      .setFechaFinalizacionFolioDesdeEl(componente.fechaFinalizacionFolioDesdeEl ? new Date(componente.fechaFinalizacionFolioDesdeEl).toISOString(): null)
      .setFechaFinalizacionFolioHasta(componente.fechaFinalizacionFolioHasta ? new Date(componente.fechaFinalizacionFolioHasta).toISOString(): null)
      
      // Paginador
      .setDesde(this._paginadorService.desde)
      .setLimite(this._paginadorService.limite)
      .setSortCampos([["fechaFolio", 1]])
      // .setSort("-1")
      .servicio.todoPorVendedor()
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

  }





}
