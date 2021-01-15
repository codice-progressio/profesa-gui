import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TitleDirective } from './title.directive'
import { SrcDirective } from './src.directive'
import { TagDirective } from './tag.directive'
import { CollapsableElementDirective } from './collapsable/collapsable-element.directive'
import { CollapsableActionDirective } from './collapsable/collapsable-action.directive'
import { ResaltarDirective } from './resaltar.directive'

@NgModule({
  declarations: [
    TitleDirective,
    SrcDirective,
    TagDirective,
    CollapsableElementDirective,
    CollapsableActionDirective,
    ResaltarDirective
  ],
  imports: [CommonModule],
  exports: [
    TitleDirective,
    SrcDirective,
    TagDirective,
    CollapsableElementDirective,
    CollapsableActionDirective,
    ResaltarDirective
  ]
})
export class DirectivesModule {}
