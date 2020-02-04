import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core'
import { ReportePersonalizadoAlmacenProduccion } from '../../../models/reportePersonalizadoAlmacenProduccion/reportePersonalizadoAlmacenProduccion.model'
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms'
import { ReportesPersonalizadosAlmacenProduccionService } from '../../../services/reportes-personalizados-almacen-produccion.service'
import { ValidacionesService } from '../../../services/utilidades/validaciones.service'
import { FormArray, FormControl } from '@angular/forms'
import { DataListComponent } from 'src/app/shared/data-list/data-list.component'
import { ArticuloService } from '../../../services/articulo/articulo.service'
import { Articulo } from 'src/app/models/almacenDeMateriaPrimaYHerramientas/articulo.modelo'
import { Dato } from 'src/app/shared/data-list/dato.model'
import { Data } from '@angular/router'

@Component({
  selector: 'app-reporte-personalizado-almacen-produccion-crear-modificar',
  templateUrl:
    './reporte-personalizado-almacen-produccion-crear-modificar.component.html',
  styleUrls: [
    './reporte-personalizado-almacen-produccion-crear-modificar.component.css'
  ]
})
export class ReportePersonalizadoAlmacenProduccionCrearModificarComponent
  implements OnInit {
  @Input() reporte: ReportePersonalizadoAlmacenProduccion = null
  formulario: FormGroup

  @Output() cancelado = new EventEmitter<null>()
  @Output() guardado = new EventEmitter<null>()
  @Output() verDetalleArticulo = new EventEmitter<string>()
  @Output() esteComponente = new EventEmitter<this>()

  constructor(
    private fb: FormBuilder,
    private repoService: ReportesPersonalizadosAlmacenProduccionService,
    public vs: ValidacionesService,
    private articuloService: ArticuloService
  ) {
  }
  
  ngOnInit() {
    this.crearFormulario()
    this.esteComponente.emit(this)
  }

  crearFormulario(
    r: ReportePersonalizadoAlmacenProduccion = new ReportePersonalizadoAlmacenProduccion()
  ) {
    this.reporte = r
    this.formulario = this.fb.group(
      {
        _id: [r._id, null],
        nombre: [r.nombre, [Validators.required, Validators.minLength(10)]],
        descripcion: [r.descripcion, null],
        articulos: this.fb.array(r.articulos.map(x=> new FormControl(x)))
      },
      {
        validators: f => {
          if ((<FormArray>f.get('articulos')).length === 0)
            return {
              general: { mensaje: 'Debes definir por lo menos un articulo' }
            }

          return null
        }
      }
    )
  }

  f(c: string): AbstractControl {
    return this.formulario.get(c)
  }

  fa(c: string): FormArray {
    return <FormArray>this.formulario.get(c)
  }

  submit(
    model: ReportePersonalizadoAlmacenProduccion,
    invalid: boolean,
    e: any
  ) {
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()
    if (invalid) {
      e.stopPropagation()
      e.preventDefault()
      return
    }

    let cb = repo => {
      this.guardado.emit()
      this.crearFormulario()
    }

    if (model._id) {
      this.repoService.update(model).subscribe(cb)
    } else {
      this.repoService.save(model).subscribe(cb)
    }
  }

  cancelar() {
    this.crearFormulario()
    this.cancelado.emit()
  }

  dataList: DataListComponent
  ejecutarOperacionesDeBusquedaArticulos(evento) {
    let termino = <string>evento.termino
    this.dataList = <DataListComponent>evento.dataList
    this.articuloService
      .search(termino, undefined, undefined, Articulo)
      .subscribe(articulos => {
        let datos: Dato[] = []
        articulos.forEach((art: Articulo) => {
          let d = new Dato()
          d.leyendaPrincipal = art.nombre
          d.leyendaSecundaria = art.codigoLocalizacion
          d.descripcionPrincipal = art.descripcion

          d.objeto = art

          datos.push(d)
        })

        this.dataList.terminoBusqueda(datos)
      })
  }

  articuloSeleccionado(data: Dato) {
    if (!data) return

    const existe = this.fa('articulos').controls.find(
      x => x.value._id == data.objeto._id
    )

    if (!existe) this.fa('articulos').push(new FormControl(data.objeto))

    this.fa('articulos').controls.sort((a, b) =>
      a.value.nombre > b.value.nombre ? 1 : -1
    )

    this.dataList.reiniciar()
  }
  eliminar(i) {
    this.fa('articulos').removeAt(i)
  }

  detalleArticulo(i) {
    this.verDetalleArticulo.emit(
      (<Articulo>this.fa('articulos').at(i).value)._id
    )
  }
}
