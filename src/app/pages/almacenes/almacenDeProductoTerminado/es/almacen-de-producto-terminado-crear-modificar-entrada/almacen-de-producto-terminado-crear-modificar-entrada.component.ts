import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core'
import { SalidasLotes } from '../../../../../models/almacenProductoTerminado/salidasLote.model'
import { Lotes } from '../../../../../models/almacenProductoTerminado/lotes.model'
import { ValidacionesService } from '../../../../../services/utilidades/validaciones.service'
import { LoteService } from '../../../../../services/almacenDeProductoTerminado/lote.service'
import { ModeloCompletoService } from '../../../../../services/modelo/modelo-completo.service'
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import { ModeloCompleto } from '../../../../../models/modeloCompleto.modelo'
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms'

@Component({
  selector: 'app-almacen-de-producto-terminado-crear-modificar-entrada',
  templateUrl:
    './almacen-de-producto-terminado-crear-modificar-entrada.component.html',
  styles: []
})
export class AlmacenDeProductoTerminadoCrearModificarEntradaComponent
  implements OnInit {
  formulario: FormGroup
  modeloCompleto: ModeloCompleto
  cargando = {}
  keys = Object.keys

  @Output() loteGuardado: EventEmitter<Lotes> = new EventEmitter()
  @Output() cancelar: EventEmitter<null> = new EventEmitter()

  constructor(
    public fb: FormBuilder,
    public vs: ValidacionesService,
    public loteService: LoteService,
    public modeloCompletoService: ModeloCompletoService,
    public location: Location,
    public activatedRoute: ActivatedRoute
  ) {
   
  }

  ngOnInit() {
    this.cargando['cargando'] = 'Obteniendo sku'

    let id = this.activatedRoute.snapshot.paramMap.get('id')
    this.modeloCompletoService.findById(id).subscribe(mc => {
      this.modeloCompleto = mc
      this.crearFormulario()
      delete this.cargando['cargando']
    })
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      cantidadEntrada: [
        '',
        [
          this.vs.onlyIntegers,
          this.vs.numberValidator,
          Validators.required,
          Validators.min(1)
        ]
      ],
      observaciones: ['']
    })
  }

  f(c): AbstractControl {
    return this.formulario.get(c)
  }

  guardar(lote: Lotes, invalid: boolean, e) {
    e.preventDefault()
    if (invalid) {
      e.preventDefault()
      e.stopPropagation()
      return
    }

    this.cargando['guardar'] = 'Registrando entrada'

    this.loteService.guardar(this.modeloCompleto._id, lote).subscribe(
      resp => {
        this.ngOnInit()
        delete this.cargando['guardar']
      },
      err => delete this.cargando['guardar']
    )
  }

  cancelarGuardado() {
    this.location.back()
  }
}
