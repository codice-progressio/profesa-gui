import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ModalWrapperComponent } from './modal-wrapper/modal-wrapper.component'
import {  ModalModule } from '@codice-progressio/modal'

@NgModule({
  declarations: [ModalWrapperComponent],
  exports: [ModalWrapperComponent, ModalModule],
  imports: [CommonModule, ModalModule]
})
export class ModalWrapperModule {}
