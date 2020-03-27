import { Component, OnInit } from '@angular/core'
import { ModeloCompletoService } from '../../../services/modelo/modelo-completo.service'
import { ModeloCompleto } from '../../../models/modeloCompleto.modelo'
import { FamiliaDeProcesos } from '../../../models/familiaDeProcesos.model'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { FamiliaDeProcesosService } from '../../../services/proceso/familia-de-procesos.service'
import { ModeloService } from '../../../services/modelo/modelo.service'
import { TamanoService } from '../../../services/modelo/tamano.service'
import { ColorService } from '../../../services/modelo/color.service'
import { TerminadoService } from '../../../services/modelo/terminado.service'
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service'
import { Location } from '@angular/common'
import { ActivatedRoute, Data } from '@angular/router'
import { DataListComponent } from 'src/app/shared/data-list/data-list.component'
import { Dato } from 'src/app/shared/data-list/dato.model'
import { Modelo } from 'src/app/models/modelo.models'
import { Paginacion } from 'src/app/utils/paginacion.util'
import { forkJoin } from 'rxjs'
import { Laser } from 'src/app/models/laser.models'

@Component({
  selector: 'app-modelos-completos-crear-modificar',
  templateUrl: './modelos-completos-crear-modificar.component.html',
  styles: []
})
export class ModelosCompletosCrearModificarComponent implements OnInit {
  keys = Object.keys
  cargando = {}

  familiasDeProcesos: FamiliaDeProcesos[]

  formulario: FormGroup
  mc: ModeloCompleto = null

  constructor(
    private formBuilder: FormBuilder,
    public vs: ValidacionesService,
    public location: Location,
    public activatedRoute: ActivatedRoute,
    private modeloCompletoService: ModeloCompletoService,

    private modeloService: ModeloService,
    private tamanoService: TamanoService,
    private colorService: ColorService,
    private terminadoService: TerminadoService,
    private familiaDeProcesosService: FamiliaDeProcesosService
  ) {
    const id = this.activatedRoute.snapshot.paramMap.get('id')

    if (id) {
      this.cargando['cargando'] = 'Cargando elemento'
      this.modeloCompletoService.findById(id).subscribe(mod => {
        this.mc = mod
        this.crearFormulario(this.mc)
        delete this.cargando['cargando']
        this.cargarDatalists(this.mc)
      })
    } else {
      this.crearFormulario()
    }
  }

  ngOnInit() {}

  f(c) {
    return this.formulario.get(c)
  }

  crearFormulario(mc: ModeloCompleto = new ModeloCompleto()) {
    this.mc = mc
    this.formulario = this.formBuilder.group({
      modelo: [mc.modelo._id, [Validators.required]],
      tamano: [mc.tamano._id, [Validators.required]],
      color: [mc.color._id, [Validators.required]],
      terminado: [mc.terminado._id, [Validators.required]],
      laserAlmacen: [mc.laserAlmacen.laser, []],
      versionModelo: [mc.versionModelo, []],
      familiaDeProcesos: [mc.familiaDeProcesos._id, [Validators.required]],
      medias: [mc.medias, []],
      esBaston: [mc.esBaston, []]
    })
  }

  datoModelo: Dato = null
  datoTamano: Dato = null
  datoColor: Dato = null
  datoTerminado: Dato = null
  datoFamilia: Dato = null

  cargarDatalists(mc: ModeloCompleto) {
    this.cargando['modelo'] = 'Cargando modelo'
    this.cargando['tamano'] = 'Cargando tamano'
    this.cargando['color'] = 'Cargando color'
    this.cargando['terminado'] = 'Cargando terminado'
    this.cargando['familiaDeProcesos'] = 'Cargando familia de procesos'
    forkJoin([
      this.modeloService.findById(mc.modelo._id),
      this.tamanoService.findById(mc.tamano._id),
      this.colorService.findById(mc.color._id),
      this.terminadoService.findById(mc.terminado._id),
      this.familiaDeProcesosService.findById(mc.familiaDeProcesos._id)
    ]).subscribe(datos => {
      let modelo = datos[0]
      this.datoModelo = new Dato()
      this.datoModelo.leyendaPrincipal = modelo.modelo
      this.datoModelo.objeto = modelo

      let tamano = datos[1]
      this.datoTamano = new Dato()
      this.datoTamano.leyendaPrincipal = tamano.tamano
      this.datoTamano.objeto = tamano

      let color = datos[2]
      this.datoColor = new Dato()
      this.datoColor.leyendaPrincipal = color.color
      this.datoColor.objeto = color

      let terminado = datos[3]
      this.datoTerminado = new Dato()
      this.datoTerminado.leyendaPrincipal = terminado.terminado
      this.datoTerminado.objeto = terminado

      let familiaDeProcesos = datos[4]
      this.datoFamilia = new Dato()
      this.datoFamilia.leyendaPrincipal = familiaDeProcesos.nombre
      this.datoFamilia.descripcionPrincipal = familiaDeProcesos.observaciones

      delete this.cargando['modelo']
      delete this.cargando['tamano']
      delete this.cargando['color']
      delete this.cargando['terminado']
      delete this.cargando['familiaDeProcesos']
    })
  }

  seleccionar(evento: Dato, campo: string) {
    const modelo = this.f(campo)
    if (!evento) {
      modelo.setValue(null)
      return
    }

    modelo.setValue((evento.objeto as Modelo)._id)
    modelo.markAsDirty()
    modelo.updateValueAndValidity()
  }

  buscarModelo(evento: Data) {
    this.f('modelo').markAsTouched()
    this.f('modelo').updateValueAndValidity()

    let termino = <string>evento.termino
    let dataList = <DataListComponent>evento.dataList
    this.modeloService
      .findByTerm(termino, new Paginacion(30, 0, 1, 'modelo'))
      .subscribe(modelo => {
        let datos: Dato[] = []
        modelo.forEach(modelo => {
          let d = new Dato()
          d.leyendaPrincipal = modelo.modelo
          d.objeto = modelo
          datos.push(d)
        })

        dataList.terminoBusqueda(datos)
      })
  }

  buscarTamano(evento: Data) {
    this.f('tamano').markAsTouched()
    this.f('tamano').updateValueAndValidity()

    let termino = <string>evento.termino
    let dataList = <DataListComponent>evento.dataList
    this.tamanoService
      .findByTerm(termino, new Paginacion(30, 0, 1, 'tamano'))
      .subscribe(tamano => {
        let datos: Dato[] = []
        tamano.forEach(tamano => {
          let d = new Dato()
          d.leyendaPrincipal = tamano.tamano
          d.objeto = tamano
          datos.push(d)
        })

        dataList.terminoBusqueda(datos)
      })
  }

  buscarColor(evento: Data) {
    this.f('color').markAsTouched()
    this.f('color').updateValueAndValidity()

    let termino = <string>evento.termino
    let dataList = <DataListComponent>evento.dataList
    this.colorService
      .findByTerm(termino, new Paginacion(30, 0, 1, 'color'))
      .subscribe(color => {
        let datos: Dato[] = []
        color.forEach(color => {
          let d = new Dato()
          d.leyendaPrincipal = color.color
          d.objeto = color
          datos.push(d)
        })

        dataList.terminoBusqueda(datos)
      })
  }
  buscarTerminado(evento: Data) {
    this.f('terminado').markAsTouched()
    this.f('terminado').updateValueAndValidity()

    let termino = <string>evento.termino
    let dataList = <DataListComponent>evento.dataList
    this.terminadoService
      .findByTerm(termino, new Paginacion(30, 0, 1, 'terminado'))
      .subscribe(terminado => {
        let datos: Dato[] = []
        terminado.forEach(terminado => {
          let d = new Dato()
          d.leyendaPrincipal = terminado.terminado
          d.objeto = terminado
          datos.push(d)
        })

        dataList.terminoBusqueda(datos)
      })
  }
  buscarFamilia(evento: Data) {
    this.f('familiaDeProcesos').markAsTouched()
    this.f('familiaDeProcesos').updateValueAndValidity()

    let termino = <string>evento.termino
    let dataList = <DataListComponent>evento.dataList
    this.familiaDeProcesosService
      .findByTerm(termino, new Paginacion(30, 0, 1, 'nombre'))
      .subscribe(familiaDeProcesos => {
        let datos: Dato[] = []
        familiaDeProcesos.forEach(familiaDeProcesos => {
          let d = new Dato()
          ;(d.leyendaPrincipal = familiaDeProcesos.nombre),
            (d.descripcionPrincipal = familiaDeProcesos.observaciones)
          d.objeto = familiaDeProcesos
          datos.push(d)
        })

        dataList.terminoBusqueda(datos)
      })
  }

  submit(modelo: any, invalid: boolean, e) {
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()
    if (invalid) {
      e.stopPropagation()
      e.preventDefault()
      return
    }

    const l = modelo.laserAlmacen
    modelo.laserAlmacen = new Laser()
    modelo.laserAlmacen.laser = l

    this.cargando['aplicando'] = 'Guardando elemento'
    if (this.mc._id) {
      modelo._id = this.mc._id
      this.modeloCompletoService
        .update(modelo)
        .subscribe(() => this.location.back())
    } else {
      this.modeloCompletoService.save(modelo).subscribe(() => {
        this.crearFormulario()
        delete this.cargando['aplicando']
      })
    }
  }
}
