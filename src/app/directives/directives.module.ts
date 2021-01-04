import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TitleDirective } from './title.directive'
import { SrcDirective } from './src.directive'
import { TagDirective } from './tag.directive'

@NgModule({
  declarations: [TitleDirective, SrcDirective, TagDirective],
  imports: [CommonModule],
  exports: [TitleDirective, SrcDirective, TagDirective]
})
export class DirectivesModule {}
