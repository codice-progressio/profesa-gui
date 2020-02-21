import {
  Directive,
  Renderer2,
  Input,
  ElementRef,
  HostListener,
  OnInit,
  AfterViewInit
} from '@angular/core'

@Directive({
  selector: '[appOrdenadorDeColumnas]'
})
export class OrdenadorDeColumnasDirective implements AfterViewInit {
  @Input('appOrdenadorDeColumnas') ordenadorDeColumnas: any[] = null

  orden: number = -1
  caret: any = null

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ordenadores: any[]

  ngAfterViewInit(): void {
    //Si no hay datos para ordenar pues error
    if (!this.ordenadorDeColumnas)
      throw 'No has definido los datos que se van a ordenar'

    //Obtenemos solo los elementos que tienen asignado el dataset ordendar
    // con data-ordenar y los almacenamos
    this.ordenadores = Array.from(this.el.nativeElement.children).filter(
      (x: any) => x.dataset.ordenar
    )

    //Creamos los eventos deseados.
    this.ordenadores.forEach((x: any) => {
      x.addEventListener('click', this.onClick.bind(this))
      this.notUse(x)
    })
  }

  onClick(event) {
    this.orden = this.orden * -1

    const columna = event.target.dataset.ordenar
    this.reiniciarLosDemas(columna)
    const cb = (a, b) => {
      return (a[columna] > b[columna] ? 1 : -1) * this.orden
    }
    this.ordenadorDeColumnas.sort(cb)
    if (event.target.children[0])
      this.renderer.removeChild(event.target, event.target.children[0])

    if (this.orden > 0) {
      this.down(event.target)
    } else {
      this.up(event.target)
    }
  }

  reiniciarLosDemas(col: string = '') {
    if (!this.ordenadores) return
    this.ordenadores
      .filter(x => x.dataset.ordenar !== col)
      .forEach(x => {
        this.renderer.removeChild(x, x.children[0])
        this.notUse(x)
      })
  }

  notUse(el) {
    const i = this.renderer.createElement('i')
    this.renderer.addClass(i, 'fa-caret-right')
    this.renderer.addClass(i, 'text-muted')
    this.renderer.setProperty(el, 'title', 'Haz click para ordenar')
    this.genericos(el, i)
  }

  private genericos(el, i) {
    this.renderer.addClass(i, 'fas')
    this.renderer.addClass(i, 'ml-1')
    this.renderer.appendChild(el, i)
    this.renderer.addClass(el, 'pointer')
  }

  down(el) {
    const i = this.renderer.createElement('i')
    this.renderer.addClass(i, 'fa-caret-down')
    this.renderer.addClass(i, 'animated')
    this.renderer.addClass(i, 'bounceIn')
    this.renderer.setProperty(el, 'title', 'Ordenar de manera descendente')
    this.genericos(el, i)
  }

  up(el) {
    const i = this.renderer.createElement('i')
    this.renderer.addClass(i, 'fa-caret-up')
    this.renderer.addClass(i, 'animated')
    this.renderer.addClass(i, 'bounceIn')
    this.renderer.setProperty(el, 'title', 'Ordenar de manera ascendente')
    this.genericos(el, i)
  }
}
