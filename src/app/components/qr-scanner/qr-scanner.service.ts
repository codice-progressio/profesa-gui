import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import swal from 'sweetalert2';
import { Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ModeloCompleto } from 'src/app/models/modeloCompleto.modelo';
import { FolioLinea } from 'src/app/models/folioLinea.models';
import { Orden } from 'src/app/models/orden.models';
import { ListaDeOrdenesService } from '../lista-de-ordenes/lista-de-ordenes.service';
import { PreLoaderService } from '../pre-loader/pre-loader.service';
import { GeneralesComponents } from '../../pages/utilidadesPages/generalesComponents';
import { FolioService } from 'src/app/services/folio/folio.service';

/**
 * Esta funcion esta declarada en el index e 
 * inicializa el lector. 
 *
 */
declare function qrCode();
/**
 * Detiene el lector. 
 *
 */
declare function qrDetener();
declare let qrLeyendo: any;
declare let qrData: any;



/**
 * Esta clase gestiona el lector de qr. 
 * 
 * Hay que tener cuidado por que se requieren mas librerias 
 * y cosas para que funcione que estan en el index. 
 *
 * @export
 * @class QrScannerService
 * @template T El componente que manda a llamar a este servicio. Tiene que
 * ser igual que generales component. 
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class QrScannerService<T> {
  
  /**
   *El titulo que aparecera en el lector. 
   *
   * @type {string}
   * @memberof QrScannerService
   */
  titulo: string = 'Lector de QR';
  lector: string = '#reader';
  leyendo: boolean;
  /**
   * La informacion que se obtiene del qr. 
   *
   * @type {string}
   * @memberof QrScannerService
   */
  data: string = qrData;
  mnsOk: string = 'QR Escanedado';
  mostrarMensaje: boolean = false;
  private urlActual: string;

  // Prepara el escanner para recibir las órdenes
  // en el departamento. 
  recivir: boolean = false;

  /**
   * La acción que va a ejecutar el servicio cuando 
   * el escaner se ejecute. 
   *
   * @type {*};
   * @memberof QrScannerService
   */
  callback: any;

  /**
   * Este es el callback que se ejecuta cuando hay un error
   * Se pone dentro de la llamada que tiene el error y se pasa 
   * como parametro. 
   *
   *
   * @type {*}
   * @memberof QrScannerService
   */
  callbackError: any;

  lecturaCorrecta = false;



    
  constructor(public router: Router,
    public _folioService: FolioService,
    public _listaDeOrdenesService: ListaDeOrdenesService,
    public _preLoaderService: PreLoaderService
    ) {
    
  }
  
  /**
   * Es necesario que la clase que manda a llamar esta función tenga los 
  * siguientes parametros accesibles
  *  - orden:Orden ,                    <= Recive la órden escaneada.   
  *  - modeloCompleto: modeloCompleto , <= Recive el modeloCompleto
  *  - linea: FolioLinea                <= Recive la Linea folio.       
  *  - NOMBRE_DEPTO                     => Envía el nombre del departamento actual. 
  *  - ID_DEPTO                         => Envia el id del departamento. Sustituye a NOMBRE_DEPTO por que ahora utilizamos el id del departamento. 
  *  - cargarOrdenesDeDepartamento()    => Ejecuta la función que carga la lista de órdenes del depto. 
  * 
  *
  * @param {GeneralesComponents<T>} me El me es la clase completa que pasamos para trabajarla desde aqui..
  * @param {*} cb_Error El cb_Error es la función que se ejecutara cuando haya un error. 
  * @param {*} [cb_Optional=null] El cb_Optional es por si queremos hacer algo más con los datos.  
  * @memberof QrScannerService
  */
  buscarOrden(me: GeneralesComponents<T>  , cb_Error, cb_Optional: any = null) {
    // Definimos el callback de error. La acción que se realizará
    // cuando el api mande un error. 
    this.callbackError = cb_Error;
    // La acción que se va a ejecutar cuando se escanee
    // correctamente la órden. s
    this.callback = ( data ) => {
      const call: any = (resp: any) => {
        me.orden = resp.orden;
        me.modeloCompleto = resp.modeloCompleto;
        me.linea.modeloCompleto = me.modeloCompleto;
        this.lecturaCorrecta = true;
        if ( !!cb_Optional ) {
          cb_Optional();
        }  
      };
      if ( this.recivir ) {
        this._folioService.recivirUnaOrden( data, me.ID_DEPTO, this.callbackError)
          .subscribe(() => {
           this.iniciar();
           me.cargarOrdenedDeDepartamento(me.NOMBRE_DEPTO, me.ID_DEPTO, me.variablesDepto._vm);
          });
      } else {
        this._folioService.buscarOrden( data, me.ID_DEPTO, this.callbackError)
        .subscribe(call);
      }
      
    };
  }

  /**
   * Inicia el scanner. 
   *
   * @memberof QrScannerService
   */
  iniciar() {
    this.urlActual = this.router.url;
    this.lecturaCorrecta = false;

    const promesa = this.router.events.pipe(filter(e => e instanceof RouterEvent)).subscribe((e: any) => {
      if ( this.urlActual !== e.url) {
        this.leyendo = false;
        promesa.unsubscribe();
      } 
    });

    if ( !this.leyendo ) {
      this.data = null;
      qrCode();
      
      this.leyendo = true;
      
      this.promesa().then( () => {
        this.msjEscaneado();
      }
      ).catch( err => {
        console.log(err);
      });
      
    } else {

      swal({
        position: 'top-end',
        type: 'error',
        title: 'Error QRScanner',
        html: 'Ya hay una instancia activa del escaner.',
        showConfirmButton: true,
        timer: 3000
      });
    }
  }

  /**
   *Detiene la ejecucion del QR.
   *
   * @memberof QrScannerService
   */
  detener() {
    qrDetener();
    this.leyendo = false;
    this.removerVideo();
    this.callback(this.data);
    // qrData = null;
  }

  /**
   * Remueve el video y el canvas del html. 
   *
   * @memberof QrScannerService
   */
  removerVideo() {
    $(this.lector + ' video').remove();
    $(this.lector + ' canvas').remove();
  }

  /**
   *Ejecuta una promesa para obtener la lectura de los datos.
   *
   * @returns
   * @memberof QrScannerService
   */
  promesa () {
    return new Promise( (resolve, reject )  => {
      
      const i = setInterval( () => {
        if ( qrLeyendo ) {
          this.data = qrData;
          this.lecturaCorrecta = true;
          this.detener();
          clearInterval(i);
          qrData = null;
          resolve();
        }
        if ( !this.leyendo ) {
          clearInterval(i);
          qrData = null;
          this.lecturaCorrecta = false;
          resolve();
        }
      }, 100);

      
    });
  }

  /**
   *El mensaje que se mostrara cuando se escanee de manera correcta. 
   *
   * @memberof QrScannerService
   */
  msjEscaneado () {
    if ( this.mostrarMensaje ) {
      swal({
        title: this.mnsOk,
        animation: false,
        customClass: 'animated zoomIn',
        type: 'success',
        timer: 1000
      });
    }

  }


}
