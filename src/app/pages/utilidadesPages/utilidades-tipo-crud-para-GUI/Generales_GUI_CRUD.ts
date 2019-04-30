import { CRUD } from "../../../services/crud";
import { PaginadorService } from "src/app/components/paginador/paginador.service";
import { ManejoDeMensajesService } from "src/app/services/service.index";
import { CrearModificar_GUI_CRUD } from "./CrearModificar_GUI_CRUD";

/**
 *Esta clase contiene las operaciones generales de gestion para 
 mostrar, editar, crear y eliminar objetos. Corresponden a un crud
 pero para trabajar con la interfaz grafica. 
 *
 * @export
 * @class Generales_GUI_CRUD
 * @template T_Elemento El tipo de modelo con el que se trabajara
 * @template S_ServicioElemento El servicio que corresponde al elemento. 
 * @template U El componente que extiende de crearModicar_GUI_CRUD. 
 */
export class Generales_GUI_CRUD<
  T_Elemento,
  S_ServicioElemento extends CRUD<T_Elemento, S_ServicioElemento>,
  U extends CrearModificar_GUI_CRUD<T_Elemento, S_ServicioElemento>,
> {
  /**
   * Obtiene la lista de los elementos.
   *
   * @type {T_Elemento []}
   * @memberof Generales_GUI_CRUD
   */
  elementos: T_Elemento[] = null;

  /**
   *Almacena el detalle del tipo correspondiente.
   *
   * @type {T_Elemento}
   * @memberof Generales_GUI_CRUD
   */
  elementoDetalle: T_Elemento = null;

  /**
   *Oculta todos los elementos para mostrar 
   el componente de creacion de elementos. 
   *
   * @type {boolean}
   * @memberof Generales_GUI_CRUD
   */
  crearModificar: boolean = false;

  /**
   *El id del elemento que se va a modificar. 
   Si este elemento esta en null entonces se crea 
   uno nuevo en el componente crear-modificar. 
   * @type {string}
   * @memberof Generales_GUI_CRUD
   */
  idModificar: string = null;

  /**
   *Muestra la lista de objetos. Sirve para la animacion.
   *
   * @type {boolean}
   * @memberof Generales_GUI_CRUD
   */
  mostrarLista: boolean = true;

  /**
   *Muestra el componente crearModificar.
   *
   * @type {boolean}
   * @memberof Generales_GUI_CRUD
   */
  mostrarCrearModificar: boolean = false;

  /**
   *El tiempo que dura en ocultar el componente
   completamente. Se toma del tiempo de la clase
   faster que es de 500 milisegundos. 
   *
   * @type {number}
   * @memberof Generales_GUI_CRUD
   */
  tiempoDeTransicion: number = 500;

  /**
   *Bandera para saber si ya se ha generado un setTimeOut que contiene
   el callback para realizar la busqueda. Actualemten se hace asi por que 
   los callback se generan uno sobre otro y por que tambien esperamos una 
   cierta cantidad de timpo para ejecutar la busqueda. 
   *
   * @type {boolean}
   * @memberof Generales_GUI_CRUD
   */
  busqueda: boolean = false;

  /**
   * El termino que se utilizara para la busqueda. Se carga con un
   * ngModel.
   *
   * @type {string}
   * @memberof Generales_GUI_CRUD
   */
  terminoDeBusqueda: string = "";

  /**
   *El mensaje que se mostrar cuando se elimine un elemento. 
   *
   * @memberof Generales_GUI_CRUD
   */
  mensajeDeEliminacion:string = "Si eliminas este elemento no podras recuperar sus registros y perderas todo su historial. ";


  /**
   *Este callback se utiliza para llamar desde el componente 
   crear la animacion. 
   *
   * @type {*}
   * @memberof Generales_GUI_CRUD
   */
  cbAnimar: any = () => {
    this.animar();
  };

  /**
   *Este callback se tuliza para llamar la carga de elementos desde el componente.
   * @type {*}
   * @memberof Generales_GUI_CRUD
   */
  cbCargarElementos: any = () => {
    this.cargarElementos();
  };

  /**
   *Creates an instance of Generales_GUI_CRUD.
   * @param {S_ServicioElemento} _elementoService El servicio del tipo de elemento que estamos manejando. 
   * @param {PaginadorService} _paginadorService El servicio de paginacion. 
   * @param {ManejoDeMensajesService} _msjService El servicio de mensajes. 
   * @param {boolean} [ejecutarCargaDeElementosAlIniciar=true] La bandera que define si ejecutamos la carga de elementos desde el principio. SI se pone en false
   * es necesario que en el constructor hijo se defina el callback para el paginador service, de otra manera no mandara a llamar nada.
   * @memberof Generales_GUI_CRUD
   */
  constructor(
    public _elementoService: S_ServicioElemento,
    public _paginadorService: PaginadorService,
    public _msjService: ManejoDeMensajesService,
    public ejecutarCargaDeElementosAlIniciar: boolean = true,
   
  ) {
    // this._paginadorService.desde = 0;
    // this._paginadorService.calcular()
    
    //Se puede seleccionar si se omite la carga por defecto de elementos al iniciar. 
    if( this.ejecutarCargaDeElementosAlIniciar ) {
      // Si se omite es necesario definir tambien la accion del paginador. 
      this._paginadorService.callback = () => {
        this.cargarElementos();
      };
      this.cargarElementos();
    }
  }
  
  /**
   *Carga los elementos de la lista para mostrar.
   *
   * @memberof Generales_GUI_CRUD
   */
  cargarElementos() {
    this._elementoService.listarTodo = false;
    this._elementoService.todo(this._paginadorService).subscribe(elementos => {
      this.elementos = elementos;
    });
  }

  /**
   * Interpola los valores necesarios para que se cree
   * la animacion al cambiar entre la lista y el registroModificion.
   *
   * @memberof Generales_GUI_CRUD
   */
  animar() {
    this.crearModificar = !this.crearModificar;
    setTimeout(() => {
      this.mostrarLista = !this.mostrarLista;
      this.mostrarCrearModificar = !this.mostrarCrearModificar;
    }, this.tiempoDeTransicion);
  }

  /**
   *Muestra el componente de detalles.
   *
   * @param {string} id El id del que se cargaran los detalles.
   * @memberof Generales_GUI_CRUD
   * @deprecated Pasa el folio directamente para el detalle. 
   */
  mostrarDetalle(id: string) {
    this.elementoDetalle = null;
    this._elementoService.buscarPorId(id).subscribe(elemento => {
      this.elementoDetalle = elemento;
    });
  }

  /**
   *Edita el elemento.
   *
   * @param {string} id El id que se quiere editar.
   * @param {U} com El componente donde se va a editar.
   * @memberof Generales_GUI_CRUD
   */
  editar(id: string, com: U) {
    this.idModificar = id;
    this.animar();
    com.editar(id);
  }

  /**
   * Crea un nuevo elemento.
   *
   * @memberof Generales_GUI_CRUD
   */
  crear() {
    this.animar();
  }

  /**
   *Este callback es para mandar a llamar crear desde
   el componente general. Si no se hace asi no funciona. 
   *
   * @returns
   * @memberof Generales_GUI_CRUD
   */
  cbCrear( ){
    return ()=>{this.crear()} 
  }

  /**
   *Elimina un elemento.
   *
   * @param {string} id El id del elemento que se quiere eliminar.
   * @memberof Generales_GUI_CRUD
   */
  eliminar(id: string) {
    let msj: string = this.mensajeDeEliminacion;
    this._msjService.confirmacionDeEliminacion(msj, () => {
      this._elementoService.eliminar(id).subscribe(elementoEliminado => {
        this.cargarElementos();
      });
    });
  }

  /**
   *Gestiona las busquedas del elemento definido para la clase.
   *
   * @memberof Generales_GUI_CRUD
   */
  buscar(termino: string ) {
    this.terminoDeBusqueda =  termino;
    // Creamos un nuevo callback.
    if (!this.busqueda) {
      this.busqueda = true;
      setTimeout(() => {
        // Si no hay termino no buscamos.
        if (this.terminoDeBusqueda !== "") {
          this._elementoService
            .buscar(this.terminoDeBusqueda)
            .subscribe(elementos => {
              this.elementos = elementos;
              this.busqueda = false;
            });
        } else {
          this.busqueda = false;
          this.cargarElementos();
        }
      }, 400);
    }
  }

  /**
   *Esta funcion se llama para que retorne un callback 
   que contiene la busqueda. 
   *
   * @returns {*}
   * @memberof Generales_GUI_CRUD
   */
  cbBuscar( ): any{
    return (termino)=>{ this.buscar(termino)} 
  }
}
