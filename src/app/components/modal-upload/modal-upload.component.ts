import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  // Este es el modal que permite modificar las imágenes
  // de los usuarios desde la parte adminstrativa.

  // Este modal utiliza el servicio modal-upload.Service
  // para comunicarse con usuarios.component.


  // oculto: string = ''; Esta es la manera viejita como se ocultaba el modal.
  // Ahora se oculta desde el servicio. modalUploadService.
  imagenSubir: File;
  imagenTemp: any;

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) {
  }

  ngOnInit() {
  }



  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;

    this._modalUploadService.ocultarModal();
  }

  seleccionImagen( archivo: File ) {

    if (!archivo ) {
      this.imagenSubir = null;
      return;
    }
    // Comprobar que la imágen es una imagen xP
    if (archivo.type.indexOf('image') < 0) {
      swal('Sólo imágenes', 'El archivo seleccionado no es una imágen.', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    // Puro Vanilla JS
    // Con este código precargamos las imagenes que queremos mostrar
    // sin necesidad de que las guardemos en el servidor.
    const reader = new FileReader();

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  subirImagen() {
    // console.log('Estamos en subir imagen"');
    
    this._subirArchivoService
      .subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
      .then( resp => {
        // console.log(resp);

        this._modalUploadService.notificacion.emit( resp );
        this.cerrarModal();
      }).catch( () => {
          console.log('Error en la carga.');
        });

  }

}
