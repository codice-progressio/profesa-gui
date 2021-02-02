import { Injectable } from '@angular/core'
import { Usuario } from '../../models/usuario.model'
import { HttpClient } from '@angular/common/http'
import { URL_SERVICIOS } from '../../config/config'
import { map, catchError } from 'rxjs/operators'
import { Router } from '@angular/router'
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service'
import { throwError } from 'rxjs/internal/observable/throwError'
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service'
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service'
import { Observable } from 'rxjs'
import { Paginacion } from 'src/app/utils/paginacion.util'
import { URL_BASE } from '../../config/config'
import permisosConfig from 'src/app/config/permisos.config'
import permisosKeysConfig from 'src/app/config/permisosKeys.config'

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
  usuario: Usuario
  // Cuando se recarga la página la tratamos de leer (en el login)
  // y si no la inicializamos (cargando del storage) va a dar error.
  token: string

  // roles: Roles;

  menu: any[] = []

  apiVersion: string
  base = URL_BASE('usuario')
  total = 0

  poolLight: UsuarioLight[] = []
  cargandoPool = false

  constructor(
    // Para que este funcione hay que hacer un "imports"
    // en service.module.ts
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService,
    public msjService: ManejoDeMensajesService,
    public _preLoaderService: PreLoaderService
  ) {
    this.cargarStorage()
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
    const url = URL_SERVICIOS + '/login'
    return this.http.post(url, { email, password }).pipe(
      // Guardamos la información en el local storage para que quede
      // disponible si el usuario cierra el navegador.
      map((resp: any) => {
        this.guardarStorage(resp.token)
        if (!this.usuario.permissions.includes(permisosKeysConfig.login)) {
          this.msjService.toastErrorMensaje(
            'El usuario esta inactivo. Si es un error reportalo con el administrador'
          )
          throw ''
        }
        return { correcto: true }
      }),
      catchError(err => {
        this.msjService.toastError(err)
        return throwError(err)
      })
    )
  }

  cargarPermisos(): Observable<string[]> {
    const url = `${URL_SERVICIOS}/login/permisos`
    return this.http.get(url).pipe(
      map((resp: any) => {
        return <string[]>Object.values(resp.permisos)
      })
    )
  }

  renuevaToken() {
    const url = URL_SERVICIOS + `/login/renuevatoken`
    return this.http.post(url, { token: this.token }).pipe(
      map((resp: any) => {
        this.token = resp.token
        localStorage.setItem('token', this.token)
        // Si lo hace recive true

        this.msjService.toastCorrecto(resp.mensaje)
        return true
      })
    )
  }

  logout() {
    this.usuario = null
    this.token = ''
    this.menu = [null]
    localStorage.removeItem('usuario')
    localStorage.removeItem('menu')
    this.router.navigate(['/login'])
  }

  estaLoguedo() {
    return this.token.length > 5
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token')
      this.usuario = JSON.parse(localStorage.getItem('usuario'))
      // CARGAMOS EL MENU DESDE EL BACKEND SERVER.
      this.menu = JSON.parse(localStorage.getItem('menu'))
      // this.roles = JSON.parse(localStorage.getItem('roles'));
    } else {
      this.token = ''
      this.usuario = null
      // Si no hay token destruimos el menu.
      this.menu = [null]
    }
  }

  guardarStorage(tk: string) {
    let token = JSON.parse(atob(tk.split('.')[1]))
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
  }

  save(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario'

    return this.http.post(url, usuario).pipe(
      // Si todo salio bien mandamos un mensaje.
      map((resp: any) => {
        this.msjService.ok_(resp, null, a)
        return resp.usuario
      }),
      catchError(err => {
        this.msjService.err(err)
        return throwError(err)
      })
    )
  }

  // Actualiza los datos de un usuario en el local storage
  // y el la BD.
  update(usuario: Usuario) {
    let url = URL_BASE(`usuario`)

    return this.http.put(url, usuario).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        return true
      }),
      catchError(err => {
        this.msjService.err(err)
        return throwError(err)
      })
    )
  }

  cambiarImagen(archivo: File, id: string) {
    const a: number = this._preLoaderService.loading(
      'Subiendo imagen para el usuario.'
    )

    this._subirArchivoService
      .subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img
        this.msjService.ok_(resp, null, a)
        // this.guardarStorage(id, this.token, this.usuario, this.menu)
      })
      .catch(err => {
        this.msjService.err(err)
        return throwError(err)
      })
  }

  findAll(paginacion: Paginacion, filtros: string = ''): Observable<Usuario[]> {
    const url = this.base
      .concat('?')
      .concat(`desde=${paginacion.desde}`)
      .concat(`&limite=${paginacion.limite}`)
      .concat(`&campo=${paginacion.campoDeOrdenamiento}`)
      .concat(`&sort=${paginacion.orden}`)
      .concat(`&${filtros}`)

    return this.http.get<Usuario[]>(url).pipe(
      map((resp: any) => {
        this.total = resp.total
        return resp.usuarios
      }),
      catchError(err => this.errFun(err))
    )
  }

  findByTerm(
    termino: string,
    paginacion: Paginacion,
    filtros: string = ''
  ): Observable<Usuario[]> {
    const url = this.base
      .concat(`/buscar/termino/${termino}`)
      .concat('?')
      .concat(`desde=${paginacion.desde}`)
      .concat(`&limite=${paginacion.limite}`)
      .concat(`&campo=${paginacion.campoDeOrdenamiento}`)
      .concat(`&sort=${paginacion.orden}`)
      .concat(`&${filtros}`)

    return this.http.get<Usuario[]>(url).pipe(
      map((resp: any) => {
        this.total = resp.total
        return resp.usuarios as Usuario[]
      }),
      catchError(err => this.errFun(err))
    )
  }

  findById(id: string): Observable<Usuario> {
    let url = this.base.concat('/buscar/id/' + id)

    return this.http.get<Usuario>(url).pipe(
      map((resp: any) => {
        return resp.usuario as Usuario
      }),

      catchError(err => this.errFun(err))
    )
  }

  delete(id: string): Observable<Usuario> {
    let url = this.base.concat('/' + id)

    return this.http.delete(url).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.msj)
        return resp.usuario
      }),
      catchError(err => this.errFun(err))
    )
  }

  buscarUsuariosPorPermiso(permiso: string): Observable<Usuario[]> {
    const url = this.base.concat(`/buscar/permiso/${permiso}`)

    return this.http.get<Usuario[]>(url).pipe(
      map((resp: any) => {
        return resp.usuariosRole as Usuario[]
      }),
      catchError(err => this.errFun(err))
    )
  }


  findAllLigthPool(): Observable<UsuarioLight[]> {
    let url = this.base.concat('/buscar/todo/light')
    this.cargandoPool = true

    return this.http.get<UsuarioLight[]>(url).pipe(
      map((x: any) => {
        this.poolLight = x.usuarios as UsuarioLight[]
        this.cargandoPool = false
        return this.poolLight
      }),
      catchError(err => {
        this.cargandoPool = false
        return this.errFun(err)
      })
    )
  }
}

export interface UsuarioLight {
  _id: string
  nombre: string
}
