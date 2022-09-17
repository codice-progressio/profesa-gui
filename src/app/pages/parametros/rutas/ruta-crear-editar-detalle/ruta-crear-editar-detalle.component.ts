import { Location } from '@angular/common'
import { Component, OnInit, Renderer2 } from '@angular/core'
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { RutaDeEntrega } from 'src/app/models/rutaDeEntrega.model'
import { RutaDeEntregaService } from 'src/app/services/ruta-de-entrega.service'
import { UtilidadesService } from 'src/app/services/utilidades.service'
import { ValidacionesService } from '../../../../services/utilidades/validaciones.service'

@Component({
  selector: 'app-ruta-crear-editar-detalle',
  templateUrl: './ruta-crear-editar-detalle.component.html',
  styleUrls: ['./ruta-crear-editar-detalle.component.css']
})
export class RutaCrearEditarDetalleComponent implements OnInit {
  constructor(
    private rutasService: RutaDeEntregaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer2,
    private location: Location,
    public vs: ValidacionesService,
    private utilidadesService: UtilidadesService
  ) {}

  formulario: UntypedFormGroup
  detalle: boolean = false
  editando: boolean = false
  id: string = ''
  private _cargando = false
  public get cargando() {
    return this._cargando
  }
  public set cargando(value) {
    this._cargando = value
    if (value) this.formulario?.disable()
    else this.formulario?.enable()
  }

  ruta: RutaDeEntrega

  ngOnInit(): void {
    this.obtenerId()
  }

  activarProtocoloDetalle() {
    // Agregamos una clase a todos los input.
    document
      .querySelectorAll('.contenedor-detalle [formControlName]')
      .forEach(x => {
        this.renderer.addClass(x, 'detalle')
      })
  }

  esRutaDetalle() {
    let url = this.activatedRoute.snapshot['_routerState'].url
    return url.includes('detalle')
  }

  obtenerId() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id')
      this.cargando = true
      if (!this.id) {
        this.crearFormulario({})
      } else this.obtenerRuta(this.id)
    })
  }

  crearFormulario(ruta: Partial<RutaDeEntrega>) {
    this.ruta = ruta as RutaDeEntrega
    this.formulario = new UntypedFormGroup({
      _id: new UntypedFormControl(ruta._id, []),

      nombre: new UntypedFormControl(ruta.nombre, [
        Validators.minLength(4),
        Validators.required
      ]),
      descripcion: new UntypedFormControl(ruta.descripcion, [])
    })

    if (this.esRutaDetalle()) {
      setTimeout(() => {
        this.detalle = true
        this.activarProtocoloDetalle()
      }, 50)
    } else {
      this.editando = true
    }

    this.cargando = false
  }
  obtenerRuta(id: string) {
    this.rutasService.buscarId(id).subscribe(
      ruta => {
        this.crearFormulario(ruta)
      },
      () => (this.cargando = false)
    )
  }

  submit(model: RutaDeEntrega, invalid: boolean) {
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()

    if (invalid) return

    this.cargando = true
    this.rutasService.guardarModificar(model).subscribe(
      ruta => {
        this.location.back()
      },
      () => (this.cargando = false)
    )
  }

  f(campo: string) {
    return this.formulario.get(campo)
  }

  editar() {
    this.router.navigate(
      [
        '../../../',
        'editar',
        this.utilidadesService.niceUrl(this.ruta.nombre),
        this.ruta._id
      ],
      {
        relativeTo: this.activatedRoute
      }
    )
  }
}
