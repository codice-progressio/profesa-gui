import { Component, OnInit, Input, Output } from '@angular/core'
import { QuestionBase } from '../question-base'
import { UntypedFormGroup, AbstractControl } from '@angular/forms'
import { ValidacionesService } from '../../../services/utilidades/validaciones.service'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.css']
})
export class DynamicFormQuestionComponent {
  constructor(public vs: ValidacionesService) {}

  @Input() question: QuestionBase<string>
  @Input() form: UntypedFormGroup
  @Output() actualizarKey = new Subject<null>()
  @Input() modoCreador = false

  get isValid() {
    return this.form.controls[this.question.key].valid
  }

  f(c: string): AbstractControl {
    return this.form.get(c)
  }

  objetoValidacion = () => ({
    'is-invalid': this.vs.invalid(this.f(this.question.key)),
    'is-valid': this.vs.valid(this.f(this.question.key))
  })

  editandoKey = false
  editarKey(valor) {
    this.question.key = valor
    this.actualizarKey.next()
    this.editandoKey = false
  }
}
