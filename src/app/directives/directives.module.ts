import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TitleDirective } from './title.directive'

@NgModule({
  declarations: [TitleDirective],
  imports: [CommonModule],
  exports: [TitleDirective]
})
export class DirectivesModule {}
