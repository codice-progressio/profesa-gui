import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { NgForm } from '@angular/forms'
import { Usuario } from '../models/usuario.model'
import { DefaultsService } from '../services/configDefualts/defaults.service'
import { UsuarioService } from '../services/usuario/usuario.service'
import { ManejoDeMensajesService } from '../services/utilidades/manejo-de-mensajes.service'

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
    private msjService: ManejoDeMensajesService,
    public router: Router,
    public _usuarioService: UsuarioService,
    private render: Renderer2
  ) {}

  ngOnInit() {
    init_plugins()

    if (localStorage.getItem('token')) {
      this.router.navigate(['/dashboard'])
    }

    this.email = localStorage.getItem('email') || ''
    if (this.email.length > 1) {
      this.recuerdame = true
    }

    this.aplicarEstilos()
  }

  ngOnDestroy(): void {
    this.render.removeClass(document.body, 'login-usuario')
  }

  aplicarEstilos() {
    this.render.addClass(document.body, 'login-usuario')
  }

  loading = false
  invalido = false
  recordar = true
  ingresar() {
    if (!this.password || !this.email) {
      this.msjService.toast.warning('Debes completar las credenciales')
      this.invalido = true
      return
    }

    this.loading = true
    this.invalido = false
    this._usuarioService
      .login(this.email, this.password, this.recordar)
      .subscribe(
        () => {
          // Cargamos los menus del usuario
          this._usuarioService.obtenerMenus().subscribe(
            () => {
              this.router.navigate(['/dashboard'])
            },
            () => {
              this.msjService.toast.error(
                'Hubo un problema obteniendo los menus. Inicia sesión de nuevo.'
              )
            }
          )
        },
        err => {
          this.loading = false
          this.invalido = true
        }
      )
  }

  emailGuardado(): boolean {
    return !!localStorage.getItem('email') || this.recordar
  }
}
