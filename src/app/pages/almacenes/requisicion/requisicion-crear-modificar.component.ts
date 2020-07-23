import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Requisicion } from 'src/app/models/requisiciones/requisicion.model'
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms'
import { RequisicionService } from '../../../services/requisiciones/requisicion.service'
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service'
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service'
import { DataListComponent } from 'src/app/shared/data-list/data-list.component'
import { Articulo } from 'src/app/models/almacenDeMateriaPrimaYHerramientas/articulo.modelo'
import { Dato } from 'src/app/shared/data-list/dato.model'
import { ArticuloService } from '../../../services/articulo/articulo.service'
import { EstatusRequisicion } from 'src/app/models/requisiciones/estatusRequisicion.model'
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import { Paginacion } from 'src/app/utils/paginacion.util'

@Component({
  selector: 'app-requisicion-crear-modificar',
  templateUrl: './requisicion-crear-modificar.component.html',
  styles: []
})
export class RequisicionCrearModificarComponent implements OnInit {
  requisicion: Requisicion = null

  dataListComponent: DataListComponent
  formulario: FormGroup
  articuloSeleccionadoParaInput: Articulo
  cargando = {}
  keys = Object.keys

  constructor(
    public fb: FormBuilder,
    public vs: ValidacionesService,
    public msjService: ManejoDeMensajesService,
    public requisicionService: RequisicionService,
    public validacionesService: ValidacionesService,
    public articuloService: ArticuloService,
    public location: Location,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      this.cargando['cargando'] = 'Obteniendo requisicion'

      this.requisicionService.findById(id).subscribe(requisicion => {
        this.crearFormulario(requisicion)

        let inter = setInterval(() => {
          if (this.dataListComponent) {
            clearInterval(inter)
            this.dataListComponent.cargarElementoPorModificacion(
              this.crearDatoParaDataList(requisicion.articulo)
            )
          }
        }, 100)
        this.articuloSeleccionadoParaInput = requisicion.articulo
        delete this.cargando['cargando']
      })
    } else {
      this.crearFormulario()
    }
  }

  modificar(requisicion: Requisicion) {
    this.requisicion = requisicion
    this.crearFormulario()
  }

  crearFormulario(r: Requisicion = new Requisicion()) {
    this.requisicion = r

    this.formulario = this.fb.group({
      // Esta comprobacion de que por lo menos
      // deben estar en false se hace en la operacion
      // de soloUnCheckBox() de manera rudimentaria
      materiaPrima: [r.materiaPrima, [Validators.required]],
      consumibles: [r.consumibles, [Validators.required]],
      gastosYServicios: [r.gastosYServicios],
      cantidad: [
        r.cantidad,
        [
          this.validacionesService.numberValidator,
          Validators.min(0),
          Validators.required
        ]
      ],
      articulo: [r.articulo._id, [Validators.required]],
      observaciones: [r.observaciones, null]
    })
  }

  f(campo: string): AbstractControl {
    return this.formulario.get(campo)
  }

  submit(modelo: Requisicion, invalid: boolean, e) {
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()

    if (invalid) {
      e.stopPropagation()
      e.preventDefault()
      return
    }

    if (this.requisicion._id) {
      this.cargando['modificando'] = 'Modificando requisicion'
      modelo._id = this.requisicion._id
      this.requisicionService.update(modelo).subscribe(
        () => {
          this.location.back()
        },
        () => delete this.cargando['modificando']
      )
    } else {
      // Es una nueva requisicion y es necesario definir
      // su estatus.
      this.cargando['guardando'] = 'Aplicando cambios'
      this.estatusRequisicion(modelo)
      this.requisicionService.save(modelo).subscribe(
        () => {
          this.crearFormulario()
          delete this.cargando['guardando']
        },
        () => delete this.cargando['guardando']
      )
    }
  }

  estatusRequisicion(requi: Requisicion) {
    requi.razonDeCambioTemp = 'Se creo la requisicion'
    requi.estatus = new EstatusRequisicion()
    requi.estatus.esRequisicion = true
  }

  limpiar() {
    this.crearFormulario()
    this.requisicion = null
    this.dataListComponent.limpiarParaNuevo()
  }

  soloUnCheckBox(c: string) {
    // Solo un checkbox puede estar en true

    let cb = {
      materiaPrima: this.f('materiaPrima'),
      consumibles: this.f('consumibles'),
      gastosYServicios: this.f('gastosYServicios')
    }

    for (const box in cb) {
      if (cb.hasOwnProperty(box)) {
        const checkbox = cb[box]
        checkbox.setValue(false)
        if (c === box) checkbox.setValue(true)
      }
    }
  }

  // dataListComponent: DataListComponent
  ejecutarOperacionesDeBusquedaArticulos(evento) {
    let termino = <string>evento.termino
    this.dataListComponent = <DataListComponent>evento.dataList
    this.articuloService
      .findByTerm(termino, new Paginacion(5, 0, 1, 'nombre'))
      .subscribe(articulos => {
        let datos: Dato[] = []
        articulos.forEach((art: Articulo) => {
          datos.push(this.crearDatoParaDataList(art))
        })
        this.dataListComponent.terminoBusqueda(datos)
      })
  }
  articuloSeleccionado(dato: Dato) {
    let art: Articulo = dato ? <Articulo> dato.objeto : null
    this.f('articulo').setValue(null)

    this.f('materiaPrima').setValue(false)
    this.f('consumibles').setValue(false)

    // si el artículo es null, no realiza ninguna operación sobre el mismo
    if (!art) return
    if (!art.tipoDeProducto) {

      return this.msjService.invalido(
        `Este articulo aún no tiene definido un tipo de material. Es necesario que Almacén de Materiales lo defina para poder continuar.`,
        'Tipo de material no definido',
        15000
        )
    }

    if (art.tipoDeProducto === 'MATERIA PRIMA')
    this.f('materiaPrima').setValue(true)

    if (art.tipoDeProducto === 'CONSUMIBLE')
    this.f('consumibles').setValue(true)

    this.f('articulo').patchValue(art ? art._id : null)
    this.articuloSeleccionadoParaInput = art
    this.f('articulo').markAsTouched()
    this.f('articulo').updateValueAndValidity()

    setTimeout(() => {
      this.suffix = ` (${art.unidad})`
    }, 100)
  }

  suffix = ''

  cancelar() {
    this.limpiar()
  }

  crearModificacionDeItem() {
    if (this.requisicion) {
      let a = this.requisicion.articulo
      return this.crearDatoParaDataList(a)
    }
  }

  private crearDatoParaDataList(art: Articulo): Dato {
    let d = new Dato()
    d.leyendaPrincipal = art.nombre
    d.leyendaSecundaria = `Existencia: ${art.existencia} ${art.unidad}`
    d.descripcionPrincipal = art.descripcion
    d.descripcionSecundaria =
      'Unidades en las que el almacen va a recibir el material: ' +
      art.presentacion
    d.objeto = art
    return d
  }
}
