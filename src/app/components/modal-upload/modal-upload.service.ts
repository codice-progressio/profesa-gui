import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
  // Esta cosa extraña se que se llama servicio y sirve para comunicar
  // entre componentes solo se encarga de llevar información entre uno y otro.
  // Por el momento solo oculta unas cuantas cosas. Es para comunicación.
  public tipo: string;
  public id: string;
  public oculto: string = 'oculto';

  // Notifica de que se cargo algo xP
  // Este emmiter guarda la información que se pasa cuando se llama
  // notifacion.emit( datoAPasar )
  // Es necesario que se sucriban a esto desde el ngInInit
  // para que los cambios que se hagan aquí se emitan
  // al servicio?
  public notificacion = new EventEmitter<any>();

  constructor() {
  }

  ocultarModal () {
    this.oculto = 'oculto';
    // Es necesario reiniciar por que esto se queda seateado.
    this.id = null;
    this.tipo = null;
  }

  mostrarModal ( tipo: string, id: string) {
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;
  }
}
