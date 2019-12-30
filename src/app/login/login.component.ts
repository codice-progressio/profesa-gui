import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NgForm } from '@angular/forms'
import { Usuario } from '../models/usuario.model'
import { DefaultsService } from '../services/configDefualts/defaults.service'
import { UsuarioService } from '../services/usuario/usuario.service'

declare function init_plugins()
declare const gapi: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string
  recuerdame: boolean = false
  auth2: any
  fondoRandom: number

  constructor(public router: Router, public _usuarioService: UsuarioService) {
    this.fondoRandom = 1
  }

  ngOnInit() {
    init_plugins()
    this.email = localStorage.getItem('email') || ''
    if (this.email.length > 1) {
      this.recuerdame = true
    }
  }

  loading = false
  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return
    }

    this.loading = true

    const usuario = new Usuario(null, forma.value.email, forma.value.password)
    this._usuarioService.login(usuario, forma.value.recuerdame).subscribe(
      () => this.router.navigate(['/dashboard']),
      err => {
        this.loading = false
      }
    )
  }
}
