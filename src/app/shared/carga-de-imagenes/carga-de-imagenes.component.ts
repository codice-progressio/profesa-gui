import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core"
import { VisorDeImagenesService } from "../../services/visorDeImagenes/visor-de-imagenes.service"
import { CargaDeImagenesTransporte } from "./carga-de-imagenes-transporte"

@Component({
  selector: "app-carga-de-imagenes",
  templateUrl: "./carga-de-imagenes.component.html",
  styleUrls: ["./carga-de-imagenes.component.css"]
})
export class CargaDeImagenesComponent implements OnInit {
  constructor(public _visorDeImagenesService: VisorDeImagenesService) {}
  ngOnInit(): void {}

  @Input() activeColor: string = "green"
  @Input() baseColor: string = "#ccc"
  @Input() overlayColor: string = "rgba(255,255,255,0.5)"
  @Output() imagenesParaSubir = new EventEmitter<CargaDeImagenesTransporte[]>()

  dragging: boolean = false
  loaded: boolean = false
  imageLoaded: boolean = false
  imageSrc: string = ""

  handleDragEnter() {
    this.dragging = true
  }

  handleDragLeave() {
    this.dragging = false
  }

  handleDrop(e) {
    e.preventDefault()
    this.dragging = false
    this.handleInputChange(e)
  }

  handleImageLoad() {
    this.imageLoaded = true
  }

  files: CargaDeImagenesTransporte[] = []

  handleInputChange(e, input = null) {
    //Esperamos un tiempo para comprobar
    // que no se activo la vista previa.

    let files = e.dataTransfer ? e.dataTransfer.files : e.target.files
    // files.forEach(file=> this.handleInputChangeEach(e, file))

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      this.cargando[i] = true
      this.handleInputChangeEach(e, file)
    }
  }

  cargando = []

  handleInputChangeEach(e, file) {
    var pattern = /image-*/
    var reader = new FileReader()

    if (!file.type.match(pattern)) {
      alert("invalid format")
      return
    }

    this.loaded = false

    let transporte = new CargaDeImagenesTransporte()
    transporte.file = file
    // transporte.src = reader.result
    // this.files.push(transporte)

    reader.onload = (e: any) => {
      var reader = e.target
      transporte.src = reader.result
      this.files.push(transporte)

      this.cargando.pop()
      this.comprobarEmitir()
    }
    // Permite leer la imagen en base 64
    reader.readAsDataURL(file)
  }

  _handleReaderLoaded(e) {
    var reader = e.target

    // let transporte = new CargaDeImagenesTransporte()
    // transporte.file = reader
    // transporte.src = reader.result
    // this.files.push(transporte)

    // var reader = e.target
    // this.imageSrc = reader.result

    this.cargando.pop()
    this.comprobarEmitir()
  }

  private comprobarEmitir() {
    if (this.cargando.length === 0) {
      this.loaded = true
      this.imagenesParaSubir.emit(this.files)
    }
  }

  verImagen(src) {
    this._visorDeImagenesService.mostrarImagen(src)
  }

  eliminarImagen(i: number) {
    setTimeout(() => {
      this.files.splice(i, 1)
      this.imagenesParaSubir.emit(this.files)
    }, 100)
  }
}
