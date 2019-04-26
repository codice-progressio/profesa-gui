import { PaginadorService } from "../components/paginador/paginador.service";
import { Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {
  ManejoDeMensajesService,
  UtilidadesService,
  PreLoaderService
} from "./service.index";
import { map, catchError } from "rxjs/operators";
import { FiltrosDeConsultas } from "./utilidades/filtrosParaConsultas/FiltrosDeConsultas";
import { Type } from "@angular/compiler";

/**
 * Esta clase provee a los servicios de las operaciones basicas
 * CRUD.
 *
 * Es necesario definir los datos de @param base y @param nombreDeDatos
 * para que todo funcione de manera correcta.
 *
 * @export
 * @class CRUD
 * @template T_TipoDeModelo El tipo de modelo que retornaran las operaciones.
 * @template S_Servicio El servicio que se esta gestionando.
 * @template A El filtro que corresponde para el servicio. (Los filtros)
 */
export class CRUD<
  T_TipoDeModelo,
  S_Servicio = any,
  A extends FiltrosDeConsultas<S_Servicio> = any
> {
  filtrosDelFolio: A;
  servicio: S_Servicio;

  /**
   * Obtiene los filtros segun el tipo que se le pase.
   * @template A
   * @param {A} type
   * @returns {A}
   * @memberof CRUD
   */
  filtros(type: A): A {
    this.filtrosDelFolio = type;
    return type;
  }

  /**
   * La url base a donde se hara la peticion.
   * Ejemplo:
   *
   *      this.base = '${URL_SERVICIOS}/color';
   *
   * @type {string}
   * @memberof CRUD
   */
  base: string;

  /**
     *Si esta propiedad se pone en true
     se ignora el limite y desde del paginador 
     y se establecen en 0 y 100000 respectivamente.
     *
     * @type {boolean}
     * @memberof CRUD
     */
  listarTodo: boolean = false;

  /**
   * Esta url se utiliza para definirla ruta de busqueda cuando es diferente.
   * No es necesario concatenarle la urlBase. Ejempo: [/busqueda]
   *
   * @type {string}
   * @memberof CRUD
   */
  urlBusqueda: string = "/buscar";

  /**
   * El total de elementos en la base de datos. Este se
   * Se carga de la BD de datos automaticamente y es
   * gestionando por el paginador service.
   *
   * @type {number}
   * @memberof CRUD
   */
  total: number;

  /**
   *Desactiva un boton mientras se realiza una accion de guardado o modificacion.
   *
   * @type {*}
   * @memberof CRUD
   */
  callback_DesactivarBoton: any = null;
  /**
   *
   *Activa un boton mientras se realiza una accion de guardado o modificacion.
   *
   * @type {*}
   * @memberof CRUD
   */
  callback_ActivarBoton: any = null;

  /**
   * Cuando los datos vienen de la BD se deben de definir
   * dentro del data(que nosostros creamos en la BD) con
   * un nombre que identifique de manera organiga al objeto.
   * Ejem. Si el schema es color los datos del JSON deben de voler
   * como 'color' si es uno y como 'colores' si son varios.
   *
   * @memberof CRUD
   */
  nombreDeDatos = {
    singular: "",
    plural: ""
  };

  /**
   *Creates an instance of CRUD.
   * @param {HttpClient} http Para hacer la peticion a la API.
   * @param {ManejoDeMensajesService} _msjService Los mensajes que se van a mostrar.
   * @param {UtilidadesService} _utiliadesService Utilidades varioas que estan disponibles.
   * @param {PreLoaderService} _preLoaderService El preloader para todas las operaciones.
   * @param {PaginadorService} _paginadorService El servicio de paginacion que se encaraga de que los datos no se carguen todos de un solo jalon.
   * @memberof CRUD
   */
  constructor(
    public http: HttpClient,
    public _msjService: ManejoDeMensajesService,
    public _utiliadesService: UtilidadesService,
    public _preLoaderService: PreLoaderService,
    public _paginadorService: PaginadorService
  ) {}

  /**
   *
   * Obtiene todos los elementos (Con sus respectivos limites)
   *
   * @param {PaginadorService} [paginador=null]  Un paginador extra por si es necesario tener mas de uno en el mismo componente.
   * @param {string} [msjLoading=`Cargando ${this.nombreDeDatos.plural}.`] El mensaje que va a mostrar el servicio de carga.
   * @param {boolean} [sort=true] Define la forma de4 ordenarse. True (por defecto) ordena ascendentemente y salse descendente.
   * @param {string} [campo=null] El campo de ordenamiento. Si esta null la BD escoge el campo.
   * @param {string} [urlAlternativa=null] Recive una nueva seccion para agregar a la EJEMPLO: Urlbase[/urlAlternativa]?parametros=
   * @param {string} [filtros=null] La cadena de filtros en un objeto. Si se define este paramentro
   * es necesario que tambien se definan dentro de ellos el limite, desde, sort y campo para
   * la paginacion. Esto tambien debe incluir el paginador que se quiere utilizar.
   * @returns {Observable<T_TipoDeModelo[]>}
   * @memberof CRUD
   * @deprecated Esta funcion hay que dejar de usarla. Ahora hay que usar la funcion getAll()
   */
  todo(
    paginador: PaginadorService = null,
    msjLoading: string = `Cargando ${this.nombreDeDatos.plural}.`,
    sort: boolean = true,
    campo: string = null,
    urlAlternativa: string = null,
    noAfectarServicioDePaginados: boolean = false,
    filtros: { [key: string]: string } = null
  ): Observable<T_TipoDeModelo[]> {
    // Valores de la url
    let url = this.base + (urlAlternativa ? urlAlternativa : "") + "?";

    // Seleccionamos un paginador, si externo o el por defecto.
    let paginadorAUsar: PaginadorService = null;

    if (!this.listarTodo) {
      paginadorAUsar = paginador ? paginador : this._paginadorService;
    }

    const a: number = this._preLoaderService.loading(msjLoading);

    if (!filtros) {
      // Los valores para el paginador.
      if (this.listarTodo) {
        url += `desde=0&limite=100000`;
      } else {
        url += `desde=${paginadorAUsar.desde}&limite=${paginadorAUsar.limite}`;
      }

      // Valores para el ordenamiento.
      url += `&sort=${sort ? 1 : -1}`;
      url += campo ? `&campo=${campo}` : "";
    } else {
      url += `${this.concatenerFiltros(filtros)}`;
    }

    return this.http.get(url).pipe(
      map((resp: any) => {
        this.total = resp.total;
        if (!this.listarTodo) {
          paginadorAUsar.activarPaginador(this.total);
        }
        this._msjService.ok_(resp, null, a);
        return resp[this.nombreDeDatos.plural];
      }),
      catchError(err => {
        this._msjService.err(err);
        return throwError(err);
      })
    );
  }

  /**
   *
   * Obtiene todos los elementos. Todos los limites se definen directamente en la funcion.
   *
   * Para la nueva aplicacion de este procedimiento es necesario que se le pase como paramentro el
   * paginador que se va a estar trabajando. Cuando se llame a este metodo con el subscribe se tienen
   * que agregar las siguientes lineas:
   *
   *
   *      this._paginadorService.activar( this._elServicio.total )
   *
   * @param {string} [msjLoading=`Cargando ${this.nombreDeDatos.plural}.`] El mensaje que va a mostrar el servicio de carga.
   * @param {string} [urlAlternativa=null] Recive una nueva seccion para agregar a la EJEMPLO: Urlbase[/urlAlternativa]?parametros=
   * @param {string} [filtros=null] La cadena de filtros en un objeto. Si se define este paramentro
   * es necesario que tambien se definan dentro de ellos el limite, desde, sort y campo para
   * la paginacion. Esto tambien debe incluir el paginador que se quiere utilizar.
   * @returns {Observable<T_TipoDeModelo[]>}
   * @memberof CRUD
   */
  getAll(
    msjLoading: string = `Cargando ${this.nombreDeDatos.plural}.`,
    urlAlternativa: string = null,
    filtros: { [key: string]: string },
    type: { new (): T_TipoDeModelo }
  ): Observable<T_TipoDeModelo[]> {
    const a: number = this._preLoaderService.loading(msjLoading);

    // Valores de la url
    let url = this.base + (urlAlternativa ? urlAlternativa : "") + "?";
    url += `${this.concatenerFiltros(filtros)}`;
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.total = resp.total;
        this._msjService.ok_(resp, null, a);
        return resp[this.nombreDeDatos.plural].map(dato => {
          let a: T_TipoDeModelo = new type();
          console.log( 'aqui va 1')
          return a["deserialize"](dato);
        });
      }),
      catchError(err => {
        this._msjService.err(err);
        return throwError(err);
      })
    );
  }

  /**
   * Modifica el elemento que se le pase como paramentro.
   * De este dato se toma su id y solo se modifica lo que se
   * necesite pero en el api. Aqui, para facilidad pasamos todo.
   *
   * @param {T_TipoDeModelo} dato El objeto que se va a modificar.
   * @param {string} [msjLoading=`Guardando cambios a ${this.nombreDeDatos.singular}.`] El mensaje que va a mostrar el servicio de carga.
   * @returns {Observable<T_TipoDeModelo[]>}
   * @memberof CRUD
   */
  modificar(
    dato: T_TipoDeModelo,
    msjLoading: string = `Guardando cambios a ${this.nombreDeDatos.singular}.`
  ): Observable<T_TipoDeModelo[]> {
    const a: number = this._preLoaderService.loading(msjLoading);
    return this.http.put(this.base, dato).pipe(
      map((resp: any) => {
        this._msjService.ok_(resp, null, a);
        return resp[this.nombreDeDatos.singular];
      }),
      catchError(err => {
        this._msjService.err(err);
        return throwError(err);
      })
    );
  }

  /**
   * Guarda un elemento nuevo en la BD.
   *
   * @param {T_TipoDeModelo} dato El objeto que se va a modificar.
   * @param {string} [msjLoading=`Guardando ${this.nombreDeDatos.singular}.`] El mensaje que va a mostrar el servicio de carga.
   * @returns {Observable<T_TipoDeModelo>}
   * @memberof CRUD
   */
  guardar(
    dato: T_TipoDeModelo,
    msjLoading: string = `Guardando ${this.nombreDeDatos.singular}.`
  ): Observable<T_TipoDeModelo> {
    // Desactivamos el boton que pasamos atravez del callback.
    this.ejecutarCallbackDesactivar();
    const a: number = this._preLoaderService.loading(msjLoading);
    return this.http.post(this.base, dato).pipe(
      map((resp: any) => {
        this._msjService.ok_(resp, null, a);
        this.ejecutarCallbackActivar();
        return resp[this.nombreDeDatos.singular];
      }),
      catchError(err => {
        this.ejecutarCallbackActivar();
        this._msjService.err(err);
        return throwError(err);
      })
    );
  }

  /**
   *Comprueba el callbackDesactivar que no sea nulo y lo ejecuta.
   *
   * @private
   * @memberof CRUD
   */
  private ejecutarCallbackDesactivar() {
    if (this.callback_DesactivarBoton) this.callback_DesactivarBoton();
  }

  /**
   *Comprueba el callbackActivarque no sea nulo y lo ejecuta.
   *
   * @private
   * @memberof CRUD
   */
  private ejecutarCallbackActivar() {
    if (this.callback_ActivarBoton) this.callback_ActivarBoton();
  }

  /**
   * Elimina el dato que corresponda al id que se pase como parametro.
   *
   * @param {string} id El id del objeto que se quiere eliminar.
   * @param {string} [msjLoading=`Guardando ${this.nombreDeDatos.singular}.`] El mensaje que va a mostrar el servicio de carga.
   * @returns {Observable<T_TipoDeModelo>}
   * @memberof CRUD
   */
  eliminar(
    id: string,
    msjLoading: string = `Eliminando ${this.nombreDeDatos.singular}.`
  ): Observable<T_TipoDeModelo> {
    const a: number = this._preLoaderService.loading(msjLoading);
    return this.http.delete(this.base + "/" + id).pipe(
      map((resp: any) => {
        this._msjService.ok_(resp, null, a);
        return resp[this.nombreDeDatos.singular];
      }),
      catchError(err => {
        this._msjService.err(err);
        return throwError(err);
      })
    );
  }

  /**
   * Busca un dato por su id.
   *
   * @param {string} id El id del objeto que se quiere buscar.
   * @param {string} [urlAlternativa=''] La url alternativa para la busqueda.
   * @param {string} [msjLoading=`Buscando ${this.nombreDeDatos.singular}`] El mensaje que va a mostrar el servicio de carga.
   * @returns {Observable<T_TipoDeModelo>}
   * @memberof CRUD
   */
  buscarPorId(
    id: string,
    urlAlternativa: string = "",
    msjLoading: string = `Buscando ${this.nombreDeDatos.singular}`
  ): Observable<T_TipoDeModelo> {
    const a: number = this._preLoaderService.loading(msjLoading);
    return this.http.get(this.base + urlAlternativa + `/${id}`).pipe(
      map((resp: any) => {
        this._msjService.ok_(resp, null, a);
        return resp[this.nombreDeDatos.singular];
      }),
      catchError(err => {
        this._msjService.err(err);
        return throwError(err);
      })
    );
  }

  /**
   * Busca una serie de datos en base al termino que se le pase como parametro.
   * Es necesario definir la url de busqueda para que este metodo
   * genere una url de esta manera.
   *
   * [urlBase/][urlAlternativa/][urlBusqueda/][termino]
   *
   * @param {string} termino El termino que se va a buscar.
   * @param {string} [urlAlternativa=''] La url alternativa para la busqueda.
   * @param {string} [msjLoading=`Buscando ${this.nombreDeDatos.plural}`]  El mensaje que va a mostrar el servicio de carga.
   * @param {string} [urlAlternativa='']
   * @returns {Observable<T_TipoDeModelo[]>}
   * @memberof CRUD
   */
  buscar(
    termino: string,
    urlAlternativa: string = "",
    msjLoading: string = `Buscando ${this.nombreDeDatos.plural}`
  ): Observable<T_TipoDeModelo[]> {
    const a: number = this._preLoaderService.loading(msjLoading);
    return this.http
      .get(this.base + urlAlternativa + this.urlBusqueda + "/" + termino)
      .pipe(
        map((resp: any) => {
          this._msjService.ok_(resp, null, a);
          this.total = resp.total;
          return resp[this.nombreDeDatos.plural];
        }),
        catchError(err => {
          this._msjService.err(err);
          return throwError(err);
        })
      );
  }

  /**
   *Concatena los filtros con el par campo:Valor 
   es un string tipo &campo=valor....&n=vn
   *
   * @private
   * @param {{[string:string]:string}} filtros
   * @returns {string}
   * @memberof FolioNewService
   */
  private concatenerFiltros(filtros: { [string: string]: string }): string {
    let a: string = "";
    a = Object.keys(filtros)
      .map(key => {
        return `${key}=${filtros[key]}`;
      })
      .join("&");
    return a;
  }
}
