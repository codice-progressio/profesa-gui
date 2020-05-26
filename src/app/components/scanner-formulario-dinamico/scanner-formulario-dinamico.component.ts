import { Component, OnInit } from '@angular/core';
import { QuestionControlService } from '../formulario-dinamico/question-control.service'
import { Observable } from 'rxjs'
import { QuestionBase } from '../formulario-dinamico/question-base'
import { QuestionService } from '../formulario-dinamico/question.service'

@Component({
  selector: 'app-scanner-formulario-dinamico',
  templateUrl: './scanner-formulario-dinamico.component.html',
  styleUrls: ['./scanner-formulario-dinamico.component.css'],
  providers:  [QuestionService]
})
export class ScannerFormularioDinamicoComponent {

  questions$: Observable<QuestionBase<any>[]>;

  constructor(service: QuestionService) {
    this.questions$ = service.getQuestions();
  }

}
