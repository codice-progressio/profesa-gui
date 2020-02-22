import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core'
import { Puesto } from 'src/app/models/recursosHumanos/puestos/puesto.model'
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormArray
} from '@angular/forms'
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service'
import { PuestoService } from 'src/app/services/recursosHumanos/puesto.service'
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service'
import { Puesto_RelacionClienteProveedorInternos } from 'src/app/models/recursosHumanos/puestos/puesto_relacionClienteProveedorInternos.model'
import { FuncionesEspecificasDelPuesto } from '../../../models/recursosHumanos/puestos/funcionesEspecificasDelPuesto.model'
import { Puesto_RelacionClienteProveedorExternos } from '../../../models/recursosHumanos/puestos/puesto_relacionClienteProveedorIExternos.model'
import { Departamento } from '../../../models/departamento.models'
import { DepartamentoService } from '../../../services/departamento/departamento.service'
import { DataListComponent } from 'src/app/shared/data-list/data-list.component'
import { Empleado } from '../../../models/recursosHumanos/empleados/empleado.model'
import { Dato } from 'src/app/shared/data-list/dato.model'
import { EmpleadoService } from '../../../services/recursosHumanos/empleado.service'
import { CursoService } from '../../../services/recursosHumanos/curso.service'
import { Curso } from '../../../models/recursosHumanos/cursos/curso.model'
import { VisorDeImagenesService } from '../../../services/visorDeImagenes/visor-de-imagenes.service'
import { CargaDeImagenesTransporte } from '../../../shared/carga-de-imagenes/carga-de-imagenes-transporte'
import { SubirArchivoService } from 'src/app/services/subir-archivo/subir-archivo.service'
import { ImagenPipe } from 'src/app/pipes/imagen.pipe'
import { CargaDeImagenesComponent } from '../../../shared/carga-de-imagenes/carga-de-imagenes.component'
import { Puesto_MotivoDeCambio } from '../../../models/recursosHumanos/puestos/puesto_motivoDeCambio.model'
import { UsuarioService } from '../../../services/usuario/usuario.service'
import { Paginacion } from 'src/app/utils/paginacion.util'

@Component({
  selector: 'app-puestos-crear-modificar',
  templateUrl: './puestos-crear-modificar.component.html',
  styles: []
})
export class PuestosCrearModificarComponent implements OnInit {
  @Input() puesto: Puesto = null
  @Output() guardar = new EventEmitter<null>()
  @Output() esteComponente = new EventEmitter<this>()

  formulario: FormGroup

  departamentos: Departamento[] = []

  constructor(
    public fb: FormBuilder,
    public vs: ValidacionesService,
    public _puestoService: PuestoService,
    public _msjService: ManejoDeMensajesService,
    public _departamentoService: DepartamentoService,
    public _empleadoService: EmpleadoService,
    public _cursoService: CursoService,
    public _visorDeImagenesService: VisorDeImagenesService,
    public _uploadService: SubirArchivoService,
    public imagenPipe: ImagenPipe,
    public _usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.esteComponente.emit(this)
    this._departamentoService
      .todoAbstracto(0, 100, Departamento, 'Obteniendo departamentos')
      .subscribe(departamentos => (this.departamentos = departamentos))
    this.crearFormulario()
  }

  cargarDatos() {
    this.crearFormulario()
    this.asignarValores()
  }

  asignarValores() {
    this.asignar1()
    this.asignar2()
    this.asignar3()
  }

  private asignar1() {
    this.puesto_FB.setValue(this.puesto.puesto)
    this.departamento_FB.setValue(this.puesto.departamento._id)
    this.vigenciaEnAnios_FB.setValue(this.puesto.vigenciaEnAnios)
    this.misionDelPuesto_FB.setValue(this.puesto.misionDelPuesto)

    this.reportaA_FB.setValue(this.puesto.reportaA)
    if (this.puesto.reportaA) {
      this.reportaADatalist.cargarElementoPorModificacion(
        this.reportaACrearDato(this.puesto.reportaA)
      )
    }

    let cur = this.puesto.cursosRequeridos.map(x => {
      this.fb.control(x)
    })
    this.cursosSeleccionados = this.puesto.cursosRequeridos
    this.formulario.controls['cursosRequeridos'] = this.fb.array(cur)

    let pac = this.puesto.personalACargo.map(x => this.fb.control(x))
    this.personalACargo = this.puesto.personalACargo
    this.formulario.controls['personalACargo'] = this.fb.array(pac)

    this.conocimientos = new Set(this.puesto.perfilDelPuesto.conocimientos)
    this.generarStringArrayFBDesdeSet(this.conocimientos, 'conocimientos')

    this.habilidades = new Set(this.puesto.perfilDelPuesto.habilidades)
    this.generarStringArrayFBDesdeSet(this.habilidades, 'habilidades')

    this.aptitudes = new Set(this.puesto.perfilDelPuesto.aptitudes)
    this.generarStringArrayFBDesdeSet(this.habilidades, 'aptitudes')
  }
  private asignar2() {
    this.formulario.controls['funcionesEspecificasDelPuesto'] = this.fb.array(
      []
    )
    this.puesto.funcionesEspecificasDelPuesto.forEach(funciones => {
      let f = this.crearGrupo_FuncionesEspecificasDelPuesto(funciones)
      this.funcionesEspecificasDelPuesto_FB.push(f)
    })

    this.indicesDeEfectividadSet = new Set(this.puesto.indicesDeEfectividad)
    this.generarStringArrayFBDesdeSet(
      this.indicesDeEfectividadSet,
      'indicesDeEfectividad'
    )
  }

  private asignar3() {
    let elp = this.puesto.elPuestoPuedeDesarrollarseEnLasSiguientesAreas.map(
      x => this.fb.control(x)
    )

    this.formulario.controls[
      'elPuestoPuedeDesarrollarseEnLasSiguientesAreas'
    ] = this.fb.control(elp)

    this.elPuestoPuedeDesarrollarseEnLasSiguientesAreas = this.puesto.elPuestoPuedeDesarrollarseEnLasSiguientesAreas

    this.formulario.controls['internos'] = this.fb.array([])
    this.puesto.relacionClienteProveedor.internos.forEach(int => {
      let f = this.crearGrupo_relacionClienteProveedor_internos(int)
      this.internos_FB.push(f)
    })

    this.formulario.controls['externos'] = this.fb.array([])
    this.puesto.relacionClienteProveedor.externos.forEach(ext => {
      let f = this.crearGrupo_relacionClienteProveedor_externos(ext)
      this.externos_FB.push(f)
    })

    this.desarrollo_FB.setValue(this.puesto.quien.desarrollo)
    this.desarrolloDataList.seleccionarElemento(
      this.empleadosCrearDato(this.puesto.quien.desarrollo)
    )
    this.reviso_FB.setValue(this.puesto.quien.reviso)
    this.revisoDataList.seleccionarElemento(
      this.empleadosCrearDato(this.puesto.quien.reviso)
    )
    this.aprobo_FB.setValue(this.puesto.quien.aprobo)
    this.aproboDataList.seleccionarElemento(
      this.empleadosCrearDato(this.puesto.quien.aprobo)
    )
    this.sueldoBase_FB.setValue(this.puesto.sueldoBase)
    this.sueldoMaximo_FB.setValue(this.puesto.sueldoMaximo)
    this.numeroDeExtencion_FB.setValue(this.puesto.numeroDeExtencion)
  }

  crear() {
    this.puesto = null
    this.crearFormulario()
    this.limpiarDespuesDeGuardarOModificar()
    this.motivoDeCambio_FB.setValue('Creacion del puesto')
  }

  modificar(puesto: Puesto) {
    this.limpiarDespuesDeGuardarOModificar()
    this.puesto = puesto
    this.crearFormulario()
    this.cargarDatos()
    this.motivoDeCambio_FB.setValue('')
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()
  }

  crearFormulario() {
    this.formulario = this.fb.group(
      {
        vigenciaEnAnios: [
          2,
          [Validators.required, this.vs.numberValidator, Validators.min(0)]
        ],
        cursosRequeridos: this.fb.array([]),
        puesto: ['', [Validators.required]],
        departamento: ['', Validators.required],
        reportaA: null,

        misionDelPuesto: ['', [Validators.required]],
        personalACargo: this.fb.array([]),

        conocimientos: this.fb.array([]),
        habilidades: this.fb.array([]),
        aptitudes: this.fb.array([]),

        funcionesEspecificasDelPuesto: this.fb.array([
          this.crearGrupo_FuncionesEspecificasDelPuesto()
        ]),

        internos: this.fb.array([
          this.crearGrupo_relacionClienteProveedor_internos()
        ]),
        externos: this.fb.array([
          this.crearGrupo_relacionClienteProveedor_externos()
        ]),

        indicesDeEfectividad: this.fb.array([]),
        elPuestoPuedeDesarrollarseEnLasSiguientesAreas: this.fb.array([]),

        desarrollo: [null, null],
        reviso: [null, null],
        aprobo: [null, null],

        sueldoBase: [
          '',
          [Validators.required, this.vs.numberValidator, Validators.min(1)]
        ],
        sueldoMaximo: [
          '',
          [Validators.required, this.vs.numberValidator, Validators.min(1)]
        ],
        numeroDeExtencion: [
          100,
          [
            this.vs.numberValidator,
            this.vs.onlyIntegers,
            Validators.min(100),
            Validators.max(999)
          ]
        ],
        motivoDeCambio: ['Creacion del documento', [Validators.required]]
      },
      { validator: this.validarSueldos }
    )
  }

  /**
   *Limpia los componentes que no pertenecen al `formulario` como
   lo son los data-list, arreglos, etc. 
   *
   * @memberof PuestosCrearModificarComponent
   */
  private limpiarDespuesDeGuardarOModificar() {
    this.reportaADatalist.reiniciar()

    this.cursosSeleccionados = []
    this.personalACargo = []
    this.conocimientos = new Set()
    this.habilidades = new Set()
    this.aptitudes = new Set()
    this.indicesDeEfectividadSet = new Set()
    this.elPuestoPuedeDesarrollarseEnLasSiguientesAreas = []
    this.desarrolloDataList.reiniciar()
    this.revisoDataList.reiniciar()
    this.aproboDataList.reiniciar()
    this.reportaADatalist.reiniciar()

    this.organigrama = null
  }

  private validarSueldos(group: FormGroup) {
    let sueldoBaseFB = group.get('sueldoBase')
    let sueldoMaximoFB = group.get('sueldoMaximo')
    let base = sueldoBaseFB.value
    let maxi = <number>group.get('sueldoMaximo').value

    let validacion = null

    if (!maxi) return validacion

    if (base >= maxi) {
      sueldoMaximoFB.setErrors({
        general: {
          mensaje: 'Debe ser mayor que ' + base
        }
      })

      validacion = {
        general: {
          mensaje: 'El sueldo base no puede ser igual o menor al sueldo maximo'
        }
      }
    }
    return validacion
  }

  crearGrupo_FuncionesEspecificasDelPuesto(
    relacion: FuncionesEspecificasDelPuesto = null
  ): FormGroup {
    return this.fb.group({
      actividad: [relacion ? relacion.actividad : '', [Validators.required]],
      proposito: [relacion ? relacion.proposito : '', [Validators.required]],
      frecuencia: [relacion ? relacion.frecuencia : '', [Validators.required]],
      prioridad: [relacion ? relacion.prioridad : '', [Validators.required]]
    })
  }

  addFuncionesEspecificasDelPuesto() {
    this.funcionesEspecificasDelPuesto_FB.push(
      this.crearGrupo_FuncionesEspecificasDelPuesto()
    )
  }

  deleteFuncionesEspecificasDelPuesto(i: number) {
    this.funcionesEspecificasDelPuesto_FB.removeAt(i)
  }

  submit(modelo: Puesto, invalid: boolean, e) {
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()

    if (invalid) {
      e.preventDefault()
      e.stopPropagation()

      console.log(this.formulario.errors)
      return
    }

    let puesto = new Puesto()
    Object.assign(puesto, modelo)
    puesto.motivoDeCambio = this.puesto ? this.puesto.motivoDeCambio : []
    let a = new Puesto_MotivoDeCambio()
    a.motivo = this.motivoDeCambio_FB.value
    a.usuario = this._usuarioService.usuario
    puesto.motivoDeCambio.unshift(a)

    puesto.perfilDelPuesto.conocimientos = this.conocimientos_FB.value
    puesto.perfilDelPuesto.habilidades = this.habilidades_FB.value
    puesto.perfilDelPuesto.aptitudes = this.aptitudes_FB.value

    puesto.cursosRequeridos = this.cursosSeleccionados

    puesto.personalACargo = this.personalACargo
    puesto.relacionClienteProveedor.internos = this.internos_FB.value
    puesto.relacionClienteProveedor.externos = this.externos_FB.value

    puesto.indicesDeEfectividad = this.indicesDeEfectividad_FB.value

    puesto.elPuestoPuedeDesarrollarseEnLasSiguientesAreas = this.elPuestoPuedeDesarrollarseEnLasSiguientesAreas

    puesto.quien.aprobo = this.aprobo_FB.value
    puesto.quien.desarrollo = this.desarrollo_FB.value
    puesto.quien.reviso = this.reviso_FB.value

    puesto.organigrama = this.organigrama

    let cbLimpiar = () => {
      this.guardar.emit()
      this.limpiar()
      this.cargaDeImagenesComponent.limpiarParaNuevo()
    }
    let cb = puesto => {
      cbLimpiar()
    }
    if (this.puesto) {
      puesto._id = this.puesto._id
      this._puestoService.modificarConOrganigrama(puesto).subscribe(cb)
    } else {
      this._puestoService.guardarConOrganigrama(puesto).subscribe(cb)
    }
  }

  limpiar() {
    this.crearFormulario()
    this.puesto = null
    this.limpiarDespuesDeGuardarOModificar()
  }

  cancelar() {
    this.limpiar()
  }

  public get vigenciaEnAnios_FB(): AbstractControl {
    return this.formulario.get('vigenciaEnAnios')
  }

  public get cursosRequeridos_FB(): FormArray {
    return <FormArray>this.formulario.get('cursosRequeridos')
  }

  public get puesto_FB(): AbstractControl {
    return this.formulario.get('puesto')
  }

  public get departamento_FB(): AbstractControl {
    return this.formulario.get('departamento')
  }

  public get reportaA_FB(): AbstractControl {
    return this.formulario.get('reportaA')
  }

  public get misionDelPuesto_FB(): AbstractControl {
    return this.formulario.get('misionDelPuesto')
  }

  public get personalACargo_FB() {
    return <FormArray>this.formulario.get('personalACargo')
  }

  public get conocimientos_FB(): FormArray {
    return <FormArray>this.formulario.get('conocimientos')
  }
  public get habilidades_FB(): FormArray {
    return <FormArray>this.formulario.get('habilidades')
  }
  public get aptitudes_FB(): FormArray {
    return <FormArray>this.formulario.get('aptitudes')
  }

  public get funcionesEspecificasDelPuesto_FB(): FormArray {
    return <FormArray>this.formulario.get('funcionesEspecificasDelPuesto')
  }

  public funcionesEspecificasDelPuesto_FB_actividad(
    i: number
  ): AbstractControl {
    return this.funcionesEspecificasDelPuesto_FB.at(i).get('actividad')
  }
  public funcionesEspecificasDelPuesto_FB_proposito(
    i: number
  ): AbstractControl {
    return this.funcionesEspecificasDelPuesto_FB.at(i).get('proposito')
  }
  public funcionesEspecificasDelPuesto_FB_frecuencia(
    i: number
  ): AbstractControl {
    return this.funcionesEspecificasDelPuesto_FB.at(i).get('frecuencia')
  }
  public funcionesEspecificasDelPuesto_FB_prioridad(
    i: number
  ): AbstractControl {
    return this.funcionesEspecificasDelPuesto_FB.at(i).get('prioridad')
  }

  // <!--
  // =====================================
  //  Internos
  // =====================================
  // -->

  public get internos_FB(): FormArray {
    return <FormArray>this.formulario.get('internos')
  }

  public internos_FB_departamento(i: number): AbstractControl {
    return this.internos_FB.at(i).get('departamento')
  }
  public internos_FB_relacion(i: number): AbstractControl {
    return this.internos_FB.at(i).get('relacion')
  }
  public internos_FB_asunto(i: number): AbstractControl {
    return this.internos_FB.at(i).get('asunto')
  }
  crearGrupo_relacionClienteProveedor_internos(
    relacion: Puesto_RelacionClienteProveedorInternos = null
  ) {
    return this.fb.group({
      departamento: [
        relacion ? relacion.departamento._id : '',
        [Validators.required]
      ],
      relacion: [relacion ? relacion.relacion : '', [Validators.required]],
      asunto: [relacion ? relacion.asunto : '', [Validators.required]]
    })
  }

  agregarRelacionInterna() {
    this.internos_FB.push(this.crearGrupo_relacionClienteProveedor_internos())
  }

  eliminarRelacionInterna(i) {
    this.internos_FB.removeAt(i)
  }

  // <!--
  // =====================================
  //  END Internos
  // =====================================
  // -->

  // <!--
  // =====================================
  //  Externos
  // =====================================
  // -->

  public get externos_FB(): FormArray {
    return <FormArray>this.formulario.get('externos')
  }

  public externos_FB_contacto(i: number): AbstractControl {
    return this.externos_FB.at(i).get('contacto')
  }
  public externos_FB_relacion(i: number): AbstractControl {
    return this.externos_FB.at(i).get('relacion')
  }
  public externos_FB_asunto(i: number): AbstractControl {
    return this.externos_FB.at(i).get('asunto')
  }

  crearGrupo_relacionClienteProveedor_externos(
    relacion: Puesto_RelacionClienteProveedorExternos = null
  ) {
    return this.fb.group({
      contacto: [relacion ? relacion.contacto : '', [Validators.required]],
      relacion: [relacion ? relacion.relacion : '', [Validators.required]],
      asunto: [relacion ? relacion.asunto : '', [Validators.required]]
    })
  }

  agregarRelacionExterna() {
    this.externos_FB.push(this.crearGrupo_relacionClienteProveedor_externos())
  }

  eliminarRelacionExterna(i) {
    this.externos_FB.removeAt(i)
  }

  // <!--
  // =====================================
  //  END Externos
  // =====================================
  // -->

  public get indicesDeEfectividad_FB(): FormArray {
    return <FormArray>this.formulario.get('indicesDeEfectividad')
  }

  public get elPuestoPuedeDesarrollarseEnLasSiguientesAreas_FB(): FormArray {
    return <FormArray>(
      this.formulario.get('elPuestoPuedeDesarrollarseEnLasSiguientesAreas')
    )
  }

  public get desarrollo_FB(): AbstractControl {
    return this.formulario.get('desarrollo')
  }
  public get reviso_FB(): AbstractControl {
    return this.formulario.get('reviso')
  }
  public get aprobo_FB(): AbstractControl {
    return this.formulario.get('aprobo')
  }

  public get sueldoBase_FB(): AbstractControl {
    return this.formulario.get('sueldoBase')
  }
  public get sueldoMaximo_FB(): AbstractControl {
    return this.formulario.get('sueldoMaximo')
  }
  public get numeroDeExtencion_FB(): AbstractControl {
    return this.formulario.get('numeroDeExtencion')
  }
  public get motivoDeCambio_FB(): AbstractControl {
    return this.formulario.get('motivoDeCambio')
  }

  private validadNoVacio(st: string) {
    let limpio = st.trim()
    return limpio
  }

  // <!--
  // =====================================
  //  conocimientos
  // =====================================
  // -->

  conocimientos: Set<string> = new Set()
  @ViewChild('conocimientosInput')
  conocimientosIn: ElementRef

  agregarConocimientos(valor: string) {
    if (!this.validadNoVacio(valor)) return
    this.conocimientos.add(valor)
    this.conocimientosIn.nativeElement.value = ''
    this.conocimientosIn.nativeElement.focus()

    this.generarStringArrayFBDesdeSet(this.conocimientos, 'conocimientos')
  }

  eliminarConocimiento(i: string) {
    this.conocimientos.delete(i)
    this.generarStringArrayFBDesdeSet(this.conocimientos, 'conocimientos')
  }

  private generarStringArrayFBDesdeSet(set: Set<string>, campo: string) {
    this.formulario.controls[campo] = this.fb.array(Array.from(set))
  }

  // <!--
  // =====================================
  //  END conocimientos
  // =====================================
  // -->

  // <!--
  // =====================================
  //  habilidades
  // =====================================
  // -->

  habilidades: Set<string> = new Set()
  @ViewChild('habilidadesInput') habilidadesIn: ElementRef

  agregarHabilidades(valor: string) {
    if (!this.validadNoVacio(valor)) return
    this.habilidades.add(valor)
    this.habilidadesIn.nativeElement.value = ''
    this.habilidadesIn.nativeElement.focus()
    this.generarStringArrayFBDesdeSet(this.habilidades, 'habilidades')
  }

  eliminarHabilidad(i) {
    this.habilidades.delete(i)
    this.generarStringArrayFBDesdeSet(this.habilidades, 'habilidades')
  }

  // <!--
  // =====================================
  //  END habilidades
  // =====================================
  // -->

  // <!--
  // =====================================
  //  aptitudes
  // =====================================
  // -->

  aptitudes: Set<string> = new Set()
  @ViewChild('aptitudesInput') aptitudesIn: ElementRef

  agregarAptitudes(valor: string) {
    if (!this.validadNoVacio(valor)) return
    this.aptitudes.add(valor)
    this.aptitudesIn.nativeElement.value = ''
    this.aptitudesIn.nativeElement.focus()
    this.generarStringArrayFBDesdeSet(this.aptitudes, 'aptitudes')
  }

  eliminarAptitud(i) {
    this.aptitudes.delete(i)
    this.generarStringArrayFBDesdeSet(this.aptitudes, 'aptitudes')
  }

  // <!--
  // =====================================
  //  END aptitudes
  // =====================================
  // -->

  // <!--
  // =====================================
  //  FuncionesEspecificas
  // =====================================
  // -->

  agregarFuncionesEspecificasDelPuesto() {
    this.funcionesEspecificasDelPuesto_FB.push(
      this.crearGrupo_FuncionesEspecificasDelPuesto()
    )
  }

  eliminarFuncionesEspecificasDelPuesto(i: number) {
    this.funcionesEspecificasDelPuesto_FB.removeAt(i)
  }

  // <!--
  // =====================================
  //  END FuncionesEspecificas
  // =====================================
  // -->

  ejecutarOperacionesDeBusquedaEmpleados(evento) {
    let termino = <string>evento.termino
    let dataList = <DataListComponent>evento.dataList
    this._empleadoService
      .find(termino, new Paginacion(5, 0, 1, 'nombres'))
      .subscribe(empleados => {
        let datos: Dato[] = []
        empleados.forEach((pue: Empleado) => {
          datos.push(this.empleadosCrearDato(pue))
        })

        dataList.terminoBusqueda(datos)
      })
  }

  empleadosCrearDato(emp: Empleado) {
    if (!emp) return
    let d = new Dato()
    d.leyendaPrincipal = emp.nombreCompleto()
    d.leyendaSecundaria = `NOM: ${emp.idNomina} | CHE: ${emp.idChecador}`
    d.objeto = emp

    return d
  }

  empleadosSeleccionado(dato: Dato) {
    if (!dato) {
      this.reportaA_FB.reset()
      this.reportaA_FB.markAsTouched()
      return
    }
    let puesto = <Puesto>dato.objeto
    this.reportaA_FB.setValue(puesto._id)
    this.reportaA_FB.updateValueAndValidity()
  }

  // <!--
  // =====================================
  //  reporta a
  // =====================================
  // -->

  reportaADatalist: DataListComponent = null

  // ejecutarOperacionesDeBusquedaPersonalACargo(evento) {
  //   let termino = <string>evento.termino
  //   let dataList = <DataListComponent>evento.dataList
  //   this._puestoService
  //     .search(termino, undefined, undefined, Puesto)
  //     .subscribe((puestos) => {
  //       let datos: Dato[] = []
  //       puestos.forEach((pue: Puesto) => {
  //         let a = this.reportaACrearDato(pue)
  //         datos.push()
  //       })

  //       dataList.terminoBusqueda(datos)
  //     })
  // }

  reportaACrearDato(emp: Puesto) {
    if (!emp) return null

    let d = new Dato()
    d.leyendaPrincipal = emp.puesto
    d.descripcionPrincipal = emp.misionDelPuesto
    d.objeto = emp

    return d
  }

  reportaASeleccionado(dato: Dato) {
    if (!dato) {
      this.reportaA_FB.reset()
      this.reportaA_FB.markAsTouched()
      return
    }
    let puesto = <Puesto>dato.objeto
    this.reportaA_FB.setValue(puesto)
    this.reportaA_FB.updateValueAndValidity()
  }

  // <!--
  // =====================================
  //  END reporta a
  // =====================================
  // -->

  // <!--
  // =====================================
  //  personalacargo
  // =====================================
  // -->
  personalACargoDataList: DataListComponent = null
  personalACargo: Puesto[] = []

  agregarPersonalACargo(dato: Dato) {
    if (dato) {
      let repetido = this.personalACargo.filter(x => dato.objeto._id === x._id)

      if (!repetido.length) {
        this.personalACargo.push(dato.objeto)
      }
      setTimeout(() => {
        this.personalACargoDataList.reiniciar()
      }, 100)
    }
  }

  eliminarPersonalACargo(i) {
    this.personalACargo.splice(i, 1)
  }

  // <!--
  // =====================================
  //  END personalACargo
  // =====================================
  // -->

  // <!--
  // =====================================
  //  Aprobo
  // =====================================
  // -->

  aproboDataList: DataListComponent = null
  aproboSeleccionado(dato: Dato) {
    if (!dato) return
    let empleado = <Empleado>dato.objeto
    this.aprobo_FB.setValue(empleado._id)
    this.aprobo_FB.updateValueAndValidity()
  }

  // <!--
  // =====================================
  //  END Aprobo
  // =====================================
  // -->

  // <!--
  // =====================================
  //  reviso
  // =====================================
  // -->
  revisoDataList: DataListComponent = null
  revisoSeleccionado(dato: Dato) {
    if (!dato) return
    let empleado = <Empleado>dato.objeto
    this.reviso_FB.setValue(empleado._id)
    this.reviso_FB.updateValueAndValidity()
  }

  // <!--
  // =====================================
  //  END reviso
  // =====================================
  // -->

  // <!--
  // =====================================
  //  desarrollo
  // =====================================
  // -->
  desarrolloDataList: DataListComponent = null
  desarrolloSeleccionado(dato: Dato) {
    if (!dato) return
    let empleado = <Empleado>dato.objeto
    this.desarrollo_FB.setValue(empleado._id)
    this.desarrollo_FB.updateValueAndValidity()
  }

  // <!--
  // =====================================
  //  END desarrollo
  // =====================================
  // -->

  // <!--
  // =====================================
  //  elPuestoPuedeDesarrollarseEnLasSiguientesAreas
  // =====================================
  // -->

  ejecutarOperacionesDeBusquedaPuestos(evento) {
    let termino = <string>evento.termino
    let dataList = <DataListComponent>evento.dataList
    this._puestoService
      .search(termino, undefined, undefined, Puesto)
      .subscribe(p => {
        let datos: Dato[] = []
        p.filter(px => {
          return px._id !== (this.puesto ? this.puesto._id : null)
        }).forEach((dep: Puesto) => {
          let d = new Dato()
          d.leyendaPrincipal = dep.puesto
          d.descripcionSecundaria = dep.misionDelPuesto
          d.objeto = dep
          datos.push(d)
        })
        dataList.terminoBusqueda(datos)
      })
  }

  elPuestoPuedeDesarrollarseEnLasSiguientesAreas: Puesto[] = []
  elPuestoPuedeDesarrollarseEnLasSiguientesAreasComponente: DataListComponent = null
  agregarPuesto(dato: Dato) {
    if (dato) {
      let repetido = this.elPuestoPuedeDesarrollarseEnLasSiguientesAreas.filter(
        x => dato.objeto._id === x._id
      )

      if (!repetido.length) {
        this.elPuestoPuedeDesarrollarseEnLasSiguientesAreas.push(dato.objeto)
      }
      setTimeout(() => {
        this.elPuestoPuedeDesarrollarseEnLasSiguientesAreasComponente.reiniciar()
      }, 100)
    }
  }

  eliminarElPuestoPuedeDesarrollarseEnLasSiguientesAreas(i: number) {
    this.elPuestoPuedeDesarrollarseEnLasSiguientesAreas.splice(i, 1)
  }

  // <!--
  // =====================================
  //  END elPuestoPuedeDesarrollarseEnLasSiguientesAreas
  // =====================================
  // -->

  // <!--
  // =====================================
  //  indicesDeEfectividad
  // =====================================
  // -->

  indicesDeEfectividadSet = new Set<string>()
  @ViewChild('indiceDeEfectividadInput', { static: true })
  indiceDeEfectividadIn: ElementRef

  agregarIndicesDeEfectividad(val: string) {
    if (!val.trim()) return
    this.indicesDeEfectividadSet.add(val)

    this.generarStringArrayFBDesdeSet(
      this.indicesDeEfectividadSet,
      'indicesDeEfectividad'
    )
    this.indiceDeEfectividadIn.nativeElement.value = ''
    this.indiceDeEfectividadIn.nativeElement.focus()
  }

  eliminarIndiceDeEfectividad(val: string) {
    this.indicesDeEfectividadSet.delete(val)
    this.generarStringArrayFBDesdeSet(
      this.indicesDeEfectividadSet,
      'indicesDeEfectividad'
    )
  }

  // limpiarIndiceDeEfectividad(fb, set) {
  //   fb.clear()
  //   set.forEach((val) => {
  //     fb.push(this.fb.control(val))
  //   })
  // }

  // <!--
  // =====================================
  //  END indicesDeEfectividad
  // =====================================
  // -->

  // <!--
  // =====================================
  //  curso
  // =====================================
  // -->
  cursoDataList: DataListComponent = null
  cursosSeleccionados: Curso[] = []

  ejecutarOperacionesDeBusquedaCursos(evento) {
    let termino = <string>evento.termino
    let dataList = <DataListComponent>evento.dataList
    this._cursoService
      .search(termino, undefined, undefined, Curso)
      .subscribe(articulos => {
        let datos: Dato[] = []
        articulos.forEach((curso: Curso) => {
          datos.push(this.cursoCrearDato(curso))
        })

        dataList.terminoBusqueda(datos)
      })
  }

  cursoCrearDato(curso: Curso) {
    let d = new Dato()
    d.leyendaPrincipal = curso.nombre
    d.descripcionPrincipal = curso.descripcionDeCurso
    d.leyendaSecundaria = curso.esCursoDeTroncoComun
      ? 'Tronco comun'
      : 'Especializante'

    d.objeto = curso

    return d
  }

  agregarCursoSeleccionado(dato: Dato) {
    if (dato) {
      let repetido = this.cursosSeleccionados.filter(
        x => dato.objeto._id === x._id
      )

      if (!repetido.length) {
        this.cursosSeleccionados.push(dato.objeto)
      }
      this.cursoDataList.reiniciar()
    }
  }

  agregarCursosDeTroncoComun() {
    this._cursoService.todosTroncoComun().subscribe(cursos => {
      cursos.forEach(curso => {
        let d = new Dato()
        d.objeto = curso
        this.agregarCursoSeleccionado(d)
      })
    })
  }

  eliminarCursoSeleccionado(i) {
    this.cursosSeleccionados.splice(i, 1)
  }

  // <!--
  // =====================================
  //  END curso
  // =====================================
  // -->

  mostrarImagen(url: string) {
    this._visorDeImagenesService.mostrarImagen(
      this.imagenPipe.transform(url, 'organigramaPuesto')
    )
  }

  // <!--
  // =====================================
  //  organigrama
  // =====================================
  // -->

  organigrama: File = null
  cargaDeImagenesComponent: CargaDeImagenesComponent = null
  agregarImagen(imgs: CargaDeImagenesTransporte[]) {
    if (imgs.length < 1) {
      this.organigrama = null
    } else {
      let datos = imgs[0]
      this.organigrama = datos.file
    }
  }

  // <!--
  // =====================================
  //  END organigrama
  // =====================================
  // -->

  msjDeErrorImagenes(msj) {
    this._msjService.invalido(msj, 'Formato de imagen invalido', 4000)
  }
}
