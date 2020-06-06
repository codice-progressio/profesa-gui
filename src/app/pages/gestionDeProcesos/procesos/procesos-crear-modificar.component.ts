import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { CrearModificar_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/CrearModificar_GUI_CRUD'
import { Maquina } from 'src/app/models/maquina.model'
import { Proceso } from 'src/app/models/proceso.model'
import { ProcesoService } from '../../../services/proceso/proceso.service'
import {
  FormBuilder,
  Validators,
  FormArray,
  FormGroup,
  AbstractControl,
  Form
} from '@angular/forms'
import { Departamento } from '../../../models/departamento.models'
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service'
import { DepartamentoService } from 'src/app/services/departamento/departamento.service'
import { MaquinaService } from 'src/app/services/maquina/maquina.service'
import { FormControl } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop'

import { Location } from '@angular/common'
import { forkJoin } from 'rxjs'
import { Paginacion } from '../../../utils/paginacion.util'

@Component({
  selector: 'app-procesos-crear-modificar',
  templateUrl: './procesos-crear-modificar.component.html',
  styleUrls: ['./procesos-crear-modificar.component.css']
})
export class ProcesosCrearModificarComponent implements OnInit {
  departamentos: Departamento[] = []
  maquinas: Maquina[] = []
  formulario: FormGroup
  proceso: Proceso
  maquinasSeleccionadas: Maquina[] = []
  object = Object.keys

  cargando = {}

  constructor(
    private fb: FormBuilder,
    private maquinaService: MaquinaService,
    private departamentoService: DepartamentoService,
    public vs: ValidacionesService,
    private procesoService: ProcesoService,
    private activatedRouter: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.cargando['ngOnInit'] = 'Cargando datos'

    forkJoin([
      this.maquinaService.todoAbstracto(0, 500, Maquina),
      this.departamentoService.findAll(new Paginacion(100,0,1,'nombre'))
    ]).subscribe(
      datos => {
        delete this.cargando['ngOnInit']

        this.maquinas = datos[0]
        this.departamentos = datos[1]

        const id = this.activatedRouter.snapshot.paramMap.get('id')

        if (id) {
          this.cargando['id'] = 'Cargando departamento para modificacion'
          this.procesoService.findById(id).subscribe(
            proceso => {
              this.proceso = proceso
              this.crearFormulario(proceso)
              delete this.cargando['id']
            },
            err => this.location.back()
          )
        } else {
          this.crearFormulario()
        }
      },
      err => {
        {
          delete this.cargando['ngOnInit']
        }
      }
    )
  }

  f(c): AbstractControl {
    return this.formulario.get(c)
  }

  fa(c): FormArray {
    return this.formulario.get(c) as FormArray
  }

  crearFormulario(proceso: Proceso = new Proceso()) {
    this.proceso = proceso

    this.maquinasSeleccionadas = this.proceso.maquinas

    const ids = this.maquinasSeleccionadas.map(x => x._id)
    this.maquinas = this.maquinas.filter(x => !ids.includes(x._id))
    this.formulario = this.fb.group({
      nombre: [proceso.nombre, [Validators.required, Validators.minLength]],
      departamento: [proceso.departamento?._id, [Validators.required]],
      observaciones: [proceso.observaciones, []],
      maquinas: this.fb.array(proceso.maquinas.map(x => new FormControl(x))),
      requiereProduccion: [proceso.requiereProduccion, []]
    })
  }

  submit(model: Proceso, invalid: boolean, e) {
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()

    if (invalid) {
      e.stopPropagation()
      e.preventDefault()
      return
    }

    this.cargando['submit'] = 'Guardando....'

    const fin = () => delete this.cargando['submit']
    const cbGuardado = () => {
      if (!this.proceso._id) {
        this.limpiarFiltro()
        this.crearFormulario()
        this.maquinasSeleccionadas = []
      } else {
        this.location.back()
      }

      fin()
    }

    if (!this.proceso._id) {
      this.procesoService.save(model).subscribe(cbGuardado, fin)
    } else {
      model._id = this.proceso._id
      this.procesoService.update(model).subscribe(cbGuardado, fin)
    }
  }

  cancelar() {
    this.location.back()
  }

  mostrar: string[] = []
  filtroActivo = false

  filtrar(termino: string) {
    if (!termino.trim()) {
      this.limpiarFiltro()
      return
    }
    this.filtroActivo = true
    this.mostrar = this.maquinas
      .filter(x => {
        return (
          x.clave.toLowerCase().includes(termino) ||
          x.nombre.toLowerCase().includes(termino)
        )
      })
      .map(x => x._id)
  }

  limpiarFiltro() {
    this.mostrar = []
    this.filtroActivo = false
  }

  drop(e: CdkDragDrop<Maquina[]>) {
    if (e.previousContainer.data === e.container.data) {
      moveItemInArray(e.container.data, e.previousIndex, e.currentIndex)
    } else {
      transferArrayItem(
        e.previousContainer.data,
        e.container.data,
        e.previousIndex,
        e.currentIndex
      )
    }

    this.fa('maquinas').clear()

    Array.from(
      new Set(this.maquinasSeleccionadas.map(x => new FormControl(x)))
    ).forEach(x => this.fa('maquinas').push(x))
  }

  cargado(): boolean {
    return Object.keys(this.cargando).length === 0
  }
}
