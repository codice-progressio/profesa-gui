import { Component, OnInit } from '@angular/core'
import { ListaDePrecios } from 'src/app/models/listaDePrecios.model'
import { ParametrosService } from 'src/app/services/parametros.service'
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service'

@Component({
  selector: 'app-parametros-lista-de-precios',
  templateUrl: './parametros-lista-de-precios.component.html',
  styleUrls: ['./parametros-lista-de-precios.component.css']
})
export class ParametrosListaDePreciosComponent implements OnInit {
  listaSeleccionada: ListaDePrecios = undefined
  listas: ListaDePrecios[] = []
  cargando = false

  constructor(
    private parametrosService: ParametrosService,
    private msjService: ManejoDeMensajesService
  ) {}

  ngOnInit(): void {
    this.cargarListas()
  }

  cargarListas() {
    this.cargando = true
    this.parametrosService.listasDePrecio.leerTodoLigero().subscribe(
      listas => {
        this.cargando = false
        this.listas = listas

        this.cargarParametro()
      },
      () => (this.cargando = false)
    )
  }
  cargarParametro() {
    this.cargando = true
    this.parametrosService.listasDePrecio.cargar().subscribe(
      lista => {
        this.listaSeleccionada = this.listas.find(x => x._id === lista)
        this.cargando = false
      },
      () => (this.cargando = false)
    )
  }

  submit(id) {
    this.cargando = true
    this.parametrosService.listasDePrecio.guardar(id).subscribe(
      () => {
        this.cargando = false
        this.msjService.toastCorrecto(
          'Se guardo la lista de precios por defecto'
        )
      },
      () => (this.cargando = false)
    )
  }
}
