import { Pipe, PipeTransform } from '@angular/core'
import { UntypedFormControl, AbstractControl } from '@angular/forms'

@Pipe({
  name: 'formControlParse'
})
export class FormControlParsePipe implements PipeTransform {
  transform(value: AbstractControl): UntypedFormControl {
    return value as UntypedFormControl
  }
}
