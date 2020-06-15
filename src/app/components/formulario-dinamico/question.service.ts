import { Injectable } from '@angular/core'
import { QuestionBase } from './question-base'
import { DropdownQuestion } from './question-dropdown'
import { TextboxQuestion } from './question-textbox'
import { of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  // TODO: get from a remote source of question metadata

  datosTemp = [
    {
      controlType: 'textbox',
      key: 'brave',
      label: 'Bravery Rating',
      options: [
        { key: 'solid', value: 'Solid' },
        { key: 'great', value: 'Great' },
        { key: 'good', value: 'Good' },
        { key: 'unproven', value: 'Unproven' }
      ],
      order: 3,
      classForGroup: 'col-6'
    },

    {
      controlType: 'textbox',
      key: 'firstName',
      label: 'First name',
      value: '',
      required: true,
      order: 1
    },

    {
      controlType: 'textbox',
      key: 'emailAddress',
      label: 'Email',
      type: 'email',
      order: 2
    }
  ]
  // original: QuestionBase<string>[] = [
  //   new DropdownQuestion({
  //     key: 'brave',
  //     label: 'Bravery Rating',
  //     options: [
  //       { key: 'solid', value: 'Solid' },
  //       { key: 'great', value: 'Great' },
  //       { key: 'good', value: 'Good' },
  //       { key: 'unproven', value: 'Unproven' }
  //     ],
  //     order: 3,
  //     classForGroup: 'col-6'
  //   }),

  //   new TextboxQuestion({
  //     key: 'firstName',
  //     label: 'First name',
  //     value: 'Bombasto',
  //     required: true,
  //     order: 1
  //   }),

  //   new TextboxQuestion({
  //     key: 'emailAddress',
  //     label: 'Email',
  //     type: 'email',
  //     order: 2
  //   })
  // ]

  getQuestions() {
    let questions: QuestionBase<string>[] = this.datosTemp.map(x =>
      this.convertir(x)
    )
    return of(questions.sort((a, b) => a.order - b.order))
  }


 

  private convertir(x: any): QuestionBase<string> {
    switch (x.controlType) {
      case 'dropdown':
        return new DropdownQuestion(x)
      case 'textbox':
        return new TextboxQuestion(x)

      default:
        break
    }
  }
}
