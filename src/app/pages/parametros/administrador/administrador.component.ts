import { Component, OnInit } from '@angular/core'
import { ParametrosService } from '../../../services/parametros.service'

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  constructor(public parametrosService: ParametrosService) {}

  ngOnInit(): void {}

  actaulizandoPermisos = false
  actualizarPermisos() {
    this.actaulizandoPermisos = true
    this.parametrosService.actualizarPermisos().subscribe(
      () => (this.actaulizandoPermisos = false),
      () => (this.actaulizandoPermisos = false)
    )
  }
}
