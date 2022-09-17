import { Location } from '@angular/common'
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import {
  ROLES,
  UsuarioService
} from '../../../services/usuario/usuario.service'
import { Usuario } from '../../../models/usuario.model'
import { ManejoDeMensajesService } from '../../../services/utilidades/manejo-de-mensajes.service'
import { CargaDeImagenesTransporte } from 'src/app/shared/carga-de-imagenes/carga-de-imagenes-transporte'
import { ValidacionesService } from '../../../services/utilidades/validaciones.service'
import { ImagenesGestionRapidaComponent } from '../../../components/imagenes-gestion-rapida/imagenes-gestion-rapida.component'
import { FicheroService } from '../../../services/fichero.service'

@Component({
  selector: 'app-usuario-crear-editar',
  templateUrl: './usuario-crear-editar.component.html',
  styleUrls: ['./usuario-crear-editar.component.css']
})
export class UsuarioCrearEditarComponent implements OnInit {
  carganos: boolean
  constructor(
    private msjService: ManejoDeMensajesService,
    private ficheroService: FicheroService,
    public vs: ValidacionesService,
    private notiService: ManejoDeMensajesService,
    private usuarioService: UsuarioService,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  private _cargando = false
  public get cargando() {
    return this._cargando
  }
  public set cargando(value) {
    this._cargando = value
    value ? this.formulario?.disable() : this.formulario?.enable()
  }

  roles = ROLES

  mostrarFormulario = false
  formulario: UntypedFormGroup
  usuario: Usuario
  permisos: [string: string]
  permisosOrdenados: string[] = []

  private _imagenesParaSubir: CargaDeImagenesTransporte[]
  public get imagenesParaSubir(): CargaDeImagenesTransporte[] {
    return this._imagenesParaSubir
  }
  public set imagenesParaSubir(value: CargaDeImagenesTransporte[]) {
    this._imagenesParaSubir = value
    this.subirImagen(value)
  }

  ngOnInit(): void {
    this.cargando = true
    this.obtenerParametros()
  }
  obtenerParametros() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id')
      if (!id) this.crearFormulario({})
      else this.cargar(id)
    })
  }
  crearFormulario(usuario: Partial<Usuario>) {
    const campos = {
      _id: new UntypedFormControl(usuario._id),
      nombre: new UntypedFormControl(usuario.nombre, [
        Validators.required,
        Validators.minLength(4)
      ]),
      email: new UntypedFormControl(usuario.email, [
        Validators.email,
        Validators.required
      ])
    }

    const password = {
      password: new UntypedFormControl('', [
        Validators.minLength(8),
        Validators.required
      ])
    }

    this.formulario = new UntypedFormGroup({
      ...campos,
      // Si hay un id agregamos el campo password
      ...(usuario._id ? {} : password)
    })
    // Una vez creado el formulario lo mostramos.
    this.cargando = false
  }

  cargar(id: string) {
    this.usuarioService.buscarId(id).subscribe(
      usuario => {
        this.crearFormulario(usuario)
        this.usuario = usuario
        this.cargarPermisos()
      },
      () => this.location.back()
    )
  }

  cargarPermisos() {
    this.usuarioService.cargarPermisos().subscribe(
      permisos => {
        this.permisos = permisos

        // Ordemamos alfabeticamente
        this.permisosOrdenados = Object.keys(this.permisos).sort()
      },
      () => {
        this.msjService.toast.error('No se pudieron cargar los permisos')
      }
    )
  }
  submit(model: Usuario, invalid: boolean) {
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()
    if (invalid) {
      return
    }

    let err = () => (this.cargando = false)

    this.cargando = true
    if (model._id) {
      this.usuarioService
        .modificar(model)
        .subscribe(usuario => (this.cargando = false), err)
    } else
      this.usuarioService.crear(model).subscribe(usuario => {
        this.cargando = false
        this.location.back()
        this.notiService.toast.success('Se guardo el usuario')
      }, err)
  }

  @ViewChild('inputPassword') inputPassword: ElementRef

  guardarPassword(pass: string) {
    const passLimpio = pass.trim()

    if (passLimpio.length < 8) {
      this.inputPassword.nativeElement.select()
      this.notiService.toast.error('El password debe contener 8 caracteres')
      return
    }

    this.cargando = true

    this.usuarioService
      .modificarPassword(this.usuario._id, passLimpio)
      .subscribe(
        usuario => {
          this.cargando = false
          this.inputPassword.nativeElement.value = ''
          this.inputPassword.nativeElement.focus()
          this.notiService.toast.success('Se modificó la contraseña')
        },
        () => (this.cargando = false)
      )
  }

  imagenesGestionRapidaComponent: ImagenesGestionRapidaComponent
  subirImagen(files: CargaDeImagenesTransporte[]) {
    this.cargando = true
    this.ficheroService.usuario
      .agregarImagen(this.usuario._id, files[0].file)
      .subscribe(
        imagen => {
          this.cargando = false
          this.usuario.img = imagen
          this.imagenesGestionRapidaComponent.files.pop()
        },
        () => (this.cargando = false)
      )
  }

  eliminarImagen() {
    this.cargando = true
    this.ficheroService.usuario.eliminarImagen(this.usuario._id).subscribe(
      imagen => {
        this.cargando = false
        this.usuario.img = null
      },
      () => (this.cargando = false)
    )
  }

  cbPermiso = usuario => {
    this.cargando = false
    this.usuario.permissions = usuario.permissions
  }

  cbPermisoErr = () => (this.cargando = false)

  agreagarPermiso(permiso: string) {
    if (this.cargando) {
      return
    }
    if (this.usuario.permissions.includes(permiso)) {
      this.eliminarPermiso(permiso)
      return
    }
    this.cargando = true
    this.usuarioService
      .agregarPermiso(this.usuario._id, permiso)
      .subscribe(this.cbPermiso, this.cbPermisoErr)
  }

  eliminarPermiso(permiso: string) {
    this.cargando = true
    this.usuarioService
      .eliminarPermiso(this.usuario._id, permiso)
      .subscribe(this.cbPermiso, this.cbPermisoErr)
  }

  f(campo: string) {
    return this.formulario.get(campo)
  }

  agregarEliminarRol(key: string) {
    let promesas = this.roles[key].map(x =>
      this.usuarioService.agregarPermiso(this.usuario._id, x).toPromise()
    )

    this.cargando = true
    Promise.all(promesas)
      .then(result => {
        this.cargar(this.usuario._id)
      })
      .catch(err => {
        this.cargando = false
      })
  }
}
