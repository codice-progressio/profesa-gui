import { Input, EventEmitter, Output, Directive } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { CRUD } from "src/app/services/crud";
import { FiltrosDeConsultas } from "src/app/services/utilidades/filtrosParaConsultas/FiltrosDeConsultas";
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service';

/**
 * Gestiona las operaciones para la creacion y edicion de los
 * elementos. 
 *
 * @export
 * @class CrearModificar_GUI_CRUD
 * @template T_Elemento El modelo con el que se trabajara.
 * @template S_Servicio El servicio que corresponde al modelo.
 * @template F_FiltrosDeConsultam Este parametro opcional es para permitir que
 * no sea necesario agregar los filtros de consulta obligatoriamente. Por eso lo inicializamos
 * con un valor any.
 */
@Directive()
export class CrearModificar_GUI_CRUD<
  T_Elemento,
  S_Servicio extends CRUD<T_Elemento, S_Servicio, F_FiltrosDeConsulta >,
  F_FiltrosDeConsulta extends FiltrosDeConsultas<S_Servicio> = any

> {
  /**
   *Recive un callback que ejecuta la funcion animar
   desde Generales_GUI_CRUD
   *
   * @type {*}
   * @memberof CrearModificar_GUI_CRUD
   */
  @Input() cbAnimar: any;

  /**
   *Recive un callback que ejecuta la funcion cargarElementos
   desde Generales_GUI_CRUD
   *
   * @type {*}
   * @memberof CrearModificar_GUI_CRUD
   */
  @Input() cbCargarElementos: any;
  /**
   *Recive el id desde Generales_GUI_CRUD
   *
   * @type {*}
   * @memberof CrearModificar_GUI_CRUD
   */
  @Input() idModificar: string;
  /**
   *Recive el parametro crearModifcar desde Generales_GUI_CRUD.
   *
   * @type {*}
   * @memberof CrearModificar_GUI_CRUD
   */
  @Input() crearModificar: boolean;
  /**
   *Recive el parametro mostrarCrearModificar desde Generales_GUI_CRUD.
   *
   * @type {*}
   * @memberof CrearModificar_GUI_CRUD
   */
  @Input() mostrarCrearModificar: boolean;

  /**
   *El formulario para modificar los datos.
   *
   * @type {FormGroup}
   * @memberof CrearModificar_GUI_CRUD
   */
  formulario: FormGroup;

  /**
   *Desactiva el boton mientras que se esta guardando.
   *
   * @type {boolean}
   * @memberof CrearModificar_GUI_CRUD
   */
  desactivarBotonEnGuardado: boolean = false;

  /**
   * El id que que se esta editando.
   *
   * @type {string}
   * @memberof CrearModificar_GUI_CRUD
   */
  private idEditando: string = null;

  /**
   *El callback que almacena la funcion que se ejecutara
   para cargar los datos para editar. 
   *
   * @memberof CrearModificar_GUI_CRUD
   */
  cbDatosParaEditar: (elemento: T_Elemento) => void = null;

  /**
   *El callback que almacena la funcion que se ejecutara
   para crear el formulario. 
   *
   * @memberof CrearModificar_GUI_CRUD
   */
  cbCrearFormulario: () => void = null;

  /**
   *Creates an instance of CrearModificar_GUI_CRUD.
   * @param {S_Servicio} _elementoService El servicio que corresponde al elemento.
   * @param {FormBuilder} formBuilder El formBuilder para construccion del formulario.
   * @param {ValidacionesService} _validacionesService El servicio de validaciones para el formulario.
   * @memberof CrearModificar_GUI_CRUD
   */
  constructor(
    public _elementoService: S_Servicio,
    public formBuilder: FormBuilder,
    public _validacionesService: ValidacionesService
  ) {}

  /**
   *Ejecuta las tareas de configuracion. Debe llamarse 
   desde el contructor de la clase que heredo para que los 
   callback cbDatosParaEditar y cbCrearFormulario se ejecuten
   a posteriori.
   *
   * @memberof CrearModificar_GUI_CRUD
   */
  configurar() {
    this._elementoService.callback_ActivarBoton = () => {
      this.desactivarBotonEnGuardado = false;
    };
    this._elementoService.callback_DesactivarBoton = () => {
      this.desactivarBotonEnGuardado = true;
    };
    this.cbCrearFormulario();
  }

  /**
   *Carga los datos del elemento del que se le pase su Id.
   *
   * @param {string} id El id del elemento a modificar.
   * @memberof CrearModificar_GUI_CRUD
   */
  editar(id: string) {
    this._elementoService.buscarPorId(id).subscribe(elemento => {
      this.idEditando = id;
      this.cbDatosParaEditar(elemento);
    });
  }

  /**
 *Prepara y envia los datos del formulario. 

 * @param {T_Elemento} model El modelo que obtendremos desde el formulario
 * @param {boolean} isValid Comprueba si el formulario es valido. 
 * @param {*} e El evento por default para prevenir el default.
 * @memberof CrearModificar_GUI_CRUD
 */
  onSubmit(model: T_Elemento, isValid: boolean, e) {
    e.preventDefault();

    if (!isValid) return false;
    let call = () => {
      this.cancelar();
      this.cbCargarElementos();
    };

    // Si es una edicion agregamos el id.
    if (this.idEditando) {
      model["_id"] = this.idEditando;
      this._elementoService.modificar(model).subscribe(call);
      return;
    }
    // Guardamos los datos.
    this._elementoService.guardar(model).subscribe(call);
  }



  /**
   *Cancela la modificacion o el guardado.\
   *
   * @memberof CrearModificar_GUI_CRUD
   */
  cancelar() {
    this.cbAnimar();
    this.limpiar();
    this.cbCrearFormulario();
    this.idEditando = null;
    
  }

  /**
   *Limpia los datos despues de cancelar, guardar o modifcar.
   *
   * @memberof CrearModificar_GUI_CRUD
   */
  limpiar() {
    this.formulario.reset();
    this.cbCrearFormulario();
  }
}
