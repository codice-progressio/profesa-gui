import { Paso } from "./Paso";
import { AgrupacionTransformacion } from "./Agrupacion";
import { AgrupacionTransformacionPedido } from "./AgrupacionTransformacionPedido";
import { AgrupacionTransformacionModelo } from "./AgrupacionTransformacionModelo";
import { OrdenReporteTransformacion } from "./OrdenReporteTransformacion";
import { ModeloCompletoPipe } from "../../../pipes/modelo-completo.pipe";
import { NIVEL } from "src/app/config/nivelesDeUrgencia";
import { throwError } from "rxjs";
import { AgrupacionTransformacionOrdenes } from './AgrupacionTransformacionOrdenes';

/**
 *Esta clase alamacena la estructura para el reporte de trasformacion 
 que se genera desde la API.
 *
 * @export
 * @class ReporteTransformacion
 */
export class ReporteTransformacion {
  /**
     *Este tiene que coincidir con los estados de orden
     que vienen desde la api que son: disponible, trabajando y pendiente. 
     por que usamos la llave de pasos para encontrar esta coincidencia. 
     *
     * @memberof ReporteTransformacion
     */
  agrupadas = {
    disponibles: new AgrupacionTransformacion(),
    trabajando: new AgrupacionTransformacion(),
    pendientes: new AgrupacionTransformacion()
  };

  // public agrupadasDisponibles: AgrupacionTransformacion;
  // public agrupadasTrabajando: AgrupacionTransformacion;
  // public agrupadasPendientes: AgrupacionTransformacion;

  public get objetoContenedorDePasos(): {
    [paso: number]: Paso;
  } {
    return this._objetoContenedorDePasos;
  }
  /**
     *Contiene los pasos que actualmente existen. Este valor
     es dinamico y depende las ordenes que existan y cuantos
     pasos tengan. 
     *
     * @memberof ReporteTransformacion
     */
  public set objetoContenedorDePasos(value: { [paso: number]: Paso }) {
    this._objetoContenedorDePasos = value;
  }
  constructor(
    private _objetoContenedorDePasos?: {
      [paso: number]: Paso;
    }
  ) {}

  agrupar() {
    //Itineramos sobre el objeto contenedorDePasos.
    for (const keyPaso in this.objetoContenedorDePasos) {
      if (this.objetoContenedorDePasos.hasOwnProperty(keyPaso)) {
        /**
         * El paso que estamos evaluando.
         */
        const paso: Paso = this.objetoContenedorDePasos[keyPaso];

        //Separamos las ordenes por niveles. Primero por modelos, despues
        // las agrupamos por pedidos y al final las ordenes.

        // Itineramos sobre el objeto this.agrupadas y obtenemos de
        // un tiro dos pajarillos. El primero es que dentro del paso
        // obtenemos el estado de la orden (que viene de la api. )
        // y de paso obtenemos el elemento agrupados que es el que
        // nos ayuda a clasificar las ordenes.
        for (const keyAgrupador in this.agrupadas) {
          if (this.agrupadas.hasOwnProperty(keyAgrupador)) {
            /**
             * El elemento agruapador a cuyo lugar debe ir la orden.
             */
            const elementoAgrupador: AgrupacionTransformacion = this.agrupadas[
              keyAgrupador
            ];

            
            // Aqui es donde la magia sucede. Filtramos por la llave que nosotros
            // mismos creamos por que tenimos el problema de que itineraba sobre todo
            // y no queremos que todos los estados recivan la orden, solo el que coicide
            // con nuestro propio agrupados.
            paso[keyAgrupador].forEach((orden: OrdenReporteTransformacion) => {
              this.organizar(orden, elementoAgrupador, Number(keyPaso));
            });

           
          }
        }
      }
    }

    console.log( this.objetoContenedorDePasos)
  }

  

  /**
   * Organiza la orden dentro del agrupados que se le pase como parametro y si no existe
   * el elemento agrupador( modelo, pedido ) crea el objeto para agregarlo.
   *
   * @private
   * @param {OrdenReporteTransformacion} orden La orden que se va a acomodar.
   * @param {AgrupacionTransformacion} contenedor El contenedor que guardara la orden.
   * @param {number} keyPaso El paso en el que se encuentra itinerando.
   * @memberof ReporteTransformacion
   */
  private organizar(
    orden: OrdenReporteTransformacion,
    contenedor: AgrupacionTransformacion,
    keyPaso: number
  ) {
      let mcp: ModeloCompletoPipe = new ModeloCompletoPipe();
      
    /**
     * El string del modelo completo para el indice.
     */
    let modeloCompleto: string = mcp.transform(orden.modeloCompleto);
    if( !contenedor.paso ){
        contenedor.paso = {}
    }

    if (!contenedor.paso.hasOwnProperty(keyPaso)) {
      contenedor.paso [keyPaso] = new AgrupacionTransformacionModelo() 
    }
    if( !contenedor.paso[keyPaso].modeloCompleto ){
        contenedor.paso[keyPaso].modeloCompleto = {}
    }
    
    if (!contenedor.paso[keyPaso].modeloCompleto.hasOwnProperty(modeloCompleto)) {
      contenedor.paso[keyPaso].modeloCompleto[modeloCompleto] = new AgrupacionTransformacionPedido()
      
    } 

    if( !contenedor.paso[keyPaso].modeloCompleto[modeloCompleto].pedido) {
        contenedor.paso[keyPaso].modeloCompleto[modeloCompleto].pedido = {}
    }

    if(!contenedor.paso[keyPaso].modeloCompleto[modeloCompleto].pedido.hasOwnProperty( orden.pedido ) ) {
      contenedor.paso[keyPaso].modeloCompleto[modeloCompleto].pedido[orden.pedido] = new AgrupacionTransformacionOrdenes();
    }
    
    // Agregamos la orden. 
    contenedor.paso[keyPaso].modeloCompleto[modeloCompleto].pedido[orden.pedido].ordenes.push( orden )
    
    // Generamos id si no existe. 

    if(!contenedor.paso[keyPaso].modeloCompleto[modeloCompleto].idCollapse  ) {
      contenedor.paso[keyPaso].modeloCompleto[modeloCompleto].idCollapse = this.generarIdCollapse( )
    }
    
    if(!contenedor.paso[keyPaso].modeloCompleto[modeloCompleto].pedido[orden.pedido].idCollapse  ) {
      contenedor.paso[keyPaso].modeloCompleto[modeloCompleto].pedido[orden.pedido].idCollapse = this.generarIdCollapse( )
    }



    // AGREGAMOS LOS DATOS DEL PEDIDO. 
    
    
    contenedor.paso[keyPaso].modeloCompleto[modeloCompleto].pedido[orden.pedido].fechaDePedido = orden.fechaFolio; 
    contenedor.paso[keyPaso].modeloCompleto[modeloCompleto].pedido[orden.pedido].cliente = orden.cliente



    contenedor.paso[keyPaso].modeloCompleto[modeloCompleto].pedido[orden.pedido].observaciones 
      = (orden.observacionesFolio ? orden.observacionesFolio: '') 
      + ' ' 
      + (orden.observacionesPedido ? orden.observacionesPedido: '')

    contenedor.paso[keyPaso].modeloCompleto[modeloCompleto].fechaDePedido = orden.fechaFolio
 

    if(contenedor.paso[keyPaso].modeloCompleto[modeloCompleto].pedido.hasOwnProperty( orden.pedido ) )
    contenedor.paso[keyPaso].modeloCompleto[modeloCompleto].pedido[orden.pedido]
    
    contenedor.paso[keyPaso].totalDeOrdenes ++
    contenedor.paso[keyPaso].modeloCompleto[modeloCompleto].totalDeOrdenes ++

    if( contenedor.paso[keyPaso].prioridadMayor === '' ){
        contenedor.paso[keyPaso].prioridadMayor = orden.nivelDeUrgencia;
    } else {
        
        let maximaPrioridadPaso: number = 0;
        let maximaPrioridadModelo: number = 0;
        let maximaPrioridadOrden: number = 0;
        // PRIORIDAD DE PASO
        let prioridadActualPaso  = NIVEL.indexOf(contenedor.paso[keyPaso].prioridadMayor) 
        let prioridadActualModeloCompleto = NIVEL.indexOf(contenedor.paso[keyPaso].modeloCompleto[modeloCompleto].prioridadMayor === '' ? orden.nivelDeUrgencia: contenedor.paso[keyPaso].modeloCompleto[modeloCompleto].prioridadMayor) ;
        let prioridadActualOrden = NIVEL.indexOf(contenedor.paso[keyPaso].modeloCompleto[modeloCompleto].pedido[orden.pedido].prioridadMayor === '' ? orden.nivelDeUrgencia: contenedor.paso[keyPaso].modeloCompleto[modeloCompleto].pedido[orden.pedido].prioridadMayor) ;
        let prioridadOrden = NIVEL.indexOf( orden.nivelDeUrgencia )

        // Prioridad del paso
        if( prioridadOrden > prioridadActualPaso ){
          maximaPrioridadPaso = prioridadOrden
          // Hubo un cambio de prioridad reiniciamos el contador a 1;
          contenedor.paso[keyPaso].cantidadDePrioridadMayor = 1;
        } else {
          maximaPrioridadPaso = prioridadActualPaso
          // La prioridad es la misma que la actual de la orden entonces sumamos. 
          if( prioridadOrden === prioridadActualPaso ) contenedor.paso[keyPaso].cantidadDePrioridadMayor ++ ;
        }
        
        // Prioridad del modelo
        if( prioridadOrden> prioridadActualModeloCompleto ){
          maximaPrioridadModelo = prioridadOrden
          // Hubo un cambio de prioridad reiniciamos el contador a 1;
          contenedor.paso[keyPaso].modeloCompleto[modeloCompleto].cantidadDePrioridadMayor = 1;
        } else {
          maximaPrioridadModelo = prioridadActualModeloCompleto
          // La prioridad es la misma que la actual de la orden entonces sumamos. 
           if( prioridadOrden === prioridadActualModeloCompleto ) contenedor.paso[keyPaso].modeloCompleto[modeloCompleto].cantidadDePrioridadMayor ++ ;
        }
        
        // Prioridad del pedido

        // Prioridad del modelo
        if( prioridadOrden> prioridadActualOrden ){
          maximaPrioridadOrden = prioridadOrden
          // Hubo un cambio de prioridad reiniciamos el contador a 1;
          contenedor.paso[keyPaso].modeloCompleto[modeloCompleto].pedido[orden.pedido].cantidadDePrioridadMayor = 1;
        } else {
          maximaPrioridadOrden = prioridadActualOrden
          // La prioridad es la misma que la actual de la orden entonces sumamos. 
           if( prioridadOrden === prioridadActualOrden ) contenedor.paso[keyPaso].modeloCompleto[modeloCompleto].pedido[orden.pedido].cantidadDePrioridadMayor ++ ;
        }

       
        // Agregamos la maxima prioridad. 
        contenedor.paso[keyPaso].prioridadMayor = NIVEL[maximaPrioridadPaso];
        contenedor.paso[keyPaso].modeloCompleto[modeloCompleto].prioridadMayor= NIVEL[maximaPrioridadModelo];
        contenedor.paso[keyPaso].modeloCompleto[modeloCompleto].pedido[orden.pedido].prioridadMayor = NIVEL[maximaPrioridadOrden]


    }





  
  
  }


  /**
   * Genera el id collapse
   *
   * @returns {string}
   * @memberof ReporteTransformacion
   */
  private generarIdCollapse( ): string {

    return Math.trunc( Math.random()*1000000 ) + ''
  }

  
}
