import { Component, OnInit } from '@angular/core'
import { ManejoDeMensajesService } from '../services/utilidades/manejo-de-mensajes.service'
import { InstalacionService } from '../services/instalacion.service'
import { Subscriber } from 'rxjs'
import { UsuarioService } from '../services/usuario/usuario.service'

@Component({
  selector: 'app-imperium-sic',
  templateUrl: './imperium-sic.component.html',
  styleUrls: ['./imperium-sic.component.css']
})
export class ImperiumSicComponent implements OnInit {
  nombre: string
  password: string
  email: string
  passwordConfirma: string
  cargando = false

  logs: any[] = []
  constructor(
    private notiService: ManejoDeMensajesService,
    private instalacionService: InstalacionService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {}

  error = _ => {
    this.logs.push('[ ERROR ]' + _)
    this.cargando = false
  }

  instalar() {
    if (this.cargando) return
    if (!this.nombre)
      return this.notiService.toast.error('Debes especificar nombre')
    this.nombre = this.nombre.trim()

    if (!this.password || !this.passwordConfirma)
      return this.notiService.toast.error('Debes especificar la contraseña')
    this.password = this.password.trim()
    this.passwordConfirma = this.passwordConfirma.trim()

    if (this.password !== this.passwordConfirma) {
      this.notiService.toast.error('Las contraseñas no coinciden')
      return
    }

    this.cargando = true
    this.instalacionService.crearParametros().subscribe(resultado => {
      this.logs.push(resultado)
      this.usuarioService
        .crearAdmin(this.nombre, this.password, this.email)
        .subscribe(res2 => {
          this.logs.push('[+]' + res2)
          this.cargando = false
        }, this.error)
    }, this.error)
  }

  reiniciarSuperAdmin() {
    this.cargando = true
    this.instalacionService.reiniciarSuperAdmin().subscribe(
      res => {
        this.cargando = false
        this.logs.push('[+]' + res.mensaje)
      },
      () => (this.cargando = false)
    )
  }
}
