import { Injectable } from '@angular/core'
import { Usuario } from '../../models/usuario.model'
import { HttpClient } from '@angular/common/http'
import { map, catchError } from 'rxjs/operators'
import { Router } from '@angular/router'
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service'
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service'
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service'
import { Observable, throwError } from 'rxjs'
import permisosKeysConfig from 'src/app/config/permisosKeys.config'
import { Imagen } from '../../models/Imagen'
import { Offline, OfflineBasico, OfflineService } from '../offline.service'
import { ParametrosService } from '../parametros.service'
import { EnvService } from '../env.service'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  /**
   *El usuario que esta actualmente logueado.
   *
   * @type {Usuario}
   * @memberof UsuarioService
   */
  private _usuario: Usuario
  public get usuario(): Usuario {
    let usuario = JSON.parse(localStorage.getItem('usuario'))
    return usuario
  }
  public set usuario(value: Usuario) {
    this._usuario = value
  }
  // Cuando se recarga la página la tratamos de leer (en el login)
  // y si no la inicializamos (cargando del storage) va a dar error.
  token: string

  // roles: Roles;

  menu: any[] = []

  apiVersion: string
  base = ''
  total = 0

  poolLight: UsuarioLight[] = []
  cargandoPool = false
  offline: UsuarioOfflineService<Usuario>

  constructor(
    private envService: EnvService,
    // Para que este funcione hay que hacer un "imports"
    // en service.module.ts
    public parametrosService: ParametrosService,
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService,
    public msjService: ManejoDeMensajesService,
    public _preLoaderService: PreLoaderService,
    public offlineService: OfflineService
  ) {
    this.cargarStorage()
    this.base = this.envService.URL_BASE('usuario')
    this.offline = new UsuarioOfflineService(this, this.base)
  }

  confirmarUsuario(codigo: string) {
    return this.http.get(this.base.concat(`/confirmar?codigo=${codigo}`))
  }

  crearAdmin(nombre: string, password: string, email) {
    let url = this.base.concat('/crear-administrador')
    return this.http.post(url, { nombre, password, email })
  }

  generarLinkRecuperarContrasena(email: string) {
    let url = this.base.concat(
      `/generar-link-recuperar-password?email=${email}`
    )
    return this.http.get(url)
  }

  cambiarContrasena(password: string, codigo: string) {
    let url = this.base.concat('/recuperar-password-email')
    return this.http.post(url, { password, codigo })
  }

  errFun(err) {
    this.msjService.err(err)
    return throwError(err)
  }

  login(email: string, password: string, recordar: boolean = false) {
    // Recordamos el email guardandolo en el localStorage. Esto
    // se activa con el input de "Recuerdame" que esta en la
    // pagina del login.
    if (recordar) {
      localStorage.setItem('email', email)
    } else {
      localStorage.removeItem('email')
    }
    const url = this.envService.URL_SERVICIOS + '/usuario/login'

    return this.http.post(url, { email, password }).pipe(
      // Guardamos la información en el local storage para que quede
      // disponible si el usuario cierra el navegador.
      map((resp: any) => {
        if (resp?.mensaje) {
          this.msjService.toast.error(resp.mensaje)
        }

        this.guardarStorage(resp.token)

        if (this.usuario.inhabilitado) {
          let msj =
            'El usuario esta inactivo. Si es un error reportalo con el administrador'
          this.msjService.toastErrorMensaje(msj)
          throw msj
        }
        return resp
      })
    )
  }

  obtenerMenus() {
    let url = this.envService.URL_SERVICIOS.concat('/login/obtener-menus')
    return this.http.get(url).pipe(
      map((r: any) => {
        localStorage.setItem('menu', JSON.stringify(r.menu))
        this.menu = r.menu
        return r
      })
    )
  }

  cargarPermisos() {
    const url = this.base.concat('/info/permisos-existentes')
    return this.http.get<any>(url).pipe(map(x => x.permisos))
  }

  logout() {
    this.usuario = null
    this.token = ''
    this.menu = [null]
    localStorage.removeItem('usuario')
    localStorage.removeItem('menu')
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    this.router.navigate(['/login'])
  }

  estaLoguedo() {
    return this.token.length > 5
  }

  cargarStorage() {
    let limpiar = () => {
      this.token = ''
      this.usuario = null
      // Si no hay token destruimos el menu.
      this.menu = [null]
    }
    try {
      if (localStorage.getItem('token')) {
        this.token = localStorage.getItem('token')
        this.usuario = JSON.parse(localStorage.getItem('usuario'))
        // CARGAMOS EL MENU DESDE EL BACKEND SERVER.
        this.menu = JSON.parse(localStorage.getItem('menu'))
        // this.roles = JSON.parse(localStorage.getItem('roles'));
      } else limpiar()
    } catch (error) {
      limpiar()
      this.logout()
    }
  }

  guardarStorage(tk: string) {
    let token = this.parseJwt(tk)
    this.token = token
    this.apiVersion = token.apiVersion
    localStorage.setItem('id', token._id)
    localStorage.setItem('token', tk)
    // En el local storage no se pueden grabar objetos.
    // Hay que convertirlos en string.

    localStorage.setItem('menu', JSON.stringify(token.menu))
    this.menu = token.menu
    delete token.apiVersion
    delete token.menu

    localStorage.setItem('usuario', JSON.stringify(token))
    this.usuario = token
    // this.roles = roles;

    this.registrarParaOffline(token)
  }

  usuarioOffline: Usuario

  obtenerUsuarioOffline() {
    console.log(this.usuarioOffline)
    if (!this.usuarioOffline) {
      // Obtenemos del localStorage
      let storageUsuario = JSON.parse(localStorage.getItem('usuarioOffline'))
      console.log({storageUsuario})
      if (storageUsuario) {
        this.usuarioOffline = storageUsuario as Usuario
      } else this.logout()

    }
    return this.usuarioOffline
  }

  registrarParaOffline(usuario: Usuario) {
    let err = err => console.error(err)
    this.parametrosService.offline.contarDatos().subscribe(p => {
      if (p < 1) {
        this.guardarOfflineUsuario({ _id: 0, usuario_registrado: usuario })
      } else {
        this.parametrosService.offline.findById(0).subscribe(p => {
          p.usuario_registrado = usuario
          this.guardarOfflineUsuario(p)
        })
      }
    }, err)
  }

  private guardarOfflineUsuario(datos: {
    _id: number
    usuario_registrado: Usuario
  }) {
    this.parametrosService.offline.guardar(datos).subscribe(() => {
      this.usuarioOffline = datos.usuario_registrado

      // Guardamos en local storage por si se recarga el navegdor de manera extraña

      localStorage.setItem(
        'usuarioOffline',
        JSON.stringify(datos.usuario_registrado)
      )

      this.msjService.toast.info(
        ' <i class=" text-success fas fa-check-circle    "></i>  Usuario almacenado para trabajo offline.'
      )
    })
  }

  parseJwt(token: string) {
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )

    return JSON.parse(jsonPayload)
  }

  leer(termino = '', opciones = { limit: 30, skip: 0 }) {
    let url = this.base
      .concat(`?`)
      .concat(`termino=${termino}`)
      .concat(`&limit=${opciones.limit}`)
      .concat(`&opciones=${opciones.skip}`)
    return this.http.get<Usuario[]>(url).pipe(map((r: any) => r.usuarios))
  }

  buscarId(id: string) {
    const url = this.base.concat(`/id/${id}`)
    return this.http.get<Usuario>(url).pipe(map((r: any) => r.usuario))
  }

  crear(model: Usuario) {
    let m = model as any
    delete m._id
    return this.http
      .post<Usuario>(this.base, m)
      .pipe(map((r: any) => r.usuario))
  }

  modificar(model: Usuario) {
    return this.http
      .put<Usuario>(this.base.concat('/id/' + model._id), model)
      .pipe(map((r: any) => r.usuario))
  }

  modificarPassword(_id: string, password: string) {
    return this.http.put(this.base.concat('/password/').concat(_id), {
      password
    })
  }

  eliminarPermiso(_id: string, permiso: string) {
    return this.http
      .put<Usuario>(this.base.concat('/eliminar-permiso'), {
        _id,
        permiso
      })
      .pipe(map((r: any) => r.usuario))
  }

  agregarPermiso(_id: string, permiso: string) {
    console.log(permiso)
    return this.http
      .put<Usuario>(this.base.concat('/agregar-permiso'), {
        _id,
        permiso
      })
      .pipe(map((r: any) => r.usuario))
  }

  eliminar(_id: string) {
    return this.http.delete<null>(this.base)
  }
}

export interface UsuarioLight {
  _id: string
  nombre: string
}

class UsuarioOfflineService<T> extends OfflineBasico<T> implements Offline<T> {
  constructor(private root: UsuarioService, base: string) {
    super(
      root.offlineService,
      root.http,
      base,
      root.offlineService.tablas.usuarios,
      'usuarios'
    )
  }
}

export const ROLES = {
  VENDEDOR: [
    permisosKeysConfig.login,
    permisosKeysConfig['menu:configuraciones:parametros']
  ]
}
