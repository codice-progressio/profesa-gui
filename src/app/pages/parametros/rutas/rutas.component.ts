import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { RutaDeEntrega } from '../../../models/rutaDeEntrega.model'
import { RutaDeEntregaService } from '../../../services/ruta-de-entrega.service'
import { ManejoDeMensajesService } from '../../../services/utilidades/manejo-de-mensajes.service'
import { UtilidadesService } from '../../../services/utilidades.service'

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.css']
})
export class RutasComponent implements OnInit {
  constructor(
    private utilidadesService: UtilidadesService,
    private notiService: ManejoDeMensajesService,
    private rutaService: RutaDeEntregaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  rutas: RutaDeEntrega[] = []
  cargando = false

  ngOnInit(): void {
    this.cargar()
  }

  cargar() {
    this.cargando = true
    this.rutaService.leerTodo().subscribe(
      rutas => {
        this.rutas = rutas
        this.rutas.forEach(x => (x.gui = { cargando: false }))
        this.cargando = false
      },
      () => (this.cargando = false)
    )
  }

  detalle(ruta: RutaDeEntrega) {
    const nombre = this.utilidadesService.niceUrl(ruta.nombre)
    this.router.navigate(['detalle', nombre, ruta._id], {
      relativeTo: this.activatedRoute
    })
  }

  eliminar(ruta: RutaDeEntrega) {
    this.notiService.confirmacionDeEliminacion(
      'Esto eliminara de todos los contactos esta ruta y ya no podra revertirse dicha acción. ¿Aun así quieres continuar?',
      () => {
        ruta.gui.cargando = true
        this.rutaService.eliminar(ruta._id).subscribe(
          () => {
            this.rutas = this.rutas.filter(x => x._id !== ruta._id)
            ruta.gui.cargando = false
          },
          () => (ruta.gui.cargando = false)
        )
      }
    )
  }
}
