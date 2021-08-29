import { Component, OnInit } from '@angular/core'
import { ListaDePrecios } from 'src/app/models/listaDePrecios.model'
import { ListaDePreciosService } from 'src/app/services/lista-de-precios.service'
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service'

@Component({
  selector: 'app-lista-de-precios',
  templateUrl: './lista-de-precios.component.html',
  styleUrls: ['./lista-de-precios.component.css']
})
export class ListaDePreciosComponent implements OnInit {
  constructor(
    private listaDePreciosService: ListaDePreciosService,
    private msjService: ManejoDeMensajesService
  ) {}

  cargando = false

  listasDePrecios: ListaDePrecios[] = []
  listaMuyGrande = false

  ngOnInit(): void {
    this.cargarListas()
  }
  cargarListas() {
    this.cargando = true
    this.listaDePreciosService.buscar().subscribe(
      listas => {
        this.listasDePrecios = listas
        this.cargando = false
      },
      () => (this.cargando = false)
    )
  }

  eliminar(id: string) {
    this.msjService.confirmacionDeEliminacion(
      'Esta acción no se puede deshacer',
      () => {
        this.cargando = true

        this.listaDePreciosService.eliminar(id).subscribe(
          () => {
            this.listasDePrecios = this.listasDePrecios.filter(
              x => x._id !== id
            )
            this.cargando = false
          },
          () => (this.cargando = false)
        )
      }
    )
  }
}
