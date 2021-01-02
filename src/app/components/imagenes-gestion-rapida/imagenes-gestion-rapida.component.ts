import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { CargaDeImagenesTransporte } from '../../shared/carga-de-imagenes/carga-de-imagenes-transporte'

@Component({
  selector: 'codice-imagenes-gestion-rapida',
  templateUrl: './imagenes-gestion-rapida.component.html',
  styleUrls: ['./imagenes-gestion-rapida.component.css']
})
export class ImagenesGestionRapidaComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    this.esteComponente.emit(this)
  }

  @Input() activeColor: string = 'green'
  @Input() baseColor: string = '#ccc'
  @Input() overlayColor: string = 'rgba(255,255,255,0.5)'
  /**
   *Cuando ocurre un error emite una cadena de texto con la razon.
   *
   * @memberof CargaDeImagenesComponent
   */
  @Output() error = new EventEmitter<string>()

  /**
   *Permite definir la subida de multiples archvis.
   *
   * @type {boolean}
   * @memberof CargaDeImagenesComponent
   */
  @Input() multiple: boolean = true

  /**
   * Cuando se a seleccionado o arrastrado una imagen emite un arreglo
   * con las imagenes seleccionadas para poder cargarlas posteriormente
   *
   * @memberof CargaDeImagenesComponent
   */
  @Output() imagenesParaSubir = new EventEmitter<CargaDeImagenesTransporte[]>()
  @Output() esteComponente = new EventEmitter<this>()

  loaded: boolean = false
  dragging: boolean = false
  /**
   *
   *
   * @type {boolean}
   * @memberof CargaDeImagenesComponent
   */
  imageLoaded: boolean = false
  imageSrc: string = ''

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
      this.error.emit('No es un formato valido')
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

      if (!this.multiple) {
        this.files = []
      }
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
    // this._visorDeImagenesService.mostrarImagen(src)
    throw 'No definido'
  }

  eliminarImagen(i: number) {
    setTimeout(() => {
      this.files.splice(i, 1)
      this.imagenesParaSubir.emit(this.files)
    }, 100)
  }

  /**
   *Elimina los datos que tenga cargados.
   *
   * @memberof CargaDeImagenesComponent
   */
  limpiarParaNuevo() {
    this.files = []
  }
}
