import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TitleDirective } from './title.directive'
import { SrcDirective } from './src.directive'

@NgModule({
  declarations: [TitleDirective, SrcDirective],
  imports: [CommonModule],
  exports: [TitleDirective, SrcDirective]
})
export class DirectivesModule {}
