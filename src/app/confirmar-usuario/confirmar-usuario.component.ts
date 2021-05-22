import { Location } from '@angular/common'
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core'
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router'
import { UsuarioService } from '../services/usuario/usuario.service'

@Component({
  selector: 'app-confirmar-usuario',
  templateUrl: './confirmar-usuario.component.html',
  styleUrls: ['./confirmar-usuario.component.css']
})
export class ConfirmarUsuarioComponent implements OnInit, OnDestroy {
  constructor(
    private renderer: Renderer2,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  varEstado = {
    comprobando: true,
    correcto: false,
    incorrecto: false
  }

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
      let codigo = query.get('codigo')

      // Si no hay codigo, mandamos error.
      if (!codigo) {
        this.varEstadoCambiar('incorrecto')
      }

      // Si hay un codigo comprobamos con el servicio

      this.varEstadoCambiar('comprobando')
      this.usuarioService.confirmarUsuario(codigo).subscribe(
        respuesta => {
          console.log(respuesta)
          this.varEstadoCambiar("correcto")
        },
        () => this.varEstadoCambiar('incorrecto')
      )
    })
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'confirmar-usuario')
  }

  regresar() {
    this.router.navigate(['/login'])
  }
}
