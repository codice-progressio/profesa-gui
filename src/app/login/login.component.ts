import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { element } from 'protractor';
import swal from 'sweetalert2';

declare function init_plugins();
declare function tooltip();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;
  auth2: any;

  constructor(
      public router: Router,
      public _usuarioService: UsuarioService
    ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email =  localStorage.getItem('email') || '';
    if ( this.email.length > 1) {
      this.recuerdame = true;
    }

  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '106809634178-3pc6e4gpfgtbfea8kkm7r7a0n2r8j75v.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin (document.getElementById('btnGoogle'));
    });
  }

  // tslint:disable-next-line:no-shadowed-variable
  attachSignin ( element ) {
    this.auth2.attachClickHandler( element, {}, googleUser => {
      // Con este podemos obtener información sobre los datos del usuario Google.
      // const profile = googleUser.getBasicProfile();
      // -----------------
      const token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle(token)
          .subscribe( resp => {
            window.location.href = '#/dashboard';
          });

    });
  }

  ingresar (forma: NgForm) {

    if (forma.invalid) {
      return;
    }

    const usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService.login(usuario, forma.value.recuerdame)
        .subscribe(resp => this.router.navigate(['/dashboard']) );
    // this.router.navigate([ '/dashboard' ]);
  }

}