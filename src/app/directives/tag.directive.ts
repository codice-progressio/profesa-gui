import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core'

@Directive({
  selector: '[codice-tag]'
})
export class TagDirective implements OnInit {
  @Input('codice-tag') texto: string
  @Input('codice-tag-click') funcion: (event: any) =>  void
  @Input('codice-tag-click-class') claseBtn: string[] = ['pointer']
  @Input('codice-tag-click-icon-class') claseIcon: string[] = []

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    setTimeout(() => {
      this.construirEtiqueta(this.texto, this.funcion)
    }, 100)
  }

  construirEtiqueta(eti: string, funcion: (event: any) =>  void) {
    let estaEtiqueta = this.el.nativeElement

    if (funcion) {
      this.renderer.listen(estaEtiqueta, 'click', funcion)
      this.claseBtn.forEach(clase =>
        this.renderer.addClass(estaEtiqueta, clase)
      )

      let i = this.renderer.createElement('i')
      this.claseIcon.forEach(x => this.renderer.addClass(i, x))

      this.renderer.appendChild(estaEtiqueta, i)
    }

    // Agregamos las clases necesarias

    ;['badge', 'badge-pill', 'badge-dark', 'mr-2'].forEach(x =>
      this.renderer.addClass(estaEtiqueta, x)
    )

    let texto = this.renderer.createText(eti)
    this.renderer.appendChild(estaEtiqueta, texto)
  }
}
