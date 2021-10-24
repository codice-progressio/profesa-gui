import { Component, OnInit } from '@angular/core'
import { EstadisticasService } from '../../services/estadisticas.service'
import permisos from '../../config/permisosKeys.config'
import { UsuarioService } from '../../services/usuario/usuario.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  constructor(
    public usuarioService: UsuarioService,
    public eSer: EstadisticasService
  ) {}

  ngOnInit() {
  }

  permisoTotalSkus() {
    return this.usuarioService.usuario.permissions.includes(
      permisos['estadisticas:total-skus']
    )
  }

  permisoCostoInventario() {
    return this.usuarioService.usuario.permissions.includes(
      permisos['estadisticas:total-costo-existencias']
    )
  }





  permisoTotalContactos() {
    return this.usuarioService.usuario.permissions.includes(
      permisos['estadisticas:total-contactos']
    )
  }
}
