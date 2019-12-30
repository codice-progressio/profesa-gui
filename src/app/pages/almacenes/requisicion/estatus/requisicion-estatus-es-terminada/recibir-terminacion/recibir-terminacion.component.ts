import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Requisicion } from '../../../../../../models/requisiciones/requisicion.model'
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl
} from '@angular/forms'
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service'
import { ProveedorService } from 'src/app/services/proveedor.service'
import { DivisaService } from 'src/app/services/divisa.service'
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service'
import { SubirArchivoService } from 'src/app/services/subir-archivo/subir-archivo.service'
import { RequisicionService } from 'src/app/services/requisiciones/requisicion.service'
import { CargaDeImagenesTransporte } from 'src/app/shared/carga-de-imagenes/carga-de-imagenes-transporte'

@Component({
  selector: 'app-recibir-terminacion',
  templateUrl: './recibir-terminacion.component.html',
  styles: []
})
export class RecibirTerminacionComponent implements OnInit {
  @Input() requisicion: Requisicion
  @Output() guardar = new EventEmitter<null>()
  @Output() esteComponente = new EventEmitter<this>()
  @Output() cancelado = new EventEmitter<null>()

  formulario: FormGroup

  constructor(
    public fb: FormBuilder,
    public vs: ValidacionesService,
    public _proveedorService: ProveedorService,
    public _divisaService: DivisaService,
    public _msjService: ManejoDeMensajesService,
    public _subirArchivoService: SubirArchivoService,
    public _requisicionService: RequisicionService
  ) {}

  ngOnInit() {
    this.esteComponente.emit(this)
  }

  crearFormulario(req: Requisicion) {
    this.requisicion = req
    this.formulario = this.fb.group(
      {
        imagenesFacturas: this.fb.array([])
      },
      { validator: group => this.validarTamanoDeArrayImagenesFacturas(group) }
    )
  }

  /**
   *Validamos que el array
   *
   * @private
   * @param {FormGroup} group
   * @memberof RecibirParcialidadComponent
   */
  private validarTamanoDeArrayImagenesFacturas(group: FormGroup) {
    let imagenesFacturas: FormArray = <FormArray>group.get('imagenesFacturas')

    let validacion = null
    // No es necesario cargar nada si ya se completo la requisicion en cantidad
    if (
      this.requisicion.cantidad ===
      this.requisicion.estatus.cantidadEntregadaALaFecha
    )
      return null

    // Si no esta terminado entonces si es necesario recibir.
    if (imagenesFacturas.length < 1) {
      validacion = {
        general: {
          mensaje: 'Es necesario cargar una factura por lo menos.'
        }
      }
    }

    return validacion
  }

  crearGrupo_imagenesFacturas(): FormGroup {
    return this.fb.group({
      imagen: ['', Validators.required]
    })
  }

  public get imagenesFacturas_FB(): FormArray {
    return <FormArray>this.formulario.get('imagenesFacturas')
  }

  obtenerMaximo(req: Requisicion): number {
    let r: number
    if (req) {
      let total = req.cantidad
      let parcialActual = req.estatus.cantidadEntregadaALaFecha
      r = total - parcialActual
    }

    return r
  }

  limpiar() {
    this.crearFormulario(this.requisicion)
    this.requisicion = null

    this.imagenesCargadas = []
  }

  cancelar() {
    this.limpiar()
    this.cancelado.emit()
  }

  imagenesCargadas: CargaDeImagenesTransporte[] = []

  imagenesParaSubir(imagenes: CargaDeImagenesTransporte[]) {
    this.imagenesCargadas = imagenes
    this.imagenesFacturas_FB.clear()
    this.imagenesCargadas.forEach(x =>
      this.imagenesFacturas_FB.push(this.fb.control(x.file.name))
    )

    this.formulario.updateValueAndValidity()
  }

  submit(modelo, invalid, e) {
    // El modelo se ignora por que solo lo usamos
    // para validar que se suban fotos. Aqui se tienen que subir todo
    // lo que falte si o si.

    e.preventDefault()
    if (invalid) return

    let imgs: File[] = this.imagenesCargadas.map(x => x.file)
    this._subirArchivoService
      .facturasRequisicion(imgs, this.requisicion._id)
      .subscribe(
        x => {
          if (!x) return
          if (x['ok']) {
            this.requisicion.estatus.reiniciar()
            this.requisicion.razonDeCambioTemp = 'Requisicion completada'

            this.requisicion.estatus.cantidadEntregadaALaFecha = this.obtenerMaximo(
              this.requisicion
            )

            this.requisicion.estatus.fechaTermino = new Date()

            this.requisicion.estatus.esTerminada = true

            this._requisicionService
              .actualizarEstatus(this.requisicion)
              .subscribe(
                req => {
                  this.guardar.emit()
                  this.limpiar()
                },
                err => {
                  this.limpiar()
                }
              )
          }
        },
        err => {
          this.limpiar()
        }
      )
  }
}
