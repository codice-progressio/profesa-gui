import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: any;

  constructor(public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar ( usuario: Usuario) {
    // Aunque no tengamos el objeto puro 'Usuario' lo podemos obtener asi

    // Solo necesitamos modificar el usuario que ya existe y no necesitamos volver a llamar
    // a un usuario.

    this.usuario.nombre = usuario.nombre;
    // if ( !this.usuario.google) {
    //     this.usuario.email = usuario.email;
    // }

    // Guardamos

    // this._usuarioService.update(this.usuario)
    // .subscribe( resp => {

    //  });

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
    const urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  cambiarImagen () {
    // this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id);
  }

}
