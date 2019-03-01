import { Component, OnInit } from "@angular/core";
import { FamiliaDeProcesos } from "../../../models/familiaDeProcesos.model";
import { FamiliaDeProcesosService } from "../../../services/proceso/familia-de-procesos.service";
import { Proceso } from "../../../models/proceso.model";
import { CrearModificar_GUI_CRUD } from "../../utilidadesPages/utilidades-tipo-crud-para-GUI/CrearModificar_GUI_CRUD";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormGroup,
  AbstractControl
} from "@angular/forms";
import {
  ValidacionesService,
  DepartamentoService
} from "src/app/services/service.index";
import { ProcesoService } from "../../../services/proceso/proceso.service";
import { OrganizadorDragAndDropService } from "../../../components/organizador-drag-and-drop/organizador-drag-and-drop.service";
import { DndObject } from "../../../components/organizador-drag-and-drop/models/dndObject.model";
import { PaginadorService } from "../../../components/paginador/paginador.service";

@Component({
  selector: "app-familia-de-procesos-crear-modificar",
  templateUrl: "./familia-de-procesos-crear-modificar.component.html",
  styles: []
})
export class FamiliaDeProcesosCrearModificarComponent
  extends CrearModificar_GUI_CRUD<FamiliaDeProcesos, FamiliaDeProcesosService>
  implements OnInit {
  procesos: Proceso[] = null;

  constructor(
    public _elementoService: FamiliaDeProcesosService,
    public formBuilder: FormBuilder,
    public _validacionesService: ValidacionesService,
    public _procesosService: ProcesoService,
    public _dndService: OrganizadorDragAndDropService<Proceso>
  ) {
    super(_elementoService, formBuilder, _validacionesService);

    this.cbDatosParaEditar = (elemento: FamiliaDeProcesos) => {
      this.cargarDatosParaEditar(elemento);
      this.crearListasdnd(elemento);
      this.cargarProcesos();
    };

    this.cbCrearFormulario = () => {
      this.crearFormulario();
      this.crearListasdnd();
      this.cargarProcesos();
    };

    this.configurar();
  }

  ngOnInit() {}

  cargarProcesos() {
    this._procesosService.listarTodo = true;
    this._procesosService.todo().subscribe(procesos => {
      this.procesos = procesos;
      this.cargarListaDeObjetos_dnd();
    });
  }

  cargarDatosParaEditar(elemento: FamiliaDeProcesos) {
    this.nombre_FB.setValue(elemento.nombre);

    elemento.procesos.forEach(d => {
      this.agregarElemento(d.orden, d.proceso);
    });

    this.observaciones_FB.setValue(elemento.observaciones);
  }

  /**
   *Crea el formulario de registro.
   *
   * @memberof MaquinasCrearModificarComponent
   */
  crearFormulario() {
    this.formulario = this.formBuilder.group({
      nombre: ["", [Validators.required]],
      // soloParaProductoTerminado: [false, [
      //   Validators.required
      // ]],

      observaciones: ["", []],

      procesos: new FormArray(
        [],
        this._validacionesService.minSelectedCheckboxes()
      )
    });
  }

  public get nombre_FB(): AbstractControl {
    return this.formulario.get("nombre");
  }

  public get observaciones_FB(): AbstractControl {
    return this.formulario.get("observaciones");
  }

  public get procesos_FB(): FormArray {
    return <FormArray>this.formulario.get("procesos");
  }

  /**
   *Crea la lista ordenable y la lista de procesos dnd.
   *
   * @memberof FamiliaDeProcesosCrearModificarComponent
   */
  crearListasdnd(familia: FamiliaDeProcesos = null) {
    this._dndService.limpiar();
    this._dndService.limpiarListaDeElementos();

    let dndOBjecto: DndObject<Proceso> = this._dndService
      .nuevaArea("procesos")
      .setPadre()
      .setLeyenda("Familia de procesos")
      .setLeyendaOptativa("")
      .setEliminable(false)
      .setOrden("0");

    this._dndService.leyendaListaSeleccionable =
      "Arrastra procesos de la lista para agregarlos.";
    if (familia) {
      familia.procesos.forEach(procesos => {
        dndOBjecto.dnd.hijos
          .addOrdenable()
          .setEliminable(true)
          .setLeyenda(procesos.proceso.nombre)
          .setLeyendaOptativa(procesos.proceso.departamento.nombre)
          .setOrden(procesos.orden)
          .setObjeto(procesos.proceso);
      });
      this._dndService.actualizarPropiedadOrden();
      this.actualizarIds(true);
    }
  }

  /**
   *Crea la lista de procesos que se pueden arrastrar para selccionar.
   *
   * @memberof FamiliaDeProcesosCrearModificarComponent
   */
  cargarListaDeObjetos_dnd() {
    this._procesosService.listarTodo = true;
    this._dndService.limpiarListaDeElementos();
    this.procesos.forEach(proceso => {
      let dnd: DndObject<Proceso> = new DndObject();
      dnd.setEliminable(true);
      dnd.setLeyenda(proceso.nombre);
      dnd.setLeyendaOptativa(proceso.departamento.nombre);
      dnd.setObjeto(proceso);
      this._dndService.listaDeElementos.push(dnd);
    });
  }

  /**
   *Crea y agrega un nuevo formGroup al control departamentos_FB
   *
   * @param {string} id El id del departamento que se va a gregar.
   * @memberof MaquinasCrearModificarComponent
   */
  agregarElemento(orden: string, proceso: Proceso) {
    let a: FormGroup = this.crearNuevoFormGroupElemento();
    a.controls["orden"].setValue(orden);
    a.controls["proceso"].setValue(proceso);
    this.procesos_FB.push(a);
  }

  /**
   *Retorna un nuevo grupo para agregar un id.
   *
   * @returns {FormGroup}
   * @memberof MaquinasCrearModificarComponent
   */
  crearNuevoFormGroupElemento(): FormGroup {
    return this.formBuilder.group({
      orden: [""],
      proceso: [""]
    });
  }

  /**
   *Elimina los elementos dentro del formArray de manera
   recursiva. No se puede hacer de otra manera sin que pierda
   la relacion. 
   *
   * @memberof FamiliaDeProcesosCrearModificarComponent
   */
  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  };

  ejecutarActualizadonIds: boolean = true;

  /**
   *Actualiza la lista de objetos id. Se ejecuta con el emiter.
   *
   * @param {boolean} valor
   * @memberof FamiliaDeProcesosCrearModificarComponent
   */
  actualizarIds(valor: boolean) {
    if (this.ejecutarActualizadonIds) {
      this.ejecutarActualizadonIds = false;
      setTimeout(() => {
        this.clearFormArray(this.procesos_FB);

        this._dndService.obtenerHijosOrdenables().forEach(dndProceso => {
          this.agregarElemento(dndProceso.orden, dndProceso.objeto);
        });
        this.ejecutarActualizadonIds = true ;

      }, 400);
    }
  }
}
