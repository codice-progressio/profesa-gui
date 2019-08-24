import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from "@angular/core"

@Component({
  selector: "app-boton-para-imprecion",
  templateUrl: "./boton-para-imprecion.component.html",
  styles: []
})
export class BotonParaImprecionComponent implements OnInit {
  @ViewChild("hiddenInput1", { static: false }) hiddenInput1: ElementRef
  /**
   *El id propio que encierra el area a imprimirse. Tiene que ser unico.
   *
   * @type {string}
   * @memberof BotonParaImprecionComponent
   */
  @Input() id: string
  @Input() mostrarTexto: boolean = true
  @Output() onclick = new EventEmitter<any>()

  impresionTerminada: boolean = false
  idUnico: string
  constructor() {
    this.idUnico = (Math.random() + "").split(".")[1]
  }

  ngOnInit() {
    if (!this.id) {
      throw "No has definido el id del area."
    }
  }
}
