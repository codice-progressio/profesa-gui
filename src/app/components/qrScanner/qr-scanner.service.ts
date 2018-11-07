import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import swal from 'sweetalert2';
import { Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

declare function qrCode();
declare function qrDetener();
declare let qrLeyendo: any;
declare let qrData: any;

@Injectable({
  providedIn: 'root'
})
export class QrScannerService {
  
  lector: string = '#reader';
  leyendo: boolean;
  data: string = qrData;
  mnsOk: string = 'QR Escanedado';
  mostrarMensaje: boolean = false;
  private urlActual: string;

  // La acción que va a ejecutar el servicio cuando 
  // el escaner se ejecute. 
  callback: any;

  // Este es el callback que se ejecuta cuando hay un error
  // Se pone dentro de la llamada que tiene el error y se pasa 
  // como parametro. 
  callbackError: any;

  lecturaCorrecta = false;



    
  constructor(public router: Router, ) {
    
  }

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

  detener() {
    qrDetener();
    this.leyendo = false;
    this.removerVideo();
    this.callback(this.data);
    // qrData = null;
  }

  removerVideo() {
    $(this.lector + ' video').remove();
    $(this.lector + ' canvas').remove();
  }

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
