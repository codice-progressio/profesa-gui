import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core'
import { Empleado } from 'src/app/models/recursosHumanos/empleados/empleado.model'
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  Validators,
  ValidationErrors
} from '@angular/forms'
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service'
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service'
import { EmpleadoService } from '../../../services/recursosHumanos/empleado.service'
import * as moment from 'moment'
import { Puesto } from 'src/app/models/recursosHumanos/puestos/puesto.model'
import { CargaDeImagenesTransporte } from 'src/app/shared/carga-de-imagenes/carga-de-imagenes-transporte'
import { DataListComponent } from '../../../shared/data-list/data-list.component'
import { PuestoService } from '../../../services/recursosHumanos/puesto.service'
import { Dato } from '../../../shared/data-list/dato.model'
import { CargaDeImagenesComponent } from '../../../shared/carga-de-imagenes/carga-de-imagenes.component'
import { VisorDeImagenesService } from '../../../services/visorDeImagenes/visor-de-imagenes.service'
import { FormArray } from '@angular/forms'

@Component({
  selector: 'app-empleado-crear-modificar',
  templateUrl: './empleado-crear-modificar.component.html',
  styles: []
})
export class EmpleadoCrearModificarComponent implements OnInit {
  @Input() empleado: Empleado = null
  @Output() esteComponente = new EventEmitter<this>()
  @Output() guardar = new EventEmitter<null>()

  formulario: FormGroup

  puestos: Puesto[] = []
  fotografiaComponent: CargaDeImagenesComponent
  _puestoComponent: DataListComponent

  esperarEjecucion = null
  set puestoComponent(value) {
    this._puestoComponent = value
    this.esperarEjecucion()
  }

  get puestoComponent(): DataListComponent {
    return this._puestoComponent
  }

  constructor(
    public fb: FormBuilder,
    public vs: ValidacionesService,
    public _msjService: ManejoDeMensajesService,
    public _empleadoService: EmpleadoService,
    public _puestoService: PuestoService,
    public _visorDeImagenesService: VisorDeImagenesService
  ) {}

  ngOnInit() {
    this.esteComponente.emit(this)
  }

  crear(empleado: Empleado = new Empleado()) {
    this.empleado = empleado
    this.crearFormulario(this.empleado)

    this.esperarEjecucion = () => {
      if (empleado.puestoActual) {
        let dato = new Dato()
        dato.leyendaPrincipal = empleado.puestoActual.puesto
        dato.descripcionPrincipal = empleado.puestoActual.misionDelPuesto
        dato.objeto = empleado.puestoActual
        this.puestoComponent.cargarElementoPorModificacion(dato)
      }
    }
    //Si ya hay un componente se ejecuta la operacion.
    if (this.puestoComponent) {
      this.esperarEjecucion()
    }
  }

  crearFormulario(empleado: Empleado) {
    this.formulario = this.fb.group({
      idChecador: [empleado.idChecador, null],
      idNomina: [
        empleado.idNomina,
        [Validators.required, this.vs.numberValidator]
      ],
      nombres: [empleado.nombres, [Validators.required]],
      apellidos: [empleado.apellidos, [Validators.required]],

      fechaDeNacimiento: [
        moment(empleado.fechaDeNacimiento).format('YYYY-MM-DD'),
        null
      ],
      sexo: [empleado.sexo, [Validators.required]],
      curp: [
        empleado.curp,
        [
          this.vs.curp,
          Validators.required,
          Validators.maxLength(18),
          Validators.minLength(18)
        ]
      ],
      rfc: [
        empleado.rfc,
        [
          this.vs.rfc,
          Validators.required,
          Validators.maxLength(13),
          Validators.minLength(12)
        ]
      ],
      numeroDeCuenta: [empleado.numeroDeCuenta, [this.vs.numberValidator]],
      numeroDeSeguridadSocial: [
        empleado.numeroDeSeguridadSocial,
        [
          this.vs.nss,
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11)
        ]
      ],
      puestoActual: [
        this.hayPuestoActual(empleado.puestoActual),
        [Validators.required]
      ],
      fotografia: [empleado.fotografia, [Validators.required]],
      email: [empleado.email, [Validators.email]],
      celular: [
        empleado.celular,
        [
          this.vs.numberValidator,
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10)
        ]
      ],
      telCasa: [
        empleado.telCasa,
        [
          this.vs.numberValidator,
          Validators.maxLength(10),
          Validators.minLength(10)
        ]
      ],
      telEmergencia: [
        empleado.telEmergencia,
        [
          this.vs.numberValidator,
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10)
        ]
      ],
      nombreEmergencia: [empleado.nombreEmergencia, [Validators.required]],

      estadoCivil: [empleado.estadoCivil, [Validators.required]],
      hijos: this.fb.array(empleado.hijos.map(x => this.fb.control(x))),
      nivelDeEstudios: [empleado.nivelDeEstudios, null],
      domicilio: [
        empleado.domicilio,
        [Validators.required, Validators.minLength(10)]
      ]
    })
  }

  f(s: string): AbstractControl {
    return this.formulario.get(s)
  }

  fa(s: string): FormArray {
    return <FormArray>this.formulario.get(s)
  }
  @ViewChild('inputHijo', { static: false }) inputHijo: ElementRef

  agregarHijo(valor: number) {
    this.fa('hijos').push(this.fb.control(valor))
    this.inputHijo.nativeElement.value = ''
    this.inputHijo.nativeElement.focus()
  }

  eliminarHijo(i: number) {
    this.fa('hijos').removeAt(i)
  }

  hayPuestoActual(puesto: Puesto) {
    if (!puesto) return ''
    return puesto._id
  }

  limpiar() {
    this.formulario.reset()
    if (this.fotografiaComponent) this.fotografiaComponent.limpiarParaNuevo()
    if (this.puestoComponent) this.puestoComponent.limpiarParaNuevo()
  }

  cancelar() {
    this.limpiar()
    this.crear()
  }

  submit(modelo: Empleado, invalid: boolean, e) {
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()
    e.preventDefault()
    if (invalid) return

    let operacion = () => {
      this.limpiar()
      this.crear()
      this.guardar.emit()
    }

    modelo.hijos = modelo.hijos.map(x => x * 1)
    if (this.empleado._id) modelo._id = this.empleado._id
    this._empleadoService.guardarOModificarConFoto(modelo).subscribe(operacion)
  }

  errorImagen(msj) {
    this._msjService.invalido(msj)
  }

  fotoActual: File
  fotografiaSetear(fotos: CargaDeImagenesTransporte[]) {
    if (fotos.length > 0) {
      this.f('fotografia').setValue(fotos[0].file)
      // this.fotoActual = fotos[0].file
    } else {
      this.f('fotografia').setValue(null)
      this.fotoActual = null
      this.formulario.updateValueAndValidity()
    }
  }

  buscarPuestos(datos: { termino: string; dataList: DataListComponent }) {
    if (!datos) return
    this._puestoService.buscar(datos.termino).subscribe(puestos => {
      this.puestos = puestos
      let da: Dato[] = []
      this.puestos.forEach((dep: Puesto) => {
        let d = new Dato()
        d.leyendaPrincipal = dep.puesto
        d.descripcionSecundaria = dep.misionDelPuesto
        d.objeto = dep
        da.push(d)
      })
      datos.dataList.terminoBusqueda(da)
    })
  }

  articuloSeleccionado(dato: Dato) {
    let c = this.f('puestoActual')

    if (!dato) {
      c.setValue(null)
      return
    }
    let p = <Puesto>dato.objeto
    c.setValue(p._id)
  }

  mostrarImagen(i: string) {
    this._visorDeImagenesService.mostrarImagen(i)
  }

  hayFoto() {
    return typeof this.f('fotografia').value === 'string'
  }

  cambiarFoto() {
    this.f('fotografia').setValue(null)
  }
}
