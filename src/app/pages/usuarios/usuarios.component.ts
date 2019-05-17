import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { _ROLES } from '../../config/roles.const';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  

  usuarios: Usuario[] = [];
  usuarioEditando: Usuario;
  
  roles = _ROLES;
  rolesArray = Object.values(_ROLES);
  

  // La variable que manejara la paginación.
  desde: number = 0;
  // El total de registros existentes;
  totalRegistros: number = 0;

  cargando: boolean = true;

  termino: String;
  // roles:Roles;
  Object = Object;

  constructor(
    public _usuarioServivce: UsuarioService,
    public _modalUploadService: ModalUploadService,
    public _msjService: ManejoDeMensajesService
  ) {
    // this.roles = new Roles(_ROLES);
   }



  ngOnInit() {
    this.cargarUsuarios();
    // Es necesario suscribirse para la carga de imágenes. 
    this._modalUploadService.notificacion.subscribe(
      () => {
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

  cargarUsuarios() {

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
              .subscribe( () => {
                // console.log(borrado);
                this.cargarUsuarios();
              });
      }
    });


  }
  // Guarda las modificaciones echas a un usuario.
  guardarUsuario( usuario: Usuario ) {
    // console.log( usuario);
    
    const a: any = () => {if ( usuario._id ) {
        this._usuarioServivce.actualizarUsuario(usuario)
        .subscribe(() => {
          this.cargarUsuarios();
          this.usuarioEditando = null;
        });
      } else {
        this.guardarNuevoUsuario( usuario );
      }
    };
    
    let msj = 'No definiste ningún rol para este usuario. Esto significa que ';
    msj += 'no tendra permisos para acceder.¿Quieres continuar?';
    if ( usuario.role.length === 0) {
      this._msjService.confirmarAccion(msj, a);
    } else {
      a();
    }

  }

  

  guardarNuevoUsuario( usuario: Usuario) {
    this._usuarioServivce.crearUsuario(usuario).subscribe( () => {
      this.cargarUsuarios();
      this.usuarioEditando = null;
    });
  }

  editar( usuario: Usuario ) {
    // Guardamos una copia. 
    this.usuarioEditando = usuario;
  }

  cancelarEdicion( ) {
    this.usuarioEditando = null;
    this.cargarUsuarios();
  }

  cambiarVisibilidad( e ) {
    console.log(e.target.id);
    const role = e.target.id;
    if ( this.usuarioEditando.role.includes(role)) {
      this.usuarioEditando.role = this.usuarioEditando.role.filter( x =>  x !== role );
    } else {
      this.usuarioEditando.role.push(role);
    }
    
  }

  nuevoUsuario( ) {
    this.usuarioEditando = new Usuario();
  }


}
