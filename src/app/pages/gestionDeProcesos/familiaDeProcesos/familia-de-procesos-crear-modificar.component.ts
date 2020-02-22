import { Component, OnInit } from '@angular/core'
import { FamiliaDeProcesos } from '../../../models/familiaDeProcesos.model'
import { FamiliaDeProcesosService } from '../../../services/proceso/familia-de-procesos.service'
import { Proceso } from '../../../models/proceso.model'
import { CrearModificar_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/CrearModificar_GUI_CRUD'
import {
  FormBuilder,
  Validators,
  FormArray,
  FormGroup,
  AbstractControl
} from '@angular/forms'
import { ProcesoService } from '../../../services/proceso/proceso.service'
import { OrganizadorDragAndDropService } from '../../../components/organizador-drag-and-drop/organizador-drag-and-drop.service'
import { DndObject } from '../../../components/organizador-drag-and-drop/models/dndObject.model'
import { PaginadorService } from '../../../components/paginador/paginador.service'
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service'
import { FormControl } from '@angular/forms'
import { Procesos } from '../../../models/procesos.model'
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop'

@Component({
  selector: 'app-familia-de-procesos-crear-modificar',
  templateUrl: './familia-de-procesos-crear-modificar.component.html',
  styles: []
})
export class FamiliaDeProcesosCrearModificarComponent
  extends CrearModificar_GUI_CRUD<FamiliaDeProcesos, FamiliaDeProcesosService>
  implements OnInit {
  procesos: Proceso[] = null
  procesosAgregados: Proceso[] = null

  constructor(
    public _elementoService: FamiliaDeProcesosService,
    public formBuilder: FormBuilder,
    public _validacionesService: ValidacionesService,
    public _procesosService: ProcesoService,
    public _dndService: OrganizadorDragAndDropService<Proceso>
  ) {
    super(_elementoService, formBuilder, _validacionesService)

    this.cbDatosParaEditar = (elemento: FamiliaDeProcesos) => {
      this.cargarProcesos()
      this.crearFormulario(elemento)
    }

    this.cbCrearFormulario = () => {
      this.crearFormulario()
      this.cargarProcesos()
    }

    this.configurar()
  }

  ngOnInit() {}

  cargarProcesos() {
    this._procesosService.listarTodo = true
    this._procesosService.todo().subscribe(
      procesos =>
        (this.procesos = procesos.map(x => {
          x.maquinas = null
          return x
        }))
    )
  }

  /**
   *Crea el formulario de registro.
   *
   * @memberof MaquinasCrearModificarComponent
   */
  crearFormulario(elemento: FamiliaDeProcesos = new FamiliaDeProcesos()) {
    this.formulario = this.formBuilder.group({
      nombre: [elemento.nombre, [Validators.required]],
      observaciones: [elemento.observaciones, []],
      procesos: new FormArray(
        elemento.procesos.map(x => new FormControl(x)),
        this._validacionesService.minSelectedCheckboxes()
      )
    })

    this.procesosAgregados = elemento.procesos.map(x => x.proceso)
  }

  public get nombre_FB(): AbstractControl {
    return this.formulario.get('nombre')
  }

  public get observaciones_FB(): AbstractControl {
    return this.formulario.get('observaciones')
  }

  public get procesos_FB(): FormArray {
    return <FormArray>this.formulario.get('procesos')
  }

  f(campo): FormArray {
    return <FormArray>this.formulario.get(campo)
  }

  drop(e: CdkDragDrop<Proceso[]>) {
    if (e.container !== e.previousContainer) {
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
        procesos.orden = contador+''
        contador++
        this.f('procesos').push(new FormControl(procesos))
      })
    } else {
      moveItemInArray(e.container.data, e.previousIndex, e.currentIndex)
    }
  }

  quitarProceso(i: number): void {
    this.f('procesos').removeAt(i)
    this.procesosAgregados.splice(i, 1)
  }
}
