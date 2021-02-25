import { Title } from '@angular/platform-browser'
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

  private _options: TitleOptions = new TitleOptions()
  public get options(): Partial<TitleOptions> {
    return this._options
  }
  @Input('codice-title-options')
  public set options(value: Partial<TitleOptions>) {
    let options = new TitleOptions()

    Object.keys(options).forEach(key => {
      if (value.hasOwnProperty(key)) {
        options[key] = value[key]
      }
    })
    this._options = options
    setTimeout(() => this.decorar(this._options), 100)
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.options = new TitleOptions()
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.tooltip(true)
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.tooltip(false)
  }

  private decorar(options: Partial<TitleOptions>) {
    options.stylesRoot.forEach(x =>
      this.renderer.setStyle(this.el.nativeElement, x[0], x[1])
    )
  }

  private tooltip(mostrar: boolean) {
    let etiqueta = this.el.nativeElement
    if (mostrar) {
      this.span = this.renderer.createElement('span')
      this.renderer.addClass(this.span, 'title')
      let texto = this.renderer.createText(this.title)

      let info = this.renderer.createElement('i')
      this.renderer.addClass(info, 'fas')
      this.renderer.addClass(info, 'fa-info-circle')
      this.renderer.addClass(info, 'mr-2')

      this.renderer.appendChild(this.span, info)
      this.renderer.appendChild(this.span, texto)
      this.renderer.appendChild(etiqueta, this.span)

      //Agregamos los estilos
      this.options.stylesTooltip.forEach(x =>
        this.renderer.setStyle(this.span, x[0], x[1])
      )
    } else {
      this.renderer.removeChild(etiqueta, this.span)
    }
  }
}

class TitleOptions {
  /**
   *Estilos a aplicar para el objeto que sera señalado.
   *  Debe ser un arreglo de tuplas al estilo renderer2
   * estilo, valor
   *
   * @type {[string, string][]}
   * @memberof TitleOptions
   */
  stylesRoot: [string, string][] = [
    ['border-bottom', '1px dotted'],
    ['position', 'relative']
  ]

  /**
   *Estilos a aplicar para el tooltip. Debe ser un arrelgo de tuplas.
   *
   * @type {[string, string][]}
   * @memberof TitleOptions
   */
  stylesTooltip: [string, string][] = [
    ['position', 'absolute'],
    ['top', '20px'],
    ['background', 'black'],
    ['padding', '4px'],
    ['left', '0'],
    ['white-space', 'wrap'],
    ['z-index', '99999'],
    ['color', '#fff']
  ]
}
