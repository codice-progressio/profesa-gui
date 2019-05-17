import { Component, OnInit } from "@angular/core";
import swal from "sweetalert2";
import { ModeloCompleto } from "../../models/modeloCompleto.modelo";
import { FolioLinea } from "../../models/folioLinea.models";
import { ColoresTenidos } from "../../models/ColoresTenidos";
import { FolioService } from "../../services/folio/folio.service";
import { Cliente } from "../../models/cliente.models";
import { ActivatedRoute, Router } from "@angular/router";
import { Folio } from "../../models/folio.models";
import { BuscadorRapidoService } from "../../components/buscador-rapido/buscador-rapido.service";

import { Laser } from "../../models/laser.models";
import { PreLoaderService } from "../../components/pre-loader/pre-loader.service";
import { ModeloCompletoPipe } from "../../pipes/modelo-completo.pipe";
import { BuscadorRapido } from "src/app/components/buscador-rapido/buscador-rapido";
import { ModeloCompletoAutorizacion } from '../../models/modeloCompletoAutorizacion.model';
import { PaginadorService } from '../../components/paginador/paginador.service';
import { ProcesoService } from '../../services/proceso/proceso.service';
import { OrganizadorDragAndDropService } from "src/app/components/organizador-drag-and-drop/organizador-drag-and-drop.service";
import { Proceso } from "src/app/models/proceso.model";
import { Procesos } from "src/app/models/procesos.model";
import { PROCESOS } from "src/app/config/procesos";
import { DefaultsService } from "src/app/services/configDefualts/defaults.service";
import { DefaultModelData } from "src/app/config/defaultModelData";
import { AlmacenDeBoton } from '../../models/almacenDeBoton.model';
import { DEPARTAMENTOS } from '../../config/departamentos';
import { DndObject } from '../../components/organizador-drag-and-drop/models/dndObject.model';
import { ModeloCompletoService } from "src/app/services/modelo/modelo-completo.service";
import { ClienteService } from "src/app/services/cliente/cliente.service";
import { UtilidadesService } from "src/app/services/utilidades/utilidades.service";
import { ManejoDeMensajesService } from "src/app/services/utilidades/manejo-de-mensajes.service";

@Component({
  selector: "app-registro-de-lineas",
  templateUrl: "./registro-de-lineas.component.html",
  styles: []
})
export class RegistroDeLineasComponent implements OnInit {
  nivelDeUrgencia = [
    { nivel: "ALMACEN", checked: false, class: "radio-col-cyan" },
    { nivel: "PRODUCCIÓN", checked: true, class: "radio-col-black" },
    { nivel: "URGENTE", checked: false, class: "radio-col-red" },
    { nivel: "MUESTRA", checked: false, class: "radio-col-yellow" }
  ];

  // Si la cantidad del pedido supera a la suma de los
  // colores de tenido se pone este en true para mostrar la alerta.
  sumaTenidoSuperaCantidad: boolean = false;

  // Para mas y menos
  mostrandoInfoFolio: boolean = false;

  termino: string = "";
  // modelo: ModeloCompleto;
  modelosBuscados: ModeloCompleto[] = [];
  cliente: Cliente = null;
  folio: Folio;
  folioLinea: FolioLinea = null;
  toStr = JSON.stringify;

  laserSeleccionado: string = "";

  laserarPedido: boolean = false;

  modificandoLinea: boolean = false;

  defaultModelData: DefaultModelData;

  constructor(
    public _modeloCompletoService: ModeloCompletoService,
    public _folioService: FolioService,
    public activatedRoute: ActivatedRoute,
    public _clienteService: ClienteService,
    public _buscadorRapidoService: BuscadorRapidoService<ModeloCompleto>,
    public router: Router,
    public _util: UtilidadesService,
    public _preLoaderService: PreLoaderService,
    private modeloCompletoPipe: ModeloCompletoPipe,
    private _msjService: ManejoDeMensajesService,
    public _paginadorService: PaginadorService,
    public _procesoService: ProcesoService,

    public _organizadorDragAndDropService: OrganizadorDragAndDropService<Proceso>,
    public _defaultsService: DefaultsService,
    
  ) {

    this._defaultsService.cargarDefaults().subscribe( resp=> this.defaultModelData=resp );

    activatedRoute.params.subscribe(params => {
      // Si trae un id entonces lo buscamos.
      const id = params["id"];
      if (id) {
        this.cargarDatosDeFolio(id);
      }
    });

    this._paginadorService.callback = ()=>{this.cargarProcesosSeleccionablesEnLista();};

    this.generarBuscadorRapido();



  }

  ngOnInit() {}


  /**
   * Genera las configuraciones necearias para el buscador rapido y se 
   * puede llamar cada vez para limpiarlo. 
   *
   * @memberof RegistroDeLineasComponent
   */
  generarBuscadorRapido() {
    
    this._buscadorRapidoService.limpiarTodo();
    this._buscadorRapidoService.nombreDeElemento = "modelo";
    this._buscadorRapidoService.promesa = () => {

      // Esta promesa se encarga de buscar los modelos completos
      // que esten autorizados para el cliente. 
      return new Promise((resolve) => {
        // Primero nos aseguramos que los datos del cliente esten actualizados.
        this._clienteService.buscarPorId(this.cliente._id).subscribe(resp => {
          this.cliente = resp;

          // Buscamos el modelo.
          this._modeloCompletoService
            .buscar(this._buscadorRapidoService.termino)
            .subscribe((resp: ModeloCompleto[]) => {
              
              const d: BuscadorRapido<ModeloCompleto>[] = [];
              // Buscamos si hay alguna coincidencia para resaltarla. 
              resp.forEach(mc => {
                const mca = <ModeloCompletoAutorizacion>(
                  this.cliente.modelosCompletosAutorizados.find(x => {
                    return x.modeloCompleto._id === mc._id;
                  })
                );

                const br = new BuscadorRapido<ModeloCompleto>();
                br.nombre = this.modeloCompletoPipe.transform(mc);
                br.objeto = mc;

                if (!mca) {
                  br.atenuar = true;
                  br.mensajeAtenuacion = "No autorizado.";
                } else if (!mca.autorizado) {
                  br.atenuar = true;
                  if (mca.autorizacionSolicitada && !mca.autorizado) {
                    br.mensajeAtenuacion = "Aut. pendiente.";
                    br.claseAtenuacion = "text-warning";
                  } else {
                    br.mensajeAtenuacion = "No autorizado.";
                    br.claseAtenuacion = "text-danger";
                  }
                } else {
                  br.atenuar = false;
                  br.mensajeAtenuacion = "Autorizado";
                  br.claseAtenuacion = "text-success ";
                }

                d.push(br);
              });

              this._buscadorRapidoService.totalDeElementosBD = this._modeloCompletoService.total;
              resolve(d);
            });
        });
      });
    };
    this._buscadorRapidoService.callbackElementoSeleccionado = () => {
      this.folioLinea.modeloCompleto = <ModeloCompleto>(
        this._buscadorRapidoService.elementoSeleccionado.objeto
      );
      
      this.generarOrganizador( this.folioLinea.modeloCompleto, this.folioLinea.procesos, this.folioLinea.almacen );
    };

    this._buscadorRapidoService.callbackAtenuar = () => {
      // Comprobamos que el clilente tenga autorizado el modelo.
      const md: ModeloCompleto = <ModeloCompleto>(
        this._buscadorRapidoService.elementoSeleccionado.objeto
      );

      // Si el modelo no existe dentro de los autorizados quiere decir que 
      // que no lo esta. 
      const mdNoAutorizado = this.cliente.modelosCompletosAutorizados.find((x:ModeloCompletoAutorizacion) => x.modeloCompleto._id === md._id);
    
      if (!mdNoAutorizado) {
        
        this._msjService.solicitarPermiso(
          "El modelo no esta autorizado, quieres pedir autorizacion?",
          () => {
            this._clienteService
              .solicitarAutorizacionDeModeloCompleto(this.cliente, md)
              .subscribe();
          }
        );
        return false;
      }else{
        // El modelo existe pero,  esta autorizado?
        if( !mdNoAutorizado.autorizado){
          this._msjService.ups('Ya han solicitato autorizacion para este modelo pero no lo han confirmado.', 'Autorizacion pendiente')
          return false;
        }
        return true;
        
      }
    };

    this._buscadorRapidoService.callbackEliminar = ()=>{
      console.log('se ejecuto el callback eliminar de buscador rapido')
      this._organizadorDragAndDropService.limpiar()
      this.folioLinea.modeloCompleto = null;
      this._buscadorRapidoService.limpiarTodo();
      // Tiene que se el ultimo por que se generan los callbacks del orgnizados. 
      this.generarBuscadorRapido();
    };
  }

  /**
   *Genera los datos para el organizador.
   *
   * @param {ModeloCompleto} mc
   * @memberof RegistroDeLineasComponent
   */
  generarOrganizador( mc: ModeloCompleto, procesos: Procesos[], esAlmacen: boolean  ){

    this._organizadorDragAndDropService.limpiar();
    // Obtenemos todos los procesos. 
    this.cargarProcesosSeleccionablesEnLista();
    // Cargamos los prcesos propios del modelo.
    this.cargarListaOrdenable(mc, procesos, esAlmacen);


  }

  /**
   *Carga los procesos de la familia padres e hijos fijos si no esta especificado que es para almacen.
   Si se especifica que es para almacen entonces carga los procesos especiales como las areas que se van a trabajar
   *
   * @param {ModeloCompleto} mc El modelo completo. 
   * @param {procesosDelPedido[]} procesos Los procesos especiales del folio. Se utizan para cargar
   * de dos maneras. Si no es para almacen se agregan a los exitentes de la familia de procesos y 
   * si son para almacen se crea una nueva area y se intercambia para solo mostrar los procesos de almacen. 
   * @param {boolean} [esAlmacen=false]
   * @memberof RegistroDeLineasComponent
   * @param {Procesos} procesos Los procesos de la linea que hemos agregado para modificarlos. 
   */
  cargarListaOrdenable(mc: ModeloCompleto, procesosDelPedido:Procesos[], esAlmacen:boolean){
    // Itineramos sobre la familia
    let i = 0;
   
    // Agregamos todos los procesos padre.
    mc.familiaDeProcesos.procesos.forEach(x=>{

    this._organizadorDragAndDropService
        .nuevaArea(x.proceso._id)
          .setPadre()
            .setLeyenda(x.proceso.nombre)
            .setLeyendaOptativa(x.proceso.departamento.nombre)
            .setObjeto(x.proceso)
            .setOrden(i.toString());

      i++;
    });

    // Agregamos los procesos hijos FIJOS. 

    mc.procesosEspeciales.forEach((x:Procesos)=>{
      // Obtenemos el id del padre para agregarlo. 
      let idPadre = <string><any> x.procesoPadre;
      // Buscamos el padre. 
      
      let dndPadre =  this._organizadorDragAndDropService
      .obtenerObjetoPadre(idPadre);

      // Agregamos el hijo fijo. 
      dndPadre.hijos
        .addFijo()
          .setObjeto(x.proceso)
          .setOrden(x.orden.toString())
          .setEliminable(false)
          .setLeyenda(x.proceso.nombre)
          .setLeyendaOptativa(x.proceso.departamento.nombre);
    });


    if( esAlmacen ){
     

      Promise.all([
        this._procesoService.buscarPorId(this.defaultModelData.PROCESOS.CONTROL_DE_PRODUCCION).toPromise(),
        this._procesoService.buscarPorId(this.defaultModelData.PROCESOS.ALMACEN_DE_BOTON).toPromise(),

      ]).then((resp) => {
           // Si es de almacen tenemos que cargar los datos en una nueva area
          // para que no se muestren los procesos de la familia de procesos. 
          this._organizadorDragAndDropService.guardarCambiosDeManeraTemporal();
        
          let padre:Proceso = resp[0];
          let almacenDeBoton = resp[1];

          // Seteamos el padre siempre el entrega de ordenes a produccion. 
          let dndOPadre = this._organizadorDragAndDropService
            .nuevaArea(padre._id)
              .setPadre()
                .setEliminable(false)
                .setLeyenda(padre.nombre)
                .setLeyendaOptativa(padre.nombre)
                .setObjeto(padre)
                // .setOrden(padre.orden.toString());
                .setOrden('0');

          // Seteamos el hijo fijo, en este caso surtir de almacen. 
          dndOPadre.dnd
            .hijos
              .addFijo()
                .setEliminable(false)
                .setLeyenda(almacenDeBoton.nombre)
                .setLeyendaOptativa(almacenDeBoton.departamento.nombre)
                .setObjeto(almacenDeBoton)
                .setOrden('0.1');
    
          // Agregamos los hijos. Comenzamos de uno por que el padre es el 0.
          for (let i = 0; i < procesosDelPedido.length; i++) {
            const proc = procesosDelPedido[i];
            dndOPadre.dnd
              .hijos
                .addOrdenable()
                  .setEliminable( true )
                  .setLeyenda( proc.proceso.nombre)
                  .setLeyendaOptativa( proc.proceso.departamento.nombre )
                  .setOrden(proc.orden? proc.orden.toString(): '0' )
                  .setObjeto( proc.proceso );
          }
          // Ordenamos todos los datos por el campo orden. 
          this._organizadorDragAndDropService.ordenarPorPropiedadOrden();
         
        
      }).catch((err) => {
        throw err;
      });

    }else{
      // Como no es de almacen los pedidos propios de este folio
      // se tiene que agregar a sus padres y despues ordenarse.
      // Recorremos todos los especiales. 
      if( procesosDelPedido ){
        for (let i = 0; i < procesosDelPedido.length; i++) {
          const proc = procesosDelPedido[i];
          // Buscamos el padre. 
          this._organizadorDragAndDropService
            .obtenerObjetoPadre(proc.procesoPadre.toString())
              .hijos
                .addOrdenable()
                  .setEliminable( true )
                  .setLeyenda( proc.proceso.nombre )
                  .setLeyendaOptativa( proc.proceso.departamento.nombre )
                  .setObjeto( proc.proceso )
                  .setOrden( proc.orden.toString());
          // Ordenamos todos los datos por el campo orden. 
          this._organizadorDragAndDropService.ordenarPorPropiedadOrden();
        }
      }
    }
  }

  /**
   *Carga los procesos en la lista para agregar al ordenador.
   *
   * @memberof RegistroDeLineasComponent
   */
  cargarProcesosSeleccionablesEnLista(){
    
    this._procesoService.todo().subscribe( todo=>{
      this._organizadorDragAndDropService.limpiarListaDeElementos();
      todo.forEach(x=>{
        this._organizadorDragAndDropService
          .addElemento()
            .setEliminable(true)
            .setLeyenda(x.nombre)
            .setLeyendaOptativa(x.departamento.nombre)
            .setObjeto(x);
      });
    });
  }

  /**
   *Carga los datos del folio. 
   *
   * @param {string} id El id del folio que se va a cargar. 
   * @memberof RegistroDeLineasComponent
   */
  cargarDatosDeFolio(id: string) {
    this._folioService.cargarFolio(id).subscribe((folio: any) => {
      this.folio = folio;
      this.folio.folioLineas.forEach(linea => {
        linea.eliminar = false;
      });
      this.cliente = this.folio.cliente;
    });
  }

  /**
   *Guarda los cambios echos a la linea o una nueva linea. 
   *
   * @memberof RegistroDeLineasComponent
   */
  guardar() {
    // Comprobar si hay un modelo seleccioando.
    if (!this.folioLinea.modeloCompleto) {
      swal(
        "Modelo no seleccionado.",
        "Es obligatorio seleccionar un modelo.",
        "error"
      );
      return;
    }
    // Comprobar el nivel de urgencia.

    if (!this.folioLinea.nivelDeUrgencia) {
      swal(
        "Prioridad no definida.",
        "Es obligatorio definir la prioridad.",
        "error"
      );
      return;
    }

    // Comprobar la cantidad a teñir.
    if (this.sumaTenidoSuperaCantidad) {
      swal(
        "Cantidad no concordante.",
        "La cantidad a teñir supera la cantidad del pedido.",
        "error"
      );
      return;
    }

    if (this.laserarPedido) {
      if (this.laserSeleccionado) {
        this.folioLinea.laserCliente = this.cliente.laserados.find(
          x => x._id === this.laserSeleccionado
        );

        if( !this.comprobarProcesoLaserSeleccionado() ){
          this.agregarProcesoLaseradoFaltante();
          return;
        }

      } else {
        swal(
          "Marca laser no seleccionada.",
          // TODO: Cambiar a: "El pedido esta marcado para laserarse..."
          "El pedido esta marcado para laserarse pero no seleccionaste una marca.",
          "error"
        );
        return;
      }
    } else {
      this.folioLinea.laserCliente = null;
    } 


  

    // <!-- 
    // =====================================
    // LOS PROCESOS DE ALMACEN SOLO GUARDAN LOS AGREGADOS Y NO
    // LOS BASE COMO ENTREGA A PRODUCCION Y SURTIR DE ALMACEN.
    // =====================================
    // -->
      // Contenedor para los procesos que seleccionemos. 
      let procesosArr: Procesos[] = [];

      // // Cargamos los procesos especiales en el folio si es que hay.
      this._organizadorDragAndDropService.obtenerHijosOrdenables().forEach( ( dndObject:DndObject<Proceso> ) => {
        let procesos: Procesos = new Procesos();
        procesos.orden = dndObject.orden;
        procesos.proceso = dndObject.objeto;
        procesos.procesoPadre = dndObject.objetoPadre;
        procesosArr.push(procesos);
  
      });
      this.folioLinea.procesos = procesosArr;
      
    // <!-- 
    // =====================================
    //  END LOS PROCESOS DE ALMACEN SOLO GUARDAN LOS AGREGADOS Y NO
    //  LOS BASE COMO ENTREGA A PRODUCCION Y SURTIR DE ALMACEN.
    // =====================================
    // -->

    

    // Lo guardamos.
    this._folioService
      .guardarLinea(this.folio._id, this.folioLinea)
      .subscribe(() => {
        // cancelarModificacion limpia todo para un nuevo pedido..
        this.cancelarModificacion();
        // Cargamos los datos del folio para que aparezcan actualizados. 
        this.cargarDatosDeFolio(this.folio._id);
      });
  }

  /**
   *Emite una alerta de que el pedido es laserado pero no se ha seleccionado el proceso
   y despues da opcion a agregarlo a la lista ordenable. 
   *
   * @memberof RegistroDeLineasComponent
   */
  agregarProcesoLaseradoFaltante(){
    let msj = `El pedido va laserado pero 
    no has seleccionado el proceso ${PROCESOS.LASER._n}. Quieres agregarlo al modelo? `
    this._msjService.confirmarAccion(msj, ()=>{
      // Cargamos el proceso laser en el ultimo

      this._procesoService.buscarPorId( this.defaultModelData.PROCESOS.LASER ).subscribe( 
          resp=>{
            this._organizadorDragAndDropService
              .addHijoAlFinal( )
                .setEliminable(true)
                .setLeyenda(resp.nombre)
                .setLeyendaOptativa(resp.departamento.nombre)
                .setObjeto(resp);
            this._organizadorDragAndDropService.actualizarPropiedadOrden();
            this._msjService.informar('Se anadio el proceso correctamente.');

          }
      );
     
    }, 'No puedes continuar si no defines el proceso de laserado o deseleccionas la opcion.');

  }

  /**
   *Comprueba si el proceso de laserado esta seleccionado tomando su id desde
   el defaultsService. 
   *
   * @returns {boolean}
   * @memberof RegistroDeLineasComponent
   */
  comprobarProcesoLaserSeleccionado( ): boolean{
    return this._organizadorDragAndDropService
      .existeObjectoPorCampo(this.defaultModelData.PROCESOS.LASER);

  }

  seleccionarLaserado(id: string) {
    // TODO: LIMPIAR ESTE LOG  .

    // Filtramos los laserados
    const laserado: Laser = this.cliente.laserados.find(laser => {
      return laser._id === id;
    });

    if (laserado) {
      this.folioLinea.laserCliente = laserado;
      this.laserSeleccionado = laserado._id;
    }
  }

  nuevaMarcaLaser() {
    swal({
      title: `Nueva marca laser`,
      html: `Ingresa la nueva marca laser para ${this.cliente.nombre}.`,
      input: "text",
      inputValue: "",
      showCancelButton: true,
      inputValidator: value => {
        return !value && "¡Necesitas escribir algo!";
      }
    }).then(resp => {
      if (resp.value) {
        this._clienteService
          .guardarNuevaMarcaLaser(this.cliente._id, resp.value)
          .subscribe((cliente: any) => {
            this.cliente = cliente;
          });
      }
    });
  }

  /**
   *Carga los datos de la linea para para ser modificados. 
   *
   * @param {FolioLinea} linea
   * @memberof RegistroDeLineasComponent
   */
  modificar(linea: FolioLinea) {
   
    this.generarBuscadorRapido();

    // Limpiamos el termino de busqueda. 
    this.termino = "";

    this.folioLinea = linea;

    
    if (this.folioLinea.laserCliente) {
      this.laserSeleccionado = this.folioLinea.laserCliente._id;
      this.laserarPedido = true;
    }
    this.modificandoLinea = true;

    // Cargamos la lista seleccionable del organizador. 
    this.cargarProcesosSeleccionablesEnLista();

    // <!-- 
    // =====================================
    //  NO ES NECESARIO GENERAR EL ORGANIZADOR
    // =====================================
    // -->
    // this._buscadorRapidoService.seleccionarElemento(x) llama internamente
    // el callback seleccionar donde ya tenemos definido 
    // this.generarOrganizador()
    // <!-- 
    // =====================================
    //  END NO ES NECESARIO GENERAR EL ORGANIZADOR
    // =====================================
    // -->
    
    let a:BuscadorRapido<ModeloCompleto> = new BuscadorRapido();
    a.setNombre(this.modeloCompletoPipe.transform(linea.modeloCompleto))
    a.setObjeto(linea.modeloCompleto);
  

    this._buscadorRapidoService
      .seleccionarElemento(a)

  
    
  }

  eliminarLinea(linea: FolioLinea) {
    swal({
      title: "¿Quieres eliminar este pedido?",
      text: "Esta acción no se puede deshacer.",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No, no lo elimines.",
      confirmButtonText: "¡Si, elimínalo!"
    }).then(result => {
      if (result.value) {
        linea.eliminar = true;
        this._folioService
          .eliminarLinea(this.folio._id, linea._id)
          .subscribe(() => {
            // Removemos para no tener que recargar.

            linea.eliminar = true;
            this._util.delay(700).then(() => {
              this.folio.folioLineas = this.folio.folioLineas.filter(fila => {
                if (linea._id !== fila._id) {
                  return true;
                }
              });
            });
          });
      }
    });
  }

  cancelarModificacion() {
    this.folioLinea = null;
    this.laserSeleccionado = "";
    this.laserarPedido = false;
    this.modificandoLinea = false;
    this.termino = "";
    this.cargarDatosDeFolio(this.folio._id);
    this.generarBuscadorRapido();

  }

  agregarColorTenido() {
    const subTotal: number = this.calcularSumaTenido();
    const ct = new ColoresTenidos();
    // ct.color = "";
    const restante = this.folioLinea.cantidad - subTotal;
    ct.cantidad = restante > 0 ? restante : 0;
    this.folioLinea.coloresTenidos.push(ct);
  }

  eliminarColorTenido(i: number) {
    this.folioLinea.coloresTenidos.splice(i, 1);
    this.calcularSumaTenido();
  }

  calcularSumaTenido(): number {
    let t = 0;
    this.folioLinea.coloresTenidos.forEach(x => {
      t += x.cantidad;
    });
    this.sumaTenidoSuperaCantidad = t > this.folioLinea.cantidad;
    return t;
  }

  trackByFn(index: any) {
    return index;
  }
  agregarPedido() {
    this.folioLinea = new FolioLinea();

    this.folioLinea.nivelDeUrgencia = this.nivelDeUrgencia[1].nivel;
    this.folioLinea.almacen = false;
    // this._buscadorRapidoService.reiniciar();
  }

  /**
   * Realiza las modificaciones en las line para que
   * solo se admintan procesos para productoTerminado.
   *
   * @memberof RegistroDeLineasComponent
   */
  soloParaProductoTerminado( ){
    if( !this.folioLinea.almacen ){


      // Se surte desde almacen.
      this._organizadorDragAndDropService.guardarCambiosDeManeraTemporal();
      // Si esta vacio creamos un padre que sea productoTerminado.
      if( !this._organizadorDragAndDropService.tieneAreas() ){
        
        Promise.all([
          this._procesoService.buscarPorId(this.defaultModelData.PROCESOS.CONTROL_DE_PRODUCCION).toPromise(),
          this._procesoService.buscarPorId(this.defaultModelData.PROCESOS.ALMACEN_DE_BOTON).toPromise(),
          this._procesoService.buscarPorId(this.defaultModelData.PROCESOS.LASER).toPromise()
        ]).then((resp ) => {
          let padre: Proceso = resp[0];
          let hijoFijo: Proceso = resp[1];
          let laser: Proceso = resp[2];

          // Agregamos el padre que siempre tiene que se entrega de procesos a produccion.
          let dnd: DndObject<Proceso> = this._organizadorDragAndDropService
            .nuevaArea(padre._id)
              .setPadre()
                .setEliminable(false)
                .setOrden('0')
                .setLeyenda(padre.nombre)
                .setObjeto(padre)
                .setLeyendaOptativa(padre.departamento.nombre);
               
          dnd.dnd
            .hijos
              .addFijo()
                .setEliminable(false)
                .setLeyenda( hijoFijo.nombre )
                .setLeyendaOptativa( hijoFijo.departamento.nombre)
                .setObjeto( hijoFijo )
                .setOrden('0.1');

                this._organizadorDragAndDropService.actualizarPropiedadOrden();

          if( this.laserarPedido ){
            this._organizadorDragAndDropService
              .addHijoAlFinal()
                .setEliminable(true)
                .setLeyenda(laser.nombre)
                .setLeyendaOptativa(laser.departamento.nombre)
                .setObjeto(laser);
                this._organizadorDragAndDropService.actualizarPropiedadOrden();
            }
        }).catch((err) => {
          throw err;
        });
      }
    } else { 
      this._organizadorDragAndDropService.guardarCambiosDeManeraTemporal();
    }
    
  }
}
