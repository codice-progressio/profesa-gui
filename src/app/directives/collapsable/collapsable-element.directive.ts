import { Directive, ElementRef, Input, Renderer2 } from '@angular/core'
import { CollapsableService } from './collapsable.service'

/**
 *Esta directiva registra el elemento
 *
 * @export
 * @class CollapsableElementDirective
 */
@Directive({
  selector: '[codice-collapsable-element]'
})
export class CollapsableElementDirective {
  @Input('codice-collapsable-element')
  public set id(value: string) {
    this._id = value
    this.collapsableService.registrar(value, this)
  }
  private _id: string
  public get id(): string {
    return this._id
  }
  el: ElementRef<any>
  colapsado: boolean = false

  constructor(
    el: ElementRef,
    private collapsableService: CollapsableService,
    private renderer: Renderer2
  ) {
    // Debe tener un id.
    this.id = el.nativeElement.id
    this.el = el
  }

  /**
   *Abre el collapsabe del cual se le pasa el id o lo cierra
   *
   * @memberof CollapsableElementDirective
   */
  toggle() {
    this.colapsado = !this.colapsado

    if (this.colapsado)
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none')
    else this.renderer.removeStyle(this.el.nativeElement, 'display')
  }
}
