import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { ScannerDepartamentoGestion } from '../../../../services/parametros.service'
import { QuestionService } from '../../../../components/formulario-dinamico/question.service'
import { QuestionBase } from '../../../../components/formulario-dinamico/question-base'
import { TextboxQuestion } from '../../../../components/formulario-dinamico/question-textbox'
import { DropdownQuestion } from '../../../../components/formulario-dinamico/question-dropdown'
import { BehaviorSubject, Subject, Observable } from 'rxjs'

@Component({
  selector: 'app-creador-de-formularios',
  templateUrl: './creador-de-formularios.component.html',
  styleUrls: ['./creador-de-formularios.component.css']
})
export class CreadorDeFormulariosComponent implements OnInit {
  _scanner: ScannerDepartamentoGestion
  @Input('departamento') set scanner(s: ScannerDepartamentoGestion) {
    this._scanner = s
    setTimeout(() => {
      this.datos.next(s.inputsFormulario)
    }, 100)
  }

  get scanner(): ScannerDepartamentoGestion {
    return this._scanner
  }

  @Output() volver = new EventEmitter<ScannerDepartamentoGestion>()

  datos = new Subject<QuestionBase<string>[]>()

  actualizar = new Observable<null>()

  constructor(private questionService: QuestionService) {}
  ngOnInit(): void {
    this.actualizar.subscribe(_ => this.ordenarYActualizar())
  }

  agregarTextBox() {
    let t = new TextboxQuestion()
    this.scanner.inputsFormulario.push(t)
    this.ordenarYActualizar()
  }
  agregarDropDown() {
    let d = new DropdownQuestion()
    this.scanner.inputsFormulario.push(d)
    this.ordenarYActualizar()
  }

  ordenarYActualizar() {
    let contador = 0
    this.scanner.inputsFormulario = this.scanner.inputsFormulario
      .sort((a, b) => (a.order > b.order ? 1 : -1))
      .map(x => {
        x.order = contador
        contador++
        return x
      })
    this.datos.next(this.scanner.inputsFormulario)
  }
}
