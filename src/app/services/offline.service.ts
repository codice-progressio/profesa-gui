import { Injectable } from '@angular/core'
import { ManejoDeMensajesService } from './utilidades/manejo-de-mensajes.service'
import {
  IDBOpciones,
  IDBOpcionesObjectStore,
  IndexedDBService
} from '@codice-progressio/indexed-db'
import { BehaviorSubject, Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class OfflineService {
  nombreBD = 'IMPERIUMsic'
  baseDeDatos: IDBDatabase

  /**
   * Para no tener problemas de inicializacion tenemos que
   * suscribirnos a este evento y obtener los datos despues de
   * inicializar DB
   */
  db = new BehaviorSubject<IDBDatabase>(null)

  constructor(
    private notiService: ManejoDeMensajesService,
    public idb: IndexedDBService
  ) {
    this.inicializarIndexedDB()
    this.db.subscribe(x => (this.baseDeDatos = x))
  }

  tablas = {
    usuarios: 'usuarios',
    listasDePrecios: 'listas-de-precios',
    skus: 'skus',
    contactos: 'contactos',
    pedidos: 'pedidos'
  }

  inicializarIndexedDB() {
    //Habilita el debugueo.
    this.idb.debug = false

    // Definimos las opciones
    let opciones = new IDBOpciones()
    opciones.nombreBD = this.nombreBD
    // opciones.version esta disponible tambien

    // Creamos las tablas que vamos a necesitar y el
    // keyPath con el cual vamos a registrar cada dato
    let tablas = Object.values(this.tablas).map(
      x => new IDBOpcionesObjectStore({ objectStore: x, keyPath: '_id' })
    )

    this.idb.inicializar(opciones, tablas).subscribe(
      bd => {
        this.db.next(bd)
        this.baseDeDatos = bd
      },
      () => {
        this.notiService.ups(
          'No compatible con IndexedDB',
          'Navegador no compatible'
        )
      }
    )
  }
}

export class OfflineBasico<T> {
  db: IDBDatabase
  urlBase: string = 'offline'
  indice: indexOffline[] = []

  /**
   * Creates an instance of OfflineBasico.
   * @param {OfflineService} offlineService El servicio offlineService
   * @param {HttpClient} http El cliente para hacer la conexión
   * @param {string} base La ruta base que se va a tomar para obtener los datos
   * desde el backend.
   * @param {string} tabla El nombre que se le dara a la tabla en index-db
   * @param {string} key_response
   * @memberof OfflineBasico
   */
  constructor(
    public offlineService: OfflineService,
    private http: HttpClient,
    private base: string,
    private tabla: string,
    private key_response: string
  ) {
    this.offlineService.db.subscribe(x => {
      this.db = x
    })
  }

  /**
   *Carga los datos desde index-db a la memoria, ordenandolos y
   * preparandolos para busqueda.
   *
   * @template T
   * @param {IDBDatabase} db La base de datos en uso.
   * @param {string[]} campos Los campos que se van a indesar. El orden del
   * array se respeta para mejoras en la busqueda.
   * @memberof OfflineBasico
   */
  async generarYCargarIndiceEnMemoria<T>(db: IDBDatabase, campos: string[]) {
    try {
      let limit = await this.offlineService.idb.contarDatosEnTabla(
        this.tabla,
        db
      )

      let resultados = await this.offlineService.idb
        .find<T>(this.tabla, db, { skip: 0, limit })
        .toPromise()

      this.indice = resultados
        .map(resultados => {
          let campo = campos
            .map(x => resultados[x])
            .map(x => x?.trim() ?? x)
            .join(' ')
            .toLowerCase()
          let _id = resultados['_id']
          return { campo, _id }
        })
        .sort((a, b) => (a.campo > b.campo ? 1 : 0))
    } catch (error) {
      console.log(error)
    }
  }

  find<T>(termino: string, limite = 30): Promise<T[]> {
    let PROMESAS = this.indice
      .filter(indice => {
        return !termino.trim()
          ? true
          : indice.campo.includes(termino.toLowerCase())
      })
      .sort((a, b) => (a.campo > b.campo ? 1 : 0))
      .slice(0, limite)
      .map(x => x._id)
      .map(
        x =>
          new Promise<T>((resolve, reject) => {
            this.offlineService.idb
              .findById<T>(this.tabla, this.db, x)
              .subscribe(
                f => resolve(f),
                _ => reject(_)
              )
          })
      )
    return Promise.all(PROMESAS)
  }

  /**
   *Guarda los datos en indexed-db
   *
   * @param {T[]} datos Todos los datos a registrar
   * @return {*}  {Promise<number>}
   * @memberof OfflineBasico
   */
  sincronizarDatos(datos: T[]): Promise<number> {
    return new Promise((resolve, reject) => {
      if (!datos || datos.length === 0) return reject('No se recibieron datos')

      let PROMESAS = datos.map(x =>
        this.offlineService.idb.save<T>(x, this.tabla, this.db).toPromise()
      )

      Promise.all(PROMESAS)
        .then(x => {
          resolve(this.contarDatos())
        })
        .catch(err => reject(err))
    })
  }

  /**
   *Crea la ruta base estandar.
   *
   * @param {string[]} [ruta=[]]
   * @return {*}  {string}
   * @memberof OfflineBasico
   */
  rutaBase(ruta: string[] = []): string {
    let r = this.base.concat('/' + this.urlBase)
    if (ruta.length > 0) r = r.concat('/').concat(ruta.join('/'))
    return r
  }

  /**
   *Se comunica con el backend para obtener los datos a sincronziar con *indexed-db
   *
   * @return {*}  {Observable<T[]>}
   * @memberof OfflineBasico
   */
  obtenerDatos(): Observable<T[]> {
    return this.http.get<T[]>(this.rutaBase(['sincronizar'])).pipe(
      map((resp: any) => {
        console.log(resp)
        return resp[this.key_response] as T[]
      })
    )
  }

  /**
   *Elimina todos los datos de la tabla seleccionada
   *
   * @return {*}  {Observable<any>}
   * @memberof OfflineBasico
   */
  eliminarDatos(): Observable<any> {
    return this.offlineService.idb.deleteAll(this.tabla, this.db)
  }

  /**
   * Retorna el total de datos existentes en la tabla seleccionada
   *
   * @return {*}  {Promise<number>}
   * @memberof OfflineBasico
   */
  contarDatos(): Promise<number> {
    return this.offlineService.idb.contarDatosEnTabla(this.tabla, this.db)
  }
}

export interface Offline<T> {
  rutaBase(): string
  obtenerDatos(): Observable<T[]>
  eliminarDatos(): Observable<any>
  contarDatos(): Promise<number>
  sincronizarDatos(datos: T[]): Promise<number>
}

export interface indexOffline {
  _id: string
  campo: string
}
