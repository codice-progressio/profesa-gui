import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms'
import { SalidasLotes } from '../../../../../models/almacenProductoTerminado/salidasLote.model'
import { Cliente } from 'src/app/models/cliente.models'
import { ValidacionesService } from '../../../../../services/utilidades/validaciones.service'
import { ClienteService } from '../../../../../services/cliente/cliente.service'
import { ModeloCompleto } from 'src/app/models/modeloCompleto.modelo'
import { ModeloCompletoService } from '../../../../../services/modelo/modelo-completo.service'
import { Location } from '@angular/common'
import { ActivatedRoute, Data } from '@angular/router'
import { DataListComponent } from 'src/app/shared/data-list/data-list.component'
import { Paginacion } from 'src/app/utils/paginacion.util'
import { Dato } from 'src/app/shared/data-list/dato.model'
import { LoteService } from '../../../../../services/almacenDeProductoTerminado/lote.service'
import { Lotes } from 'src/app/models/almacenProductoTerminado/lotes.model'

@Component({
  selector: 'app-almacen-de-producto-terminado-crear-modificar-salida',
  templateUrl:
    './almacen-de-producto-terminado-crear-modificar-salida.component.html',
  styles: []
})
export class AlmacenDeProductoTerminadoCrearModificarSalidaComponent
  implements OnInit {
  keys = Object.keys
  cargando = {}

  formulario: FormGroup
  inputClienteNg: Cliente
  clientes: Cliente[] = []
  clienteSeleccionado: Cliente

  /**
   *Para obtener el modelo completo.
   *
   * @type {ModeloCompleto}
   * @memberof AlmacenDeProductoTerminadoCrearModificarSalidaComponent
   */
  modeloCompleto: ModeloCompleto

  constructor(
    public fb: FormBuilder,
    public vs: ValidacionesService,
    public clienteService: ClienteService,
    public modComSer: ModeloCompletoService,
    public location: Location,
    public activatedRoute: ActivatedRoute,
    public loteService: LoteService
  ) {}

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id')

    this.cargando['cargando'] = 'Cargando sku para salida'
    this.modComSer.findById(id).subscribe(mc => {
      this.modeloCompleto = mc

      delete this.cargando['cargando']
    })

    this.crearFormulario()
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      idLote: ['', [Validators.required]],
      cliente: ['', [Validators.required]],
      cantidad: [
        '',
        [
          this.vs.onlyIntegers,
          this.vs.numberValidator,
          Validators.required,
          Validators.min(1)
        ]
      ],
      observaciones: ['', []]
    })
  }

  submit(salidaLote: SalidasLotes, invalid: boolean, e) {
    e.preventDefault()

    if (invalid) return
    this.cargando['guardar'] = 'Registrando salida'
    this.loteService
      .registrarSalida(
        salidaLote,
        this.f('idLote').value,
        this.modeloCompleto._id
      )
      .subscribe(
        () => {
          delete this.cargando['guardar']
          this.ngOnInit()
        },
        err => delete this['guardar']
      )
  }

  esperando = false
  intervaloDeBusqueda: any = null
  terminoDeBusqueda: string = ''

  buscarTermino(termino: string) {
    this.clienteService.findByTerm(termino).subscribe(clientes => {
      this.clientes = clientes
      this.intervaloDeBusqueda = null
    })
  }

  f(c): AbstractControl {
    return this.formulario.get(c)
  }

  /**
   *Setea el numero de lote
   *
   * @param {string} id
   * @memberof AlmacenDeProductoTerminadoCrearModificarSalidaComponent
   */
  seleccionarLote(id: string) {
    this.f('idLote').setValue(id)
  }

  buscar(evento: Data) {
    this.f('cliente').markAsTouched()
    this.f('cliente').updateValueAndValidity()

    let termino = <string>evento.termino
    let dataList = <DataListComponent>evento.dataList
    this.clienteService
      .findByTerm(termino, new Paginacion(30, 0, 1, 'modelo'))
      .subscribe(modelo => {
        let datos: Dato[] = []
        modelo.forEach(cliente => {
          let d = new Dato()
          d.leyendaPrincipal = cliente.nombre
          d.objeto = cliente
          datos.push(d)
        })

        dataList.terminoBusqueda(datos)
      })
  }

  seleccionar(evento: Dato) {
    const clienteF = this.f('cliente')
    if (!evento) {
      clienteF.setValue(null)
      return
    }

    clienteF.setValue((evento.objeto as Cliente)._id)
    clienteF.markAsDirty()
    clienteF.updateValueAndValidity()
  }
}
