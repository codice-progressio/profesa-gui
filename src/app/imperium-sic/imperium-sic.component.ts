import { Component, OnInit } from '@angular/core'
import { ManejoDeMensajesService } from '../services/utilidades/manejo-de-mensajes.service'
import { InstalacionService } from '../services/instalacion.service'
import { Subscriber } from 'rxjs'

@Component({
  selector: 'app-imperium-sic',
  templateUrl: './imperium-sic.component.html',
  styleUrls: ['./imperium-sic.component.css']
})
export class ImperiumSicComponent implements OnInit {
  usuario: string
  password: string
  email: string
  passwordConfirma: string
  cargando = false

  logs: any[] = []
  constructor(
    private notiService: ManejoDeMensajesService,
    private instalacionService: InstalacionService
  ) {}

  ngOnInit(): void {}

  instalar() {
    if (this.cargando) return
    if (!this.usuario)
      return this.notiService.toast.error('Debes especificar usuario')
    this.usuario = this.usuario.trim()

    if (!this.password || !this.passwordConfirma)
      return this.notiService.toast.error('Debes especificar la contraseña')
    this.password = this.password.trim()
    this.passwordConfirma = this.passwordConfirma.trim()

    if (this.password !== this.passwordConfirma) {
      this.notiService.toast.error('Las contraseñas no coinciden')
      return
    }

    let error = _ => {
      this.logs.push(_)
      this.cargando = false
    }

    this.cargando = true
    this.instalacionService.crearParametros().subscribe(resultado => {
      this.logs.push(resultado)
      this.instalacionService
        .crearAdmin(this.usuario, this.password, this.email)
        .subscribe(res2 => {
          this.logs.push(res2)
          this.cargando = false
        }, error)
    }, error)
  }
}