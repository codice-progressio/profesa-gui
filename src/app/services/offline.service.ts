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
  constructor(public offlineService: OfflineService) {
    this.offlineService.db.subscribe(x => {
      this.db = x
    })
  }
}

export interface Offline<T> {
  rutaBase(): string
  obtenerDatos(): Observable<T[]>
  eliminarDatos(): Observable<any>
  contarDatos(): Promise<number>
  sincronizarDatos(datos: T[]): Promise<number>
}
