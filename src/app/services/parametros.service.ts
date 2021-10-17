import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import { URL_BASE } from '../config/config'
import { ListaDePrecios } from '../models/listaDePrecios.model'
import { Usuario } from '../models/usuario.model'
import { Offline, OfflineBasico, OfflineService } from './offline.service'

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {
  etiquetas: EtiquetasService
  listasDePrecio: ListaDePrecioService
  sku: SKUService
  contactos: ContactosService
  usuarios: UsuariosService
  base = URL_BASE('parametros')
  offline: ParametrosOfflineService<ParametrosOfflineModel>

  constructor(public http: HttpClient, public offlineService: OfflineService) {
    this.etiquetas = new EtiquetasService(this)
    this.listasDePrecio = new ListaDePrecioService(this)
    this.sku = new SKUService(this)
    this.contactos = new ContactosService(this)
    this.usuarios = new UsuariosService(this)

    this.offline = new ParametrosOfflineService(this, 'no se ocupa la base')
  }

  sincronizarVersionDeDatosOffline() {
    return this.http.get(this.base.concat('/version-offline')).pipe(
      map((res: any) => {
        let version = res.version_offline
        // localStorage.setItem('version_offline', version)
        return version
      })
    )
  }

  leerVersionDeDatosOffline() {
    return localStorage.getItem('version_offline') ?? ''
  }

  reiniciarVersionadoOffline() {
    return this.http.post(this.base.concat('/version-offline-reiniciar'),{})
  }
}

class EtiquetasService {
  constructor(private root: ParametrosService) {}

  base = this.root.base.concat('/etiquetas')

  obtenerTodo() {
    return this.root.http.get<string[]>(this.base.concat())
  }

  eliminar(etiqueta: string) {
    return this.root.http.put<string>(this.base.concat('/eliminar'), {
      etiqueta
    })
  }
}

class ListaDePrecioService {
  base = this.root.base.concat('/lista-de-precios')
  constructor(private root: ParametrosService) {}

  cargar() {
    return this.root.http.get<string>(this.base).pipe(
      map((res: any) => {
        return res.parametros.listaDePreciosDefault
      })
    )
  }

  leerTodoLigero() {
    return this.root.http
      .get<ListaDePrecios[]>(this.base.concat('/ligth'))
      .pipe(map((resp: any) => resp.listasDePrecios))
  }

  guardar(_id: string) {
    return this.root.http.post(this.base, { _id })
  }

  cargarEnLote(datos: any[], nombre: string) {
    return this.root.http.post(this.base.concat('/lote'), { datos, nombre })
  }
}

class SKUService {
  base = this.root.base.concat('/skus')
  constructor(private root: ParametrosService) {}

  cargarEnLote(datos: any[]) {
    return this.root.http.post(this.base, datos)
  }
}
class ContactosService {
  base = this.root.base.concat('/contactos')
  constructor(private root: ParametrosService) {}

  cargarEnLote(datos: any[]) {
    return this.root.http.post(this.base, datos)
  }
}
class UsuariosService {
  base = this.root.base.concat('/usuarios')
  constructor(private root: ParametrosService) {}

  cargarEnLote(datos: any[]) {
    return this.root.http.post(this.base, datos)
  }
}

interface ParametrosOfflineModel {
  //Solo ocupamos un registro
  _id: number
  usuario_registrado: Usuario
}

class ParametrosOfflineService<T>
  extends OfflineBasico<T>
  implements Offline<T>
{
  constructor(private root: ParametrosService, base: string) {
    super(
      root.offlineService,
      root.http,
      base,
      root.offlineService.tablas.parametros,
      'parametros'
    )
  }
}
