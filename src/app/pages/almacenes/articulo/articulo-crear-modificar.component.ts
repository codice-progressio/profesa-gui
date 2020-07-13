import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Articulo } from '../../../models/almacenDeMateriaPrimaYHerramientas/articulo.modelo'
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms'
import { ValidacionesService } from '../../../services/utilidades/validaciones.service'
import { min } from 'rxjs/operators'
import { ArticuloService } from 'src/app/services/articulo/articulo.service'
import { AlmacenDescripcion } from '../../../models/almacenDeMateriaPrimaYHerramientas/almacen-descripcion.model'
import { AlmacenDescripcionService } from '../../../services/almacenDeMateriaPrimaYHerramientas/almacen-descripcion.service'
import { Paginacion } from 'src/app/utils/paginacion.util'
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-articulo-crear-modificar',
  templateUrl: './articulo-crear-modificar.component.html',
  styles: []
})
export class ArticuloCrearModificarComponent implements OnInit {
  articulo: Articulo = null
  formulario: FormGroup
  almacenes: AlmacenDescripcion[] = []
  keys = Object.keys
  cargando = {}

  constructor(
    public fb: FormBuilder,
    public vs: ValidacionesService,
    public articuloService: ArticuloService,
    public almacenDescripcionService: AlmacenDescripcionService,
    public location: Location,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      this.cargando['loading'] = 'Cargando articulo para modificacion'
      this.articuloService.findById(id).subscribe(art => {
        this.articulo = art
        this.crearFormulario(art)
        delete this.cargando['loading']
      })
    } else {
      this.crearFormulario()
    }

    this.cargando['almacen'] = 'Cargando almacenes'
    this.almacenDescripcionService
      .findAll(new Paginacion(100, 0, 1, 'nombre'))
      .subscribe(
        todo => {
          this.almacenes = todo
          delete this.cargando['almacen']
        },
        () => delete this.cargando['almacen']
      )
  }

  crearFormulario(a = new Articulo()) {
    this.formulario = this.fb.group(
      {
        codigoLocalizacion: [a.codigoLocalizacion, []],
        codigoInterno: [a.codigoInterno, []],
        codigoProveedor: [a.codigoProveedor, []],
        almacen: [a.almacen, [Validators.required]],
        tipoDeProducto: [a.tipoDeProducto, [Validators.required]],
        nombre: [a.nombre, [Validators.required]],
        presentacion: [a.presentacion, [Validators.required]],
        unidad: [a.unidad, [Validators.required]],
        kgPorUnidad: [a.kgPorUnidad, [Validators.required, Validators.min(0)]],
        descripcion: [a.descripcion],
        observaciones: [a.observaciones],
        stockMinimo: [
          a.stockMinimo,
          [Validators.required, Validators.max(999999), Validators.min(0)]
        ],
        stockMaximo: [
          a.stockMaximo,
          [Validators.required, Validators.max(999999), Validators.min(0)]
        ]
      },
      { validator: this.validarMinMax }
    )
  }

  validarMinMax(group: FormGroup) {
    let min: number = group.get('stockMinimo').value
    let max: number = group.get('stockMaximo').value
    // let minA: AbstractControl = group.get("stockMinimo")
    let maxA: AbstractControl = group.get('stockMaximo')

    let validacion = null
    if (min > max) {
      maxA.setErrors({ general: { mensaje: 'Debe ser mayor que ' + min } })

      validacion = {
        general: { mensaje: 'El maximo no puede ser menor al minimo.' }
      }
    }

    return validacion
  }

  f(c) {
    return this.formulario.get(c)
  }

  submit(modelo: Articulo, invalid: boolean, e) {
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()

    if (invalid) {
      e.stopPropagation()
      e.preventDefault()
      return
    }

    if (this.articulo) {
      this.cargando['modificando'] = 'Modificando articulo'
      modelo._id = this.articulo._id
      this.articuloService.update(modelo).subscribe(
        () => {
          this.location.back()
          delete this.cargando['modificando']
        },
        () => delete this.cargando['modificando']
      )
    } else {
      this.cargando['guardando'] = 'Creando articulo'
      this.articuloService.save(modelo).subscribe(
        () => {
          delete this.cargando['guardando']
          this.ngOnInit()
        },
        () => delete this.cargando['guardando']
      )
    }
  }

  limpiar() {
    this.crearFormulario()
    this.articulo = null
  }

  cancelar() {
    this.limpiar()
  }
}
