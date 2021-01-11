import { Directive, ElementRef, Input, Renderer2 } from '@angular/core'
import { CollapsableService } from './collapsable.service'

@Directive({
  selector: '[codice-collapsable-action]'
})
export class CollapsableActionDirective {
  @Input('codice-collapsable-action') id: string
  caret

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private collapsableService: CollapsableService
  ) {
    // Este elemento debe mostrar un puntero de accion
    this.renderer.setStyle(el.nativeElement, 'cursor', 'pointer')

    this.caret = this.renderer.createElement('i')
    this.renderer.addClass(this.caret, 'fas')
    this.renderer.addClass(this.caret, 'mr-1')
    this.renderer.addClass(this.caret, 'fa-square')

    this.renderer.appendChild(el.nativeElement, this.caret)

    this.caretSinColapsar()

    // Agregamos una accion a la etiqueta en la que pongamos
    // esta directiva.
    this.renderer.listen(el.nativeElement, 'click', event => {
      let elemento = this.collapsableService.toggle(this.id)

      if (elemento.colapsado) this.caretColapsado()
      else this.caretSinColapsar()
    })
  }

  caretColapsado() {
    this.limpiarCaret()
    this.renderer.addClass(this.caret, 'fa-caret-square-right')
  }

  caretSinColapsar() {
    this.limpiarCaret()
    this.renderer.addClass(this.caret, 'fa-caret-square-down')
  }

  limpiarCaret() {
    this.renderer.removeClass(this.caret, 'fa-caret-square-right')
    this.renderer.removeClass(this.caret, 'fa-caret-square-down')
    this.renderer.removeClass(this.caret, 'fa-square')
  }
}
