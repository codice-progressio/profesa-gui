import { Component, OnInit, Renderer2 } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UsuarioService } from '../services/usuario/usuario.service'
import { ManejoDeMensajesService } from '../services/utilidades/manejo-de-mensajes.service'

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent implements OnInit {
  constructor(
    private msjService: ManejoDeMensajesService,
    private renderer: Renderer2,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  varEstado = {
    comprobando: false,
    correcto: false,
    incorrecto: false
  }

  validarCodigo = false
  email = ''
  enviado = false

  codigo = ''

  varEstadoCambiar(
    variable: 'comprobando' | 'correcto' | 'incorrecto'
  ): boolean {
    Object.keys(this.varEstado).forEach(v => {
      if (variable !== v) this.varEstado[v] = false
    })
    this.varEstado[variable] = true
    return this.varEstado[variable]
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'confirmar-usuario')

    this.activatedRoute.queryParamMap.subscribe(query => {
      this.validarCodigo = query.keys.includes('codigo')

      if (this.validarCodigo) {
        this.codigo = query.get('codigo')
        // Si no hay codigo, mandamos error.
        if (!this.codigo) {
          this.varEstadoCambiar('incorrecto')
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'confirmar-usuario')
  }

  regresar() {
    this.router.navigate(['/login'])
  }

  cargando = false
  generarLinkRecuperarContrasena() {
    if (this.cargando) return
    if (!this.email.trim()) {
      this.msjService.toastError('Debes ingresar tu correo')
      return
    }
    this.cargando = true
    this.usuarioService.generarLinkRecuperarContrasena(this.email).subscribe(
      r => {
        this.enviado = true
      },

      () => (this.cargando = false)
    )
  }

  password = ''
  cambiarContrasena(password: string, codigo: string) {
    if (this.cargando) return

    let pass = password.trim()
    if (!pass) {
      return this.msjService.toastError('El password no puede estar vacio')
    }

    let cod = codigo.trim()
    if (!cod) {
      return this.msjService.toastError('El código no puede estar vacio')
    }

    this.cargando = true
    this.varEstadoCambiar('comprobando')
    this.enviado = true

    this.usuarioService.cambiarContrasena(password, codigo).subscribe(
      respuesta => {
        console.log(respuesta)
        this.varEstadoCambiar('correcto')
      },
      () => {
        this.cargando = false
        this.enviado = false
      }
    )
  }
}
