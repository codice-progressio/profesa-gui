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
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'
import permisosConfig from 'src/app/config/permisos.config'
import permisosKeysConfig from 'src/app/config/permisosKeys.config'
import permisos from 'src/app/config/permisos.config'

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

  constructor(
    public usuarioService: UsuarioService,
    public formBuilder: FormBuilder,
    public vs: ValidacionesService,
    public location: Location,
    public activatedRoute: ActivatedRoute
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
        () => this.location.back()
      )
    } else {
      this.validarPassword = true
      this.crearFormulario()
    }
  }

  crearFormulario(usuario: Usuario = new Usuario()) {
    this.usuario = usuario
    this.formulario = this.formBuilder.group({
      nombre: [usuario.nombre, [Validators.required]],
      email: [usuario.email, [Validators.required, Validators.email]],
      password: [usuario.password, []],
      permissions:
        usuario.permissions.length > 0
          ? new FormArray([])
          : new FormArray(usuario.permissions.map(x => new FormControl(x)))
    })

    this.permisosExistentes = this.usuario.permissions
    if (this.validarPassword)
      this.f('password').setValidators([Validators.required])
    this.formulario.updateValueAndValidity()
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
      this.usuarioService.update(usuario).subscribe(() => this.location.back())
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
}
