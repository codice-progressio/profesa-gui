import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core'
import { Articulo } from '../../../models/almacenDeMateriaPrimaYHerramientas/articulo.modelo'
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms'
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service'
import { SalidaArticulo } from '../../../models/almacenDeMateriaPrimaYHerramientas/salidaArticulo.model'
import { ArticuloService } from '../../../services/articulo/articulo.service'
import { Departamento } from 'src/app/models/departamento.models'
import { DepartamentoService } from '../../../services/departamento/departamento.service'

@Component({
  selector: 'app-almacen-de-materia-prima-yherramientas-crear-modificar-salida',
  templateUrl:
    './almacen-de-materia-prima-yherramientas-crear-modificar-salida.component.html',
  styles: [
    `
      #cantidad {
        font-size: 60px;
        border: none;
      }
    `
  ]
})
export class AlmacenDeMateriaPrimaYHerramientasCrearModificarSalidaComponent
  implements OnInit {
  _articulo: Articulo
  @Input() set articulo(articulo: Articulo) {
    this._articulo = articulo
    this.crearFormulario()
  }
  get articulo(): Articulo {
    return this._articulo
  }
  @Output() guardado = new EventEmitter<null>()
  @Output() cancelado = new EventEmitter<null>()
  @Output() esteComponente = new EventEmitter<this>()
  formulario: FormGroup
  departamentos: Departamento[] = []
  @ViewChild('cantidad') cantidad: ElementRef

  constructor(
    public fb: FormBuilder,
    public vs: ValidacionesService,
    public _articuloService: ArticuloService,
    public _departamentoService: DepartamentoService
  ) {}

  ngOnInit() {
    this.esteComponente.emit(this)
    this._departamentoService
      .todo()
      .subscribe(departamentos => (this.departamentos = departamentos))
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      cantidad: [
        '',
        [
          Validators.required,
          Validators.min(0.001),
          this.vs.numberValidator,
          Validators.max(this.articulo ? this.articulo.existencia : 0)
        ]
      ],
      departamento: ['', [Validators.required]],
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
  get departamento_FB(): AbstractControl {
    return this.formulario.get('departamento')
  }
  get observaciones_FB(): AbstractControl {
    return this.formulario.get('observaciones')
  }

  limpiar() {
    this.crearFormulario()
  }
  submit(modelo: SalidaArticulo, valid: boolean, e) {
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()
    if (!valid) {
      e.preventDefault()
      e.stopPropagation()
      return
    }

    if (valid) {
      this._articuloService
        .salida(this.articulo._id, modelo)
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
