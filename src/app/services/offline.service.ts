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

  async generarYCargarIndiceEnMemoria<T>(db: IDBDatabase, campos: string[]) {
    try {
      console.log({ tabla: this.tabla, db })
      let skip = await this.offlineService.idb.contarDatosEnTabla(
        this.tabla,
        db
      )

      let resultados = await this.offlineService.idb
        .find<T>(this.tabla, db, { limit: 0, skip })
        .toPromise()

      console.log(campos, resultados)

      this.indice = resultados.map(resultados => {
        let campo = campos.map(x => resultados[x]).join(' ')
        let _id = resultados['_id']
        return { campo, _id }
      })

      console.log(this.indice)
    } catch (error) {
      console.log(error)
    }
  }

  buscarTermino<T>(termino: string): Promise<T[]> {
    let PROMESAS = this.indice
      .filter(indice => indice.campo.includes(termino))
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
