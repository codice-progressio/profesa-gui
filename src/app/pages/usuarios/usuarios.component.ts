import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../../services/service.index';
import { log } from 'util';
import swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  // La variable que manejara la paginación.
  desde: number = 0;
  // El total de registros existentes;
  totalRegistros: number = 0;

  cargando: boolean = true;

  termino: String;

  constructor(
    public _usuarioServivce: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    // Es necesario suscribirse para la carga de imágenes. 
    this._modalUploadService.notificacion.subscribe(
      resp => {
        // Recarga la misma pantalla donde nos encontramos
        // por que tenemos definida la variable "desde" dentro
        // de la función.
        this.cargarUsuarios();
      }
    );
  }

  mostrarModal ( id: string) {
    this._modalUploadService.mostrarModal( 'usuarios', id);
  }

  cargarUsuarios( desde: number = 0) {

    this.cargando = true;

    this._usuarioServivce.cargarUsuarios(this.desde)
          .subscribe( (resp: any) => {
            // console.log(resp);
            this.usuarios = resp.usuarios;
            this.totalRegistros = resp.total;
            this.cargando = false;
          });
  }


  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    // console.log(desde);
    if ( desde >= this.totalRegistros) {
      return;
    }


    if ( desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuario ( termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return true;
    }
    this.termino = termino;
    this.cargando = true;
    this._usuarioServivce.buscarUsuario( termino )
    .subscribe( (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.cargando = false;
                });
  }

  borrarUsuario( usuario: Usuario ) {
    if (usuario._id === this._usuarioServivce.usuario._id) {
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: '¿Estas segúro?',
      text: `Esta a punto de borrar a ${usuario.nombre}.` ,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, eliminalo!'
    }).then((borrar) => {
      if (borrar.value) {

        this._usuarioServivce.borrarUsuario( usuario._id )
              .subscribe( borrado => {
                // console.log(borrado);
                this.cargarUsuarios();
              });
      }
    });


  }
  // Guarda las modificaciones echas a un usuario.
  guardarUsuario( usuario: Usuario ) {
    // console.log( usuario);
    
    this._usuarioServivce.actualizarUsuario(usuario)
    .subscribe();
  }

}
