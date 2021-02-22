import { Component, OnInit } from '@angular/core'
import { ParametrosService } from '../../services/parametros.service'
import { EtiquetaTransporte } from '../../components/etiquetas-editor/etiquetas-editor.component'

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent implements OnInit {
  constructor(private parametrosService: ParametrosService) {}
  etiquetasExistentes: string[] = []
  cargandoEtiquetas = false

  ngOnInit(): void {
    this.cargarEtiquetasExitentes()
  }

  cargarEtiquetasExitentes() {
    this.cargandoEtiquetas = true
    this.parametrosService.etiquetas.obtenerTodo().subscribe(
      etiquetas => {
        this.cargandoEtiquetas = false
        this.etiquetasExistentes = etiquetas
      },
      _ => (this.cargandoEtiquetas = false)
    )
  }

  eliminarEtiqueta(payload: EtiquetaTransporte) {
    payload.cargando.next(true)
    this.cargandoEtiquetas = true
    this.parametrosService.etiquetas.eliminar(payload.etiqueta).subscribe(
      () => {
        // Eliminamos de la lista actual de etiquetas.
        payload.cargando.next(false)
        this.cargandoEtiquetas = false
        this.etiquetasExistentes = this.etiquetasExistentes.filter(
          x => x !== payload.etiqueta
        )
      },
      _ => {
        payload.cargando.next(false)
        this.cargandoEtiquetas = false
      }
    )
  }
}
