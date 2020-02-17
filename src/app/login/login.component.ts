import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core'
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
export class LoginComponent implements OnInit, OnDestroy {
  email: string
  recuerdame: boolean = false
  password: string

  copyRight = new Date().getFullYear()

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService,
    private render: Renderer2
  ) {}

  ngOnInit() {
    init_plugins()
    this.email = localStorage.getItem('email') || ''
    if (this.email.length > 1) {
      this.recuerdame = true
    }

    this.aplicarEstilos()
  }

  ngOnDestroy(): void {
    this.render.removeStyle(document.body, 'height')
    this.render.removeStyle(document.body, 'display')
    this.render.removeStyle(document.body, 'display')
    this.render.removeStyle(document.body, '-ms-flex-align')
    this.render.removeStyle(document.body, 'align-items')
    this.render.removeStyle(document.body, 'padding-top')
    this.render.removeStyle(document.body, 'padding-bottom')
    this.render.removeStyle(document.body, 'background-image')
  }

  aplicarEstilos() {
    this.render.setStyle(document.body, 'height', '100%')
    this.render.setStyle(document.body, 'display', '-ms-flexbox')
    this.render.setStyle(document.body, 'display', 'flex')
    this.render.setStyle(document.body, '-ms-flex-align', 'center')
    this.render.setStyle(document.body, 'align-items', 'center')
    this.render.setStyle(document.body, 'padding-top', '40px')
    this.render.setStyle(document.body, 'padding-bottom', '40px')
    this.render.setStyle(
      document.body,
      'background',
      'url(assets/images/background/nuevo.jpg) no-repeat center center fixed'
    )

    this.render.setStyle(document.body, 'background-size', 'cover')
  }

  loading = false
  ingresar() {
    if (!this.password || !this.email) {
      return
    }

    this.loading = true

    const usuario = new Usuario(null, this.email, this.password)
    this._usuarioService.login(usuario, true).subscribe(
      () => this.router.navigate(['/dashboard']),
      err => {
        this.loading = false
      }
    )
  }
}
