import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core'
import { Requisicion } from 'src/app/models/requisiciones/requisicion.model'
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormArray
} from '@angular/forms'
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service'
import { ProveedorService } from 'src/app/services/proveedor.service'
import { DivisaService } from 'src/app/services/divisa.service'
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service'
import { CargaDeImagenesTransporte } from '../../../../../../shared/carga-de-imagenes/carga-de-imagenes-transporte'
import { SubirArchivoService } from '../../../../../../services/subir-archivo/subir-archivo.service'
import { RequisicionService } from '../../../../../../services/requisiciones/requisicion.service'

@Component({
  selector: 'app-recibir-parcialidad',
  templateUrl: './recibir-parcialidad.component.html',
  styles: []
})
export class RecibirParcialidadComponent implements OnInit {
  @Input() requisicion: Requisicion = null
  @Output() guardar = new EventEmitter<any>()
  @Output() esteComponente = new EventEmitter<this>()
  @Output() cancelado = new EventEmitter<null>()

  formulario: FormGroup

  constructor(
    public fb: FormBuilder,
    public vs: ValidacionesService,
    public _proveedorService: ProveedorService,
    public _msjService: ManejoDeMensajesService,
    public _subirArchivoService: SubirArchivoService,
    public requisicionService: RequisicionService
  ) {}

  ngOnInit() {
    this.esteComponente.emit(this)
  }

  crearFormulario(req: Requisicion) {
    this.requisicion = req
    this.formulario = this.fb.group(
      {
        cantidadEntregadaALaFecha: [
          '',
          [
            Validators.min(0.001),
            Validators.max(this.obtenerMaximo(req)),
            Validators.required,
            this.vs.numberValidator
          ]
        ],
        imagenesFacturas: this.fb.array([])
      },
      { validator: this.validarTamanoDeArrayImagenesFacturas }
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

  public get cantidadEntregadaALaFecha_FB(): AbstractControl {
    return this.formulario.get('cantidadEntregadaALaFecha')
  }
  public get imagenesFacturas_FB(): FormArray {
    return <FormArray>this.formulario.get('imagenesFacturas')
  }

  private obtenerMaximo(req: Requisicion): number {
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
    this.cancelado.emit(null)
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
    e.preventDefault()
    if (invalid) return
    let imgs: File[] = this.imagenesCargadas.map(x => x.file)
    this._subirArchivoService
      .facturasRequisicion(imgs, this.requisicion._id)
      .subscribe(
        x => {
          if (!x) return
          if (x['ok']) {
            this.requisicionService.reiniciar(this.requisicion.estatus)
            this.requisicion.razonDeCambioTemp = 'Se agregaron parcialidades.'
            this.requisicion.estatus.cantidadEntregadaALaFecha =
              modelo.cantidadEntregadaALaFecha
            this.requisicion.estatus.esEntregaParcial = true
            this.requisicion.estatus.fechaEntregaParcialidad = new Date()

            this.requisicionService
              .actualizarEstatus(this.requisicion)
              .subscribe(
                req => {
                  this.guardar.emit()
                  this.limpiar()
                },
                err => {
                  this.limpiar
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
