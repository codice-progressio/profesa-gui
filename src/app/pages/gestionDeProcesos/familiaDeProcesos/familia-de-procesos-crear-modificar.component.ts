import { Component, OnInit } from '@angular/core'
import { FamiliaDeProcesos } from '../../../models/familiaDeProcesos.model'
import { FamiliaDeProcesosService } from '../../../services/proceso/familia-de-procesos.service'
import { Proceso } from '../../../models/proceso.model'
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms'
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service'
import { FormControl } from '@angular/forms'
import { Procesos } from '../../../models/procesos.model'
import { ActivatedRoute } from '@angular/router'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { Location } from '@angular/common'
import { ProcesoService } from '../../../services/proceso/proceso.service'
import { Paginacion } from 'src/app/utils/paginacion.util'
import { ParametrosService } from '../../../services/parametros.service'
import { LocalizacionDeOrdenes } from '../../../models/parametros/localizacionDeOrdenes.parametros.model'
import { ManejoDeMensajesService } from '../../../services/utilidades/manejo-de-mensajes.service'

@Component({
  selector: 'app-familia-de-procesos-crear-modificar',
  templateUrl: './familia-de-procesos-crear-modificar.component.html',
  styles: []
})
export class FamiliaDeProcesosCrearModificarComponent implements OnInit {
  cargando = {}
  keys = Object.keys

  procesos: Proceso[] = null
  procesosAgregados: Proceso[] = null
  procesosIniciales: Proceso[] = []
  procesosFinales: Proceso[] = []

  formulario: FormGroup
  familia: FamiliaDeProcesos

  constructor(
    private activatedRoute: ActivatedRoute,
    public location: Location,
    private familiaService: FamiliaDeProcesosService,
    private fb: FormBuilder,
    public vs: ValidacionesService,
    private procesoService: ProcesoService,
    private parametrosService: ParametrosService,
    private msjService: ManejoDeMensajesService
  ) {
    const id = this.activatedRoute.snapshot.paramMap.get('id')

    if (id) {
      this.cargando['cargar'] = 'Buscando familia para modificar'
      this.familiaService.findById(id).subscribe(
        familia => {
          this.crearFormulario(familia)
          delete this.cargando['cargar']
        },
        () => delete this.cargando['cargar']
      )
    } else {
      this.crearFormulario()
      delete this.cargando['cargar']
    }
  }

  ngOnInit() {
    this.cargando['procesos'] = 'Cargando parametros'
    this.parametrosService.localizacionDeOrdenes().subscribe(
      localizacionDeOrdenes => {
        this.procesosIniciales = localizacionDeOrdenes.procesosIniciales
        this.procesosFinales = localizacionDeOrdenes.procesosFinales

        delete this.cargando['procesos']
      },
      err => delete this.cargando['procesos']
    )
  }

  /**
   *Crea el formulario de registro.
   *
   * @memberof MaquinasCrearModificarComponent
   */
  crearFormulario(elemento: FamiliaDeProcesos = new FamiliaDeProcesos()) {
    this.familia = elemento
    this.formulario = this.fb.group({
      nombre: [elemento.nombre, [Validators.required]],
      observaciones: [elemento.observaciones, []],
      procesos: new FormArray(
        elemento.procesos.map(x => new FormControl(x)),
        this.vs.minSelectedCheckboxes()
      )
    })

    this.cargando['procesos'] = 'Cargando procesos'
    this.procesoService
      .findAll(new Paginacion(3000, 0, 1, 'nombre'))
      .subscribe(procesos => {
        this.procesos = procesos
        this.mostrar = this.procesos.map(x => x._id)
        delete this.cargando['procesos']
      })

    this.procesosAgregados = elemento.procesos.map(x => x.proceso)
  }

  f(campo): FormArray {
    return <FormArray>this.formulario.get(campo)
  }

  drop(e: CdkDragDrop<Proceso[]>) {
    if (e.container !== e.previousContainer) {
      let r = (a, b) => a.concat(' ' + b._id)
      let pF: string = this.procesosFinales.reduce(r, '')
      let pI: string = this.procesosIniciales.reduce(r, '')
      let pro = this.procesos[e.previousIndex]

      if (pF.includes(pro._id) || pI.includes(pro._id)) {
        this.msjService.confirmarAccion(
          'Este proceso esta incluido en los procesos de inicializacion o finalizacion, Aun asi quieres agregarlo?',
          () => {
            this.continuarAgregandoProceso(e)
          }
        )
      } else {
        this.continuarAgregandoProceso(e)
      }
    } else {
      moveItemInArray(e.container.data, e.previousIndex, e.currentIndex)
    }
  }

  private continuarAgregandoProceso(e) {
    this.procesosAgregados.splice(
      e.currentIndex,
      0,
      this.procesos[e.previousIndex]
    )

    this.f('procesos').clear()
    let contador = 0
    this.procesosAgregados.forEach(p => {
      const procesos = new Procesos()
      procesos.proceso = p
      procesos.orden = contador + ''
      contador++
      this.f('procesos').push(new FormControl(procesos))
    })
  }

  quitarProceso(i: number): void {
    this.f('procesos').removeAt(i)
    this.procesosAgregados.splice(i, 1)
  }

  submit(modelo: FamiliaDeProcesos, invalid: boolean, e) {
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()

    if (invalid) {
      e.stopPropagation()
      e.preventDefault()
      return
    }

    this.cargando['guardar'] = 'Aplicando cambios'
    if (this.familia._id) {
      modelo._id = this.familia._id
      this.familiaService.update(modelo).subscribe(
        () => this.location.back(),
        () => delete this.cargando['guardar']
      )
    } else {
      this.familiaService.save(modelo).subscribe(
        () => {
          delete this.cargando['guardar']
          this.crearFormulario()
        },
        () => delete this.cargando['guardar']
      )
    }
  }

  mostrar = []
  filtrarDisponibles(termino: string) {
    const tLimpio = termino.trim()
    console.log(`tLimpio`, tLimpio)
    if (tLimpio) {
      this.mostrar = this.procesos
        .map(x => {
          return x.nombre
            .toLowerCase()
            .concat(' ')
            .concat(x.departamento.nombre.toLowerCase())
            .concat(' ')
            .concat('@@@' + x._id)
        })
        .filter(x => x.includes(termino.toLowerCase()))
        .map(x => x.split('@@@')[1])
    } else {
      this.mostrar = this.procesos.map(x => x._id)
    }
  }
}
