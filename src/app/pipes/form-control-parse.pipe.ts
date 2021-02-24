import { Pipe, PipeTransform } from '@angular/core'
import { FormControl, AbstractControl } from '@angular/forms'

@Pipe({
  name: 'formControlParse'
})
export class FormControlParsePipe implements PipeTransform {
  transform(value: AbstractControl): FormControl {
    return value as FormControl
  }
}
