import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { ParametrosService } from 'src/app/services/parametros.service'

@Component({
  selector: 'codice-etiquetas-editor',
  templateUrl: './etiquetas-editor.component.html',
  styleUrls: ['./etiquetas-editor.component.css']
})
export class EtiquetasEditorComponent implements OnInit {
  constructor(private parametrosService: ParametrosService) {}

  cargando = false
  @Input('existentes') etiquetasExistentes: string[] = []
  @Input() soloEtiquetas = false
  etiquetas: string[] = []

  escuchaCargando = new BehaviorSubject<boolean>(false)

  @Output() guardar = new EventEmitter<EtiquetaTransporte>()

  @Output() eliminar = new EventEmitter<EtiquetaTransporte>()

  payload = new EtiquetaTransporte('', this.escuchaCargando)

  ngOnInit() {
    this.cargarEtiquetas()
    this.escuchaCargando.subscribe(cargando => {
      this.cargando = cargando
    })
  }

  cargarEtiquetas() {
    this.parametrosService.etiquetas.obtenerTodo().subscribe(etiquetas => {
      this.etiquetas = etiquetas
    })
  }

  etiquetaGuardar(input: HTMLInputElement) {
    //Las etiquetas se deben de guardar desde el componente
    this.payload.etiqueta = input.value
    this.payload.input = input
    if (!this.payload.etiqueta) return
    this.guardar.emit(this.payload)
  }

  etiquetaEliminar(etiqueta: string) {
    return () => {
      // Las etiquetas se deben de guardar desde el componente
      this.payload.etiqueta = etiqueta
      this.eliminar.emit(this.payload)
    }
  }
}

export class EtiquetaTransporte {
  constructor(
    public etiqueta: string,
    public cargando: BehaviorSubject<boolean>,
    public input?: HTMLInputElement
  ) {}
}
