import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core'
import { QuestionControlService } from '../question-control.service'
import { QuestionBase } from '../question-base'
import { UntypedFormGroup } from '@angular/forms'
import { BehaviorSubject, Observable } from 'rxjs'

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  @Input() datos: Observable<QuestionBase<string>[]>
  subscription
  @Input() cancelarCB: Function
  form: UntypedFormGroup
  payLoad = ''

  questions: QuestionBase<string>[] = []

  @Output() guardar = new EventEmitter<any>()
  @Input() modoCreador = false

  constructor(private qcs: QuestionControlService) {}

  ngOnInit() {
    this.subscription = this.datos.subscribe(datos => {
      this.actualizarKey(datos)
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onSubmit(model, invalid: boolean, e) {
    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()
    e.preventDefault()
    e.stopPropagation()
    if (invalid) {
      return
    }

    this.payLoad = JSON.stringify(this.form.getRawValue())
    this.guardar.emit(model)
  }

  cancelar() {
    this.cancelarCB()
  }

  //Creacioni de formularios
  actualizarKey(datos = this.questions) {
    this.form = this.qcs.toFormGroup(datos)
    this.questions = datos
  }
}
