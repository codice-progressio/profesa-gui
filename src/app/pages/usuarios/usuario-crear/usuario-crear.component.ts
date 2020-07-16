import { Component, OnInit } from '@angular/core'
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormArray,
  FormControl
} from '@angular/forms'
import { Usuario } from 'src/app/models/usuario.model'
import { UsuarioService } from 'src/app/services/usuario/usuario.service'
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service'
import { ActivatedRoute, Routes, Router } from '@angular/router'
import { Location } from '@angular/common'
import permisosConfig from 'src/app/config/permisos.config'
import permisosKeysConfig from 'src/app/config/permisosKeys.config'
import permisos from 'src/app/config/permisos.config'
import { ManejoDeMensajesService } from '../../../services/utilidades/manejo-de-mensajes.service'
import { distinctUntilChanged, skipWhile } from 'rxjs/operators'
import { DataListComponent } from '../../../shared/data-list/data-list.component'
import { EmpleadoService } from '../../../services/recursosHumanos/empleado.service'
import { Paginacion } from 'src/app/utils/paginacion.util'
import { Dato } from 'src/app/shared/data-list/dato.model'
import { Empleado } from '../../../models/recursosHumanos/empleados/empleado.model'

@Component({
  selector: 'app-usuario-crear',
  templateUrl: './usuario-crear.component.html',
  styleUrls: ['./usuario-crear.component.css']
})
export class UsuarioCrearComponent implements OnInit {
  formulario: FormGroup

  cargando = {}
  usuario: Usuario
  keys = Object.keys

  permisos = permisosConfig
  permisosKey = permisosKeysConfig
  permisosOrdenados = {}
  mostrarPermisos = []
  inputFiltrador = new FormControl()
  terminoBuscado = ''

  empleadoParaModificacion: Dato = new Dato()
  constructor(
    public usuarioService: UsuarioService,
    public formBuilder: FormBuilder,
    public vs: ValidacionesService,
    public location: Location,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public msjService: ManejoDeMensajesService,
    private empleadoService: EmpleadoService
  ) {}

  validarPassword = false
  ngOnInit() {
    this.permisosOrdenados = this.ordenarPermisos(
      this.permisos,
      this.ordenarPermisos
    )
    const id = this.activatedRoute.snapshot.paramMap.get('id')

    if (id) {
      this.cargando['cargando'] = 'Buscando usuario'
      this.usuarioService.findById(id).subscribe(
        usuario => {
          this.crearFormulario(usuario)
          this.usuario = usuario
          delete this.cargando['cargando']
        },
        () => this.router.navigate(['usuarios'])
      )
    } else {
      this.validarPassword = true
      this.crearFormulario()
    }

    this.crearFiltroDePermisos(this.inputFiltrador)
  }

  crearFiltroDePermisos(input: FormControl) {
    input.valueChanges.subscribe(
      termino => {
        if (!termino) {
          this.mostrarPermisos = Object.keys(permisos)
          this.terminoBuscado = ''
          return
        }
        this.mostrarPermisos = this.mostrarPermisos.filter(x =>
          x.includes(termino)
        )
        this.terminoBuscado = termino
      },
      err => console.log(err)
    )
  }

  crearFormulario(usuario: Usuario = new Usuario()) {
    this.usuario = usuario
    this.formulario = this.formBuilder.group({
      nombre: [usuario.nombre, [Validators.required]],
      email: [usuario.email, [Validators.required, Validators.email]],
      password: [usuario.password, []],
      permissions: new FormArray(
        usuario.permissions.map(x => new FormControl(x))
      ),
      empleado: [usuario.empleado?._id]
    })

    this.permisosExistentes = this.usuario.permissions
    if (this.validarPassword)
      this.f('password').setValidators([Validators.required])
    this.formulario.updateValueAndValidity()

    this.mostrarPermisos = Object.keys(permisos)

    if (usuario.empleado) {
      this.empleadoParaModificacion.leyendaPrincipal =
        usuario.empleado.nombres + ' ' + usuario.empleado.apellidos

      this.f('nombre').disable()
    }
  }

  f(c: string): AbstractControl {
    return this.formulario.get(c)
  }
  fa(c: string): FormArray {
    return this.formulario.get(c) as FormArray
  }

  submit(usuario: Usuario, invalid: boolean, e) {
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()

    if (invalid) {
      e.preventDefault()
      e.stopPropagation()
      return
    }

    this.cargando['guardando'] = 'Espera mientras se aplican los cambios'

    if (this.usuario._id) {
      usuario._id = this.usuario._id
      this.usuarioService.update(usuario).subscribe(
        () => {
          if (
            usuario._id ===
            (JSON.parse(localStorage.getItem('usuario')) as Usuario)._id
          ) {
            //Si es el mismo usuario cerramos sesion para que se carguen bien los datos de nuevo

            this.msjService.toast.info(
              'Modificaste tu informacion. Se cerro la sesion para que tus cambios se reflejen'
            )
            return this.usuarioService.logout()
          }

          this.router.navigate(['usuarios'])
        },
        err => {
          delete this.cargando['guardando']
        }
      )
    } else {
      this.usuarioService.save(usuario).subscribe(
        () => {
          this.crearFormulario()
          delete this.cargando['guardando']
        },
        err => delete this.cargando['guardando']
      )
    }
  }

  ordenarPermisos(permisos, cb) {
    return Object.keys(permisos)
      .filter(x => x !== 'SUPER_ADMIN')
      .reduce((a, b) => {
        let elementos = b.split(':')
        let titulo = elementos.shift()
        if (!a.hasOwnProperty(titulo)) a[titulo ? titulo : b] = []
        a[titulo ? titulo : b].push(b)
        return a
      }, {})
  }

  permisosExistentes = []
  agregarQuitarPermiso(permiso: string, checked: boolean) {
    if (!checked) {
      this.permisosExistentes = this.permisosExistentes.filter(
        x => x !== permiso
      )
    } else {
      this.permisosExistentes.push(permiso)
    }

    let permissions = this.fa('permissions')
    permissions.clear()
    this.permisosExistentes.forEach(x => {
      permissions.push(new FormControl(x))
    })
  }

  valoresGlobalesDeBotones = {}

  agregarGrupo(permisos: string[], key) {
    if (!this.valoresGlobalesDeBotones.hasOwnProperty(key))
      this.valoresGlobalesDeBotones[key] = false

    this.valoresGlobalesDeBotones[key] = !this.valoresGlobalesDeBotones[key]

    permisos.forEach(x =>
      this.agregarQuitarPermiso(x, this.valoresGlobalesDeBotones[key])
    )
  }

  ejecutarOperacionesDeBusqueda(evento) {
    let termino = <string>evento.termino
    let dataList = <DataListComponent>evento.dataList
    this.empleadoService
      .find(termino, new Paginacion(10, 0, 1, 'nombres'))
      .subscribe(articulos => {
        let datos: Dato[] = []
        articulos.forEach((empleado: Empleado) => {
          let d = new Dato()
          d.leyendaPrincipal = empleado.nombres + ' ' + empleado.apellidos
          d.leyendaSecundaria = empleado.activo ? '[ Activo ]' : '[ Inactivo ]'
          d.descripcionPrincipal = empleado.puestoActualTexto

          d.objeto = empleado

          datos.push(d)
        })

        dataList.terminoBusqueda(datos)
      })
  }

  seleccionado(evento: Dato) {
    if (!evento) {
      this.f('empleado').setValue('')
      this.f('nombre').enable()
      return
    }

    let empleado = evento.objeto as Empleado

    this.f('empleado').setValue(empleado._id)
    this.f('nombre').setValue(empleado.nombres + ' ' + empleado.apellidos)
    this.f('nombre').disable()
  }
}
