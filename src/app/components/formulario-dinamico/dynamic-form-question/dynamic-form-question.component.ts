import { Component, OnInit, Input } from '@angular/core'
import { QuestionBase } from '../question-base'
import { FormGroup, AbstractControl } from '@angular/forms'
import { ValidacionesService } from '../../../services/utilidades/validaciones.service'

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.css']
})
export class DynamicFormQuestionComponent {
  constructor(public vs: ValidacionesService) {}

  @Input() question: QuestionBase<string>
  @Input() form: FormGroup
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
}
