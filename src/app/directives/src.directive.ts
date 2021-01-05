import { HttpClient } from '@angular/common/http'
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2
} from '@angular/core'

@Directive({
  selector: '[codice-src]'
})
export class SrcDirective {
  cargando = false

  private _src = ''

  imagenFalsa = null
  public get src() {
    return this._src
  }

  @Input('codice-src')
  public set src(value) {
    this.precarga(value)
    this._src = value
  }

  @HostListener('load') onLoad() {
    let root = this.renderer.parentNode(this.el.nativeElement)
    this.renderer.removeChild(root, this.imagenFalsa)
    //Volvemos la visibilidad de la imagen
    this.renderer.setStyle(this.el.nativeElement, 'display', 'unset')
  }

  @HostListener('error') onError(err) {}

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  precarga(value) {
    //Este elemento img
    let root = this.renderer.parentNode(this.el.nativeElement)

    this.imagenFalsa = this.renderer.createElement('img')
    this.renderer.setAttribute(
      this.imagenFalsa,
      'src',
      'assets/images/load.gif'
    )
    this.copiarClases(this.imagenFalsa, this.el.nativeElement)

    this.renderer.appendChild(root, this.imagenFalsa)

    //Desaparecemos la imagen para que no nos estorbe.
    this.renderer.setStyle(this.el.nativeElement, 'display', 'none')
    // Ahora si la cargamos si hay un valor
    if (value) this.renderer.setAttribute(this.el.nativeElement, 'src', value)
  }

  private copiarClases(destino, original) {
    original.classList.forEach(x => this.renderer.addClass(destino, x))
  }
}
