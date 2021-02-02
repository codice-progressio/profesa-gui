import { Location } from '@angular/common'
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { UsuarioService } from '../../../services/usuario/usuario.service'
import { Usuario } from '../../../models/usuario.model'
import { ManejoDeMensajesService } from '../../../services/utilidades/manejo-de-mensajes.service'
import { CargaDeImagenesTransporte } from 'src/app/shared/carga-de-imagenes/carga-de-imagenes-transporte'

@Component({
  selector: 'app-usuario-crear-editar',
  templateUrl: './usuario-crear-editar.component.html',
  styleUrls: ['./usuario-crear-editar.component.css']
})
export class UsuarioCrearEditarComponent implements OnInit {
  carganos: boolean
  constructor(
    private notiService: ManejoDeMensajesService,
    private usuarioService: UsuarioService,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  cargando = false
  formulario: FormGroup
  usuario: Usuario

  ngOnInit(): void {
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
      _id: new FormControl(usuario._id),
      nombre: new FormControl(usuario.nombre, [
        Validators.required,
        Validators.minLength(4)
      ]),
      email: new FormControl(usuario.email, [
        Validators.email,
        Validators.required
      ])
    }

    const password = {
      password: new FormControl(usuario.password, [
        Validators.minLength(8),
        Validators.required
      ])
    }

    this.formulario = new FormGroup({
      ...campos,
      // Si hay un id agregamos el campo password
      ...(usuario._id ? password : {})
    })
  }

  cargar(id: string) {
    this.cargando = false
    this.usuarioService.buscarId(id).subscribe(
      usuario => {
        this.cargando = false
        this.crearFormulario(usuario)
      },
      () => this.location.back()
    )
  }

  submit(model: Usuario, invalid: boolean) {
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()
    if (invalid) {
      return
    }
    this.cargando = true
    ;(model._id
      ? this.usuarioService.crear(model)
      : this.usuarioService.modificar(model)
    ).subscribe(
      usuario => {
        this.usuario = usuario
        this.cargando = false
      },
      () => (this.carganos = false)
    )
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
          this.usuario = usuario
          this.cargando = false
          this.inputPassword.nativeElement.value = ''
          this.inputPassword.nativeElement.focus()
        },
        () => (this.cargando = false)
      )
  }

  subirImagen(files: CargaDeImagenesTransporte[]) {
    this.cargando = true
    this.usuarioService
      .agregarImagen(this.usuario._id, files[0].file)
      .subscribe(
        imagen => {
          this.cargando = false
          this.usuario.img = imagen
        },
        () => (this.cargando = false)
      )
  }

  eliminarImagen() {
    this.cargando = true
    this.usuarioService.eliminarImagen(this.usuario._id).subscribe(
      imagen => {
        this.cargando = false
        this.usuario.img = null
      },
      () => (this.cargando = false)
    )
  }

  cbPermiso = usuario => {
    this.cargando = false
    this.usuario = usuario
  }
  cbPermisoErr = () => (this.cargando = false)
  agreagarPermiso(permiso: string) {
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
}
