import { PaginadorService } from "../components/paginador/paginador.service";
import { Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ManejoDeMensajesService, UtilidadesService, PreLoaderService } from "./service.index";
import { map, catchError } from "rxjs/operators";


/**
 * Esta clase provee a los servicios de las operaciones basicas
 * CRUD.
 * 
 * Es necesario definir los datos de @param base y @param nombreDeDatos
 * para que todo funcione de manera correcta. 
 *
 * @export
 * @class CRUD
 * @template T El tipo de modelo que retornaran las operaciones. 
 */
export class CRUD<T>  {

    
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
     * El total de elementos en la base de datos. Este se
     * Se carga de la BD de datos automaticamente y es 
     * gestionando por el paginador service. 
     *
     * @type {number}
     * @memberof CRUD
     */
    total: number;

    
    /**
     * Cuando los datos vienen de la BD se deben de definir
     * dentro del data(que nosostros creamos en la BD) con
     * un nombre que identifique de manera organiga al objeto. 
     * Ejem. Si el schema es color los datos del JSON deben de voler
     * como 'color' si es uno y como 'colores' si son varios. 
     *
     * @memberof CRUD
     */
    nombreDeDatos =  {
        singular:'',
        plural:'',
    }

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
        public _paginadorService: PaginadorService,
    

    ){}

    /**
     *
     * Obtiene todos los elementos (Con sus respectivos limites)
     * @param {number} [desde=0] El numero de registro desde el cual se va a empezar a tomar de la BD.
     * @param {number} [limite=5] La cantidad de elementos a traer para mostrar en el paginador. 
     * @param {PaginadorService} [paginador=null] Un paginador extra por si es necesario tener mas de uno en el mismo componente. 
     * @param {string} [msjLoading=`Cargando ${this.nombreDeDatos.plural}.`] El mensaje que va a mostrar el servicio de carga. 
     * @returns {Observable<T[]>}
     * @memberof CRUD
     */
    todo(desde: number = 0, limite: number = 5, paginador: PaginadorService = null, msjLoading:string=`Cargando ${this.nombreDeDatos.plural}.` ):Observable<T[]>{
        const a: number = this._preLoaderService.loading(msjLoading);
        const url = `${this.base}?desde=${desde}&limite=${limite}`
        return this.http.get(url).pipe(
            map( (resp: any )=> {
                if (paginador) {
                    paginador.activarPaginador(resp.total);
                } else {
                    this.total = resp.total;
                    this._paginadorService.activarPaginador( this.total);
                }
                this._msjService.ok_( resp, null, a)
                return resp[this.nombreDeDatos.plural];
            } ),
            catchError( err =>{
                this._msjService.err( err )
                return throwError( err );
            })
            );
            
        };

    
    /**
     * Modifica el elemento que se le pase como paramentro. 
     * De este dato se toma su id y solo se modifica lo que se
     * necesite pero en el api. Aqui, para facilidad pasamos todo. 
     *
     * @param {T} dato El objeto que se va a modificar. 
     * @param {string} [msjLoading=`Guardando cambios a ${this.nombreDeDatos.singular}.`] El mensaje que va a mostrar el servicio de carga. 
     * @returns {Observable<T[]>}
     * @memberof CRUD
     */
    modificar(dato:T, msjLoading:string=`Guardando cambios a ${this.nombreDeDatos.singular}.` ):Observable<T[]>{
        const a: number = this._preLoaderService.loading(msjLoading);
        return this.http.put(this.base, dato).pipe(
            map( (resp: any )=> {
                this._msjService.ok_( resp, null, a)
                return resp[this.nombreDeDatos.singular];
            } ),
            catchError( err =>{
                this._msjService.err( err )
                return throwError( err );
            })
        );
    }

    
    /**
     * Guarda un elemento nuevo en la BD. 
     *
     * @param {T} dato El objeto que se va a modificar.
     * @param {string} [msjLoading=`Guardando ${this.nombreDeDatos.singular}.`] El mensaje que va a mostrar el servicio de carga.
     * @returns {Observable<T[]>}
     * @memberof CRUD
     */
    guardar(dato:T, msjLoading:string=`Guardando ${this.nombreDeDatos.singular}.` ):Observable<T[]>{
        const a: number = this._preLoaderService.loading(msjLoading);
        return this.http.post(this.base, dato).pipe(
            map( (resp: any )=> {
                this._msjService.ok_( resp, null, a)
                return resp[this.nombreDeDatos.singular];
            } ),
            catchError( err =>{
                this._msjService.err( err )
                return throwError( err );
            })
            );
        }
    
   
    /**
     * Elimina el dato que corresponda al id que se pase como parametro. 
     *
     * @param {string} id El id del objeto que se quiere eliminar. 
     * @param {string} [msjLoading=`Guardando ${this.nombreDeDatos.singular}.`] El mensaje que va a mostrar el servicio de carga.
     * @returns {Observable<T[]>}
     * @memberof CRUD
     */
    eliminar(id:string, msjLoading:string=`Guardando ${this.nombreDeDatos.singular}.` ):Observable<T[]>{
        const a: number = this._preLoaderService.loading(msjLoading);
        return this.http.delete(this.base+'/'+id).pipe(
            map( (resp: any )=> {
                this._msjService.ok_( resp, null, a)
                return resp[this.nombreDeDatos.singular];
            } ),
            catchError( err =>{
                this._msjService.err( err )
                return throwError( err );
            })
            );
    }


    /**
     * Busca un dato por su id. 
     *
     * @param {string} id El id del objeto que se quiere buscar. 
     * @param {string} [msjLoading=`Buscando ${this.nombreDeDatos.singular}`] El mensaje que va a mostrar el servicio de carga.
     * @returns {Observable<T>}
     * @memberof CRUD
     */
    buscarPorId(id: string, msjLoading:string=`Buscando ${this.nombreDeDatos.singular}`):Observable<T>{
        const a: number = this._preLoaderService.loading(msjLoading);
        return this.http.get(this.base+`/buscar`).pipe(
            map( (resp: any )=> {
                this._msjService.ok_( resp, null, a)
                return resp[this.nombreDeDatos.singular];
            } ),
            catchError( err =>{
                this._msjService.err( err )
                return throwError( err );
            })
            );
    }


    /**
     * Busca una serie de datos en base al termino que se le pase como parametro.
     *
     * @param {string} termino El termino que se va a buscar. 
     * @param {string} [msjLoading=`Buscando ${this.nombreDeDatos.plural}`]  El mensaje que va a mostrar el servicio de carga.
     * @returns {Observable<T[]>}
     * @memberof CRUD
     */
    buscar(termino: string, msjLoading:string=`Buscando ${this.nombreDeDatos.plural}`):Observable<T[]>{
        const a: number = this._preLoaderService.loading(msjLoading);
        return this.http.get(this.base+'/'+termino).pipe(
            map( (resp: any )=> {
                this._msjService.ok_( resp, null, a)
                return resp[this.nombreDeDatos.plural];
            } ),
            catchError( err =>{
                this._msjService.err( err )
                return throwError( err );
            })
        );
    }
    
        
}


