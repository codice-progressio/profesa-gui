import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core'
import { Articulo } from 'src/app/models/almacenDeMateriaPrimaYHerramientas/articulo.modelo'
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms'
import { Departamento } from 'src/app/models/departamento.models'
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service'
import { ArticuloService } from 'src/app/services/articulo/articulo.service'
import { EntradaArticulo } from '../../../models/almacenDeMateriaPrimaYHerramientas/entradaArticulo.model'

@Component({
  selector:
    'app-almacen-de-materia-prima-yherramientas-crear-modificar-entrada',
  templateUrl:
    './almacen-de-materia-prima-yherramientas-crear-modificar-entrada.component.html',
  styles: [
    `
      #cantidad {
        font-size: 60px;
        border: none;
      }
    `
  ]
})
export class AlmacenDeMateriaPrimaYHerramientasCrearModificarEntradaComponent
  implements OnInit {
  @Input() articulo: Articulo = null
  @Output() guardado = new EventEmitter<null>()
  @Output() cancelado = new EventEmitter<null>()
  @Output() esteComponente = new EventEmitter<this>()
  formulario: FormGroup
  departamentos: Departamento[] = []

  @ViewChild('cantidad', { static: false }) cantidad: ElementRef
  constructor(
    public fb: FormBuilder,
    public vs: ValidacionesService,
    public _articuloService: ArticuloService
  ) {}

  ngOnInit() {
    this.esteComponente.emit(this)
    if (this.articulo) this.crearFormulario()
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      cantidad: [
        '',
        [Validators.required, Validators.min(0.001), this.vs.numberValidator]
      ],
      observaciones: ['', []]
    })

    if (this.articulo) {
      setTimeout(() => {
        this.cantidad.nativeElement.focus()
      }, 100)
    }
  }

  get cantidad_FB(): AbstractControl {
    return this.formulario.get('cantidad')
  }

  get observaciones_FB(): AbstractControl {
    return this.formulario.get('observaciones')
  }

  limpiar() {
    this.crearFormulario()
  }
  submit(modelo: EntradaArticulo, valid: boolean, e) {
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()
    if (!valid) {
      e.preventDefault()
      e.stopPropagation()
      return
    }
    if (valid) {
      this._articuloService
        .entrada(this.articulo._id, modelo)
        .subscribe(articulo => {
          this.limpiar()
          this.guardado.emit()
          this.articulo = articulo
        })
    }
  }

  cancelar() {
    this.limpiar()
    this.cancelado.emit()
  }
}
