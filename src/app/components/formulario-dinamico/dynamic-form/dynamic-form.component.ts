import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { QuestionControlService } from '../question-control.service'
import { QuestionBase } from '../question-base'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<string>[] = []
  form: FormGroup
  payLoad = ''

  @Output() submit = new EventEmitter<any>()

  constructor(private qcs: QuestionControlService) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions)
  }

  onSubmit(model, invalid: boolean, e) {
    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()
    if (invalid) {
      e.preventDefault()
      e.stopPropagation()

      return
    }

    this.payLoad = JSON.stringify(this.form.getRawValue())
    this.submit.emit(model)
  }
}
