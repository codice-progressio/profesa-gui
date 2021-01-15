import { Directive, ElementRef, Renderer2, Input } from '@angular/core'

@Directive({
  selector: '[codice-resaltar]'
})
export class ResaltarDirective {
  @Input('codice-resaltar') tiempo: number = 10
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', 0)

    setTimeout(() => {
      let contador = 0
      let intervalo = setInterval(() => {
        contador += 0.07
        this.renderer.setStyle(this.el.nativeElement, 'opacity', contador)
        if (contador > 1) {
          clearInterval(intervalo)
          this.renderer.removeStyle(this.el.nativeElement, 'opacity')
        }
      }, this.tiempo)
    }, 500)
  }
}
