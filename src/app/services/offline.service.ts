import { Injectable } from '@angular/core'
import { ManejoDeMensajesService } from './utilidades/manejo-de-mensajes.service'
import {
  IDBOpciones,
  IDBOpcionesObjectStore,
  IndexedDBService
} from '@codice-progressio/indexed-db'
import { BehaviorSubject, Observable } from 'rxjs'

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
    contactos: 'contactos'
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

export class OfflineBasico {
  tabla: string
  db: IDBDatabase
  urlBase: string = 'offline'
  indice: indexOffline[] = []

  constructor(public offlineService: OfflineService) {
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
