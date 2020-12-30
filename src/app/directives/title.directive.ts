import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2
} from '@angular/core'

@Directive({
  selector: '[codice-title]'
})
export class TitleDirective {
  span: any = null
  @Input('codice-title') title: string = ''
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.decorar()
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.tooltip(true)
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.tooltip(false)
  }

  private decorar() {
    this.renderer.setStyle(this.el.nativeElement, 'border-bottom', '1px dotted')
    this.renderer.setStyle(this.el.nativeElement, ' position', 'relative')
  }

  private tooltip(mostrar: boolean) {
    let etiqueta = this.el.nativeElement
    if (mostrar) {
      this.span = this.renderer.createElement('span')
      this.renderer.addClass(this.span, 'title')
      let texto = this.renderer.createText(this.title)

      let info = this.renderer.createElement("i")
      this.renderer.addClass(info, "fas")
      this.renderer.addClass(info, "fa-info-circle")
      this.renderer.addClass(info, "mr-2")

      this.renderer.appendChild(this.span, info)
      this.renderer.appendChild(this.span, texto)
      this.renderer.appendChild(etiqueta, this.span)

      //Agregamos los estilos
      this.renderer.setStyle(this.span, 'position', 'absolute')
      this.renderer.setStyle(this.span, 'top', '20px')
      this.renderer.setStyle(this.span, 'background', 'black')
      this.renderer.setStyle(this.span, 'padding', '4px')
      this.renderer.setStyle(this.span, 'left', '0')
      this.renderer.setStyle(this.span, 'white-space', 'wrap')
      this.renderer.setStyle(this.span, 'z-index', '99999')
      this.renderer.setStyle(this.span, 'color', '#fff')
    } else {
      this.renderer.removeChild(etiqueta, this.span)
    }
  }
}
